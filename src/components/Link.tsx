import type { PropsWithChildren, ReactNode } from 'react';
import { useRouter } from '@/hooks/useRouter';
import type { RouterQuery } from '@/router/types';

export type LinkProps = {
  to: string;
  query?: RouterQuery;
}

export function Link({ children, to, query }: PropsWithChildren<LinkProps>): ReactNode {
  const router = useRouter();
  const active = router.path === to && 'text-blue-500';

  const onLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(to, query);
  };
  return (
    <a className={`p-2 ${active}`} href={to} onClick={e => onLinkClick(e)}>{children}</a>
  );
}