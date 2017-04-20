<template>
    <div>
        <!--面包屑-->
        <Breadcrumb style="padding-top:20px">
            <Breadcrumb-item href="/">首页</Breadcrumb-item>
            <Breadcrumb-item href="/Car">直通车</Breadcrumb-item>
            <Breadcrumb-item>班次管理</Breadcrumb-item>
        </Breadcrumb>
    
        <!--搜素栏-->
        <Form :label-width="80"
              :model="searchModel"
              style="padding:20px 0 0 0;height:100%">
            <Row :gutter="16">
                <Col span="5">
                <Form-item label="单位">
                    <Select v-model="searchModel.company_code"
                            clearable>
                        <Option v-for="item in companys"
                                :value="item.company_code"
                                :key="item">{{ item.company_name }}</Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="4">
                <Form-item label="班次状态">
                    <Select v-model="searchModel.class_state"
                            clearable>
                        <Option v-for="item in classState"
                                :value="item.code"
                                :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="5">
                <Form-item label="模糊查询">
                    <Input v-model="searchModel.query_text"
                           placeholder="请输入车站或城市名称"></Input>
                </Form-item>
                </Col>
                <Col span="2">
                <Button-group style="float:right">
                    <Button icon="search"
                            type="ghost"
                            @click="search(1)">查询</Button>
                </Button-group>
                </Col>
            </Row>
        </Form>
    
        <!--表格-->
        <Table :context="self"
               :data="tableContent"
               :columns="classColumns"
               stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalNumber"
                      :current="currentPage"
                      :page-size="pageSize"
                      v-on:on-change="changePage"
                      v-on:on-page-size-change="changePageSize"
                      show-sizer></Page>
            </div>
        </div>
    </div>
</template>

<script>
import Linq from 'linq';

export default {
    data() {
        return {
            self: this,
            pageSize: 10,
            totalNumber: 10,
            currentPage: 1,
            searchModel: {
                company_code: '',
                class_state: '',
                query_text: ''
            },
            companys: [],
            citys: [],
            stations: [],
            classState: [
                { code: 1, name: '运行' },
                { code: 2, name: '停运' },
            ],
            tableContent: [],
            classColumns: [
                { title: '所属单位', key: 'company_name' },
                { title: '运营车辆', key: 'car_plate' },
                { title: '线路编码', key: 'line_code',width:180},
                { title: '出发站点', key: 'start_station_name',width: 150 },
                { title: '出发城市', key: 'start_city_name' },
                { title: '到达站点', key: 'end_station_name',width: 150 },
                { title: '到达城市', key: 'end_city_name'},
                { title: '发车时间', key: 'leave_time'},
                { title: '座席数', key: 'seat_count'},
                { title: '余座数', key: 'surplus_seat'},
                {
                    title: '班次状态', key: 'class_state',
                    render(row) {
                        const text = row.class_state == 1 ? '运行' : '停运';
                        return `<p>${text}</p>`;
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    render(row, column, index) {
                        return `<Button-group> 
                        <i-button @click="setClassState(${row.id})" type="info" >停运</i-button>
                        <i-button  @click="editClassShow(row)"  type="ghost" >修改</i-button>
                        <i-button @click="delCar(${row.id})" type="ghost" style="color:red">删除</i-button>
                        </Button-group>`;
                    },
                    width:220
                }
            ]
        }
    },
    methods: {
        search: function (pageNumber) {
            var params = {};
            params["_page"] = pageNumber;
            params["_limit"] = this.pageSize;
            if (this.searchModel.company_code != '') {
                params["company_code"] = this.searchModel.company_code;
            }
            if (this.searchModel.class_state != '') {
                params["class_state"] = this.searchModel.class_state;
            }
            if (this.searchModel.query_text != '') {
                params["q"] = this.searchModel.query_text;
            }
            this.$http.get('http://localhost:3000/classes', {
                params: params
            }).then((res) => {
                this.totalNumber = Number(res.headers['map']['X-Total-Count'][0]);
                this.currentPage = pageNumber;
                var that = this;
                this.tableContent = Linq.from(res.body).select(v => {
                    return {
                        id: v.id,
                        company_code: v.company_code,
                        company_name: that.companyDic[v.company_code] || '-',
                        car_plate:v.car_plate,
                        line_code: v.line_code,
                        start_station_code: v.start_station_code,
                        start_station_name: that.stationDic[v.start_station_code] || '-',
                        start_city_code: v.start_city_code,
                        start_city_name: that.cityDic[v.start_city_code] || '-',
                        end_station_code: v.end_station_code,
                        end_station_name: that.stationDic[v.end_station_code] || '-',
                        end_city_code: v.end_city_code,
                        end_city_name: that.cityDic[v.end_city_code] || '-',
                        seat_count:v.seat_count,
                        surplus_seat:v.surplus_seat,
                        leave_time: v.leave_time,
                        class_state: v.class_state,
                    }
                }).toArray();
            });
        },
        changePage: function (pageNumber) {
            this.search(pageNumber);
        },
        changePageSize: function (pageSize) {
            this.pageSize = pageSize;
            this.search(1);
        },
    },
    computed: {
        cityDic: function () {
            let result = {};
            for (var index = 0; index < this.citys.length; index++) {
                result[this.citys[index].city_code] = this.citys[index].city_name;
            }
            return result;
        },
        stationDic: function () {
            let result = {};
            for (var index = 0; index < this.stations.length; index++) {
                result[this.stations[index].station_code] = this.stations[index].station_name;
            }
            return result;
        },
        companyDic: function () {
            let result = {};
            for (var index = 0; index < this.companys.length; index++) {
                result[this.companys[index].company_code] = this.companys[index].company_name;
            }
            return result;
        }
    },
    mounted: function () {
        this.$http.get('http://localhost:3000/companys'
        ).then((res) => {
            this.companys = res.body;
        });
        this.$http.get('http://localhost:3000/stations'
        ).then((res) => {
            this.stations = res.body;
        });
        this.$http.get('http://localhost:3000/citys'
        ).then((res) => {
            this.citys = res.body;
        });
         this.search(1);
    }
}
</script>