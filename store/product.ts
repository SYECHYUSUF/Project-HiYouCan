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
                  ],
        longDescription: "Paket lengkap perawatan kulit wajah Hi.Youcan! yang terdiri dari face wash, toner, serum, cream, dan sunscreen. Dirancang untuk mencerahkan dan melembapkan kulit Anda secara menyeluruh.",
        variant: "Complete Glow Set", // Contoh varian
        netWeight: "200 ml", // Contoh berat bersih
        skinType: "All Skin Types", // Contoh jenis kulit
        specifications: { // Contoh spesifikasi tambahan
          "Face Wash": "100 ml",
          "Toner": "50 ml",
          "Serum": "30 ml",
          "Cream": "20 ml",
          "Sunscreen": "30 ml"
        },
        soldCount: 1500, // Jumlah produk terjual
        averageRating: 4.5, // Rata-rata rating
        ratingCount: 1829 // Jumlah total rating

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
        ],
        longDescription: "Serum wajah Hi.Youcan! yang mengandung bahan aktif untuk mencerahkan dan melembapkan kulit. Cocok untuk semua jenis kulit.",
        variant: "Brightening Serum", // Contoh varian
        netWeight: "30 ml", // Contoh berat bersih
        skinType: "All Skin Types", // Contoh jenis kulit
        specifications: { // Contoh spesifikasi tambahan
          "Active Ingredients": "Vitamin C, Hyaluronic Acid",
          "Usage": "Apply 2-3 drops on clean face and neck",
          "Storage": "Keep in a cool, dry place"
        },

        soldCount: 1200, // Jumlah produk terjual
        averageRating: 4.7, // Rata-rata rating
        ratingCount: 950 // Jumlah total rating
  
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
        ],
        longDescription: "Toner wajah Hi.Youcan! yang mengandung bahan alami untuk menyeimbangkan pH kulit dan memberikan kelembapan ekstra. Cocok untuk semua jenis kulit.",
        variant: "Hydrating Toner", // Contoh varian
        netWeight: "100 ml", // Contoh berat bersih
        skinType: "All Skin Types", // Contoh jenis kulit
        specifications: { // Contoh spesifikasi tambahan
          "Active Ingredients": "Aloe Vera, Rose Water",
          "Usage": "Apply with a cotton pad after cleansing",
          "Storage": "Keep in a cool, dry place"
        },
        soldCount: 800, // Jumlah produk terjual
        averageRating: 4.7, // Rata-rata rating
        ratingCount: 500 // Jumlah total rating
      },
      {
        id: "4",
        name: "Hi.Youcan! face wash Glow",
        description: "Paket lengkap perawatan kulit wajah Hi.Youcan! untuk mencerahkan dan melembapkan kulit Anda.",
        price: 19990, 
        oldPrice: 24990, 
        quantity: 10, 
        imageUrl: "/images/Face3.jpeg",
        galleryImages: [ // Menambahkan galeri gambar
            "/images/Face3.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg",
            "/images/Coming.jpeg"
        ],
        longDescription: "Face wash Hi.Youcan! yang diformulasikan untuk membersihkan wajah secara menyeluruh tanpa menghilangkan kelembapan alami kulit. Cocok untuk semua jenis kulit.",
        variant: "Gentle Cleanser", // Contoh varian  
        netWeight: "100 ml", // Contoh berat bersih
        skinType: "All Skin Types", // Contoh jenis kulit
        specifications: { // Contoh spesifikasi tambahan
          "Active Ingredients": "Green Tea Extract, Chamomile",
          "Usage": "Apply on wet face, massage gently, and rinse off",
          "Storage": "Keep in a cool, dry place"
        },
        soldCount: 1500, // Jumlah produk terjual
        averageRating: 4.8, // Rata-rata rating
        ratingCount: 1200 // Jumlah total rating
        
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
        ],

        longDescription: "Krim pagi Hi.you! yang diformulasikan untuk memberikan kelembapan dan perlindungan sepanjang hari. Cocok untuk semua jenis kulit.",
        variant: "Morning Cream", // Contoh varian
        netWeight: "50 ml", // Contoh berat bersih
        skinType: "All Skin Types", // Contoh jenis kulit
        specifications: { // Contoh spesifikasi tambahan
          "Active Ingredients": "Shea Butter, Vitamin E",
          "Usage": "Apply on clean face every morning",
          "Storage": "Keep in a cool, dry place"
        },
        soldCount: 800, // Jumlah produk terjual
        averageRating: 4.6, // Rata-rata rating
        ratingCount: 600 // Jumlah total rating
        
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
        ],
        longDescription: "Sunscreen wajah Hi.Youcan! yang mengandung SPF 50 untuk melindungi kulit dari sinar UV dan menjaga kelembapan. Cocok untuk semua jenis kulit.",
        variant: "Sunscreen SPF 50", // Contoh varian
        netWeight: "50 ml", // Contoh berat bersih
        skinType: "All Skin Types", // Contoh jenis kulit
        specifications: { // Contoh spesifikasi tambahan
          "Active Ingredients": "Zinc Oxide, Aloe Vera",
          "Usage": "Apply generously on face and neck before sun exposure",
          "Storage": "Keep in a cool, dry place"
        },

        soldCount: 950, // Jumlah produk terjual
        averageRating: 4.8, // Rata-rata rating
        ratingCount: 700 // Jumlah total rating

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
          ],
        longDescription: "Paket lengkap perawatan kulit wajah Hi.Youcan! yang terdiri dari face wash, toner, serum, cream, dan sunscreen. Dirancang untuk mencerahkan dan melembapkan kulit Anda secara menyeluruh.", 
        variant: "Complete Glow Set", // Contoh varian
        netWeight: "200 ml", // Contoh berat bersih
        skinType: "All Skin Types", // Contoh jenis kulit
        specifications: { // Contoh spesifikasi tambahan
          "Face Wash": "100 ml",
          "Toner": "50 ml",
          "Serum": "30 ml",
          "Cream": "20 ml",
          "Sunscreen": "30 ml"
        },
        soldCount: 2000, // Jumlah produk terjual
        averageRating: 4.9, // Rata-rata rating
        ratingCount: 2500 // Jumlah total rating

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
        ],
        longDescription: "Paket lengkap perawatan kulit wajah Hi.ican! yang terdiri dari face wash, toner, serum, cream, dan sunscreen. Dirancang untuk mencerahkan dan melembapkan kulit Anda secara menyeluruh.",
        variant: "Complete Glow Set", // Contoh varian
        netWeight: "200 ml", // Contoh berat bersih
        skinType: "All Skin Types", // Contoh jenis kulit
        specifications: { // Contoh spesifikasi tambahan
          "Face Wash": "100 ml",
          "Toner": "50 ml",
          "Serum": "30 ml",
          "Cream": "20 ml",
          "Sunscreen": "30 ml"
        },
        soldCount: 1800, // Jumlah produk terjual
        averageRating: 4.6, // Rata-rata rating
        ratingCount: 2200 // Jumlah total rating
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