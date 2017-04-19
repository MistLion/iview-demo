<template>
    <Row type="flex" >
        <Col span="4">
        <Menu :theme="theme2"
              :active-name="$route.path"
              :open-names="['/User']"
              width="auto"
              v-on:on-select="jump"
              >
            <Submenu name="/User">
                <template slot="title">
                    <Icon type="ios-people"></Icon>
                    用户管理
                </template>
                <Menu-item name="/User/New">新增用户</Menu-item>
                <Menu-item name="/User/Active">活跃用户</Menu-item>
            </Submenu>
        </Menu>
        </Col>
        <Col span="20" style="padding:0 20px">
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
    },
    methods:{
       jump:function(url){
           this.$router.push(url);
       }
    }
}
</script>
<style scoped>

</style>