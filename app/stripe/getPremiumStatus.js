import { auth, db } from "@/firebase";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";

export const getSubscriptionStatus = async () => {
  const user = auth.currentUser;

  if (!user) {
    return false;
  }

  try {
    const collectionRef = collection(
      db,
      "customers",
      user.uid,
      "subscriptions"
    );

    const querySnapshot = query(
      collectionRef,
      where("status", "in", ["trailing", "active"]),
      orderBy("created", "desc")
    );

    const userSubscriptions = await getDocs(querySnapshot);

    // In this example, we only expect one active or trialing subscription to exist.

    if (userSubscriptions.docs.length === 0) {
      console.log("No active or trialing subscriptions found");
      return false;
    } else {
      console.log("Active or trialing subscription found");
      return true;
    }
  } catch (error) {
    if (error) {
      console.log(error);
    }
    return false;
  }
};