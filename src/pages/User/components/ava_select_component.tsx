import { Avatar, Space } from 'antd';
import React, { useState } from 'react';
import { useMount } from '@umijs/hooks';
import Api from '@/utils/request';
import { SystemPicter } from 'dd_server_api_web/apis/model/avater';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';

/**
 * 系统默认头像选择器
 * @param current 选中的头像
 * @param onSelect 选中执行的操作
 * @constructor
 */
const AvatorPictorSelect: React.FC<{
  current?: SystemPicter;
  onSelect?: (avatar: SystemPicter) => void;
}> = ({ current, onSelect }) => {
  const [pics, setPics] = useState<SystemPicter[]>([]);

  useMount(() => {
    Api.getInstance()
      .getPics(1)
      .then((value) => {
        successResultHandle<SystemPicter[]>(value, (data) => {
          setPics(data);
        });
      });
  });

  return (
    <Space>
      {pics.map((value) => {
        return (
          <div
            style={{
              position: 'relative',
            }}
            key={value.id}
            onClick={() => {
              if (onSelect) {
                onSelect(value);
              }
            }}
          >
            <Avatar src={value.url} size={64} />

            {current && current.id == value.id && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'grey',
                  opacity: 0.5,
                }}
              />
            )}
          </div>
        );
      })}
    </Space>
  );
};

export default AvatorPictorSelect;
