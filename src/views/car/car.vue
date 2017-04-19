<template>
    <div>
        <Breadcrumb style="padding-top:20px">
<Breadcrumb-item href="/">首页</Breadcrumb-item>
<Breadcrumb-item href="/User">直通车管理</Breadcrumb-item>
<Breadcrumb-item>车辆管理</Breadcrumb-item>
</Breadcrumb>
<Form :label-width="80" style="padding:20px 0 0 0;height:100%">
<Row :gutter="10">
    <Col span="4">
    <Button-group style="float:left">
<Button icon="compose" type="ghost">导入</Button>
<Button icon="document" type="ghost">导出</Button>
<Button type="ghost" icon="plus" @click="createModal = true">添加</Button>
</Button-group>
</Col>

<Col span="5" offset="3">
<Form-item label="单位">
    <Select v-model="company_code">
                        <Option v-for="item in companys"
                                :value="item.company_code"
                                :key="item">{{ item.company_name }}</Option>
                    </Select>
</Form-item>
</Col>
<Col span="5">
<Form-item label="车型">
    <Select v-model="car_type">
                        <Option v-for="item in cars_types"
                                :value="item.value"
                                :key="item">{{ item.label }}</Option>
                    </Select>
</Form-item>
</Col>
<Col span="5">
<Form-item label="状态">
    <Select v-model="state">
                        <Option v-for="item in status"
                                :value="item.value"
                                :key="item">{{ item.label }}</Option>
                    </Select>
</Form-item>
</Col>

<Col span="2">
<Button-group style="float:right">

<Button icon="search" type="ghost" @click="search(1)">查询</Button>
</Button-group>
</Col>
</Row>
</Form>

<Table :context="self" :data="carsData" :columns="carsTable" highlight-row stripe></Table>
<div style="margin: 10px;overflow: hidden">
<div style="float: right;">
<Page :total="totalNumber" :current="currentPage" :page-size="pageSize" v-on:on-change="changePage" v-on:on-page-size-change="changePageSize"
    show-sizer></Page>
</div>
</div>

<Modal v-model="createModal" title="添加" @on-ok="addCar" @on-cancel="$Message.info('取消添加');">
    <Form :model="createItem" :label-width="80">
        <Form-item label="所属单位">
            <Select v-model="createItem.company_code" placeholder="请选择">
                        <Option v-for="item in companys"
                                :value="item.company_code"
                                :key="item">{{ item.company_name }}</Option>
            </Select>
        </Form-item>
        <Form-item label="车型">
            <Select v-model="createItem.car_type" placeholder="请选择">
                        <Option v-for="item in cars_types"
                                :value="item.value"
                                :key="item">{{ item.label }}</Option>
                    </Select>
        </Form-item>
        <Form-item label="车牌号">
            <Input v-model="createItem.car_plate"></Input>
        </Form-item>
        <Form-item label="座位数">
            <Input v-model="createItem.seat_count"></Input>
        </Form-item>
        <Form-item label="司机姓名">
            <Input v-model="createItem.driver"></Input>
        </Form-item>
        <Form-item label="司机手机号">
            <Input v-model="createItem.driver_mobile"></Input>
        </Form-item>
        <Form-item label="状态">
            <i-switch v-model="createItem.state" size="large">
                <span slot="open" :value="1">启用</span>
                <span slot="close" :value="0">停用</span>
            </i-switch>
        </Form-item>
    </Form>
</Modal>

