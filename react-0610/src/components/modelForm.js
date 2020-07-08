import React, { useState, useEffect, useContext,memo  } from 'react';
import { Modal, Form, Input, DatePicker, Button, Switch, InputNumber } from 'antd';
import { MyContext } from '../content-manager';
import moment from 'moment';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};

export default  memo((props) => {
    const {setVisible,choose,editDate } = useContext(MyContext);
    const [form] = Form.useForm();
    useEffect(()=>{
        console.log(props.data)

    },[props.data])
    return (
        <Modal
            title="编辑"
            visible={props.visible}
            onOk={() => {
                form.submit();
            }}
            onCancel={() => {
                setVisible(false);
            }}
            okText="确认"
          cancelText="取消"
        >{
            choose&&<Form form={form} {...layout} onFinish={(values) => {
                choose.name=values.name;
                choose.tags=values.count;
                choose.time=values.meetingDate.valueOf();
                console.log(values.meetingDate)
                choose.state=values.state;
                setVisible(false);
                editDate(choose);

            }}>

                <Form.Item
                    name="name"
                    label="会议名称"
                    rules={[{ required: true, message: '会议名称不能为空' }]}
                >
                    <Input defaultValue={choose.name}/>
                </Form.Item>
                <Form.Item name="count" label="参会人数">
                    <Input type="tags" defaultValue={choose.tags} />
                </Form.Item>
                <Form.Item name="state" label="会议状态">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item label="会议日期" name='meetingDate'>
          <DatePicker />
        </Form.Item>
            </Form>
        }
            
        </Modal>
    )
})