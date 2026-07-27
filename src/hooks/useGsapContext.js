import { useEffectEvent, useLayoutEffect } from 'react';
import { gsap } from '../lib/gsap';

export function useGsapContext(scope, setup, dependency) {
  const runSetup = useEffectEvent(setup);
  useLayoutEffect(() => {
    const context = gsap.context(() => runSetup(), scope);
    return () => context.revert();
  }, [scope, dependency]);
}
