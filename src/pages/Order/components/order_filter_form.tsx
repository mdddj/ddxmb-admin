import React, { useRef } from 'react';
import {
  ProFormText,
  ProFormSelect,
  ProFormDigit,
  ProFormDateTimeRangePicker,
  ProFormInstance,
  LightFilter,
  ProFormRadio,
} from '@ant-design/pro-form';
import '@ant-design/pro-form/dist/form.css';
import { Button, message, Space } from 'antd';
import Api from '@/utils/request';
import { Order } from '@/entrys/Order';

const OrderSearchForm: React.FC<{ result: (data: Order[]) => void }> = ({ result }) => {
  // 绑定一个 ProFormInstance 实例
  const formRef = useRef<ProFormInstance<any>>();

  return (
    <div>
      <LightFilter<any> formRef={formRef} size={'middle'} style={{ marginBottom: 20 }}>
        <ProFormSelect
          name="queryType"
          label="查询时间类型"
          valueEnum={{
            1: '淘客创建时间查询',
            2: '淘客付款时间查询',
            3: '淘客结算时间查询',
            4: '更新时间',
          }}
        />
        <ProFormText name="positionIndex" label="位点" />
        <ProFormDigit name="pageSize" label="每页条数" />

        <ProFormSelect
          name={'member_type'}
          label={'推广者角色类型'}
          valueEnum={{
            2: '二方',
            3: '三方',
          }}
        />

        <ProFormSelect
          name={'tkStatus'}
          label={'淘客订单状态'}
          valueEnum={{
            11: '拍下未付款',
            12: '付款',
            13: '关闭',
            14: '确认收货',
            3: '结算成功',
          }}
        />

        <ProFormDateTimeRangePicker name="time" label="日期时间范围" required={true} />

        <ProFormRadio.Group
          name="jumpType"
          label="跳转类型"
          options={[
            {
              label: '向前翻页',
              value: '-1',
            },
            {
              label: '向后翻页',
              value: '1',
            },
          ]}
        />

        <ProFormDigit label={'第几页'} name={'pageNo'} />

        <ProFormSelect
          label={'场景类型'}
          valueEnum={{
            1: '常规订单',
            2: '渠道订单',
            3: '会员运营订单',
          }}
        />
      </LightFilter>

      <Space>
        <Button
          type={'primary'}
          onClick={async () => {
            formRef.current?.validateFieldsReturnFormatValue?.()?.then(async (value) => {
              const time = value.time;
              if (!time) {
                message.error('请选择查询时间');
                return;
              }
              value.startTime = time[0];
              value.endTime = time[1];
              delete value.time;
              const response = (await Api.taokeApi().getTaobaoOrder(value)) as any;
              const list = response.tbk_order_details_get_response.data.results.publisher_order_dto;
              if (list) {
                result(list as Order[]);
              }
            });
          }}
        >
          查询
        </Button>
        <Button
          onClick={() => {
            formRef.current?.resetFields();
          }}
        >
          重置
        </Button>

        <Button
          onClick={() => {
            formRef.current?.setFieldsValue({
              time: ['2021-10-11 21:48:01', '2021-10-11 22:22:00'],
            });
          }}
        >
          测试时间
        </Button>
      </Space>
    </div>
  );
};
export default OrderSearchForm;
