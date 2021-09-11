import React, { useState } from 'react';
import { Button, Input, Tag } from 'antd';
import { CheckCircleFilled, PlusOutlined } from '@ant-design/icons';
// @ts-ignore
import { useRequest } from '@@/plugin-request/request';
import Api from '@/utils/request';

/**
 * 标签列表的编辑组件
 * @constructor
 */
const TagListInputEdit: React.FC<{ onChange: (arr: string[]) => void; value: string[] }> = ({
  onChange,
  value,
}) => {
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [showServerTags, setShowServerTags] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const { loading, data } = useRequest(() => Api.getInstance().getBlogTags());

  const showInput = () => {
    setInputVisible(true);
  };

  /**
   * 输入框文件被编辑事件
   * @param e 取值
   */
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  /**
   * 输入框回车键按下事件
   */
  const handleInputConfirm = () => {
    let tags = value;
    if (inputValue !== '' && value.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    setInputVisible(false);
    setInputValue('');
    setShowServerTags(false);
    onChange(tags);
  };

  /**
   * 选中了服务器的项目
   * @param str 文本
   */
  const insetValue = (str: string) => {
    let tags = value;
    if (value.indexOf(str) === -1) {
      tags = [...tags, str];
    }
    onChange(tags);
  };

  /**
   * 标签被移除
   * @param v 要删除的标签
   */
  const closeTag = (v: string) => {
    const tags = value.filter((item) => item !== v);
    onChange(tags);
  };

  return (
    <div>
      {/* 已添加的标签列表 */}
      {value.map((item) => (
        <Tag
          key={item}
          closable={true}
          onClose={() => {
            closeTag(item);
          }}
        >
          {item}
        </Tag>
      ))}

      {/*输入框*/}
      {inputVisible && (
        <Input
          type="text"
          style={{ width: 150 }}
          size={'small'}
          value={inputValue}
          onChange={handleInputChange}
          onPressEnter={handleInputConfirm}
          suffix={
            <CheckCircleFilled
              style={{
                color: '#1890ff',
                fontSize: 15,
              }}
              onClick={handleInputConfirm}
            />
          }
        />
      )}

      {/* 显示隐藏服务器标签 */}
      {inputVisible && (
        <Button
          size={'small'}
          style={{
            marginLeft: 12,
          }}
          onClick={() => {
            setShowServerTags(!showServerTags);
          }}
          loading={loading}
        >
          服务器标签
        </Button>
      )}

      {/* 服务器已保存的标签列表  */}
      {showServerTags && TagSelectList(data ?? [], insetValue)}

      {/* 添加新标签按钮 */}
      {!inputVisible && (
        <Tag onClick={showInput}>
          <PlusOutlined /> 添加新标签
        </Tag>
      )}
    </div>
  );
};

export default TagListInputEdit;

function TagSelectList(tags: any[], onSelect: (str: string) => void) {
  return (
    <div
      style={{
        marginTop: 12,
        padding: 12,
        background: '#f7f7f7',
      }}
    >
      {tags &&
        tags.map((item) => (
          <Tag
            key={item.id}
            onClick={() => {
              onSelect(item.name);
            }}
          >
            {item.name}
          </Tag>
        ))}
    </div>
  );
}
