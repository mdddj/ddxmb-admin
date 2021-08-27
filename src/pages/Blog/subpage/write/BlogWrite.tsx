import React, { useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { PageContainer } from '@ant-design/pro-layout';
import styles from '../../style.less';
import { Spacer } from '@geist-ui/react';
import { Button, Card, Input, message, Modal } from 'antd';
import BlogCategorys from '@/pages/Components/BlogCategorys';
import { Category } from '@/services/models/BlogPushNewResultData';
import TagListInputEdit from '@/pages/Components/TagListInput';
import { pushNewBlog } from '@/services/blog';
import PushNewBlogParams from '@/services/models/PushNewBlogParamsModel';



export default (): React.ReactNode => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<Category | undefined>();
  const [blogTags, setBlogTags] = useState<string[]>([]);
  const [markdown, setMarkdown] = useState<string>('');
  const [showOkDialog, setShowOkDialog] = useState<boolean>(false);
  const [alias, setAlias] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');




  /**
   * 标题输入被改变
   * @param e
   */
  const titleChanged = (e: any) => {
    const val = e.target.value;
    setTitle(val);
  };

  /**
   * 标签列表数据被改变事件
   * @param tags  新的标签
   */
  const tagsChanged = (tags: string[]) => {
    setBlogTags(tags);
  };

  /**
   * 发布博客
   */
  const submit = async () => {
    if (title === '' || title.length > 40) {
      message.error('标题不能为空且不能超过40个字符');
      return;
    }
    if (!category) {
      message.error('请选择分类');
      return;
    }
    if (blogTags.length == 0) {
      message.error('请输入标签');
      return;
    }
    setShowOkDialog(true);
  };

  /**
   * 立即发布
   */
  const onOk = async () => {
    const param = new PushNewBlogParams(title, markdown, blogTags, category!.id);
    if (thumbnail !== '') {
      param.thumbnail = thumbnail;
    }
    if (alias !== '') {
      param.alias = alias;
    }
    const result = await pushNewBlog(param);
    if (result.state == 200) {
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  };

  return (
    <>
      <PageContainer title={'发布博客'}>
        <Card>
          <form className={styles.container}>
            <text>文章标题</text>
            <Input id="blog-title" placeholder="文章标题" value={title} onChange={titleChanged} />

            <Spacer />
            <text>正文内容</text>

            <MarkdownEditor
              height={400}
              value={markdown}
              onChange={(editor, data, value) => setMarkdown(value)}
            />

            <Spacer />
            <text>选择分类</text>
            <BlogCategorys
              current={category}
              onSelect={(item) => {
                setCategory(item);
              }}
            />

            <Spacer />
            <text>添加文章标签</text>
            <TagListInputEdit onChange={tagsChanged} />

            <Spacer />
            <Button type="primary" onClick={submit}>
              立即发布
            </Button>
          </form>
        </Card>
      </PageContainer>

      {/* 发布的弹窗 */}
      <Modal
        title={'发布博客'}
        visible={showOkDialog}
        okText={'立即发布'}
        onCancel={() => setShowOkDialog(false)}
        onOk={onOk}
      >
        <Input
          placeholder={'添加文章头图url链接(选填)'}
          onChange={(event) => {
            setThumbnail(event.target.value);
          }}
        />
        <Spacer />
        <Input
          placeholder={'设置文字快速访问关键字(选填)'}
          onChange={(event) => {
            setAlias(event.target.value);
          }}
        />
      </Modal>
    </>
  );
};
