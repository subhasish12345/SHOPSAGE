
'use client';

import { useEffect } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * A hook that automatically creates a user document in Firestore if one doesn't already exist.
 * This is useful for ensuring that user profiles are created upon first sign-in.
 */
export function useCreateUser() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    if (!user || isUserLoading || !firestore) {
      return;
    }

    const createUserDocument = async () => {
      if (!firestore) return;
      const userRef = doc(firestore, 'users', user.uid);

      try {
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          const newUser = {
            id: user.uid,
            name: user.displayName || 'New User',
            email: user.email,
            profilePic: user.photoURL,
            phone: user.phoneNumber, // This might be null
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          
          setDoc(userRef, newUser).catch(error => {
            const permissionError = new FirestorePermissionError({
                path: userRef.path,
                operation: 'create',
                requestResourceData: newUser
            });
            errorEmitter.emit('permission-error', permissionError);
          });
        }
      } catch (error) {
        // This will catch errors from getDoc, which might be a permission error itself.
        // For now, we'll log it, but a more robust implementation might emit this too.
        console.error("Error checking for user document:", error);
      }
    };

    createUserDocument();
  }, [user, isUserLoading, firestore]);
}
