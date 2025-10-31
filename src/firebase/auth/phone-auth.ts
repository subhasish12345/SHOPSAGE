'use client';

import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

declare global {
    interface Window {
        recaptchaVerifier?: RecaptchaVerifier;
    }
}

export function setupRecaptcha(containerId: string) {
    const auth = getAuth();
    // In this development environment, we need to use an invisible reCAPTCHA
    // that is resolved on a button click, rather than a visible one.
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
            'size': 'invisible',
            'callback': (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
    }
    return window.recaptchaVerifier;
}

export async function checkPhoneNumberExists(phoneNumber: string): Promise<boolean> {
    const db = getFirestore();
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("phone", "==", phoneNumber));

    try {
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error checking phone number:", error);
        return false; // Fail safe
    }
}
