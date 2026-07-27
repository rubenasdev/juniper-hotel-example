import { Fragment, jsx as reactJsx, jsxs as reactJsxs } from 'react/jsx-runtime';
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

export const jsx = (type, props, key) => reactJsx(type, translateProps(type, props), key);
export const jsxs = (type, props, key) => reactJsxs(type, translateProps(type, props), key);
export { Fragment };
