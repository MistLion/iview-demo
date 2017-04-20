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
              style="padding:20px 0 0 0;height:100%">
            <Row :gutter="16">
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
                <Form-item label="班次状态">
                    <Select v-model="state">
                        <Option :value="0">全部</Option>
                        <Option :value="1">运行</Option>
                        <Option :value="2">停运</Option>
                    </Select>
                </Form-item>
                </Col>
                 <Col span="5">
                <Form-item label="模糊查询">
                    <Input v-model="queryText"
                           placeholder="出发站点/出发城市/到达站点/到达城市/线路编号"></Input>
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