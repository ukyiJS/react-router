import { useContext } from 'react';
import { RouterContext } from '@/router';
import type { RouterContextProps } from '@/router/types';

export const useRouter = (): RouterContextProps => useContext(RouterContext);