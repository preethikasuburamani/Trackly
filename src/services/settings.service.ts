import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

class SettingsService {

  async get(uid: string) {

    const ref = doc(
      db,
      "settings",
      uid
    );

    const snap =
      await getDoc(ref);

    if (!snap.exists()) {
      return null;
    }

    return snap.data();
  }

  async save(
    uid: string,
    data: any
  ) {

    await setDoc(
      doc(
        db,
        "settings",
        uid
      ),
      data
    );
  }
}

export default new SettingsService();