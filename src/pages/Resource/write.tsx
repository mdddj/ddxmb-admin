import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Button, Card, DatePicker, Form, Input } from 'antd';
import MarkdownEditor from '@uiw/react-markdown-editor';
import moment from 'moment';
import { ResourceModel } from '@/entrys/ResourceModel';
import ResCategorySelect from '@/widgets/ResCategorySelect';
import { ResCategory } from '@/entrys/ResCategory';
import Api from '@/utils/request';
import { simpleHandleResultMessage } from 'dd_server_api_web/apis/utils/ResultUtil';

/**
 * 发布资源页面
 * @constructor
 */
const WriteResourcePage: React.FC = () => {
  // 正文内容
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<ResCategory>();

  const submit = async (values: ResourceModel) => {
    console.log(values);
    values.content = content;
    if (category) {
      values.category = category;
    }
    const result = await Api.getInstance().saveOrUpdateResourcesModel(values);
    await simpleHandleResultMessage(result);
  };

  return (
    <PageContainer title={'发布资源'}>
      <Card bordered={false}>
        <Form layout={'vertical'} onFinish={submit}>
          <Form.Item label={'输入标题'} name={'title'} help={'可选'}>
            <Input />
          </Form.Item>
          <Form.Item label={'正文内容 (必填)'}>
            <MarkdownEditor
              height={100}
              value={content}
              onChange={(_: any, __: any, value: string) => setContent(value)}
            />
          </Form.Item>
          <Form.Item label={'填写额外信息'}>
            <Card bordered={false}>
              <Card.Grid style={{ width: '25%' }} hoverable={true}>
                <Form.Item
                  label={'标签'}
                  name={'label'}
                  tooltip={'多个标签用英文,号分割. 例子: test,test1,test2'}
                  help={'可选'}
                >
                  <Input />
                </Form.Item>
              </Card.Grid>
              <Card.Grid style={{ width: '25%' }} hoverable={true}>
                <Form.Item label={'缩略图'} name={'thumbnailImage'} help={'可选'}>
                  <Input />
                </Form.Item>
              </Card.Grid>
              <Card.Grid style={{ width: '25%' }} hoverable={true}>
                <Form.Item label={'发布时间'} name={'createDate'} help={'可选'}>
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  />
                </Form.Item>
              </Card.Grid>
              <Card.Grid style={{ width: '25%' }} hoverable={true}>
                <Form.Item label={'最后修改时间'} name={'updateDate'} help={'可选'}>
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  />
                </Form.Item>
              </Card.Grid>
              <Card.Grid style={{ width: '25%' }} hoverable={true}>
                <Form.Item label={'额外描述'} name={'description'} help={'可选'}>
                  <Input />
                </Form.Item>
              </Card.Grid>
              <Card.Grid style={{ width: '25%' }} hoverable={true}>
                <Form.Item
                  label={'相关链接'}
                  name={'links'}
                  tooltip={'多个用英文逗号分割'}
                  help={'可选'}
                >
                  <Input />
                </Form.Item>
              </Card.Grid>
              <Card.Grid style={{ width: '25%' }} hoverable={true}>
                <Form.Item label={'类型'} name={'type'} tooltip={'必填项,资源类型'} help={'必填'}>
                  <Input />
                </Form.Item>
              </Card.Grid>
              <Card.Grid style={{ width: '25%' }} hoverable={true}>
                <Form.Item
                  label={'点击量'}
                  name={'clickCount'}
                  tooltip={'资源点击量'}
                  help={'可选'}
                  initialValue={0}
                >
                  <Input />
                </Form.Item>
              </Card.Grid>
            </Card>
          </Form.Item>
          <Form.Item label={'投放分类'} tooltip={'也就是群组分类'}>
            <ResCategorySelect onSelect={setCategory} current={category} />
          </Form.Item>
          <Form.Item>
            <Button htmlType={'submit'} type={'primary'}>
              发布
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default WriteResourcePage;
