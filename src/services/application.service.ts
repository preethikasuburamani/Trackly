import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import type { Application } from "../types/application.types";

class ApplicationService {
  private collectionName = "applications";

  async create(application: Application) {
    return addDoc(
      collection(db, this.collectionName),
      application
    );
  }

  async getAll(userId: string) {
    const q = query(
      collection(db, this.collectionName),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Application),
    }));
  }

  async update(
    id: string,
    data: Partial<Application>
  ) {
    return updateDoc(
      doc(db, this.collectionName, id),
      data
    );
  }

  async delete(id: string) {
    return deleteDoc(
      doc(db, this.collectionName, id)
    );
  }
}

export default new ApplicationService();