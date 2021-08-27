import * as React from "react";
import {PlusOutlined} from "@ant-design/icons/lib";
import {Button, Form, Input, message, Popover} from "antd";
import {addNewCategory} from "@/pages/Blog/BlogService";
import {useState} from "react";

export type CategorySubmitParams = {
  name: string,
  intro: string,
  logo: string
}

type Props = {
  onFresh: () => void
}

// 添加分类标签按钮
const CategoryAddButton: React.FC<Props> = ({onFresh}) => {

  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  // 提交
  const handleSubmit = async (values: CategorySubmitParams) => {

    setAddLoading(true);
    await addNewCategory(values);

    setAddLoading(false);

    onFresh();
    setVisible(false);
    message.success('添加成功');
  }


  // 弹窗布局
  const content = (
    <>

      <Form onFinish={handleSubmit}>


        <Form.Item name={'name'} rules={[{required: true, message: '请输入名称'}]}>
          <Input placeholder={'分类名称'}/>
        </Form.Item>


        <Form.Item name={'intro'} rules={[{required: true, message: '请输入相关说明'}]}>
          <Input.TextArea rows={2} placeholder={'介绍'}/>
        </Form.Item>

        <Form.Item name={'logo'} rules={[{required: true, message: '请输入logo'}]}>
          <Input placeholder={'logo'}/>
        </Form.Item>

        <Button type='primary' htmlType={"submit"} disabled={addLoading} loading={addLoading}>创建</Button>

      </Form>
    </>
  );


  return (
    <>

      <Popover placement="right" title={'新增分类'} content={content} trigger="click" visible={visible}
               onVisibleChange={(visible) => {
                 setVisible(visible);
               }}>
        <Button
          shape='circle'
          type="default"
          icon={<PlusOutlined/>}
        /></Popover>
    </>
  );

}


export default CategoryAddButton;
