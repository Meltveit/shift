'use client';

import {
  createContext,
  useContext,
  useMemo,
  type ComponentType,
  type ReactNode,
} from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

export interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined,
);

type FirebaseProviderProps = {
  children: React.ReactNode;
  value: FirebaseContextValue;
};

export function FirebaseProvider(props: FirebaseProviderProps) {
  const { value, children } = props;
  const memoizedValue = useMemo(() => value, [value]);

  return (
    <FirebaseContext.Provider value={memoizedValue}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export function useFirebaseApp() {
  const { app } = useFirebase();
  if (!app) {
    throw new Error('Firebase app not available');
  }
  return app;
}

export function useAuth() {
  const { auth } = useFirebase();
  if (!auth) {
    throw new Error('Firebase auth not available');
  }
  return auth;
}

export function useFirestore() {
  const { firestore } = useFirebase();
  if (!firestore) {
    throw new Error('Firestore not available');
  }
  return firestore;
}
