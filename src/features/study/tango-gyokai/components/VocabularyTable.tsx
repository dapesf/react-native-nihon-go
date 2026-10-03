import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { VocabularyItem } from '../types';

interface VocabularyTableProps {
  vocabularies: VocabularyItem[];
}

export const VocabularyTable: React.FC<VocabularyTableProps> = ({ vocabularies }) => {
  const { t } = useTranslation();

  const renderHeader = () => (
    <View className="flex-row bg-blue-600 rounded-t-xl overflow-hidden shadow-lg border-b-2 border-blue-800">
      <View className="flex-1 p-2 border-r border-blue-500/50 items-center justify-center">
        <Text className="text-white font-extrabold text-base text-center">{t('fukushuo.tango-gyokai.group')}</Text>
      </View>
      <View className="flex-1 p-2 border-r border-blue-500/50 items-center justify-center">
        <Text className="text-white font-extrabold text-base text-center">{t('fukushuo.tango-gyokai.hanviet')}</Text>
      </View>
      <View className="flex-[1.5] p-2 border-r border-blue-500/50 items-center justify-center">
        <Text className="text-white font-extrabold text-base text-center">{t('fukushuo.tango-gyokai.meaning')}</Text>
      </View>
      <View className="flex-1 p-2 border-r border-blue-500/50 items-center justify-center">
        <Text className="text-white font-extrabold text-base text-center">{t('fukushuo.tango-gyokai.kanji')}</Text>
      </View>
      <View className="flex-1 p-2 items-center justify-center">
        <Text className="text-white font-extrabold text-sm text-center">{t('fukushuo.tango-gyokai.hiragana')}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item, index }: { item: VocabularyItem; index: number }) => {
    const isEven = index % 2 === 0;
    return (
      <View className={`flex-row border-b border-gray-200 transition-colors ${isEven ? 'bg-white' : 'bg-slate-50'}`}>
        <View className="flex-1 p-2 border-r border-gray-200 items-center justify-center">
          <Text className="text-slate-600 text-[11px] text-center">{item.group || '-'}</Text>
        </View>
        <View className="flex-1 p-2 border-r border-gray-200 items-center justify-center">
          <Text className="text-slate-800 text-[11px] text-center font-bold tracking-wide">{item.hanviet || '-'}</Text>
        </View>
        <View className="flex-[1.5] p-2 border-r border-gray-200 items-center justify-center">
          <Text className="text-slate-700 text-[11px] text-center leading-4" style={{ flexWrap: 'wrap' }}>{item.meaning || '-'}</Text>
        </View>
        <View className="flex-1 p-2 border-r border-gray-200 items-center justify-center bg-blue-50/30">
          <Text className="text-blue-700 text-3xl text-center font-extrabold">{item.kanji || '-'}</Text>
        </View>
        <View className="flex-1 p-2 items-center justify-center">
          <Text className="text-slate-800 text-base text-center font-medium">{item.hiragana || '-'}</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 p-3 bg-slate-100">
      <FlatList
        data={vocabularies}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        className="bg-white rounded-xl shadow-sm border border-gray-300"
      />
    </View>
  );
};
