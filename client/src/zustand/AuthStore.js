import { create } from "zustand";

const authStore =  create((set)=>({
    _id: "",
    username: "",
    role: "",
    setId: (newId) => set({ _id: newId }),
    setName: (newName) => set({username: newName}),
    setRole: (newRole) => set({role: newRole}),
}))

export { authStore };