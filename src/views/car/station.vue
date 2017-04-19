<template>
    <div>
        <!--面包屑-->
        <Breadcrumb style="padding-top:20px">
            <Breadcrumb-item href="/">首页</Breadcrumb-item>
            <Breadcrumb-item href="/Car">直通车</Breadcrumb-item>
            <Breadcrumb-item>车站管理</Breadcrumb-item>
        </Breadcrumb>
        
        <!--搜素栏-->
        <Form :label-width="80"
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
                <Col span="5"
                     offset="13">
                <Form-item label="模糊查询">
                    <Input v-model="queryText"
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
               :columns="stationColumns"
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

        <!--添加弹窗-->
        <Modal v-model="addModal"
               title="编辑车站"
               @on-ok="addStation"
               @on-cancel="$Message.info('取消添加');">
            <Form :model="addStationModel"
                  :label-width="80">
                <Form-item label="车站名称">
                    <Input v-model="addStationModel.station_name"
                           placeholder="请输入车站名称"></Input>
                </Form-item>
                <Form-item label="选择城市">
                    <Select v-model="addStationModel.city_code"
                            placeholder="请选择">
                        <Option v-for="item in citys"
                                :value="item.city_code"
                                :key="item">{{ item.city_name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="选择单位">
                    <Select v-model="addStationModel.company_code"
                            placeholder="请选择">
                        <Option v-for="item in companys"
                                :value="item.company_code"
                                :key="item">{{ item.company_name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="联系方式">
                    <Input v-model="addStationModel.station_info"
                           type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入..."></Input>
                </Form-item>
            </Form>
        </Modal>

        <!--编辑弹窗弹窗-->
        <Modal v-model="editModal"
               title="编辑车站"
               @on-ok="editStation"
               @on-cancel="$Message.info('取消编辑');">
            <Form :model="editStationModel"
                  :label-width="80">
                <Form-item label="车站名称">
                    <Input v-model="editStationModel.station_name"></Input>
                </Form-item>
                <Form-item label="车站代码">
                    <Input v-model="editStationModel.station_code"
                           disabled></Input>
                </Form-item>
                <Form-item label="选择城市">
                    <Select v-model="editStationModel.city_code"
                            placeholder="请选择">
                        <Option v-for="item in citys"
                                :value="item.city_code"
                                :key="item">{{ item.city_name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="选择单位">
                    <Select v-model="editStationModel.company_code"
                            placeholder="请选择">
                        <Option v-for="item in companys"
                                :value="item.company_code"
                                :key="item">{{ item.company_name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="联系方式">
                    <Input v-model="editStationModel.station_info"
                           type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入..."></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
import Linq from 'linq';
export default {
    data() {
        return {
            queryText: null,
            self: this,
            currentPage: 1,
            addModal: false,
            editModal: false,
            citys: [],
            companys: [],
            pageSize: 10,
            totalNumber: 10,
            stationColumns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '车站名称',
                    key: 'station_name'
                },
                {
                    title: '车站代码',
                    key: 'station_code'
                },
                {
                    title: '城市',
                    key: 'city_name'
                },
                {
                    title: '城市代码',
                    key: 'city_code'
                },
                {
                    title: '单位',
                    key: 'company_name'
                },
                {
                    title: '联系方式',
                    key: 'station_info'
                },
                {
                    title: '操作',
                    key: 'action',
                    render(row, column, index) {
                        return `<Button-group> <i-button @click="delStation(${row.id})" type="ghost" style="color:red">删除</i-button><i-button  @click="editStationShow(row)"  type="ghost" >编辑</i-button></Button-group>`;
                    }
                }
            ],
            tableContent: [],
            addStationModel: {
                station_name: '',
                city_code: '',
                station_info: '',
                company_code: '',
            },
            editStationModel: {}
        }
    }
    ,
    methods: {
        search(pageNumber) {
            this.$http.get('http://localhost:3000/stations', {
                params: {
                    _page: pageNumber,
                    _limit: this.pageSize,
                    q: this.queryText || ''
                }
            }).then((res) => {
                this.totalNumber = Number(res.headers['map']['X-Total-Count'][0]);
                this.currentPage = pageNumber;
                var that = this;
                this.tableContent = Linq.from(res.body).select(v => {
                    return {
                        id: v.id,
                        station_name: v.station_name,
                        station_code: v.station_code,
                        city_code: v.city_code,
                        city_name: Linq.from(that.citys).singleOrDefault('x=>x.city_code=="' + v.city_code + '"').city_name || '-',
                        company_code: v.company_code,
                        company_name: Linq.from(that.companys).singleOrDefault('x=>x.company_code=="' + v.company_code + '"').company_name || '-',
                        station_info: v.station_info
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
        delStation(id) {
            this.$Modal.confirm({
                content: '<h3>确认删除该车站么</h3>',
                onOk: () => {
                    this.$http.delete('http://localhost:3000/stations/' + id
                    ).then((res) => {
                        this.$Message.info('删除了车站');
                        this.search(1);
                    });
                },
                onCancel: () => {
                    this.$Message.info('取消删除');
                }
            });
        },
        addStation() {
            this.$http.post('http://localhost:3000/stations', {
                station_name: this.addStationModel.station_name,
                station_code: Math.random().toString(32).substr(2),
                city_code: this.addStationModel.city_code,
                station_info: this.addStationModel.station_info,
                company_code: this.addStationModel.company_code
            }).then((res) => {
                this.$Message.success('添加成功');
                this.search(1);
            }, (res) => {
                this.$Message.error('添加失败:' + res.body);
            })
            this.addStationModel = {
                station_name: '',
                city_code: '',
                station_info: '',
                company_code: '',
            };
        },
        editStationShow: function (station) {
            this.editModal = true;
            this.editStationModel = station;
        },
        editStation: function () {
            this.$http.put('http://localhost:3000/stations/' + this.editStationModel.id, {
                station_name: this.editStationModel.station_name,
                station_code: this.editStationModel.station_code,
                city_code: this.editStationModel.city_code,
                station_info: this.editStationModel.station_info,
                company_code: this.editStationModel.company_code
            }).then((res) => {
                this.$Message.success('编辑成功');
                this.search(1);
            }, (res) => {
                this.$Message.error('编辑失败:' + res.body);
            })
        }
    },
    mounted: function () {
        this.$http.get('http://localhost:3000/citys'
        ).then((res) => {
            this.citys = res.body;
        });
        this.$http.get('http://localhost:3000/companys'
        ).then((res) => {
            this.companys = res.body;
        });
        this.search(1);
    }
}
</script>