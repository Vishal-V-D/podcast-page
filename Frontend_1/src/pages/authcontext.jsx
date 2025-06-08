import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  provider,
  db,
} from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [pendingApproval, setPendingApproval] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check user status in Firestore
  const checkUserStatus = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (!userDoc.exists()) {
        setPendingApproval(true);
        return false;
      }
      const userData = userDoc.data();
      if (userData.approved === true && userData.status === 'approved') {
        setPendingApproval(false);
        return true;
      } else if (userData.approved === false || userData.status === 'revoked') {
        setPendingApproval(true);
        return false;
      } else {
        await signOut(auth);
        setError('Your registration was rejected. Contact support.');
        return false;
      }
    } catch {
      setError('Failed to verify user status. Try again.');
      return false;
    }
  };

  // Email Login
  async function login(email, password) {
    setError('');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const approved = await checkUserStatus(userCredential.user.uid);
      if (approved) {
        setCurrentUser(userCredential.user);
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      setError(err.message);
      setCurrentUser(null);
    }
    setLoading(false);
  }

  // Email Signup
  async function signup(email, password, role) {
    setError('');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        approved: false,
        email,
        role,
        status: 'pending',
        createdAt: new Date(),
      });
      setPendingApproval(true);
      setCurrentUser(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  // Google Auth
  async function googleAuth() {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          role: 'Listener',
          status: 'pending',
          createdAt: new Date(),
          approved: false,
        });
        setPendingApproval(true);
        setCurrentUser(null);
      } else {
        const data = userDoc.data();
        if (data.approved === true || data.status === 'approved') {
          setPendingApproval(false);
          setCurrentUser(user);
        } else if (data.approved === false || data.status !== 'approved') {
          setPendingApproval(true);
          setCurrentUser(null);
        } else {
          await signOut(auth);
          setError('Your registration was rejected. Contact support.');
          setCurrentUser(null);
        }
      }
    } catch (err) {
      setError(err.message);
      setCurrentUser(null);
    }
    setLoading(false);
  }

  // Logout
  async function logout() {
    setError('');
    setLoading(true);
    try {
      await signOut(auth);
      setCurrentUser(null);
      setPendingApproval(false);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  // ✅ Listen for auth state changes AND real-time user status updates
  useEffect(() => {
    let unsubscribeUserDoc = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        // Real-time listener to Firestore user's status
        unsubscribeUserDoc = onSnapshot(doc(db, 'users', uid), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();

            if (data.status === 'approved' && data.approved === true) {
              setCurrentUser(user);
              setPendingApproval(false);
              setError('');
            } else if (data.status !== 'approved' || data.approved === false) {
              setPendingApproval(true);
              setCurrentUser(null);
              setError('Your registration was rejected.');
              signOut(auth).then(() => {
                navigate('/login');
              });
            } else {
              setPendingApproval(true);
              setCurrentUser(null);
            }
          } else {
            setPendingApproval(true);
            setCurrentUser(null);
          }
          setLoading(false);
        });
      } else {
        setCurrentUser(null);
        setPendingApproval(false);
        setLoading(false);
      }
    });

    return () => {
      if (unsubscribeUserDoc) unsubscribeUserDoc();
      unsubscribeAuth();
    };
  }, []);

  const value = {
    currentUser,
    pendingApproval,
    loading,
    error,
    login,
    signup,
    googleAuth,
    logout,
    setError,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
