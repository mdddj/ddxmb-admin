import { Card } from 'antd';
import React from 'react';
import { useMount } from '@umijs/hooks';
import Api from '@/utils/request';

const AvatorPictorSelect: React.FC = () => {
  useMount(() => {
    Api.getInstance()
      .getPics(1)
      .then((value) => {
        console.log(value);
      });
  });

  return <Card></Card>;
};

export default AvatorPictorSelect;