<Modal v-model="editModal" title="编辑车辆" @on-ok="editCar" @on-cancel="$Message.info('取消编辑');">
    <Form :model="editItem" :label-width="80">
        <Form-item label="所属单位">
            <Select v-model="editItem.company_code" placeholder="请选择">
                        <Option v-for="item in companys"
                                :value="item.company_code"
                                :key="item">{{ item.company_name }}</Option>
            </Select>
        </Form-item>
        <Form-item label="车型">
            <Select v-model="editItem.car_type" placeholder="请选择">
                        <Option v-for="item in cars_types"
                                :value="item.value"
                                :key="item">{{ item.label }}</Option>
                    </Select>
        </Form-item>
        <Form-item label="车牌号">
            <Input v-model="editItem.car_plate"></Input>
        </Form-item>
        <Form-item label="座位数">
            <Input v-model="editItem.seat_count"></Input>
        </Form-item>
        <Form-item label="司机姓名">
            <Input v-model="editItem.driver"></Input>
        </Form-item>
        <Form-item label="司机手机号">
            <Input v-model="editItem.driver_mobile"></Input>
        </Form-item>
        <Form-item label="状态">
            <i-switch v-model="editItem.state" size="large">
                <span slot="open">启用</span>
                <span slot="close">停用</span>
            </i-switch>
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
                companys: [],
                cars_types: [
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
                status: [
                    {
                        value: '1',
                        label: '启用'
                    },
                    {
                        value: '0',
                        label: '停用'
                    }
                ],

                //条件查询
                company_code: '',
                car_type: '',
                state: '',

                //添加model
                createItem:
                {
                    company_code: '',
                    car_type: '',
                    car_plate: '',
                    seat_count: '',
                    driver: '',
                    driver_mobile: '',
                    state: '1'
                },
                createModal: false,

                editModal: false,
                editItem: {},

                self: this,
                pageSize: 10,
                totalNumber: 10,
                currentPage: 1,

                carsData: [],
                carsTable: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '所属单位',
                        key: 'company'
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
                            const color = row.state ? 'green' : 'red';
                            const text = row.state  ? '启用' : '停用';
                            return `<tag type="dot" color="${color}">${text}</tag>`;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render(row, column, index) {
                            return `<Button-group> <i-button @click="delCar(${row.id})" type="ghost" style="color:red">删除</i-button><i-button  @click="editCarShow(row)"  type="ghost" >编辑</i-button></Button-group>`;
                        }
                    }
                ]
            }
        },
        methods: {
            search(pageNumber) {
                var params = {};
                params["_page"] = pageNumber;
                params["_limit"] = this.pageSize;
                if (this.company_code != '') {
                    params["company_code"] = this.company_code;
                }
                if (this.car_type != '') {
                    params["car_type"] = this.car_type;
                }
                if (this.state != '') {

                    params["state"] = this.state;
                }
                this.$http.get('http://localhost:3000/cars', {
                    params: params
                }).then((res) => {
                    this.totalNumber = Number(res.headers['map']['X-Total-Count'][0]);
                    this.currentPage = pageNumber;
                    var that = this;
                    this.carsData = Linq.from(res.body).select(v => {
                        return {
                            id: v.id,
                            company_code:v.company_code,
                            company: Linq.from(that.companys).singleOrDefault('x=>x.company_code=="' + v.company_code + '"').company_name,
                            car_type: v.car_type,
                            car_plate: v.car_plate,
                            seat_count: v.seat_count,
                            driver: v.driver,
                            driver_mobile: v.driver_mobile,
                            state: v.state=="1"
                        }
                    }).toArray();
                });

            },
            changePage: function (pageNumber) {
                this.search(pageNumber);
            },
            delCar(id) {
                this.$Modal.confirm({
                    content: '<h3>确认删除该车辆吗？</h3>',
                    onOk: () => {
                        this.$http.delete('http://localhost:3000/cars/' + id
                        ).then((res) => {
                            this.$Message.info('删除了车辆');
                            this.search(1);
                        });
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
                    }
                });
            },

            addCar() {
                this.$http.post('http://localhost:3000/cars', {
                    company_code: this.createItem.company_code,
                    car_type: this.createItem.car_type,
                    car_plate: this.createItem.car_plate,
                    seat_count: this.createItem.seat_count,
                    driver: this.createItem.driver,
                    driver_mobile: this.createItem.driver_mobile,
                    state: this.createItem.state?"1":"0"
                }).then((res) => {
                    this.$Message.success('添加成功');
                    this.search(1);
                }, (res) => {
                    this.$Message.error('添加失败:' + res.body);
                })
                this.createItem = {
                    company_code: '',
                    car_type: '',
                    car_plate: '',
                    seat_count: '',
                    driver: '',
                    driver_mobile: '',
                    state: ''
                };
            },
            editCarShow: function (car) {
                this.editModal = true;
                this.editItem = car;
            },
            editCar: function () {
                this.$http.put('http://localhost:3000/cars/' + this.editItem.id, {
                    company_code: this.editItem.company_code,
                    car_type: this.editItem.car_type,
                    car_plate: this.editItem.car_plate,
                    seat_count: this.editItem.seat_count,
                    driver: this.editItem.driver,
                    driver_mobile:this.editItem.driver_mobile,
                    state:this.editItem.state
                }).then((res) => {
                    this.$Message.success('编辑成功');
                    this.search(1);
                }, (res) => {
                    this.$Message.error('编辑失败:' + res.body);
                })
            }
        },
        mounted: function () {
            this.$http.get('http://localhost:3000/companys'
            ).then((res) => {
                this.companys = res.body;
            });
            this.search(1);
        }
    }
</script>