import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert } from 'antd';

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'欢迎来到典典的小卖部'}
          type="success"
          showIcon
          banner
        />
      </Card>
    </PageContainer>
  );
};
