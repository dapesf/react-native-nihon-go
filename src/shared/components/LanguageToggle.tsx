import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_COLORS } from '../constants/colors';

const LanguageToggle = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = async (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
        // try {
        //     await AsyncStorage.setItem('@app_language', lng);
        // } catch (e) {
        //     console.error("Lỗi khi lưu ngôn ngữ:", e);
        // }
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setIsOpen(true)} className="px-3 py-1">
                <Ionicons name="globe-outline" size={26} color={APP_COLORS.accent} />
            </TouchableOpacity>

            <Modal visible={isOpen} transparent animationType="fade">
                <TouchableOpacity
                    className="flex-1 bg-black/40 justify-center items-center"
                    activeOpacity={1}
                    onPress={() => setIsOpen(false)}
                >
                    <View className="bg-white w-2/3 rounded-xl shadow-lg overflow-hidden">
                        <View className="p-4 flex-row justify-end items-center" style={{ backgroundColor: APP_COLORS.primary }}>
                            <TouchableOpacity onPress={() => setIsOpen(false)}>
                                <Ionicons name="close" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => changeLanguage('vi')}
                                className={`p-4 border-b border-gray-100 flex-row items-center justify-between ${i18n.language === 'vi' ? 'bg-blue-50' : 'bg-white'}`}
                            >
                                <Text className={`text-base ${i18n.language === 'vi' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>
                                    🇻🇳 Tiếng Việt
                                </Text>
                                {i18n.language === 'vi' && <Ionicons name="checkmark" size={20} color="#2563eb" />}
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => changeLanguage('ja')}
                                className={`p-4 flex-row items-center justify-between ${i18n.language === 'ja' ? 'bg-blue-50' : 'bg-white'}`}
                            >
                                <Text className={`text-base ${i18n.language === 'ja' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>
                                    🇯🇵 日本語
                                </Text>
                                {i18n.language === 'ja' && <Ionicons name="checkmark" size={20} color="#2563eb" />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default LanguageToggle;
