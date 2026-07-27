import { Fragment, jsxDEV as reactJsxDEV } from 'react/jsx-dev-runtime';
import { translateProps } from './translateProps';

export const jsxDEV = (type, props, key, isStaticChildren, source, self) => reactJsxDEV(type, translateProps(type, props), key, isStaticChildren, source, self);
export { Fragment };
