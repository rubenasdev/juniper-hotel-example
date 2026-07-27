import { Fragment, jsx as reactJsx, jsxs as reactJsxs } from 'react/jsx-runtime';
import { translateProps } from './translateProps';

export const jsx = (type, props, key) => reactJsx(type, translateProps(type, props), key);
export const jsxs = (type, props, key) => reactJsxs(type, translateProps(type, props), key);
export { Fragment };
