import { create } from "zustand";

const authStore =  create((set)=>({
    username: "",
    setName: (newName) => set({username: newName}),
}))

export { authStore };