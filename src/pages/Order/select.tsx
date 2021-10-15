import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Card, Table, Image } from 'antd';
import OrderSearchForm from '@/pages/Order/components/order_filter_form';
import { Order } from '@/entrys/Order';

const columns = [
  {
    title: '产品图',
    dataIndex: 'item_img',
    render: (image: string | undefined) => {
      return <Image width={80} src={image} />;
    },
  },
  {
    title: '标题',
    dataIndex: 'item_title',
    key: 'item_title',
  },
  {
    title: '店铺名称',
    dataIndex: 'seller_shop_title',
    key: 'seller_shop_title',
  },
  {
    title: '付款金额',
    dataIndex: 'alipay_total_price',
    key: 'alipay_total_price',
  },
  {
    title: '付款预估收入',
    dataIndex: 'pub_share_pre_fee',
    key: 'pub_share_pre_fee',
  },
  {
    title: '提成',
    dataIndex: 'tk_total_rate',
    key: 'tk_total_rate',
  },
];

/// 订单页面
const Select: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

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
        <OrderSearchForm result={setOrders} />

        <Table dataSource={orders} columns={columns} rowKey={'trade_id'} />
      </Card>
    </PageContainer>
  );
};

export default Select;
