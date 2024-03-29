import React, { useState } from 'react';
import { Select } from 'antd';
import { ResCategory } from 'dd_server_api_web/apis/model/ResCategory';
import { simpleHandleResultMessage } from 'dd_server_api_web/apis/utils/ResultUtil';
import Api from '@/utils/request';

const { Option } = Select;

const ResCategorySelect: React.FC<{
  current?: ResCategory;
  onSelect?: (category: ResCategory) => void;
}> = ({ current, onSelect }) => {
  const [values, setValues] = useState<ResCategory[]>([]);

  // 执行搜索
  const handleSearch = async (value: string) => {
    const result = await Api.getInstance().findResCategoryListByNameLike(value);
    await simpleHandleResultMessage<ResCategory[]>(
      result,
      (data) => {
        if (data) {
          setValues(data);
        }
      },
      false,
    );
  };

  // 选中某个Option 回调
  const handleChange = (value: React.SetStateAction<number | undefined>) => {
    const id = value as number;
    const find = values.find((item) => item.id == id);
    onSelect?.(find!);
  };

  return (
    <Select
      showSearch
      value={current?.id}
      placeholder={'请输入群组名查询,支持模糊搜索'}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
    >
      {values.map((value) => (
        <Option key={value.id} value={value.id}>
          {value.name}
        </Option>
      ))}
    </Select>
  );
};

export default ResCategorySelect;
