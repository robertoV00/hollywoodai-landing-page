import { auth, db, app } from "@/firebase";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "@firebase/functions";

export const loadCheckout = async (priceId, uid) => {
  console.log('loadCheckout called', { priceId, uid })
  if (!uid) {
    console.log('no uid, returning')
    return
  }

  try {
    const collectionRef = collection(db, "customers", uid, "checkout_sessions")
    console.log('adding doc...')

    const addCurrentCheckout = await addDoc(collectionRef, {
      price: priceId,
      allow_promotion_codes: true,
      success_url: window.location.href,
      cancel_url: window.location.href,
    })

    console.log('doc added:', addCurrentCheckout.id)

    const currentCheckoutRef = doc(collectionRef, addCurrentCheckout.id)

    const unsubscribe = onSnapshot(currentCheckoutRef, (snapshot) => {
      const currentCheckoutData = snapshot.data()
      console.log('snapshot data:', currentCheckoutData)
      if (!currentCheckoutData?.url) return
      window.location.assign(currentCheckoutData.url)
      unsubscribe()
    })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    alert(error.message)
  }
}