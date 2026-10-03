import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { TopicItem, VocabularyItem } from '../types';
import { getTopicsQuery, getVocabulariesByTopicQuery } from '../queries/queries';

export const useTangoGyokai = () => {
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [vocabularies, setVocabularies] = useState<VocabularyItem[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        const result = await db.getAllAsync<TopicItem>(getTopicsQuery);
        setTopics(result || []);
        if (result && result.length > 0) {
          setSelectedTopicId(result[0].id);
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
        setTopics([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [db]);

  useEffect(() => {
    const fetchVocabularies = async () => {
      if (!selectedTopicId) {
        setVocabularies([]);
        return;
      }
      try {
        setIsLoading(true);
        const result = await db.getAllAsync<VocabularyItem>(getVocabulariesByTopicQuery, [selectedTopicId]);
        setVocabularies(result || []);
      } catch (error) {
        console.error('Error fetching vocabularies:', error);
        setVocabularies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVocabularies();
  }, [db, selectedTopicId]);

  return {
    isLoading,
    topics,
    vocabularies,
    selectedTopicId,
    setSelectedTopicId,
  };
};
