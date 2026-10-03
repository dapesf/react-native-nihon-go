import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTangoGyokai } from '../hooks/useTangoGyokai';
import CommonDropDownListModal from '@/shared/components/CommonDropDownListModal';
import { VocabularyTable } from '../components/VocabularyTable';
import type { Option } from '@/shared/types';

export const TangoGyokaiScreen: React.FC = () => {
  const { t } = useTranslation();
  const { isLoading, topics, vocabularies, selectedTopicId, setSelectedTopicId } = useTangoGyokai();

  const topicOptions = useMemo<Option[]>(() => {
    return topics.map((topic) => ({
      key: topic.id,
      value: topic.name,
    }));
  }, [topics]);

  return (
    <View className="flex-1 bg-white">
      {/* Combobox Filter */}
      <View className="z-10 bg-white px-4 py-2">
        {topicOptions.length > 0 ? (
          <CommonDropDownListModal
            options={topicOptions}
            value={selectedTopicId ?? undefined}
            onChange={(option) => setSelectedTopicId(option.key.toString())}
          />
        ) : isLoading ? null : (
          <View className="py-4 px-6 items-center border-b border-gray-200">
            <Text className="text-slate-500 font-medium">{t('fukushuo.tango-gyokai.no_topics')}</Text>
          </View>
        )}
      </View>

      {/* Main Content */}
      <View className="flex-1 bg-slate-50">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="mt-4 text-blue-600 font-medium">{t('common.loading_data', 'Đang tải dữ liệu...')}</Text>
          </View>
        ) : vocabularies.length > 0 ? (
          <VocabularyTable vocabularies={vocabularies} />
        ) : (
          <View className="flex-1 items-center justify-center p-8">
            <Text className="text-slate-500 text-base text-center font-medium">
              {t('fukushuo.tango-gyokai.no_data', 'Không có dữ liệu từ vựng cho chủ đề này.')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TangoGyokaiScreen;
