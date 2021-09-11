import React from 'react';
import { Tag } from 'antd';
import { useRequest } from '@umijs/hooks';
import { Category } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import Api from '@/utils/request';

/**
 * 博客分类组件
 * @constructor
 */
const BlogCategorys: React.FC<{
  onSelect: (item: Category) => void;
  current: Category | undefined;
}> = (props) => {
  const { data, loading, error } = useRequest(() => Api.getInstance().getBlogCategorys());

  if (loading) {
    return <div>正在加载分类...</div>;
  }

  if (error) {
    return <div>加载失败:{error}</div>;
  }

  const list = data.data as Category[];

  return (
    <div>
      {list.map((item) => (
        <Tag
          key={item.id}
          onClick={() => {
            props.onSelect(item);
          }}
          color={props.current && props.current.id == item.id ? 'blue' : undefined}
        >
          {item.name}
        </Tag>
      ))}
    </div>
  );
};

export default BlogCategorys;
