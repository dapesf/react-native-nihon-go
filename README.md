<div align="center">
  
  # 🌸 Nihon Go - Ứng dụng Học Tiếng Nhật 🌸

  *Hành trang vững chắc chinh phục tiếng Nhật của bạn*

  ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

<br />

**Nihon Go** là một ứng dụng di động được xây dựng bằng hệ sinh thái **React Native (Expo)**, mang đến trải nghiệm học tập tiếng Nhật cực kỳ trực quan, mượt mà và hiệu quả. 

---

## ✨ Các tính năng chính (Features)

Ứng dụng cung cấp hệ thống ôn luyện toàn diện được chia thành các phân hệ cốt lõi:

- 📚 **Từ vựng (Tango):** Ôn luyện từ vựng qua từng bài học một cách khoa học. Hỗ trợ hiển thị đầy đủ Hán tự, Hán Việt và Hiragana.
- 🖌️ **Hán tự (Kanji):** Tra cứu chuyên sâu và học cách viết Hán tự với **hoạt ảnh (animation)** mô phỏng từng nét vẽ cọ sinh động và chân thực nhất.
- 📝 **Ngữ pháp (Grammar):** Cung cấp các cấu trúc ngữ pháp cơ bản, tích hợp sẵn hệ thống giáo trình bài bản như *Đông Du*.
- 🔠 **Bảng chữ cái (Alphabet):** Nền tảng không thể thiếu giúp người mới bắt đầu làm quen với *Hiragana* và *Katakana*.

---

## 🛠 Công nghệ sử dụng (Tech Stack)

Dự án hội tụ những công nghệ và thư viện hiện đại nhất trong thế giới Mobile App:

| Công nghệ | Thư viện / Chi tiết |
| --- | --- |
| **Framework** | React Native (Expo) |
| **Ngôn ngữ** | TypeScript |
| **UI & Styling** | Tailwind CSS (tích hợp qua `NativeWind`) |
| **Điều hướng** | React Navigation (Native-Stack & Bottom-Tabs) |
| **Đa ngôn ngữ** | `react-i18next` (Tách biệt ngôn ngữ vi/ja) |
| **Cơ sở dữ liệu** | SQLite (`expo-sqlite` - Offline database) |
| **Quản lý State** | Zustand |

---

## 📐 Kiến trúc & Quy ước (Architecture & Guidelines)

Dự án tuân thủ nghiêm ngặt các tiêu chuẩn mã nguồn sạch:

- ⚛️ **Component:** 100% sử dụng Functional Components kết hợp với React Hooks.
- 🎨 **Styling:** Ưu tiên tối đa Tailwind (`className`). Chỉ dùng `StyleSheet` cho các tính toán style động (runtime).
- 🌍 **i18n:** Tuyệt đối không hardcode chuỗi hiển thị. Mọi văn bản phải đi qua hook `useTranslation()`.
- 📁 **Cấu trúc:** Áp dụng mô hình Feature-based (`src/features/`). Mỗi tính năng (ví dụ `fukushuo`) sẽ bao gồm các tầng riêng biệt như `layout/`, `components/`, và `hooks/`.
- ⚡ **UX / UI:** Mọi thao tác truy vấn SQLite đều được bọc bởi cờ `loading` và hiển thị `<ActivityIndicator>` giúp trải nghiệm mượt mà, không đứt gãy.

---


## 🚀 Hướng dẫn cài đặt (Installation)

Chỉ với 2 bước đơn giản để khởi chạy ứng dụng trên máy của bạn:

1. **Cài đặt các thư viện phụ thuộc:**
   ```bash
   npm install
   ```

2. **Khởi chạy ứng dụng (Expo):**
   ```bash
   npx expo start
   ```

> **Mẹo:** Sử dụng ứng dụng **Expo Go** trên thiết bị thật (iOS/Android) và quét mã QR hiển thị trên Terminal để trải nghiệm ứng dụng!

---
<div align="center">
  <i>Được phát triển và tối ưu với ❤️ dành cho những người yêu thích tiếng Nhật.</i>
</div>
