import admin from "firebase-admin";
import serviceAccount from "../service-account.json";

export const firebaseMessage = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "helpcoor",
});
