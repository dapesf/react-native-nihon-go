import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/model/RootStackParamList';
import { RootStackParamList } from '@/model/RootStackParamList';

export const useAppNavigation = () => {
  // Gắn type đã tạo vào hook mặc định của React Navigation
  const navigation = useNavigation<AppNavigationProp>();

  // Hàm quay lại màn hình trước an toàn
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // Các hàm điều hướng cụ thể
  const goToDashboard = () => navigation.navigate("DashboardLayout");

  // const goToLesson = (lessonId: number, page: number) => {
  //   navigation.navigate('LessonDetail', { lessonId, page });
  // };

  const goToStack = (stack: keyof RootStackParamList) => navigation.navigate(stack);

  // Reset luồng (ví dụ: sau khi Đăng xuất thì xóa hết lịch sử, đưa về màn Home)
  const resetToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'DashboardLayout' }],
    });
  };

  // Trả về tất cả các hàm này cộng thêm đối tượng navigation gốc phòng khi cần
  return {
    goBack
    , goToDashboard
    , goToStack
    //, goToLesson
    , resetToHome
    , navigation
  }
}

export default useAppNavigation;