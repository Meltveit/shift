'use client';

import { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, type Query } from 'firebase/firestore';
import { useFirestore } from '../provider';
import type { DocumentData } from 'firebase/firestore';

export function useCollection<T>(path?: string | null | undefined) {
  const [data, setData] = useState<(T & { id: string })[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestore = useFirestore();

  const pathRef = useRef(path);
  pathRef.current = path;

  useEffect(() => {
    if (!firestore || !path) {
      setLoading(false);
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    const collectionQuery: Query<DocumentData> = query(collection(firestore, path));

    const unsubscribe = onSnapshot(
      collectionQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as T),
        }));
        setData(docs);
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching collection ${path}:`, err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, path]);

  return { data, loading, error };
}
