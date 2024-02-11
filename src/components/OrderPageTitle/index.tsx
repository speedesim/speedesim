"use client";

import { AddRewardInTable } from "@/actions/AddRewardinTable";
import { AddCashBackBonus } from "@/actions/addCashbackBonus";
import { checkFirstPurchase } from "@/actions/checkFirstPurchase";
import { DeductBalanceFromUserWallet } from "@/actions/deductBalanceFromWallet";
import useOrderStore from "@/utils/useOrderState";
import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

interface OrderPageTitleProps {
  orderid?: string;
  validCode?: number;
  cashback?: string;
  balance?: string;
  price?: string;
  email?: string;
  title?: string;
}

export const OrderPageTitle = ({
  orderid,
  validCode,
  cashback,
  balance,
  price,
  email,
  title,
}: OrderPageTitleProps) => {
  const [rewardState, setRewardState] = useLocalStorage("AddReward", {
    addReward: false,
  });
  const [cashbackState, setCashbackState] = useLocalStorage("Cashback", {
    cashback: false,
  });
  const [balanceState, setBalanceState] = useLocalStorage("Balance", {
    balance: false,
  });
  const {
    balanceDeductOfUser,
    cashbackProcessed,
    setBalanceDeductOfUser,
    setCashbackProcessed,
    addRewardinTable,
    setAddRewardinTable,
  } = useOrderStore();

  //   const validCodeFunction = async () => {
  //       if (validCode && !addRewardinTable) {
  //           await AddRewardInTable({
  //             type: "Added",
  //             amount: "5",
  //             datetime: new Date().toLocaleDateString(),
  //             email: email,
  //           });
  //           // addRewardinTable = true;
  //           setAddRewardinTable(true);
  //         }
  //   }

  //   const validCode2 = async () => {
  //       if (validCode) {
  //         await checkFirstPurchase({
  //           referencecode: String(validCode),
  //         });
  //       } else {
  //         await checkFirstPurchase();
  //       }
  //   }

  //   const validCode3 = async () => {
  //       if (
  //         validCode &&
  //         balance &&
  //         !balanceDeductOfUser
  //       ) {
  //         await checkFirstPurchase({
  //           referencecode: String(validCode),
  //         });
  //         await DeductBalanceFromUserWallet(balance);
  //         // balanceDeductOfUser = true;
  //         setBalanceDeductOfUser(true);
  //       } else {
  //         await checkFirstPurchase();
  //       }
  //   }

  //   const cashbackFunction = async () => {
  //       if (
  //         cashback &&
  //         !cashbackProcessed &&
  //         balance &&
  //         !balanceDeductOfUser
  //       ) {
  //         await AddCashBackBonus(cashback);
  //         await DeductBalanceFromUserWallet(balance);
  //         // cashbackProcessed = true;
  //         // balanceDeductOfUser = true;
  //         setCashbackProcessed(true);
  //         setBalanceDeductOfUser(true);
  //       }
  //   }

  //   const cashbackFunction2 = async () => {
  //       // // Check if cashback has not been processed yet
  //       if (cashback && !cashbackProcessed) {
  //         // Mark the flag to indicate that cashback has been processed
  //         await AddCashBackBonus(cashback);
  //         // cashbackProcessed = true;
  //         setCashbackProcessed(true);
  //         // Process the cashback
  //       }
  //   }

  //   const balanceFunction = async () => {
  //       if (balance && !balanceDeductOfUser) {
  //         await DeductBalanceFromUserWallet(balance);
  //         // balanceDeductOfUser = true;
  //         setBalanceDeductOfUser(true);
  //       }
  //   }

  useEffect(() => {
    const validCodeFunction = async () => {
      if (validCode && !addRewardinTable) {
        await AddRewardInTable({
          type: "Added",
          amount: "5.00",
          datetime: new Date().toLocaleDateString(),
          email: email,
        });
        setAddRewardinTable(true);
        // setRewardState({ addReward: addRewardinTable });
      }
    };

    const validCode2 = async () => {
      if (validCode) {
        await checkFirstPurchase({
          referencecode: String(validCode),
        });
      } else {
        console.log("Inside validCode2 function --->");

        await checkFirstPurchase();
        setAddRewardinTable(true);
      }
    };

    const validCode3 = async () => {
      if (validCode && balance && !balanceDeductOfUser) {
        await checkFirstPurchase({
          referencecode: String(validCode),
        });
        await DeductBalanceFromUserWallet(balance);
        setBalanceDeductOfUser(true);
      } else {
        await checkFirstPurchase();
      }
    };

    const cashbackFunction = async () => {
      if (cashback && !cashbackProcessed && balance && !balanceDeductOfUser) {
        await AddCashBackBonus(cashback);
        await DeductBalanceFromUserWallet(balance);
        setCashbackProcessed(true);
        setBalanceDeductOfUser(true);
      }
    };

    const cashbackFunction2 = async () => {
      if (cashback && !cashbackProcessed) {
        await AddCashBackBonus(cashback);
        setCashbackProcessed(true);
      }
    };

    const balanceFunction = async () => {
      if (balance && !balanceDeductOfUser) {
        await DeductBalanceFromUserWallet(balance);
        setBalanceDeductOfUser(true);
      }
    };

    validCodeFunction();
    validCode2();
    validCode3();
    cashbackFunction();
    cashbackFunction2();
    balanceFunction();
  }, [
    validCode,
    addRewardinTable,
    balance,
    balanceDeductOfUser,
    cashback,
    cashbackProcessed,
    email,
    setAddRewardinTable,
    setBalanceDeductOfUser,
    setCashbackProcessed,
    setRewardState,
  ]);

  useEffect(() => {
    setRewardState({ addReward: addRewardinTable });
    setCashbackState({ cashback: cashbackProcessed });
  }, [addRewardinTable, setRewardState, cashbackProcessed, setCashbackState]);

  //   useEffect to load initial state from local storage
  useEffect(() => {
    setAddRewardinTable(rewardState.addReward);
    setCashbackProcessed(cashbackState.cashback);
  }, [
    cashbackState.cashback,
    rewardState.addReward,
    setAddRewardinTable,
    setCashbackProcessed,
  ]);

  // Set timers for resetting local storage values after 30 seconds
  // useEffect(() => {
  //   const fetch = () => {
  //     const rewardTimer = setInterval(() => {
  //       setRewardState({ addReward: false });
  //       setCashbackState({ cashback: false });
  //       setBalanceState({ balance: false });
  //     }, 10000);

  //     // Cleanup function to clear timers when component unmounts
  //     return () => {
  //       clearInterval(rewardTimer);
  //     };
  //   };

  //   fetch();
  // }, [setRewardState, setCashbackState, setBalanceState]);

  return <div className="text-center font-bold">{title}</div>;
};
