import { localizeText } from '../i18n';

const localizedAttributes = ['aria-label', 'alt', 'title', 'placeholder'];

function translateChild(value) {
  if (typeof value === 'string') return localizeText(value);
  if (Array.isArray(value)) return value.map(translateChild);
  return value;
}

export function translateProps(type, props) {
  if (typeof type !== 'string' || !props) return props;

  const translated = { ...props };
  if ('children' in translated) translated.children = translateChild(translated.children);

  for (const name of localizedAttributes) {
    if (typeof translated[name] === 'string') translated[name] = localizeText(translated[name]);
  }

  return translated;
}
