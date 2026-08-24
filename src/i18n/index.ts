import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import vi from './vi.json'
import ja from './ja.json';

// Cấu hình resource chứa các ngôn ngữ
const resources = {
	vi: { translation: vi }
	, ja: { translation: ja },
};

const getDeviceLanguage = () => {
	const locales = Localization.getLocales();
	if (locales && locales.length > 0) {
		return locales[0].languageCode ?? "";
	}

	return 'vi';
}

const i18nOptions: InitOptions = {
	resources,
	lng: getDeviceLanguage(),
	fallbackLng: 'vi',
	interpolation: {
		escapeValue: false, // React đã tự động chống XSS
	},
};

i18n
	.use(initReactI18next)
	.init(i18nOptions);

export default i18n;