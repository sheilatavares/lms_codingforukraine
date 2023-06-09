import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';

export const useFetchLessons = (docCollection, moduleSlug, sectionSlug) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

        q = await query(
          collectionRef,
          where('moduleSlug', '==', moduleSlug),
          where('sectionSlug', '==', sectionSlug),
          orderBy('ordination', 'asc'),
        );

        await onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.empty) {
            console.error('No documents found');
            setLoading(false);
            return;
          }
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, moduleSlug, sectionSlug, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  // console.log(documents);
  return { documents, loading, error };
};

// import { useState, useEffect } from 'react';
// import { db } from '../firebase/config';
// import { collection, where, orderBy, onSnapshot } from 'firebase/firestore';

// export const useFetchLessons = (docCollection, section) => {
//   const [documents, setDocuments] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let unsubscribe = null;
//     const fetchData = async () => {
//       try {
//         const collectionRef = await collection(db, docCollection);
//         const queryRef = await where('sectionId', '==', section);
//         const orderedQueryRef = await orderBy(queryRef, 'ordination', 'asc');
//         unsubscribe = await onSnapshot(orderedQueryRef, (snapshot) => {
//           setDocuments(
//             snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
//           );
//           setLoading(false);
//         });
//         console.log(unsubscribe);
//       } catch (error) {
//         setError(error.message);
//         console.log(error);
//         setLoading(false);
//       }
//     };
//     fetchData();
//     return () => {
//       if (unsubscribe) {
//         unsubscribe();
//       }
//     };
//   }, [docCollection, section]);

//   return { documents, loading, error };
// };
