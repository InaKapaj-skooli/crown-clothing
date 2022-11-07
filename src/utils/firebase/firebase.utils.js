import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA0tEd3ubpdzHUm0MrXtnxWR8jkFAga2lo",
    authDomain: "crown-clothing-db-7e069.firebaseapp.com",
    projectId: "crown-clothing-db-7e069",
    storageBucket: "crown-clothing-db-7e069.appspot.com",
    messagingSenderId: "1066084042676",
    appId: "1:1066084042676:web:98c25626a71e23427d14e1"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromnAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch(error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef;
};