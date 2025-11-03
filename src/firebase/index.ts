import { initializeApp, getApps, type FirebaseOptions } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { firebaseConfig } from './config';
import { useUser, type User } from './auth/use-user';
import { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { useMemoFirebase } from './use-memo-firebase';
import { FirebaseClientProvider } from './client-provider';

let firebaseApp: ReturnType<typeof initializeApp>;
let auth: ReturnType<typeof getAuth>;
let firestore: ReturnType<typeof getFirestore>;

function initializeFirebase(options: FirebaseOptions = {}) {
  const isInitialized = getApps().length > 0;
  if (isInitialized) {
    return { firebaseApp, auth, firestore };
  }

  firebaseApp = initializeApp({ ...firebaseConfig, ...options });
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);

  return { firebaseApp, auth, firestore };
}

export {
  initializeFirebase,
  FirebaseProvider,
  FirebaseClientProvider,
  useCollection,
  useDoc,
  useUser,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
  useMemoFirebase,
  type User,
};
