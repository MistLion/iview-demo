<template>
    <div style="">
        <Form :label-width="80"
              style="padding:20px 0 0 0;height:100%">
            <Row :gutter="16">
                <Col span="6">
                <Form-item label="选择城市">
                    <Select v-model="model1">
                        <Option v-for="item in cityList"
                                :value="item.value"
                                :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="选择车站">
                    <Select v-model="model2">
                        <Option v-for="item in stationList"
                                :value="item.value"
                                :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="选择日期">
                    <Date-picker type="daterange"
                                 placement="bottom-end"
                                 placeholder="选择日期"></Date-picker>
                </Form-item>
                </Col>
                <Col span="6">
                <Button-group style="float:right">
                    <Button type="ghost"
                            icon="plus"
                            @click="modal1 = true">添加</Button>
                    <Button type="ghost"
                            icon="trash-b"  :disabled="canRemove" @click="removeRow">删除</Button>
                    <Button icon="search"
                            loading
                            type="info">查询</Button>
                    <Button icon="document"
                            type="primary">导出</Button>
                </Button-group>
                </Col>
            </Row>
            <Row v-bind:style="{display:showHidden}"
                 :gutter="16">
                <Col span="6">
                <Form-item label="选择城市">
                    <Select v-model="model1">
                        <Option v-for="item in cityList"
                                :value="item.value"
                                :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="选择车站">
                    <Select v-model="model2">
                        <Option v-for="item in stationList"
                                :value="item.value"
                                :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="选择日期">
                    <Date-picker type="daterange"
                                 placement="bottom-end"
                                 placeholder="选择日期"></Date-picker>
                </Form-item>
                </Col>
                <Col span="6">
                <Button-group style="float:right">
                    <Button icon="search"
                            loading
                            type="info">查询</Button>
                    <Button icon="document"
                            type="primary">导出</Button>
                </Button-group>
                </Col>
            </Row>
        </Form>
        <div class="example-code-more"><i v-bind:style="{display:notShowHidden}"
               v-on:click="show"
               class="ivu-icon ivu-icon-ios-arrow-down"></i> <i class="ivu-icon ivu-icon-ios-arrow-up"
               v-on:click="show"
               v-bind:style="{display:showHidden}"></i>
        </div>
        <Table :context="self"
               :data="tableData1"
               @on-current-change="selectRow"
               :columns="tableColumns1"
               highlight-row
               stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100"
                      :current="1"
                      @on-change="changePage"
                      show-sizer></Page>
            </div>
        </div>
        <Modal v-model="modal1"
               title="添加"
               @on-ok="ok"
               @on-cancel="cancel">
            <Form :model="formItem"
                  :label-width="80">
                <Form-item label="输入框">
                    <Input v-model="formItem.input"
                           placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="选择器">
                    <Select v-model="formItem.select"
                            placeholder="请选择">
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </Form-item>
                <Form-item label="日期控件">
                    <Row>
                        <Col span="11">
                        <Date-picker type="date"
                                     placeholder="选择日期"
                                     v-model="formItem.date"></Date-picker>
                        </Col>
                        <Col span="2"
                             style="text-align: center">-</Col>
                        <Col span="11">
                        <Time-picker type="time"
                                     placeholder="选择时间"
                                     v-model="formItem.time"></Time-picker>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="单选框">
                    <Radio-group v-model="formItem.radio">
                        <Radio label="male">男</Radio>
                        <Radio label="female">女</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="多选框">
                    <Checkbox-group v-model="formItem.checkbox">
                        <Checkbox label="吃饭"></Checkbox>
                        <Checkbox label="睡觉"></Checkbox>
                        <Checkbox label="跑步"></Checkbox>
                        <Checkbox label="看电影"></Checkbox>
                    </Checkbox-group>
                </Form-item>
                <Form-item label="开关">
                    <Switch v-model="formItem.switch"
                            size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </Switch>
                </Form-item>
                <Form-item label="滑块">
                    <Slider v-model="formItem.slider"
                            range></Slider>
                </Form-item>
                <Form-item label="文本域">
                    <Input v-model="formItem.textarea"
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
            selectedRow:null,
            formItem: {
                input: '',
                select: '',
                radio: 'male',
                checkbox: [],
                switch: true,
                date: '',
                time: '',
                slider: [20, 50],
                textarea: ''
            },
            modal1: false,
            showHidden: 'none',
            notShowHidden: 'block',
            cityList: [
                {
                    value: 'beijing',
                    label: '北京市'
                },
                {
                    value: 'shanghai',
                    label: '上海市'
                },
                {
                    value: 'shenzhen',
                    label: '深圳市'
                },
                {
                    value: 'hangzhou',
                    label: '杭州市'
                },
                {
                    value: 'nanjing',
                    label: '南京市'
                },
                {
                    value: 'chongqing',
                    label: '重庆市'
                }
            ],
            stationList: [
                {
                    value: 'beijing',
                    label: '北京车站'
                },
                {
                    value: 'shanghai',
                    label: '上海车站'
                },
                {
                    value: 'shenzhen',
                    label: '深圳车站'
                },
                {
                    value: 'hangzhou',
                    label: '杭州车站'
                },
                {
                    value: 'nanjing',
                    label: '南京车站'
                },
                {
                    value: 'chongqing',
                    label: '重庆车站'
                }
            ],
            model1: '',
            model2: '',
            self: this,
            tableData1: this.mockTableData1(),
            tableColumns1: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '状态',
                    key: 'status',
                    render(row) {
                        const color = row.status == 1 ? 'blue' : row.status == 2 ? 'green' : 'red';
                        const text = row.status == 1 ? '构建中' : row.status == 2 ? '构建完成' : '构建失败';
                        return `<tag type="dot" color="${color}">${text}</tag>`;
                    }
                },
                {
                    title: '画像内容',
                    key: 'portrayal',
                    render(row, column, index) {
                        return `<Poptip trigger="hover" title="${row.portrayal.length}个画像" placement="bottom">
                                        <tag>${row.portrayal.length}</tag>
                                        <div slot="content">
                                            <ul><li v-for="item in tableData1[${index}].portrayal" style="text-align: center;padding: 4px">{{ item }}</li></ul>
                                        </div>
                                    </Poptip>`;
                    }
                },
                {
                    title: '选定人群数',
                    key: 'people',
                    render(row, column, index) {
                        return `<Poptip trigger="hover" title="${row.people.length}个客群" placement="bottom">
                                        <tag>${row.people.length}</tag>
                                        <div slot="content">
                                            <ul><li v-for="item in tableData1[${index}].people" style="text-align: center;padding: 4px">{{ item.n }}：{{ item.c }}人</li></ul>
                                        </div>
                                    </Poptip>`;
                    }
                },
                {
                    title: '取样时段',
                    key: 'time',
                    render(row) {
                        return `近${row.time}天`
                    }
                },
                {
                    title: '更新时间',
                    key: 'update',
                    render(row, column, index) {
                        return `{{ formatDate(tableData1[${index}].update) }}`;
                    }
                }
            ]
        }
    },
    methods: {
        removeRow(){
            this.tableData1.splice(this.tableData1.indexOf(this.selectedRow),1);
        },
        selectRow(currentRow,oldCurrentRow){
            this.selectedRow=currentRow;
        },
        ok() {
            this.$Message.info('确认添加');
        },
        cancel() {
            this.$Message.warning('取消添加');
        },
        show: function () {
            this.showHidden = this.showHidden == "none" ? "block" : "none";
            this.notShowHidden = this.notShowHidden == "none" ? "block" : "none";
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        mockTableData1() {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    name: '商圈' + Math.floor(Math.random() * 100 + 1),
                    status: Math.floor(Math.random() * 3 + 1),
                    portrayal: ['城市渗透', '人群迁移', '消费指数', '生活指数', '娱乐指数'],
                    people: [
                        {
                            n: '客群' + Math.floor(Math.random() * 100 + 1),
                            c: Math.floor(Math.random() * 1000000 + 100000)
                        },
                        {
                            n: '客群' + Math.floor(Math.random() * 100 + 1),
                            c: Math.floor(Math.random() * 1000000 + 100000)
                        },
                        {
                            n: '客群' + Math.floor(Math.random() * 100 + 1),
                            c: Math.floor(Math.random() * 1000000 + 100000)
                        }
                    ],
                    time: Math.floor(Math.random() * 7 + 1),
                    update: new Date()
                })
            }
            return data;
        },
        formatDate(date) {
            const y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        },
        changePage() {
            // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
            this.tableData1 = this.mockTableData1();
        }
    },
    computed:{
        canRemove:function(){
            return this.selectedRow==null;
        }
    }
}
</script>
<style>
.example-code-more {
    text-align: center;
    cursor: pointer;
    padding: 5px 0;
}
</style>