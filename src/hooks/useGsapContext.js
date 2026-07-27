import { useLayoutEffect } from 'react';
const gsap = window.gsap;

export function useGsapContext(scope, setup, deps = []) {
  useLayoutEffect(() => {
    const context = gsap.context(setup, scope);
    return () => context.revert();
  // setup is intentionally scoped to the supplied dependency list.
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
