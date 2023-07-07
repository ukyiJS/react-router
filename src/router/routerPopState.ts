import type { RouterQuery } from '@/router/types';

export class RouterPopState {
  push = (to: string, query?: RouterQuery): void => {
    const event = new PopStateEvent('popstate', { state: query });
    const path = `${to}${this.stringifyQuery(query)}`;

    history.pushState(query, '', path);
    window.dispatchEvent(event);
  };

  stringifyQuery(query: RouterQuery = {}): string {
    const queries = Object.entries(query).reduce((acc, [key, value]) => [...acc, `${key}=${value}`], [] as string[]);
    return `?${queries.join('&')}`;
  }

  parseQuery<T extends RouterQuery>(query: string): T {
    const [, ...queries] = query.split(/[?&]/);
    return queries.reduce((acc, q) => {
      const [key, value] = q.split(/=/);
      return { ...acc, [key]: value };
    }, {} as T);
  }
}