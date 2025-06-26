// store/product.ts
import { defineStore } from 'pinia';
import type { TProduct } from '~/types/TProduct'; 

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [
      {
        id: "1",
        name: "Hi.Youcan! Complete Glow Skincare Set",
        description: "Paket lengkap perawatan kulit wajah Hi.Youcan! untuk mencerahkan dan melembapkan kulit Anda.",
        price: 249999, // Harga diskon
        oldPrice: 299999, // Harga asli yang dicoret
        quantity: 10, 
        imageUrl: "/images/paketyou.jpeg",
        galleryImages: [ // Menambahkan galeri gambar
          "/images/paketyou.jpeg",
          "/images/Coming.jpeg", 
          "/images/Coming.jpeg", 
          "/images/Coming.jpeg" 
                  ]
      },
      {
        id: "2",
        name: "Hi.Youcan! Complete Glow Serum",
        description: "Serum wajah Hi.Youcan! yang diformulasikan khusus untuk mencerahkan dan melembapkan kulit Anda.",
        price: 25000, 
        oldPrice: 29990, 
        quantity: 10, 
        imageUrl: "/images/serumdos.jpeg",
        galleryImages: [ // Menambahkan galeri gambar
            "/images/serumdos.jpeg",
            "/images/serum2.jpeg",
            "/images/serumjari.jpeg",
            "/images/serumacne.jpeg"
        ]
      },
      {
        id: "3",
        name: "Hi.Youcan! Complete Glow Toner",
        description: "Toner wajah Hi.Youcan! yang membantu menyeimbangkan pH kulit dan memberikan kelembapan ekstra.",
        price: 19990,
        oldPrice: 24990, 
        quantity: 10, 
        imageUrl: "/images/toner2.jpeg",
        galleryImages: [ // Menambahkan galeri gambar
            "/images/toner2.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg"
        ]
      },
      {
        id: "4",
        name: "Hi.Youcan! face wash Glow",
        description: "Paket lengkap perawatan kulit wajah Hi.Youcan! untuk mencerahkan dan melembapkan kulit Anda.",
        price: 19990, 
        quantity: 10, 
        imageUrl: "/images/face3.jpeg",
        galleryImages: [ // Menambahkan galeri gambar
            "/images/face3.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg"
        ]
      },
      {
        id: "5",
        name: "Hi.you! Morning Cream Glow ",
        description: "Krim pagi Hi.you! yang memberikan kelembapan dan perlindungan sepanjang hari.",
        price: 19990, 
        quantity: 10, 
        imageUrl: "/images/cream.jpeg",
        galleryImages: [ // Menambahkan galeri gambar
            "/images/cream.jpeg",
            "/images/cream-detail-2.jpeg",
            "/images/cream-detail-3.jpeg",
        ]
      },
      {
        id: "6",
        name: "Hi.Youcan! Sunscreen Glow",
        description: "Sunscreen wajah Hi.Youcan! yang melindungi kulit dari sinar UV dan menjaga kelembapan.",
        price: 19990, 
        quantity: 10, 
        imageUrl: "/images/sunscrean.jpeg",
        galleryImages: [ // Menambahkan galeri gambar
            "/images/sunscrean.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg"
        ]
      },
      {
        id: "7",
        name: "Hi.Youcan! Complete Glow Skincare Set",
        description: "Paket lengkap perawatan kulit wajah Hi.Youcan! untuk mencerahkan dan melembapkan kulit Anda.",
        price: 15000, 
        oldPrice: 19990, 
        quantity: 10, 
        imageUrl: "/images/paket1.jpeg",
        galleryImages: [ // Menambahkan galeri gambar
            "/images/paket1.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg"
        ]
      },
      {
        id: "8",
        name: "Hi.ican! Complete Glow Skincare Set",
        description: "Paket lengkap perawatan kulit wajah Hi.ican! untuk mencerahkan dan melembapkan kulit Anda.",
        price: 19990, 
        quantity: 10, 
        imageUrl: "/images/paket1.jpeg",
        galleryImages: [ // Menambahkan galeri gambar
            "/images/paket1.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg"
        ]
      },
    ] as TProduct[], 
  }),

  getters: {
    getAllProducts: (state) => state.products,

    getProductById: (state) => (id: string) => {
      return state.products.find(product => product.id === id) || null;
    },

    getAvailableProducts: (state) => {
      return state.products.filter(product => product.quantity > 0);
    },
  },

  actions: {
    addProduct(product: TProduct) {
      this.products.push(product);
    },

    updateProduct(updatedProduct: TProduct) {
      const index = this.products.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
      } else {
        console.warn(`Produk dengan ID ${updatedProduct.id} tidak ditemukan.`);
      }
    },

    decreaseProductQuantity(productId: string, amount: number) {
      const product = this.products.find(p => p.id === productId);
      if (product && product.quantity >= amount) {
        product.quantity -= amount;
        return true;
      } else {
        console.warn(`Gagal mengurangi kuantitas untuk produk ID ${productId}. Stok tidak cukup atau produk tidak ditemukan.`);
        return false;
      }
    },

    increaseProductQuantity(productId: string, amount: number) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        product.quantity += amount;
        return true;
      } else {
        console.warn(`Gagal menambah kuantitas untuk produk ID ${productId}. Produk tidak ditemukan.`);
        return false;
      }
    },

    removeProduct(productId: string) {
      this.products = this.products.filter(product => product.id !== productId);
    },
  },
});