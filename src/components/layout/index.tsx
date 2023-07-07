import type { PropsWithChildren, ReactNode } from 'react';
import { Link } from '@/components/Link';

export function Layout({ children }: PropsWithChildren): ReactNode {
  const links = [{ to: '/', name: 'Index Page', query: { page: '1' } }, { to: '/about', name: 'About Page', query: { id: '1' } }].map(link => <Link to={link.to} query={link.query} key={link.to}>{link.name}</Link>);
  return (
    <main>
      <header>
        <nav className="flex justify-center p-4">{links}</nav>
      </header>
      {children}
    </main>
  );
}