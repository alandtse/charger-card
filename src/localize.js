// Borrowed from:
// https://github.com/custom-cards/boilerplate-card/blob/master/src/localize/localize.ts

import * as en from './translations/en.json';
import * as nb from './translations/nb.json';
import * as sv from './translations/sv.json';
import * as de from './translations/de.json';
import * as da from './translations/da.json';
import * as ca from './translations/ca.json';

var languages = {
  en,
  nb,
  sv,
  de,
  da,
  ca
};

const DEFAULT_LANG = 'en';

export default function localize(string, search, replace) {
  const [section, key] = string.split('.');

  let langStored;

  try {
    langStored = JSON.parse(localStorage.getItem('selectedLanguage'));
  } catch (e) {
    langStored = localStorage.getItem('selectedLanguage');
  }

  const lang = (langStored || navigator.language.split('-')[0] || DEFAULT_LANG)
    .replace(/['"]+/g, '')
    .replace('-', '_');

  let translated;

  try {
    translated = languages[lang][section][key];
  } catch (e) {
    translated = languages[DEFAULT_LANG][section][key];
  }

  if (translated === undefined) {
    translated = languages[DEFAULT_LANG][section][key];
  }

  if (translated === undefined) {
    return;
  }

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }

  return translated;
}
