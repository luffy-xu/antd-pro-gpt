// Import necessary modules
import { signIn, signOut } from '@/services/userLoginIndex';
import { useCallback, useState } from 'react';

// Define a custom hook for user login functionality
export default function useUserLoginIndex() {
  // Define state for login loading status
  // 定义用于登录加载状态的状态
  const [loginLoading, setLoginLoading] = useState(false);

  // Define a function for user login
  // 定义用于用户登录的函数
  const login = useCallback(async (payload: API.LoginParams): Promise<API.LoginResult | null> => {
    // Set the login loading state to true
    // 将登录加载状态设置为 true
    setLoginLoading(true);

    try {
      // Call the signIn function to perform the login
      // 调用 signIn 函数执行登录操作
      const response = await signIn(payload);

      // Set the login loading state to false and return the login response data
      // 将登录加载状态设置为 false 并返回登录响应数据
      setLoginLoading(false);
      return response.data || null;
    } catch (error) {
      // Log any errors and set the login loading state to false
      // 记录任何错误并将登录加载状态设置为 false
      console.log(error);
      setLoginLoading(false);
      return null;
    }
  }, []);

  // Define a function for user logout
  // 定义用于用户注销的函数
  const logout = useCallback(() => {
    // Call the signOut function to perform the logout
    // 调用 signOut 函数执行注销操作
    signOut();
  }, []);

  // Return the login loading state, login function, and logout function
  // 返回登录加载状态、登录函数和注销函数
  return {
    loginLoading,
    login,
    logout,
  };
}
