import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from '@geist-ui/react';
import ReactMarkdown from 'react-markdown';
import { Link, useLocation } from 'umi';
import remarkGfm from 'remark-gfm';
// @ts-ignore
import { useRequest } from '@@/plugin-request/request';
import { getBlogDetailById } from '@/services/blog';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Title from 'antd/lib/typography/Title';
import 'github-markdown-css/github-markdown.css';

/**
 * 博客预览组件
 * @param content 预览的内容 markdown 文本
 * @constructor
 */
export const BlogPreview: React.FC<{ content: string }> = ({ content }) => {
  return (
    <>
      <ReactMarkdown
        className={'markdown-body'}
        children={content}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={vs}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h1({ level, children }) {
            return (
              <>
                {React.createElement(
                  'h1',
                  {
                    className: 'article-nav',
                    id: children[0],
                  },
                  children,
                )}
              </>
            );
          },
        }}
      />
    </>
  );
};

// 页面结构
export default (): React.ReactNode => {
  const params = useLocation() as any;

  const blogId = params.query.id;

  let blogData;
  let initLoading = false;
  if (blogId) {
    const { data, loading } = useRequest(() => getBlogDetailById(blogId));
    blogData = data;
    initLoading = loading;
  }

  return (
    <>
      <PageContainer title={'预览'} loading={initLoading}>
        <Card>
          {blogData && <Title level={1}>{blogData.title}</Title>}
          {blogData && <BlogPreview content={blogData.content} />}
          {!blogData && (
            <div>
              请先选择要预览的博客
              <Link to={{ pathname: '/blog/list' }}>去选择</Link>
            </div>
          )}
        </Card>
      </PageContainer>
    </>
  );
};
