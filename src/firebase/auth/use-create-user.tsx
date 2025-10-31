'use client';

import { useEffect } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';

/**
 * A hook that automatically creates a user document in Firestore if one doesn't already exist.
 * This is useful for ensuring that user profiles are created upon first sign-in.
 */
export function useCreateUser() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    if (!user || isUserLoading) {
      return;
    }

    const createUserDocument = async () => {
      if (!firestore) return;
      const userRef = doc(firestore, 'users', user.uid);
      
      try {
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          // Check for phone number uniqueness before creating user
          if (user.phoneNumber) {
            const usersRef = collection(firestore, 'users');
            const q = query(usersRef, where("phone", "==", user.phoneNumber));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              console.error("Phone number already exists.");
              // Here you might want to sign out the user or merge accounts
              // For simplicity, we'll just log an error.
              return;
            }
          }

          const newUser = {
            id: user.uid,
            name: user.displayName || 'New User',
            email: user.email,
            profilePic: user.photoURL,
            phone: user.phoneNumber,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          
          await setDoc(userRef, newUser);
        }
      } catch (error) {
        console.error("Error creating user document:", error);
      }
    };

    createUserDocument();
  }, [user, isUserLoading, firestore]);
}
