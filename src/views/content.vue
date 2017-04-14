<template>
    <Row>
        <Col span="4">
        <Menu :theme="theme2"
              active-name="1-2"
              :open-names="['1']"
              width="auto"
              >
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    内容管理
                </template>
                <Menu-item name="1-1">文章管理</Menu-item>
                <Menu-item name="1-2">评论管理</Menu-item>
                <Menu-item name="1-3">举报管理</Menu-item>
            </Submenu>
        </Menu>
        </Col>
        <Col span="20">
        <router-view></router-view>
        </Col>    
    </Row>
</template>
<script>
export default {
    data() {
        return {
            theme2: 'light'
        }
    }
}
</script>
<style scoped>

</style>