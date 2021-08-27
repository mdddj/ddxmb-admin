import * as React from "react";
import {useModel} from "umi";
import type {Datum} from "@/pages/Blog/components/write/models/API.CATEGORY_LIST.DATA";
import {Tag} from "antd";
import styles from '../style.less';

type Props = {
  render: Datum
}

// 分类组件
const CategoryItem: React.FC<Props> = ({render}) => {

  const {currentItem, setCurrent} = useModel('category_model', (ret) => ({
    currentItem: ret.currentSelect,
    setCurrent: ret.setCurrentSelectCategory
  }));


  // 选中事件
  const clickHandle = () => {
    setCurrent(render);
  }


  // 渲染选中样式
  const renderEle = () => {
    if (currentItem != null && currentItem.id === render.id) {
      return (
        <div>
          <Tag>{currentItem.name}</Tag>
        </div>
      );
    }
    return (
      <div key={render.id} onClick={clickHandle}>
        {render.name}
      </div>
    );
  }

  return (
    <>
      <div className={styles.item}>
        {renderEle()}
      </div>

    </>
  );
}

export default CategoryItem;

