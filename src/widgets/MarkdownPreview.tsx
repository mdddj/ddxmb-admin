import React from 'react';
import { useBoolean } from '@umijs/hooks';
import { BlogPreview } from '@/pages/Blog/subpage/BlogPreview';
import { Modal } from 'antd';

const MarkdownPreview: React.FC<{ content: string; onClose: () => void }> = ({
  content,
  onClose,
}) => {
  if (content == '') {
    return <></>;
  }
  const { state, setFalse, setTrue } = useBoolean(true);
  if (!state) {
    setTrue();
  }

  return (
    <Modal
      visible={state}
      onCancel={() => {
        setFalse();
        onClose();
      }}
      width={'md'}
    >
      <BlogPreview content={content} />
    </Modal>
  );
};
export default MarkdownPreview;
