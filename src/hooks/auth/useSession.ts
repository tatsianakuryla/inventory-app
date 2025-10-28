import { useEffect } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { AuthService } from '../../api/AuthService';
import { useAuthStore } from '../useAuthStore';
import { queryKeys } from '../../queryClient/queryClient';
import type { User } from '../../api/types/api.schemas';

export const useSession = (): UseQueryResult<User, unknown> => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUserInStore = useAuthStore((state) => state.setUser);
  const meQueryResult = useQuery<User, unknown>({
    queryKey: queryKeys.me,
    queryFn: AuthService.me,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  useEffect(() => {
    if (meQueryResult.data) {
      setUserInStore(meQueryResult.data);
    }
  }, [meQueryResult.data, setUserInStore]);
  return meQueryResult;
};
