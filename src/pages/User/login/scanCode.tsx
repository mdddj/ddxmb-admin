import { Button, Image, Space } from 'antd';
import { checkUUidCode, getQrCodeUuid } from '@/services/user';
import { useState } from 'react';

const ScanCodeComponent: React.FC<{
  onSuccess: (token: string) => void;
}> = ({ onSuccess }) => {
  const [jpgUrl, setJpgUrl] = useState<string>();

  // 加载条码
  const loadQrCode = async () => {
    const response = await getQrCodeUuid();
    console.log(response);
    const url = 'http://localhost/file/' + response + '.jpg';
    setJpgUrl(url);
    setInterval(() => {
      checkUUidCode(response).then((res) => {
        console.log('轮询到数据:' + res);
        if (res != undefined && res.length != 0) {
          onSuccess(res);
        }
      });
    }, 5000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Button type={'primary'} onClick={() => loadQrCode()}>
        加载二维码
      </Button>
      <Space />
      <Image width={200} src={jpgUrl} />
    </div>
  );
};

export default ScanCodeComponent;
