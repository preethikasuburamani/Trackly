import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

class AuthService {
  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async logout() {
    return await signOut(auth);
  }

  getCurrentUser() {
    return auth.currentUser;
  }
}

export default new AuthService();