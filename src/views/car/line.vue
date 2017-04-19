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
                    <Select v-model="company_code">
                        <Option v-for="item in companys"
                                :value="item.company_code"
                                :key="item">{{ item.company_name }}</Option>
                    </Select>
                </Form-item>
                </Col>
                 <Col span="4">
                <Form-item label="班次类型">
                    <Select v-model="company_code">
                        <Option v-for="item in companys"
                                :value="item.company_code"
                                :key="item">{{ item.company_name }}</Option>
                    </Select>
                </Form-item>
                </Col>
                 <Col span="4">
                <Form-item label="线路状态">
                    <Select v-model="company_code">
                        <Option v-for="item in companys"
                                :value="item.company_code"
                                :key="item">{{ item.company_name }}</Option>
                    </Select>
                </Form-item>
                </Col>
                 <Col span="5">
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
    
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>