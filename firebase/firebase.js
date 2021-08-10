import app from "firebase";
import firebaseConfig from "./config";
import "firebase/auth";
import "firebase/firestore"
import "firebase/storage"

class Firebase {
  constructor() {
    if (!app.apps.length) app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore()
    this.storage = app.storage()
  }

  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
      displayName: name,
    });
  }

  async logIn(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logOut() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
