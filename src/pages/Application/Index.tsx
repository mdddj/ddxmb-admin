import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { getApplicationList } from '@/pages/Application/service';
import { DtkDetail } from '@/pages/Application/model/list_result_model';
import { Avatar, Card } from 'antd';
import { useRequest } from '@umijs/hooks';
import { Result } from '@/utils/result';

export default (): React.ReactNode => {
  const { data, error, loading } = useRequest<Result<DtkDetail[]>>(() => {
    return getApplicationList();
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  const list = data?.data;

  return (
    <>
      <PageContainer title={'应用列表'}>
        <Card>
          {loading && <span>加载中</span>}
          <Card>
            {list?.map((item) => (
              <Card.Grid key={item.id} style={{ width: '50%' }} hoverable={true}>
                <Card.Meta
                  avatar={<Avatar src={item.logo} />}
                  title={item.title}
                  description={item.intro}
                />
              </Card.Grid>
            ))}
          </Card>
        </Card>
      </PageContainer>
    </>
  );
};
