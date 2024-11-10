import { auth, db } from '../config/firebase';
import { sendEmailVerification, applyActionCode } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export const sendVerificationEmail = async (email: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    // Send verification email
    await sendEmailVerification(user, {
      url: `${window.location.origin}/verify-email`,
      handleCodeInApp: true,
    });

    return true;
  } catch (error: any) {
    console.error('Error sending verification email:', error);
    throw new Error(error.message);
  }
};

export const verifyEmail = async (code: string) => {
  try {
    await applyActionCode(auth, code);
    
    // Update user document
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        emailVerified: true,
        updatedAt: new Date().toISOString()
      });
    }

    return true;
  } catch (error: any) {
    console.error('Error verifying email:', error);
    throw new Error(error.message);
  }
};