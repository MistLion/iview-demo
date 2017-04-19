<template>
    <div>
        <Breadcrumb style="padding-top:20px">
            <Breadcrumb-item href="/">首页</Breadcrumb-item>
            <Breadcrumb-item href="/Car">直通车</Breadcrumb-item>
            <Breadcrumb-item>车站管理</Breadcrumb-item>
        </Breadcrumb>
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
        <Table :context="self"
               :data="tableContent"
               :columns="stationColumns"
               highlight-row
               stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalNumber"
                      :current="1"
                      :page-size="pageSize"
                      v-on:on-change="changePage"
                      show-sizer></Page>
            </div>
        </div>
        <Modal v-model="addModal"
               title="添加"
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
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </Form-item>
                  <Form-item label="选择单位">
                    <Select v-model="addStationModel.company_name"
                            placeholder="请选择">
                        <Option value="beijing">合肥客运</Option>
                        <Option value="shanghai">芜湖运泰</Option>
                        <Option value="shenzhen">浙江恒生</Option>
                    </Select>
                </Form-item>
                <Form-item label="联系方式">
                    <Input v-model="addStationModel.company_info"
                           type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入..."></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryText: null,
            self: this,
            addModal: false,
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
                    key: 'company_info'
                },
                {
                    title: '操作',
                    key: 'action',
                    render() {
                        return `<Button-group> <i-button @click="delStation" type="ghost" style="color:red">删除</i-button><i-button type="ghost" >编辑</i-button></Button-group>`;
                    }
                }
            ],
            tableContent: [],
            addStationModel:{
                station_name:'',
                city_code:'',
                company_info:'',
                company_name:'',
                city_name:''
            }
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
                this.totalNumber = Number(res.headers['map']['X-Total-Count'][0])
                this.tableContent = res.body;
            });
        },
        changePage: function (pageNumber) {
            this.search(pageNumber);
        },
        delStation() {
            this.$Modal.confirm({
                content: '<h3>确认删除该车站么</h3>',
                onOk: () => {
                    this.$Message.info('删除了车站');
                },
                onCancel: () => {
                    this.$Message.info('取消删除');
                }
            });
        },
        addStation(){

        }
    }
}
</script>