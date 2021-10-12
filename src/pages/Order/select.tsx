import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Card } from 'antd';
import OrderSearchForm from '@/pages/Order/components/order_filter_form';

/// 订单页面
const Select: React.FC = () => {
  return (
    <PageContainer>
      <Card
        title={'订单查询'}
        extra={
          <a href={'https://static.saintic.com/picbed/huang/2021/10/12/1634008909900.png'}>
            请求参数解释
          </a>
        }
      >
        <OrderSearchForm
          result={(data) => {
            console.log(data);
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default Select;
