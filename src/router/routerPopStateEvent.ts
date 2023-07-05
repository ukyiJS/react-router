import type { RouterState } from '@/router/types';

export class RouterPopStateEvent extends PopStateEvent {
  constructor(to: string, state?: RouterState) {
    super('popstate', { state });

    history.pushState(state, '', to);
    window.dispatchEvent(this);
  }
}