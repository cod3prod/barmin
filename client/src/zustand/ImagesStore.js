import { create } from "zustand";

const imagesStore =  create((set)=>({
    images: [],
    setImages: (newImages) => set({images: newImages}),
}))

export { imagesStore };