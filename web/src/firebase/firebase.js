import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc4pNwHjMcpVY2BJtPIcotvcD7sf_b_aE",
  authDomain: "parolla-game.firebaseapp.com",
  projectId: "parolla-game",
  storageBucket: "parolla-game.firebasestorage.app",
  messagingSenderId: "253001551781",
  appId: "1:253001551781:web:9d31b4b8d36ba803b7624c",
  measurementId: "G-0VKE40CM4N"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };