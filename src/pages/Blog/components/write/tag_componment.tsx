import * as React from "react";
import {Card, message} from "antd";
import {BlogTags} from "@/pages/Blog/subpage/write/BlogWrite";
import {useRecoilState} from "recoil";
import {Button, Input, Spacer, Tag, Text} from "@geist-ui/react";


export default function TagComponment() {

  const [blogTagList, setBlogTagList] = useRecoilState(BlogTags);

  const ref = React.useRef<any>(null)

  // 添加标签按钮事件
  const submitTag = async () => {
    let tagVal = ref.current.value;
    if(!tagVal && tagVal==""){
      await message.warning('请输入内容');
      return ;
    }
    if (!blogTagList.includes(tagVal)) {
      setBlogTagList((oldList) => [
        ...oldList,
        tagVal
      ]);
      setValue('');
      await message.success('添加成功');
    } else {
      await message.error('已存在');
    }
  }

  // 输入框改变事件
  const inputChangeHandle = (e: any) => {
    setValue(e.target.value);
  }

  const setValue = (val: string) => {
    ref && (ref.current.value = val)
  }

  return (
    <>
      <Card>
        <Text h3>标签</Text>
        <Input onChange={inputChangeHandle} ref={ref}/>
        <Spacer y={1}/>
        <Button auto size="small"
                onClick={submitTag}>添加标签</Button>
        <Spacer y={1}/>
        {blogTagList?.map((value) => <Tag type="lite" key={value}>{value}</Tag>)}
      </Card>

    </>
  );
}
