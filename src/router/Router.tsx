import type { ReactNode } from 'react';
import { createContext, useState } from 'react';
import { useEventListener } from '@/hooks/useEventListener';
import { RouterPopStateEvent } from '@/router/routerPopStateEvent';
import type { RouterContextProps } from '@/router/types';

type RouterProps = {
  children: ReactNode;
};

const getPath = () => window.location.pathname;

export const RouterContext = createContext<RouterContextProps>({} as RouterContextProps);

export const Router = ({ children }: RouterProps): ReactNode => {
  const [path, setPath] = useState(getPath());
  useEventListener('popstate', () => setPath(getPath()));

  if (!children) return null;

  const push: RouterContextProps['push'] = (to, state) => new RouterPopStateEvent(to, state);
  return (
    <RouterContext.Provider value={{ path, push }}>
      {children}
    </RouterContext.Provider>
  );
};