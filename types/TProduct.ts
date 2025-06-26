// types/TProduct.ts
export type TProduct = {
    id: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    quantity: number;
    imageUrl?: string; // Gambar utama/cover
    galleryImages?: string[]; // Array URL gambar tambahan
}