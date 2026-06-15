import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import type { Profile } from "../types/profile.types";

class ProfileService {

  async getProfile(
    uid: string
  ) {
    const docRef = doc(
      db,
      "profiles",
      uid
    );

    const snapshot =
      await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as Profile;
  }

  async saveProfile(
    uid: string,
    data: Profile
  ) {
    await setDoc(
      doc(
        db,
        "profiles",
        uid
      ),
      data
    );
  }
}

export default new ProfileService();