import type { ReactNode } from 'react';
import { Layout } from '@/components/layout';
import { Index } from '@/pages';
import { About } from '@/pages/About';
import { Route, Router } from '@/router';

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
