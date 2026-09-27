import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
	lng: 'vi', // getDeviceLanguage(), // Tạm thời set mặc định tiếng Việt
	fallbackLng: 'vi',
	interpolation: {
		escapeValue: false, // React đã tự động chống XSS
	},
};

i18n
	.use(initReactI18next)
	.init(i18nOptions);

// Khôi phục ngôn ngữ đã lưu từ AsyncStorage
// AsyncStorage.getItem('@app_language').then((savedLng) => {
// 	if (savedLng) {
// 		i18n.changeLanguage(savedLng);
// 	}
// }).catch((err) => console.log('Lỗi khi đọc ngôn ngữ từ AsyncStorage', err));

export default i18n;