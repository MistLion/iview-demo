<template>
    <div>
        <!--面包屑-->
        <Breadcrumb style="padding-top:20px">
            <Breadcrumb-item href="/">首页</Breadcrumb-item>
            <Breadcrumb-item href="/Car">直通车</Breadcrumb-item>
            <Breadcrumb-item>线路管理</Breadcrumb-item>
        </Breadcrumb>
    
        <!--搜素栏-->
        <Form :label-width="80"
              :model="searchModel"
              style="padding:20px 0 0 0;height:100%">
            <Row :gutter="16">
                <Col span="4">
                <Button-group style="float:left">
                    <Button icon="compose"
                            type="ghost">导入</Button>
                    <Button icon="document"
                            type="ghost">导出</Button>
                    <Button type="ghost"
                            icon="plus"
                            @click="addModal = true">添加</Button>
                </Button-group>
                </Col>
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
                <Form-item label="班次类型">
                    <Select v-model="searchModel.class_type"
                            clearable>
                        <Option v-for="item in classType"
                                :value="item.code"
                                :key="item">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="4">
                <Form-item label="线路状态">
                    <Select v-model="searchModel.line_state"
                            clearable>
                        <Option v-for="item in lineState"
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
               :columns="lineColumns"
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
                class_type: '',
                line_state: '',
                query_text: ''
            },
            companys: [],
            citys: [],
            stations: [],
            classType: [
                { code: 1, name: '流水班' },
                { code: 2, name: '固定班' },
                { code: 3, name: '临时班' }
            ],
            lineState: [
                { code: 1, name: '可预定' },
                { code: 2, name: '不可预定' },
                { code: 3, name: '审核中' }
            ],
            tableContent: [],
            lineColumns: [
                { title: '单位名称', key: 'company_name' },
                { title: '线路编码', key: 'line_code', width: 180 },
                {
                    title: '班次类型', key: 'class_type',
                    render(row) {
                        return row.class_type == 1 ? '流水班' : row.class_type == 2 ? '固定班' : '临时班';
                    }
                },
                { title: '出发站点', key: 'start_station_name', width: 180 },
                { title: '出发城市', key: 'start_city_name' },
                { title: '到达站点', key: 'end_station_name', width: 180 },
                { title: '到达城市', key: 'end_city_name' },
                { title: '全票价', key: 'full_price', width: 80 },
                { title: '结算价', key: 'pay_price', width: 80 },
                { title: '最早发车时间', key: 'leave_time',width:120 },
                {
                    title: '线路状态', key: 'line_state',
                    render(row) {
                        const color = row.line_state == 1 ? 'green' : row.line_state == 2 ? 'red' : 'blue';
                        const text = row.line_state == 1 ? '可预定' : row.line_state == 2 ? '不可预定' : '审核中';
                        return `<tag type="dot" color="${color}">${text}</tag>`;
                    },
                    width:150
                },
                {
                    title: '操作',
                    key: 'action',
                    render(row, column, index) {
                        return `<Button-group> <i-button @click="setClass(${row.id})" type="info" >排班</i-button><i-button  @click="editStationShow(row)"  type="ghost" >编辑</i-button></Button-group>`;
                    },
                    width:180
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
            if (this.searchModel.class_type != '') {
                params["class_type"] = this.searchModel.class_type;
            }
            if (this.searchModel.line_state != '') {
                params["line_state"] = this.searchModel.line_state;
            }
            if (this.searchModel.query_text != '') {
                params["q"] = this.searchModel.query_text;
            }
            this.$http.get('http://localhost:3000/lines', {
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
                        line_code: v.line_code,
                        class_type: v.class_type,
                        start_station_code: v.start_station_code,
                        start_station_name: that.stationDic[v.start_station_code] || '-',
                        start_city_code: v.start_city_code,
                        start_city_name: that.cityDic[v.start_city_code] || '-',
                        end_station_code: v.end_station_code,
                        end_station_name: that.stationDic[v.end_station_code] || '-',
                        end_city_code: v.end_city_code,
                        end_city_name: that.cityDic[v.end_city_code] || '-',
                        full_price: v.full_price,
                        pay_price: v.pay_price,
                        leave_time: v.leave_time,
                        line_state: v.line_state,
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
        // this.search(1);
    }
}
</script>