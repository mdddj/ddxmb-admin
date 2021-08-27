import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Note, Spacer, Description } from '@geist-ui/react';
import { useRequest } from '@@/plugin-request/request';
import { getApplicationList } from '@/pages/Application/service';
import { AllAppResult } from '@/pages/Application/model/list_result_model';
import ProList from '@ant-design/pro-list';
import { Badge, Button, Card } from 'antd';

export default (): React.ReactNode => {
  const { data, error, loading } = useRequest<AllAppResult>(() => {
    return getApplicationList();
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <PageContainer>
        <Note label={'提示'} type="success" small={true}>
          添加大淘客应用信息,后端将使用你配置的信息请求API接口,用户在app下单后佣金将进入你的配置的所在账户!如果未到账,请检查配置是否正确
        </Note>

        <Spacer />

        <Card title={'已上线应用'} extra={<Button type="primary">添加新配置</Button>}>
          <ProList<any>
            loading={loading}
            grid={{ gutter: 16, column: 2 }}
            dataSource={data?.map((item) => ({
              title: item.title,
              subTitle: item.intro,
              avatar: item.logo,
              content: (
                <>
                  <Description title="appKey" content={item.appKey} />
                  <Spacer />
                  <Description title="appSecret" content={item.appSecret} />
                </>
              ),
              actions: item.selectDefault
                ? [<Badge status="success" text="默认使用" />]
                : [<a>设置默认</a>],
            }))}
            metas={{ title: {}, subTitle: {}, avatar: {}, content: {}, actions: {} }}
          />
        </Card>
      </PageContainer>
    </>
  );
};
