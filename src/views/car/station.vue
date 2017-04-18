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
                <Col span="3">
                <Button-group style="float:left">
                    <Button icon="compose"
                            type="success">导入</Button>
                    <Button icon="document"
                            type="primary">导出</Button>
                </Button-group>
                </Col>
                <Col span="6">
                <Form-item label="模糊查询">
                    <Input v-model="queryText"
                           placeholder="请输入车站或城市名称"></Input>
                </Form-item>
                </Col>
                <Col span="3"
                     offset="12">
                <Button-group style="float:right">
                    <Button type="ghost"
                            icon="plus"
                            @click="modal1 = true">添加</Button>
                    <Button icon="search"
                            type="info"
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryText:null,
            self: this,
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
                        return `<Button-group> <i-button type="error" >删除</i-button><i-button type="info" >编辑</i-button></Button-group>`;
                    }
                }
            ],
            tableContent: []
        }
    }
    ,
    methods: {
        search(pageNumber) {
            this.$http.get('http://localhost:3000/stations',{
                params:{
                    _page:pageNumber,
                    _limit:this.pageSize,
                    q:this.queryText||''
                }
            } ).then((res) => {
                this.totalNumber =Number(res.headers['map']['X-Total-Count'][0]) 
                this.tableContent = res.body;
            });
        },
        changePage:function(pageNumber) {
            this.search(pageNumber);
        }
    }
}
</script>