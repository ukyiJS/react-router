import type { ReactNode } from 'react';
import { useContext } from 'react';
import { RouterContext } from '@/router/Router';

type RouteProps = {
  path: string;
  component: ReactNode;
};

export const Route = ({ path, component }: RouteProps): ReactNode => {
  const context = useContext(RouterContext);
  const [_path] = context.path.split(/[?&]/);
  return _path === path ? component : null;
};