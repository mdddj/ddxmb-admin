import * as React from 'react';
import { Input, Modal } from 'antd';
import { useState } from 'react';

type Props = {
  show: boolean;
  onOk: (value: string) => void;
};

// 输入弹窗
const InputDailog: React.FC<Props> = (props: Props) => {
  const ref = React.useRef(null);

  const [isShow, setIsShow] = useState<boolean>(props.show);
  const [value, setValue] = useState<string>('');

  // 关闭弹窗
  const close = () => {
    setIsShow(false);
  };

  // 确认提交
  const submit = () => {
    props.onOk(value);
  };

  return (
    <>
      <Modal visible={isShow} onCancel={close} onOk={submit}>
        <Input
          placeholder="请输入内容"
          ref={ref}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></Input>
      </Modal>
    </>
  );
};

export default InputDailog;
