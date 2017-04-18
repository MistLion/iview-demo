<template>
    <Row type="flex">
        <Col span="4">
        <Menu :theme="theme2"
              active-name="/Car/Car"
              width="auto"
              v-on:on-select="jump">
            <Menu-item name="/Car/Car">
                <Icon type="android-car"></Icon>
                车辆管理
            </Menu-item>
            <Menu-item name="/Car/Station">
                <Icon type="earth"></Icon>
                车站管理
            </Menu-item>
            <Menu-item name="/Car/Line">
                <Icon type="ios-shuffle-strong"></Icon>
                线路管理
            </Menu-item>
            <Menu-item name="/Car/Class">
                <Icon type="android-train"></Icon>
                班次管理
            </Menu-item>
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
    },
    methods: {
        jump: function (url) {
            this.$router.push(url);
        }
    }
}
</script>
<style scoped>

</style>