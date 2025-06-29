// types/TProduct.ts
export type TProduct = {
    id: string;
    name: string;
    description: string; // Deskripsi singkat
    price: number;
    oldPrice?: number;
    quantity: number;
    imageUrl?: string; // Gambar utama/cover
    galleryImages?: string[]; // Array URL gambar tambahan

    longDescription?: string;
    variant?: string;
    netWeight?: string;
    skinType?: string;
    specifications?: { [key: string]: string };

    // --- PROPERTI BARU UNTUK INFORMASI TERJUAL/RATING ---
    soldCount?: number;       // Jumlah produk terjual (misal: 2000)
    averageRating?: number;   // Rata-rata rating (misal: 4.5)
    ratingCount?: number;     // Jumlah total rating (misal: 1829)
};