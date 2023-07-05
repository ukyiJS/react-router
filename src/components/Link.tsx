import type { PropsWithChildren, ReactNode } from 'react';
import { useRouter } from '@/hooks/useRouter';
import type { RouterState } from '@/router/types';

export type LinkProps = {
  to: string;
  state?: RouterState;
}

export function Link({ children, to, state }: PropsWithChildren<LinkProps>): ReactNode {
  const router = useRouter();
  const active = router.path === to && 'text-blue-500';

  const onLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(to, state);
  };
  return (
    <a className={`p-2 ${active}`} href={to} onClick={e => onLinkClick(e)}>{children}</a>
  );
}