import { create } from "zustand";

const flashStore = create((set)=>({
    message: "",
    type: "", // success, error, warning
    isOpen: false,
    setFlash: (newMessage, newType, newIsOpen) => set({message: newMessage, type: newType, isOpen: newIsOpen}), 
}))

export { flashStore };