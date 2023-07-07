export type RouterQuery = Record<string, unknown>

export type RouterContextProps = {
  path: string;
  query?: RouterQuery;
  push(to: string, query?: RouterQuery): void;
}