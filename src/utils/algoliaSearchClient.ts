import algoliasearch from 'algoliasearch/lite';

const appId = process.env.GATSBY_ALGOLIA_APP_ID ?? 'GL9P5K4YD8';
const searchKey =
  process.env.GATSBY_ALGOLIA_SEARCH_KEY ?? '0f5e090973e5c8ca44e6c8b83f8b62fb';

if (!appId || !searchKey) {
  // This avoids silently using the default USACO index.
  console.warn(
    'Algolia search env vars are missing. Set GATSBY_ALGOLIA_APP_ID and GATSBY_ALGOLIA_SEARCH_KEY.'
  );
}

export const searchClient = algoliasearch(appId, searchKey);
