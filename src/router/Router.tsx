import type { ReactNode } from 'react';
import { createContext, useState } from 'react';
import { useEventListener } from '@/hooks/useEventListener';
import { RouterPopState } from '@/router/routerPopState';
import type { RouterContextProps } from '@/router/types';

type RouterProps = {
  children: ReactNode;
};

const getPath = (): string => window.location.pathname;
const getQuery = (): string => window.location.search;

export const RouterContext = createContext<RouterContextProps>({} as RouterContextProps);

export const Router = ({ children }: RouterProps): ReactNode => {
  const router = new RouterPopState();
  const [path, setPath] = useState(getPath());
  const [query, setQuery] = useState(() => router.parseQuery(getQuery()));

  useEventListener('popstate', event => {
    setQuery(event.state);
    setPath(getPath());
  });

  if (!children) return null;

  return (
    <RouterContext.Provider value={{ path, query, push: router.push }}>
      {children}
    </RouterContext.Provider>
  );
};