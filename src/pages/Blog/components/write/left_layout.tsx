import * as React from 'react';
import {Card} from "antd";
import CategoryListShow from "@/pages/Blog/components/write/category_list";
import {useModel} from "@@/plugin-model/useModel";
import {useRequest} from "@@/plugin-request/request";
import TagComponment from "@/pages/Blog/components/write/tag_componment";


/**
 * 2021年1月16日 14:48:34
 * 梁典典
 * 发布博客左边布局
 * @constructor
 */
const WriteLeftLayout: React.FC = () => {


  const model = useModel('category_model');

  useRequest(model.getCategorys);

  const onRefresh = ()=>{
    model.getCategorys().then(r => {});
  }

  return (
    <>

      <Card>
        <CategoryListShow categorys={model.categorys} onRefresh={onRefresh}/>
      </Card>
      <div style={{height: '12px'}}/>

      <TagComponment />
    </>
  );
}

export default WriteLeftLayout;
