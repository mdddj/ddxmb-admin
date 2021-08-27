

// 博客相关操作

import {useState} from "react";

export default () => {



  // 是否显示弹窗
  const [showUpdateModal,setShowUpdateModal] = useState<boolean>(false);

  // 当前操作的博客id
  const [currentBlogId,setCurrentBlogId] = useState<number>(0);



  return {
    showUpdateModal,
    setShowUpdateModal,
    currentBlogId,
    setCurrentBlogId
  };


}
