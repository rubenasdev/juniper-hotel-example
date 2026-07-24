import { useLayoutEffect } from '/src/vendor/react.bundle.mjs';
const gsap = window.gsap;

export function useGsapContext(scope, setup, deps = []) {
  useLayoutEffect(() => {
    const context = gsap.context(setup, scope);
    return () => context.revert();
  // setup is intentionally scoped to the supplied dependency list.
  }, deps);
}
