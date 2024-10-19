import { create } from "zustand";

const flashStore = create((set)=>({
    message: "",
    type: "", // success, error, warning
    isOpen: false,
    setMessage: (newMessage) => set({message: newMessage}),
    setType: (newType) => set({type: newType}),
    setIsOpen: (newIsOpen) => set({isOpen: newIsOpen}), 
}))

export { flashStore };