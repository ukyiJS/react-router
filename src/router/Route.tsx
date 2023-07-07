import type { ReactNode } from 'react';
import { useContext } from 'react';
import { RouterContext } from '@/router/Router';

type RouteProps = {
  path: string;
  component: ReactNode;
};

export const Route = ({ path, component }: RouteProps): ReactNode => {
  const context = useContext(RouterContext);
  return context.path === path ? component : null;
};