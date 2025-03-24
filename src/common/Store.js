import { create } from "zustand";
import { persist } from "zustand/middleware";
 
export const themeStore = create (
    persist(
        set => (
            {
               
                token: "",
                addAccesToken: (token) => set((prevState) => ({...prevState , token: token})),
            }
        )
    )
)