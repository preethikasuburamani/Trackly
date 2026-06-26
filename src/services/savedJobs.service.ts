import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

class SavedJobsService {
  private collectionName = "savedJobs";

  async saveJob(job: any) {
  console.log("Saving Job:", job);

  return await addDoc(
    collection(db, this.collectionName),
    job
  );
}

  async getSavedJobs(userId: string) {
    const q = query(
      collection(db, this.collectionName),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async removeSavedJob(id: string) {
    return await deleteDoc(
      doc(db, this.collectionName, id)
    );
  }

  async getSavedJob(id: string) {
  const snapshot = await getDoc(
    doc(db, this.collectionName, id)
  );

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}
}

export default new SavedJobsService();