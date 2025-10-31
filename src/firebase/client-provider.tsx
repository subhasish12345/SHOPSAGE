'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { useCreateUser } from '@/firebase/auth/use-create-user';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

function InnerFirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  // This custom hook will automatically create a user document in Firestore
  // when a new user signs up or logs in for the first time.
  useCreateUser();

  return <>{children}</>;
}


export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      <InnerFirebaseClientProvider>
        {children}
      </InnerFirebaseClientProvider>
    </FirebaseProvider>
  );
}
