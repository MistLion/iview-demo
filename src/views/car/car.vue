<template>
    <div>
        <Breadcrumb style="padding-top:20px">
<Breadcrumb-item href="/">首页</Breadcrumb-item>
<Breadcrumb-item href="/User">直通车管理</Breadcrumb-item>
<Breadcrumb-item>车辆管理</Breadcrumb-item>
</Breadcrumb>
        <Form :label-width="80"
              style="padding:20px 0 0 0;height:100%">
            <Row :gutter="16">
                <Col span="4">
                <Button-group style="float:left">
                    <Button type="ghost"
                            icon="plus"
                            @click="createModal = true">添加</Button>
                </Button-group>
                </Col>

                <Col span="4">
                <Form-item label="单位">
                    <Input v-model="company_name" placeholder="请输入"></Input>
                </Form-item>
                </Col>
                <Col span="4">
                <Form-item label="车型">
                    <Select v-model="car_type">
                        <Option v-for="item in cars_types"
                                :value="item.value"
                                :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="4">
                <Form-item label="状态">
                    <Select v-model="state">
                        <Option v-for="item in status"
                                :value="item.value"
                                :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                </Col>

                <Col span="6">
                <Button-group style="float:right">
                    <Button icon="search"
                            type="info">查询</Button>
                    <Button icon="document"
                            type="primary">导入</Button>
                    <Button icon="document"
                            type="primary">导出</Button>
                </Button-group>
                </Col>
            </Row>
        </Form>

<Table :context="self" :data="carsData" @on-current-change="selectRow" :columns="carsTable" highlight-row stripe></Table>
<div style="margin: 10px;overflow: hidden">
<div style="float: right;">
<Page :total="100" :current="1" @on-change="changePage" show-sizer></Page>
</div>
</div>

        <Modal v-model="createModal"
               title="添加"
               @on-ok="ok"
               @on-cancel="cancel">
            <Form :model="createItem"
                  :label-width="80">
                <Form-item label="所属单位">
                    <Input v-model="createItem.company_name"></Input>
                </Form-item>
                <Form-item label="车型">
                    <Select v-model="createItem.car_type"
                            placeholder="请选择">
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </Form-item>
                <Form-item label="车牌号">
                    <Input v-model="createItem.car_plate"></Input>
                </Form-item>
                <Form-item label="座位数">
                    <Input v-model="createItem.seat_count"></Input>
                </Form-item>
                <Form-item label="司机姓名">
                    <Input v-model="createItem.driver_name"></Input>
                </Form-item>
                <Form-item label="司机手机号">
                    <Input v-model="createItem.driver_mobile"></Input>
                </Form-item>
                <Form-item label="开关">
                    <i-switch v-model="createItem.enabled"
                            size="large">
                        <span slot="open">启用</span>
                        <span slot="close">停用</span>
                    </i-switch>
                </Form-item>
            </Form>
        </Modal>

</div>
</template>

<script>
    export default {
        data() {
            return {
              cars_types:[
                {
                    value: '1',
                    label: '大型'
                },
                {
                    value: '2',
                    label: '中型'
                },
                {
                    value: '3',
                    label: '商务车'
                },
                {
                    value: '4',
                    label: '轿车'
                }],
                status:[
                {
                    value: '1',
                    label: '启用'
                },
                {
                    value: '0',
                    label: '停用'
                }],
                company_name:'',
                car_type:'',
                state:'',

                createItem:
                {
                    company_name:'',
                    car_type:'',
                    car_plate:'',
                    seat_count:'',
                    driver_name:'',
                    driver_mobile:'',
                    enabled:''
                },
                createModal:false,

                self:this,
                carsData: this.mockTableData1(),
                carsTable: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '所属单位',
                        key: 'company_name'
                    },
                    {
                        title: '车辆类型',
                        key: 'car_type'
                    },
                    {
                        title: '车牌号',
                        key: 'car_plate'
                    },
                    {
                        title: '坐席数量',
                        key: 'seat_count'
                    },
                    {
                        title: '司机姓名',
                        key: 'driver'
                    },
                    {
                        title: '司机手机号',
                        key: 'driver_mobile'
                    },
                    {
                        title: '状态',
                        key: 'state',
                        render(row) {
                            const color = row.status == 1 ? 'green' : 'red';
                            const text = row.status == 1 ? '启用' : '停用';
                            return `<tag type="dot" color="${color}">${text}</tag>`;
                        }
                    }]
            }
        },
        methods: {
        ok() {
            this.$Message.info('确认添加');
        },
        cancel() {
            this.$Message.warning('取消添加');
        },
            mockTableData1() {
            },
            changePage() {
                this.carsTable = this.mockTableData1();
            }
        },
    }
</script>