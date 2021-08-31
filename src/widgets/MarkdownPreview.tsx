import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useBoolean } from '@umijs/hooks';
import { BlogPreview } from '@/pages/Blog/subpage/BlogPreview';

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
    <Dialog open={state} onClose={setFalse} fullWidth={true} maxWidth={'md'}>
      <DialogTitle>预览</DialogTitle>
      <DialogContent>
        <BlogPreview content={content} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
};
export default MarkdownPreview;
