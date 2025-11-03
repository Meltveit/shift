'use client';

import { initializeFirebase, FirebaseProvider } from '@/firebase';

const { firebaseApp, auth, firestore } = initializeFirebase();

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseProvider value={{ app: firebaseApp, auth, firestore }}>
      {children}
    </FirebaseProvider>
  );
}
