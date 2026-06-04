import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

class AuthService {

  async register(
    fullName: string,
    email: string,
    password: string
  ) {

    const credential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await updateProfile(
      credential.user,
      {
        displayName:
          fullName,
      }
    );

    await setDoc(
      doc(
        db,
        "users",
        credential.user.uid
      ),
      {
        uid:
          credential.user.uid,

        fullName,

        email,

        createdAt:
          new Date().toISOString(),
      }
    );

    return credential.user;
  }

  async login(
    email: string,
    password: string
  ) {
    const credential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    return credential.user;
  }

  async logout() {
    await signOut(auth);
  }
}

export default new AuthService();