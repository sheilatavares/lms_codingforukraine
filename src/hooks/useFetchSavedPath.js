import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';

export const useFetchSavedPath = (
  docCollection,
  userId = null,
  lessonId = null,
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        if (userId && lessonId) {
          q = await query(
            collectionRef,
            where('userId', '==', userId),
            where('lessonId', '==', lessonId),
            orderBy('createdAt', 'desc'),
          );
        } else if (userId) {
          q = await query(
            collectionRef,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc'),
          );
        } else if (lessonId) {
          q = await query(
            collectionRef,
            where('lessonId', '==', lessonId),
            orderBy('createdAt', 'desc'),
          );
        } else {
          q = await query(collectionRef, orderBy('ordination', 'asc'));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });
      } catch (error) {
        console.log(error);
        setError(error.message);
      }

      setLoading(false);
    }

    loadData();
  }, [docCollection, userId, lessonId, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
