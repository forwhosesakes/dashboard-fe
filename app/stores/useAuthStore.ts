import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {

}

interface Actions {
	
}



export const useCartStore = create(
	devtools(
		persist<State & Actions>(
			(set, get) => ({
			
			}),
			{ name: "auth-storage" }
		)
	)
);
