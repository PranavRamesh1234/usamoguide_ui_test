import { navigate } from 'gatsby';
import * as React from 'react';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { OAUTH_NEXT_PARAM, getSafeNextPath } from '../../lib/oauthRedirect';

export default function AuthCallbackPage(): JSX.Element {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const nextPath = getSafeNextPath(params.get(OAUTH_NEXT_PARAM));
    const timeoutId = window.setTimeout(() => {
      navigate(nextPath, { replace: true });
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <Layout>
      <SEO title="Signing you in" image={null} pathname="/auth/callback" noIndex />
      <div className="mx-auto flex min-h-[40vh] max-w-3xl items-center justify-center px-4 py-16">
        <p className="text-center text-lg text-gray-700 dark:text-gray-300">
          Finishing sign-in...
        </p>
      </div>
    </Layout>
  );
}
