import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TDrawerState = {
  drawer: React.ReactNode | null;
  setDrawer: (value: React.ReactNode | null) => void;
};

export const useDrawer = create<TDrawerState>()(
  devtools(
    immer((set) => ({
      drawer: false,
      setDrawer: (value) =>
        set((state) => {
          state.drawer = value;
        }),
    }))
  )
);
