import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Example, BunbouRecord } from '../type';
import { useGetBunBou } from '../hooks/useGetGrammar';

export default function GrammarScreen() {
  const { bunbouData } = useGetBunBou('n5');
  const [grammars, setGrammars] = useState<BunbouRecord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    setGrammars(bunbouData ?? []);
    setIsLoading(false);

    // if (isDropdownOpen && currentIndex >= 0 && grammars.length > 0) {
    //   // Dùng setTimeout nhỏ để đảm bảo Modal đã render xong layout trước khi scroll
    //   const timer = setTimeout(() => {
    //     flatListRef.current?.scrollToIndex({
    //       index: currentIndex,
    //       animated: true,
    //       viewPosition: 0.2, // 0.5 = Đặt item được chọn vào CHÍNH GIỮA khung nhìn
    //     });
    //   }, 10);

    //   return () => clearTimeout(timer);
    // }
  }, [bunbouData, isDropdownOpen, currentIndex, grammars.length]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (grammars.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500">Không có dữ liệu ngữ pháp.</Text>
      </View>
    );
  }

  const currentItem = grammars[currentIndex];
  const examplesList: Example[] = currentItem.examples ? JSON.parse(currentItem.examples) : [];

  return (
    <View className="flex-1 bg-white">
      {/* Nút Trigger Dropdown ở trên cùng */}
      <View className="px-5 py-4 border-b border-gray-200 bg-gray-50">
        <TouchableOpacity
          onPress={() => setIsDropdownOpen(true)}
          className="flex-row justify-between items-center bg-white border border-gray-300 p-3 rounded-lg shadow-sm"
        >
          <Text className="text-lg font-medium text-gray-800" numberOfLines={1}>
            {currentItem.structure}
          </Text>
          <Ionicons name="chevron-down" size={24} color="#4b5563" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Phần Header: Cấu trúc & Ý nghĩa */}
        <View className="items-center">
          <Text className="text-red-500 text-3xl font-bold mb-2 text-center">
            {currentItem.structure.replace(/^\d+\./, '')}
          </Text>
          <Text className="text-gray-800 text-xl text-center">
            {currentItem.meaning}
          </Text>
        </View>

        {/* Phần Giải thích */}
        {currentItem.explanation && (
          <View className="mb-6">
            <View className="self-start border-b-2 border-blue-600 mb-3">
              <Text className="text-blue-600 text-2xl font-semibold pb-1">Giải thích:</Text>
            </View>
            <Text className="text-gray-800 text-lg leading-7">
              {currentItem.explanation}
            </Text>
          </View>
        )}

        {/* Phần Ví dụ */}
        {examplesList.length > 0 && (
          <View className="mb-6">
            <View className="self-start border-b-2 border-blue-600 mb-3">
              <Text className="text-blue-600 text-2xl font-semibold pb-1">Ví dụ:</Text>
            </View>
            {examplesList.map((ex, index) => (
              <View key={index} className="mb-4">
                <Text className="text-gray-900 text-lg font-medium leading-7">
                  {ex.japanese}
                </Text>
                <Text className="text-gray-700 text-base leading-6 mt-1">
                  {ex.vietnamese}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Phần Chú ý */}
        {currentItem.note && (
          <View className="mb-6">
            <View className="self-start border-b-2 border-blue-600 mb-3">
              <Text className="text-blue-600 text-2xl font-semibold pb-1">Chú ý:</Text>
            </View>
            <Text className="text-gray-800 text-lg leading-7">
              {currentItem.note}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Modal Dropdown hiển thị danh sách ngữ pháp */}
      <Modal visible={isDropdownOpen} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/40 justify-center items-center"
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View className="bg-white w-5/6 max-h-[70%] rounded-xl shadow-lg overflow-hidden">
            <View className="p-4 border-b border-gray-200 bg-gray-50 flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-800">Chọn cấu trúc</Text>
              <TouchableOpacity onPress={() => setIsDropdownOpen(false)}>
                <Ionicons name="close" size={24} color="#4b5563" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {grammars.map((grammar, index) => (
                <TouchableOpacity
                  key={grammar.id}
                  onPress={() => {
                    setCurrentIndex(index);
                    setIsDropdownOpen(false);
                  }}
                  className={`p-4 border-b border-gray-100 flex-row items-center justify-between ${index === currentIndex ? 'bg-blue-50' : 'bg-white'
                    }`}
                >
                  <Text
                    className={`text-base flex-1 pr-2 ${index === currentIndex ? 'text-blue-600 font-bold' : 'text-gray-700'
                      }`}
                  >
                    {grammar.structure}
                  </Text>
                  {index === currentIndex && (
                    <Ionicons name="checkmark" size={20} color="#2563eb" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* <FlatList
              ref={flatListRef}
              data={grammars}
              keyExtractor={(item) => item.id.toString()}
              // Xử lý fallback nếu vị trí nằm ngoài khoảng đã render
              onScrollToIndexFailed={(info) => {
                flatListRef.current?.scrollToOffset({
                  offset: info.averageItemLength * info.index,
                  animated: true,
                });
              }}
              renderItem={({ item, index }) => {
                const isSelected = index === currentIndex;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentIndex(index);
                      setIsDropdownOpen(false);
                    }}
                    className={`p-4 border-b border-gray-100 flex-row items-center justify-between ${isSelected ? 'bg-blue-50' : 'bg-white'
                      }`}
                  >
                    <Text
                      className={`text-base flex-1 pr-2 ${isSelected ? 'text-blue-600 font-bold' : 'text-gray-700'
                        }`}
                    >
                      {item.structure}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark" size={20} color="#2563eb" />
                    )}
                  </TouchableOpacity>
                );
              }}
            /> */}

          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}