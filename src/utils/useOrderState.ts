"use client";
// Create a file, e.g., orderStore.js
import { create } from "zustand";
import { useLocalStorage } from "usehooks-ts";

interface OrderStoreState {
  cashbackProcessed: boolean;
  balanceDeductOfUser: boolean;
  addRewardinTable: boolean;
  setCashbackProcessed: (value: boolean) => void;
  setBalanceDeductOfUser: (value: boolean) => void;
  setAddRewardinTable: (value: boolean) => void;
}

const useOrderStore = create<OrderStoreState>((set) => ({
  cashbackProcessed: false,
  balanceDeductOfUser: false,
  addRewardinTable: false,
  setCashbackProcessed: (value: boolean) => set({ cashbackProcessed: value }),
  setBalanceDeductOfUser: (value: boolean) =>
    set({ balanceDeductOfUser: value }),
  setAddRewardinTable: (value: boolean) => set({ addRewardinTable: value }),
}));

// // Retrieve state from localStorage on creation
// const storedState: any =
//   JSON.parse(localStorage?.getItem("orderStoreState")!) || {};
// useOrderStore.setState({
//   ...useOrderStore.getState(),
//   ...storedState,
// } as OrderStoreState);

// // Subscribe to changes and store in localStorage
// useOrderStore.subscribe((state) => {
//   localStorage.setItem("orderStoreState", JSON.stringify(state));
// });

// const timeoutDuration = 30 * 1000; // 30 seconds in milliseconds
// setTimeout(() => {
//   localStorage.removeItem("orderStoreState");
// }, timeoutDuration);

export default useOrderStore;
