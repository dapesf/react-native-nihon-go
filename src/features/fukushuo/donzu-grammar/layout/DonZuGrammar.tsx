import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/shared/type';
import { renderFormattedText } from '@/utils/textFormatter';
import { useGetDonZuGrammarLessons } from '../hooks/useGetDonZuGrammarLessons';
import { DonZuLessonRecord } from '../type';

export default function DonZuGrammarScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<AppNavigationProp>();
  const { lessons, loading, error } = useGetDonZuGrammarLessons();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-2 text-slate-500">{t('common.loading_data')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">{t(error)}</Text>
      </View>
    );
  }

  if (!lessons || lessons.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500">{t('grammar.no_data')}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: DonZuLessonRecord }) => {
    return (
      <TouchableOpacity 
        className="mb-8 mx-4"
        onPress={() => {
            navigation.navigate('DonZuLessonDetailLayout', { 
              lesson_number: item.lesson_number,
              lesson_title: item.title
            });
        }}
      >
        {/* Banner tiêu đề */}
        <View className="bg-orange-200 py-2 items-center justify-center">
          <Text className="text-xl font-bold text-black tracking-widest">
            {item.title}
          </Text>
        </View>

        {/* Box nội dung */}
        {item.summary_introduction ? (
          <View className="mt-4 border-2 border-dashed border-black p-4 bg-white items-center">
            <Text className="text-base text-black leading-8 font-medium text-left w-full">
              {renderFormattedText(item.summary_introduction)}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white pt-4">
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
