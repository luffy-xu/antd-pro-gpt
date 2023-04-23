import { LockOutlined, MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Tabs } from 'antd';
import React from 'react';
import { flushSync } from 'react-dom';
import { history, useModel } from 'umi';

const Login: React.FC = () => {
  const { login } = useModel('userLoginIndex');
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleLogin = async (values: any) => {
    const response = await login(values);
    if (!response) return;
    const userResponse = await initialState?.fetchUserInfo?.();
    if (!userResponse) return;
    flushSync(() => {
      setInitialState((s) => ({
        ...s,
        currentUser: userResponse,
      }));
      history.push('/');
    });
  };

  return (
    <PageContainer>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <ProForm
          onFinish={handleLogin}
          submitter={{
            render: (_, dom) => (
              <>
                <Button type="link" style={{ float: 'right' }}>
                  忘记密码
                </Button>
                {dom.pop()}
              </>
            ),
            submitButtonProps: {
              type: 'primary',
              children: '登录',
            },
          }}
        >
          <Tabs
            defaultActiveKey="accountLogin"
            items={[
              {
                label: '账户密码登录',
                key: 'accountLogin',
                children: (
                  <>
                    <ProFormText
                      name="username"
                      placeholder="用户名"
                      fieldProps={{
                        prefix: <UserOutlined />,
                      }}
                      rules={[
                        {
                          required: true,
                          message: '请输入用户名',
                        },
                      ]}
                    />
                    <ProFormText.Password
                      name="password"
                      placeholder="密码"
                      fieldProps={{
                        prefix: <LockOutlined />,
                      }}
                      rules={[
                        {
                          required: true,
                          message: '请输入密码',
                        },
                      ]}
                    />
                  </>
                ),
              },
              {
                label: '手机号登录',
                key: 'mobileLogin',
                children: (
                  <>
                    <ProFormText
                      name="mobile"
                      placeholder="手机号"
                      fieldProps={{
                        prefix: <MobileOutlined />,
                      }}
                      rules={[
                        {
                          required: true,
                          message: '请输入手机号',
                        },
                      ]}
                    />
                    <ProFormText
                      name="captcha"
                      placeholder="验证码"
                      fieldProps={{
                        prefix: <MailOutlined />,
                      }}
                      rules={[
                        {
                          required: true,
                          message: '请输入验证码',
                        },
                      ]}
                    />
                  </>
                ),
              },
            ]}
          />
        </ProForm>
      </div>
    </PageContainer>
  );
};

export default Login;
