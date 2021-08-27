import * as React from "react";
import {Form,Input, notification} from "antd";
import 'pivotal-ui/css/alignment';
import Title from "antd/lib/typography/Title";
import {useRecoilState} from "recoil";
import {BlogTags} from "@/pages/Blog/subpage/write/BlogWrite";
import BraftEditor, {EditorState} from "braft-editor";
import 'braft-editor/dist/index.css';
import {Button, Card} from "@geist-ui/react";
import {useState} from "react";
import {useModel} from "@@/plugin-model/useModel";
import PushNewBlogParamsModel from "@/services/models/PushNewBlogParamsModel";
import {pushNewBlog} from "@/services/blog";
import ResultSuccessDialog from "@/dialogs/ResultSuccessDialog";

type FormProps = {
  title: string;
}


const WriteRightLayout: React.FC = () => {

  const [form] = Form.useForm();

  const [showModal,setShowModal] = useState<boolean>(false);

  const [tags,setTags] = useRecoilState<string[]>(BlogTags);
  const [content, setContent] = useState<string>('');
  const categoryModel = useModel('category_model');


  //发布
  const onFinish = async (values: FormProps) => {


    const {title} = values;
    const categoryId = categoryModel.currentSelect?.id
    if (!categoryId) {
      notification.warning({message: `警告`, description: '请选择分类'});
      return;
    }
    if (content.length < 100) {
      notification.warning({message: `警告`, description: '正文内容太少'});
      return;
    }

    const params: PushNewBlogParamsModel = new PushNewBlogParamsModel(title, content, tags, categoryId);
    const result = await pushNewBlog(params);
    console.log(result);

    if(result && result.state==200){
      setShowModal((o)=>true);
      resetData();
    }

  }

  // 富文本编辑器值被改变
  const editChange = (editorState: EditorState) => {
    setContent(editorState.toHTML());
  }

  // 验证标题
  const titleValidator = (_: any, value: string) => {
    if (!value || value == "") {
      notification.warning({message: `警告`, description: '请输入标题'});
      return Promise.reject("缺少标题");
    }
    return Promise.resolve();
  }

  // 清空发布数据
  const resetData = () => {
    setContent((p1)=>"");// 清空正文内容
    form.resetFields();
    categoryModel.setCurrentSelectCategory(undefined);
    setTags([]);
  }


  return (
    <>
      <Card>
        <Title level={2}>发布文章</Title>
        <div style={{marginTop: '20px'}}/>
        <Form form={form} onFinish={async (values) => await onFinish(values as FormProps)} layout='horizontal'>

          <Form.Item label={'文章标题'} name={'title'} rules={[{validator: titleValidator}]}>
            <Input/>
          </Form.Item>

          <Form.Item label={'文章正文'} name={'content'}>
            <Card hoverable={true}>
              <BraftEditor
                onChange={editChange}
                placeholder="请输入正文内容"
              />
            </Card>
          </Form.Item>

          <Form.Item className='txt-c'>
            <Button htmlType='submit' type="success">提交</Button>
          </Form.Item>

        </Form>

      </Card>

      <ResultSuccessDialog handleClose={() => {
        console.log("关闭")
        setShowModal((oldValue)=>false);
      }} isShow={showModal} title={'提交成功'} message={'你的博客已经成功发布'}/>

    </>
  );
}

export default WriteRightLayout;
