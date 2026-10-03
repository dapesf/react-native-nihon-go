import React, { useMemo } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import { useDonZuLessonDetail } from '../hooks/useDonZuLessonDetail';
import { DonZuLessonDetailRecord } from '../types';
import { renderFormattedText } from '@/utils/textFormatter';

interface GroupedSub {
  subNumber: string;
  explanation: string | null;
  examples: DonZuLessonDetailRecord[];
}

interface GroupedPoint {
  pointNumber: string;
  pattern: string;
  meaning: string;
  subs: GroupedSub[];
}

const groupData = (data: DonZuLessonDetailRecord[]): GroupedPoint[] => {
  const pointsMap = new Map<string, GroupedPoint>();

  data.forEach((row) => {
    if (!pointsMap.has(row.point_number)) {
      pointsMap.set(row.point_number, {
        pointNumber: row.point_number,
        pattern: row.pattern,
        meaning: row.grammar_meaning,
        subs: [],
      });
    }

    const point = pointsMap.get(row.point_number)!;

    let sub = point.subs.find((s) => s.subNumber === row.sub_number);
    if (!sub) {
      sub = {
        subNumber: row.sub_number,
        explanation: row.sub_point_explanation,
        examples: [],
      };
      point.subs.push(sub);
    }

    if (row.japanese_text) {
      sub.examples.push(row);
    }
  });

  return Array.from(pointsMap.values());
};

// Component này sẽ nhận route có param lesson_number để hiển thị chi tiết
export default function DonZuLessonDetailScreen({ route }: any) {
  const { t } = useTranslation();
  
  // Lấy lesson_number từ route.params, mặc định là 1 để test nếu chưa truyền
  const lessonNumber = route?.params?.lesson_number || 1;
  const navigation = useNavigation<AppNavigationProp>();
  
  const { data, loading, error } = useDonZuLessonDetail(lessonNumber);

  const groupedData = useMemo(() => {
    if (!data) return [];
    return groupData(data);
  }, [data]);

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

  if (!groupedData || groupedData.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500">{t('grammar.no_data')}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
    <ScrollView className="flex-1 p-4">
      {groupedData.map((point, index) => (
        <View key={`point-${index}`} className="mb-10">
          
          {/* Header của một Point */}
          <View className="flex-row items-end mb-6">
            <View className="bg-stone-200 px-4 py-2 rounded-sm mr-4 min-w-[40px] items-center justify-center">
              <Text className="font-bold text-lg text-black">{point.pointNumber}</Text>
            </View>
            <View className="flex-1 border-b-2 border-black pb-2">
              <Text className="font-bold text-lg text-black">
                {renderFormattedText(point.pattern)}
                {point.meaning ? `　${point.meaning}` : ''}
              </Text>
            </View>
          </View>

          {/* Danh sách các Sub Point */}
          {point.subs.map((sub, subIndex) => (
            <View key={`sub-${subIndex}`} className="flex-row mb-6">
              <View className="bg-stone-100 px-3 py-1 rounded-sm mr-4 mt-1 min-w-[40px] items-center self-start">
                <Text className="font-bold text-base text-black">{sub.subNumber}</Text>
              </View>
              
              <View className="flex-1">
                {/* Các câu ví dụ */}
                <View className="mb-3">
                  {sub.examples.map((ex, exIndex) => (
                    <View key={`ex-${exIndex}`} className="mb-1 flex-row">
                      {ex.content_type === 'dialogue' && ex.speaker && (
                        <Text className="text-base text-black font-medium mr-2 w-6">{ex.speaker}</Text>
                      )}
                      <Text className="text-base text-black flex-1">
                        {ex.japanese_text}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Phần giải thích (nếu có) */}
                {sub.explanation ? (
                  <View className="mt-1">
                    <Text className="text-base text-gray-800 leading-7">
                      {/* Xử lý line break và markup HTML trong chuỗi explanation */}
                      {renderFormattedText(sub.explanation)}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          ))}
          
        </View>
      ))}
      <View className="h-20" />
    </ScrollView>
    <View className="absolute bottom-6 left-0 right-0 items-center">
      <TouchableOpacity
        className="bg-indigo-600 px-8 py-3 rounded-full flex-row items-center shadow-lg"
        onPress={() => navigation.navigate('GrammarExerciseScreen', { lesson_number: lessonNumber })}
      >
        <Text className="text-white font-bold text-lg">{t('tabs.practice')}</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}
