import React from "react";
import { Info } from "lucide-react";
import Image from "next/image";
import { User } from "../navbar";
import Link from "next/link";
import { DeleteUserFromDB } from "@/actions/deleteUserFromAdmin";

const list = [
  "Give 50% cashback up to $5 for your friend's first purchase.",
  "Receive the same amount credited to your Rewards Balance, on us.",
  "10% cashback to be credited to your Rewards Balance, to be used with your next purchases, OR",
  "3% off your bill.",
];

const WalletPageComponent = async ({ currentUser }: { currentUser: User }) => {
  // const deleteUser = await DeleteUserFromDB("muhammadmahdi512@gmail.com");
  // console.log("Delete User -----> ", deleteUser);
  return (
    <div className="pt-6">
      <h2 className="text-[2rem] ">Refer a friend</h2>
      <div className="space-y-2">
        {list.map((val, idx) => (
          <div className="flex items-center space-x-2" key={idx}>
            <Image alt="star" src="/profile/star.svg" height={20} width={20} />
            <p>{val}</p>
          </div>
        ))}
      </div>
      <p className="py-2">
        * Rewards credits can be used to get eSIMs and top-ups for free! To
        claim your free gift, collect at least $15 in rewards credits and enough
        to cover the cost of the product.{" "}
        <Link href={`/terms-conditions`} className="underline text-btnblue">
          Terms and conditions
        </Link>{" "}
        apply.
      </p>
      <div className="bg-txtgrey/20 h-[1px] w-full" />
      <div className="py-4 space-y-2">
        <p>Your referral code</p>
        <div className="w-fit p-5 flex bg-white rounded-md shadow-md justify-center items-center">
          {currentUser?.referencecode ? (
            <>
              <p className="tracking-widest font-medium sm:text-lg text-lime-500">
                {currentUser?.referencecode}
              </p>
            </>
          ) : (
            <>
              <p className="tracking-widest font-medium sm:text-lg">
                Available after first purchase
              </p>
            </>
          )}
        </div>
        <div className="flex space-x-1 text-txtgrey">
          <Info />
          <p className="text-lg text-wrap">
            The code should be entered during checkout when prompted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletPageComponent;
