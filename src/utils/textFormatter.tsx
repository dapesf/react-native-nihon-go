import React from 'react';
import { Text } from 'react-native';

/**
 * Hàm phân tích và render chuỗi văn bản có chứa các thẻ đánh dấu HTML cơ bản.
 * Hỗ trợ:
 * - <s>...</s>: Gạch ngang (strikethrough)
 * - <u>...</u>: Gạch dưới (underline)
 */
export const renderFormattedText = (text: string) => {
  if (!text) return null;

  // Xoá bỏ hoàn toàn các thẻ <br>, <br/>, <br /> khỏi chuỗi
  const cleanedText = text.replace(/<br\s*\/?>/gi, '');

  // Pattern tìm <s>...</s> hoặc <u>...</u>
  const regex = /(<s>.*?<\/s>|<u>.*?<\/u>)/g;
  const parts = cleanedText.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith('<s>') && part.endsWith('</s>')) {
      const content = part.replace(/<\/?s>/g, '');
      return (
        <Text key={index} style={{ textDecorationLine: 'line-through', color: 'red' }}>
          {content}
        </Text>
      );
    }
    
    if (part.startsWith('<u>') && part.endsWith('</u>')) {
      const content = part.replace(/<\/?u>/g, '');
      return (
        <Text key={index} style={{ textDecorationLine: 'underline' }}>
          {content}
        </Text>
      );
    }

    return <Text key={index}>{part}</Text>;
  });
};
