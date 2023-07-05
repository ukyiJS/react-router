/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

export type WindowEventName = keyof WindowEventMap

export type EventListener<E extends WindowEventName> = {
  (this: Window, ev: WindowEventMap[E]): void;
}

export const useEventListener = <E extends WindowEventName>(event: E, listener: EventListener<E>): void => {
  useEffect(() => {
    window.addEventListener(event, listener);
    return () => window.removeEventListener(event, listener);
  }, []);
};