import React, { useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { PageContainer } from '@ant-design/pro-layout';
import styles from '../../style.less';
import { Spacer } from '@geist-ui/react';
import { Button, Card, Input, message, Modal } from 'antd';
import BlogCategorys from '@/pages/Components/BlogCategorys';
import { Category } from '@/services/models/BlogPushNewResultData';
import TagListInputEdit from '@/pages/Components/TagListInput';
import { getBlogDetailById, pushNewBlog } from '@/services/blog';
import PushNewBlogParams from '@/services/models/PushNewBlogParamsModel';
import { useLocation } from 'umi';
import { useMount } from '@umijs/hooks';
import { BlogObject } from '@/pages/Blog/components/list/DATA';

export default (): React.ReactNode => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<Category | undefined>();
  const [blogTags, setBlogTags] = useState<string[]>([]);
  const [markdown, setMarkdown] = useState<string>('');
  const [showOkDialog, setShowOkDialog] = useState<boolean>(false);
  const [alias, setAlias] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');

  // 博客id
  const {
    query: { id },
  } = useLocation() as any;

  // 组件渲染完毕生命周期
  useMount(async () => {
    console.log('组件 mount');
    if (id) {
      const response = await getBlogDetailById(id);
      if (response.state === 200) {
        const blog = response.data as BlogObject;
        console.log(blog);
        setMarkdown(blog.content);
        setTitle(blog.title);
        setAlias(blog.alias ?? '');
        setThumbnail(blog.thumbnail ?? '');
        setCategory(blog.category);
        let tags = blog.tags;
        const filterTag = tags.map<string>((value) => value.name) as string[];
        setBlogTags(filterTag);
      }
    }
  });

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
    if (title === '') {
      message.error('标题不能为空');
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
    if (id) {
      param.id = id;
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
            <span>文章标题</span>
            <Input id="blog-title" placeholder="文章标题" value={title} onChange={titleChanged} />

            <Spacer />
            <span>正文内容</span>

            <MarkdownEditor
              height={400}
              value={markdown}
              onChange={(editor: any, data: any, value: string) => setMarkdown(value)}
            />

            <Spacer />
            <span>选择分类</span>
            <BlogCategorys
              current={category}
              onSelect={(item) => {
                setCategory(item);
              }}
            />

            <Spacer />
            <span>添加文章标签</span>
            <TagListInputEdit onChange={tagsChanged} value={blogTags} />

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
