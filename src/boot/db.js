import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { LocalStorage } from "quasar";
import { setTimeout } from "core-js";

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyBTHMSQDngvHH2dZs5kwwzDwj8kv5EUvCY",
    authDomain: "orderingsystem-e4632.firebaseapp.com",
    projectId: "orderingsystem-e4632",
    storageBucket: "orderingsystem-e4632.firebasestorage.app",
    messagingSenderId: "480604216971",
    appId: "1:480604216971:web:71c878a125bb2e65d7fe8e",
    measurementId: "G-MMG5TENPJX"
    // apiKey: 'AIzaSyCVYzQrlJedKomGy8ivTpjqTw5wPdTjw5o',
    // authDomain: 'bagn-chick.firebaseapp.com',
    // projectId: 'bagn-chick',
    // storageBucket: 'bagn-chick.appspot.com',
    // messagingSenderId: '862087590929',
    // appId: '1:862087590929:web:7c06ea5a0237179dad6db0',
    // measurementId: 'G-G1CFHKG8LE'
  })
  .firestore();

const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };

db.settings({ timestampsInSnapshots: true });

export default async ({ router, Vue }) => {
  Vue.prototype.$db = db;
  Vue.prototype.$firebase = firebase;

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("docc data", doc);
            const currentUser = {
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photURL: user.photoURL,
              providerId: user.providerId,
              uid: user.uid,
              isAdmin: false
            };
            db.collection("users")
              .doc(user.uid)
              .set(currentUser)
              .then(res => {
                console.log("ress", currentUser);
                LocalStorage.set("user", currentUser);
                router.push("/").catch(() => {});
              })
              .catch(error => {
                LocalStorage.remove("user");
              });
          } else {
            LocalStorage.set("user", doc.data());
            if (doc.data().isKitchen) {
              router.push("/order_history").catch(() => {});
            } else {
              router.push("/").catch(() => {});
            }
          }
        })
        .catch(error => {
          LocalStorage.remove("user");
          console.log("Error getting documents: ", error);
        });
    } else {
      LocalStorage.remove("user");
    }
  });

  router.beforeEach((to, from, next) => {
    const currentUser = LocalStorage.getItem("user");
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
      next("/login");
    } else if (!requiresAuth && currentUser) {
      next("/");
    } else {
      next();
    }
  });
};
