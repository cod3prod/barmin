import { create } from "zustand";

const authStore = create((set) => ({
  username: "",
  isAuthenticated: false,
  setName: (newName) => set({ username: newName }),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));

export { authStore };
