import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  tds: any[];
  addTodos: (add) => void;
  done: any
  todo :any;
  inProgress:any;
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        tds: [],
        addTodos: (add) =>
          set((state) => {
            return {
              ...state,
              tds: [...state.tds, add],
            };
          }),
          todo: () => set((state) => {
            return { todo: state.tds.filter((t) => t.status === "todo") };
          }),
          inProgress: () => set((state) => {
            return { inProgress: state.tds.filter((t) => t.status === "in progress") };
          }),
          done: () => set((state) => {
            return { done: state.tds.filter((t) => t.status === "done") };
          })
      }), 
      { name: "cart-storage" }
    )
  )
);
