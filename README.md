## React와 History API 사용하여 SPA Router 기능 구현하기

### 조건
***
**1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

**3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```

**4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

### 구현
***

##### useEventListener.ts
```ts
export type WindowEventName = keyof WindowEventMap;
export type EventListener<E extends WindowEventName> = {
  (this: Window, ev: WindowEventMap[E]): void;
};

export const useEventListener = <E extends WindowEventName>(event: E, listener: EventListener<E>): void => {
  useEffect(() => {
    window.addEventListener(event, listener);
    return () => window.removeEventListener(event, listener);
  }, []);
};
```
- `addEventListener`, `removeEventListener`를 편하게 사용하기 위해 만듦.

##### routerPopState.ts
```ts
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
```
- `push`: Router path를 변경해주는 함수
- `stringifyQuery`: Object형태의 Query를 Query String으로 변환해주는 함수
- `parseQuery`: Query String를 Object형태의 Query로 변환해주는 함수

#### \<Router>
```tsx
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
```
- 뒤로가기 처리를 위해 `useEventListener('popsate')`를 이용하여 현재 `path`와 `query` 상태를 변경
- Router의 하위 컴포넌트에서 Router의 상태 값을 사용하기 위해 `RouterContext` 만듦.

#### \<Route>
```tsx
export const Route = ({ path, component }: RouteProps): ReactNode => {
  const context = useContext(RouterContext);
  return context.path === path ? component : null;
};
```
- Route `path`와 현재 `path`가 같을때 해당 `component` 렌더링

#### useRouter.ts
```ts
export const useRouter = (): RouterContextProps => useContext(RouterContext);
```
- 다른 컴포넌트에서 Router `push`함수를 사용하기 위해 만듦. 

#### App.tsx
```tsx
export function App(): ReactNode {
  return (
    <Router>
      <Layout>
        <Route path="/" component={<Index />}></Route>
        <Route path="/about" component={<About />}></Route>
      </Layout>
    </Router>
  );
}
```
- 최종적으로 App.tsx에서 `<Router>`, `<Route>` 컴포넌트 사용