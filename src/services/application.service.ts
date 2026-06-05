import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
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

async getAll() {
  const snapshot = await getDocs(
    collection(db, this.collectionName)
  );

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


  async getById(id: string) {
  const documentRef = doc(
    db,
    this.collectionName,
    id
  );

  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Application),
  };
}
}

export default new ApplicationService();