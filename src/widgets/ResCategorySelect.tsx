import React, { useState } from 'react';
import { Select } from 'antd';
import { ResCategory } from '@/entrys/ResCategory';
import { FindResCategoryListByNameLike } from '@/services/res_service';
import { simpleHandleResultMessage } from '@/utils/result';

const { Option } = Select;

const ResCategorySelect: React.FC<{
  current?: ResCategory;
  onSelect?: (category: ResCategory) => void;
}> = ({ current, onSelect }) => {
  const [values, setValues] = useState<ResCategory[]>([]);

  // 执行搜索
  const handleSearch = async (value: string) => {
    const result = await FindResCategoryListByNameLike(value);
    await simpleHandleResultMessage<ResCategory[]>(
      result,
      (data) => {
        setValues(data);
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
