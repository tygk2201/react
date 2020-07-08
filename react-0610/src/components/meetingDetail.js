import React, { useState, useEffect, useContext, } from 'react';
import { Modal, Form, Input, DatePicker, Button, Switch, InputNumber, Descriptions } from 'antd';
import { MyContext } from '../content-manager';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};
export default (props) => {
    const { setShowDetail } = useContext(MyContext);
    const item = props.data;
    return (
        <Modal
            title="详情"
            visible={props.visible}
            onOk={() => {
                // form.submit();
                setShowDetail(false);
            }}
            onCancel={() => {
                setShowDetail(false);
            }}
            okText="确认"
            cancelText="取消"
        >{
            item&&<Descriptions size='default' span={1} column={1} bordered>
            <Descriptions.Item label="会议室名称">{item.name}</Descriptions.Item>
            <Descriptions.Item label="日期">{item.name}</Descriptions.Item>
            <Descriptions.Item label="会议室时间">{item.time}</Descriptions.Item>
            <Descriptions.Item label="会议状态">{item.state}</Descriptions.Item>
            <Descriptions.Item label="会场">{item.address}</Descriptions.Item>
            <Descriptions.Item label="参会人数">{item.tags}</Descriptions.Item>
        </Descriptions>
        }        
        </Modal>
    )

}