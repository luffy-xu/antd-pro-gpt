import { signIn, signOut } from '@/services/userLoginIndex';
import { useCallback, useState } from 'react';

export default function useUserLoginIndex() {
  const [loginLoading, setLoginLoading] = useState(false);

  const login = useCallback(async (payload: API.LoginParams): Promise<API.LoginResult | null> => {
    setLoginLoading(true);
    try {
      const response = await signIn(payload);
      setLoginLoading(false);
      return response.data || null;
    } catch (error) {
      console.log(error);
      setLoginLoading(false);
      return null;
    }
  }, []);

  const logout = useCallback(() => {
    signOut();
  }, []);

  return {
    loginLoading,
    login,
    logout,
  };
}
