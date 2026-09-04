import * as React from 'react';
import { wrapRootElement as wrap } from './root-wrapper';

export const wrapRootElement = wrap;

// https://joshwcomeau.com/gatsby/dark-mode/
const MagicScriptTag = () => {
  // Dark mode is forced globally (see src/context/DarkModeProvider.tsx), so apply
  // the class before first paint -- otherwise the light --bg-page shows for a
  // frame on browsers whose system preference is light.
  const codeToRunOnClient = `
  (function(){
    document.documentElement.classList.add('dark');
  })()
  `;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag key="magic-script-tag" />);
};

// Gatsby inlines the entire global CSS bundle (~400KB) into the <head> of
// every generated HTML page, which multiplies across thousands of problem
// pages into gigabytes of build output. Swap the inlined <style data-href>
// back to a <link> so the stylesheet is fetched once and cached.
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  if (process.env.NODE_ENV !== 'production') return;
  const headComponents = getHeadComponents().map((component: any) => {
    if (
      component?.type === 'style' &&
      component.props?.['data-href'] &&
      component.props?.['data-identity'] === 'gatsby-global-css'
    ) {
      return (
        <link
          key={component.props['data-href']}
          rel="stylesheet"
          href={component.props['data-href']}
        />
      );
    }
    return component;
  });
  replaceHeadComponents(headComponents);
};
