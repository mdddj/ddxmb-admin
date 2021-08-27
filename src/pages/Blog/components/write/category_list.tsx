import * as React from "react";
import CategoryItem from "@/pages/Blog/components/write/render/category_item";
import CategoryAddButton from "@/pages/Blog/components/write/category_add_button";
import {Datum} from "@/pages/Blog/components/write/models/API.CATEGORY_LIST.DATA";
import {Text} from "@geist-ui/react";


type Props = {
  categorys: Datum[];
  onRefresh: () => void;
}

const CategoryListShow: React.FC<Props> = ({  categorys,onRefresh}) => {


  return (
    <>

      <Text h3>选择分类</Text>


      {categorys?.map((item) => <CategoryItem key={item.id} render={item}/>)}


      <CategoryAddButton onFresh={onRefresh}/>

    </>
  );
}
export default CategoryListShow;

//
