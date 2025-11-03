import { initializeApp, getApps, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';
import { useUser, type User } from './auth/use-user';
import { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';
import { FirebaseClientProvider } from './client-provider';

let firebaseApp: ReturnType<typeof initializeApp>;
let auth: ReturnType<typeof getAuth>;
let firestore: ReturnType<typeof getFirestore>;

function initializeFirebase(options: FirebaseOptions = {}) {
  const isInitialized = getApps().length > 0;
  if (isInitialized) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { firebaseApp: getApps()[0]!, auth, firestore };
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
  useUser,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
  type User,
};
