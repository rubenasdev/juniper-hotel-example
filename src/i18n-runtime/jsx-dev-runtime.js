import { Fragment, jsxDEV as reactJsxDEV } from 'react/jsx-dev-runtime';
import { localizeText } from '../i18n';

const translateChild = value => typeof value === 'string' ? localizeText(value) : Array.isArray(value) ? value.map(translateChild) : value;
const translateProps = (type, props) => {
  if (typeof type !== 'string' || !props) return props;
  const next = { ...props };
  if ('children' in next) next.children = translateChild(next.children);
  for (const name of ['aria-label', 'alt', 'title', 'placeholder']) {
    if (typeof next[name] === 'string') next[name] = localizeText(next[name]);
  }
  return next;
};

export const jsxDEV = (type, props, key, isStaticChildren, source, self) => reactJsxDEV(type, translateProps(type, props), key, isStaticChildren, source, self);
export { Fragment };
