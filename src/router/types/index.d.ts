export type RouterState = Record<string, unknown>

export type RouterContextProps = {
  path: string;
  push(to: string, state?: RouterState): void;
}