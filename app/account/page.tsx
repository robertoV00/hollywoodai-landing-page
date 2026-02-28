"use client";

export const dynamic = 'force-dynamic';

// import PremiumContent from "../../components/PremiumContent";
// import StandardContent from "../../components/StandardContent";
import React, { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { loadCheckout, loadPortal } from "../stripe/stripePayment"
import { getSubscriptionStatus } from "../stripe/getPremiumStatus";

export default function page() {

  interface statusProps {
    premiumStatus: boolean
  }


  const username = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
    const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  const upgradeToPremium = async () => {
    const priceId = "price_1Svi6NKjhcxrXZvokEeFBQY8"; // Replace with your actual price ID
    loadCheckout(priceId)
    console.log("upgradeToPremium()");
  };

  const manageSubscription = async () => {
    loadPortal()
    console.log("manageSubscription()");
  };

  const logOut = () => {
    signOut(auth)
    router.push('/');
  };

  useEffect(() => {
    const checkPremium = async () => {
        const premiumStatus = await getSubscriptionStatus()
        setIsPremium(premiumStatus);
    }

    checkPremium()
  }, [auth.currentUser]);

  return (
    <div className="userInfo">
      <div className="userInfo__details">
        <div className="userInfo__name">Signed in as {username}</div>
        <div className="userInfo__email">{email}</div>
      </div>

      {/* {isPremium ? <PremiumContent /> : <StandardContent />} */}

      <button
        onClick={isPremium ? manageSubscription : upgradeToPremium}
        className="userInfo__button"
      >
        <div className="userInfo__button__content">
          {isPremium ? "Manage Subscription" : "Upgrade To Premium"}
        </div>
      </button>

      <button onClick={logOut} className="userInfo__signOut">
        <div className="userInfo__signOut__content">Sign Out</div>
      </button>
    </div>
  );
}
