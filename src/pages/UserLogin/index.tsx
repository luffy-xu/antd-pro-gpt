import { LockOutlined, MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Tabs } from 'antd';
import React from 'react';
import { flushSync } from 'react-dom';
import { history, useModel } from 'umi';

// Define a Login component as a functional component
const Login: React.FC = () => {
  // Access the login and initialState functions from useModel hook
  const { login } = useModel('userLoginIndex');
  const { initialState, setInitialState } = useModel('@@initialState');

  // Define handleLogin function which will be called when the form is submitted
  // 定义 handleLogin 函数，用于表单提交时调用
  const handleLogin = async (values: any) => {
    // Call the login function and store the response in the response variable
    // 调用 login 函数，并将响应存储在 response 变量中
    const response = await login(values);
    // If the response is null or undefined, return from the function
    // 如果响应为 null 或 undefined，则从函数中返回
    if (!response) return;
    // Call the fetchUserInfo function from the initialState object and store the response in the userResponse variable
    // 从 initialState 对象中调用 fetchUserInfo 函数，并将响应存储在 userResponse 变量中
    const userResponse = await initialState?.fetchUserInfo?.();
    // If the userResponse is null or undefined, return from the function
    // 如果 userResponse 为 null 或 undefined，则从函数中返回
    if (!userResponse) return;
    // Update the state with the new user data and redirect to the home page
    // 使用新的用户数据更新状态并重定向到主页
    flushSync(() => {
      setInitialState((s) => ({
        ...s,
        currentUser: userResponse,
      }));
      history.push('/');
    });
  };

  // Render the login form wrapped in a PageContainer component
  // 在 PageContainer 组件中渲染登录表单
  return (
    <PageContainer>
      {/* Style the form container */}
      {/* 样式表单容器 */}
      <div style={{ width: '50%', margin: '0 auto' }}>
        {/* Define the login form using the ProForm component */}
        {/* 使用 ProForm 组件定义登录表单 */}
        <ProForm
          onFinish={handleLogin}
          submitter={{
            render: (_, dom) => (
              // Add a link to forget password and render the submit button
              // 添加忘记密码链接并渲染提交按钮
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
          {/* Define two tabs for account and mobile login */}
          {/* 定义帐户和手机号登录的两个选项卡 */}
          <Tabs
            defaultActiveKey="accountLogin"
            items={[
              {
                label: '账户密码登录',
                key: 'accountLogin',
                children: (
                  <>
                    {/* Define the username input field */}
                    {/* 定义用户名输入 */}
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
                    {/* Define the password input field */}
                    {/* 定义密码输入字段 */}
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
                    {/* Define the mobile number input field */}
                    {/* 定义手机号输入字段 */}
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
                    {/* Define the captcha input field */}
                    {/* 定义验证码输入字段 */}
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

// Export the Login component as default
// 导出默认的 Login 组件
export default Login;
