<template>
    <div style="padding:20px 0;">
        <Form :label-width="80">
            <Row :gutter="32">
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
                <Button type="success"
                        long>确认提交</Button>
                </Col>
            </Row>
        </Form>
        <Table :context="self"
               :data="tableData1"
               :columns="tableColumns1"
               stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100"
                      :current="1"
                      @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
    }
}
</script>
<style>
label{
    font-size:14px !important
}
</style>