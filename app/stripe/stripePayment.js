import { auth, db, app } from "@/firebase";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "@firebase/functions";



export const loadCheckout = async (priceId) => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    // Reference to the 'checkout_sessions' collection for the current user
    const collectionRef = collection(
      db,
      "customers",
      user.uid,
      "checkout_sessions"
    );

    // Add a new checkout session document in that collection
    const addCurrentCheckout = await addDoc(collectionRef, {
      price: priceId,
      allow_promotion_codes: true,
      success_url: window.location.href,
      cancel_url: window.location.href,
    });

    // Reference to the checkout session document we just created
    const currentCheckoutRef = doc(collectionRef, addCurrentCheckout.id);

    // Listen for changes to the checkout session document
    const unsubscribe = onSnapshot(currentCheckoutRef, (snapshot) => {
      const currentCheckoutData = snapshot.data();

      if (currentCheckoutData.url === undefined) {
        return;
      }

      window.location.assign(currentCheckoutData.url);

      unsubscribe();
    });
  } catch (error) {
    alert(error.message);
  }
};


export const loadPortal = async () => {
    const user = auth.currentUser;
  
    if (!user) {
      return;
    }
  
    try {
      const instance = getFunctions(app, "us-central1");
      const functionRef = httpsCallable(
        instance,
        "ext-firestore-stripe-payments-createPortalLink"
      );
  
      const { data } = await functionRef({
        returnUrl: window.location.href,
      });
  
      window.location.assign(data.url);
    } catch (error) {
      alert(error);
    }
  };
  