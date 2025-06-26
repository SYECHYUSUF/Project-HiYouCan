<template>
  <div class="antialiased font-sans relative overflow-hidden">
    <div class="absolute inset-0 w-full h-full overflow-hidden -z-10">
      <div
        class="w-[500px] h-[500px] bg-pink-200 opacity-30 rounded-full blur-3xl absolute top-[-50px] left-[-150px]"
      ></div>
      <div
        class="w-[300px] h-[300px] bg-pink-300 opacity-20 rounded-full blur-2xl absolute bottom-[-50px] right-[-100px]"
      ></div>
    </div>

    <section class="pt-16 pb-32">
      <div class="container mx-auto px-4 text-center max-w-4xl py-12">
        <h1
          class="text-5xl md:text-6xl font-extrabold leading-tight text-pink-700 mb-5 drop-shadow-sm"
        >
          Empower Your Natural Beauty with
          <span class="text-pink-600">Hi.YouCan!</span>
        </h1>
        <p
          class="text-lg md:text-xl text-pink-500 mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          Buka potensi perawatan kulit Anda dengan produk dan solusi yang
          dirancang untuk memelihara dan meningkatkan cahaya Anda.
        </p>
        <NuxtLink to="/product">
          <WidgetsButton variant="primary" class="px-8 py-4 text-lg">
            Cari Produk Kami
          </WidgetsButton>
        </NuxtLink>
      </div>
    </section>

    <div class="overflow-hidden py-8">
      <div class="scrolling-wrapper">
        <div
          v-for="product in products"
          :key="`product-original-${product.id}`"
          class="product-card"
        >
          <img
            :src="product.imageUrl"
            alt="Gambar Produk"
            class="w-full h-48 object-cover rounded-t-lg mb-4"
          />
          <h2 class="text-xl font-semibold text-pink-700 mb-2">
            {{ product.name }}
          </h2>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <NuxtLink
            :to="`/product/${product.id}`"
            class="text-pink-600 hover:text-pink-800 font-semibold"
          >
            Lihat Detail
          </NuxtLink>
        </div>

        <div
          v-for="product in products"
          :key="`product-copy-${product.id}`"
          class="product-card"
        >
          <img
            :src="product.imageUrl"
            alt="Gambar Produk"
            class="w-full h-48 object-cover rounded-t-lg mb-4"
          />
          <h2 class="text-xl font-semibold text-pink-700 mb-2">
            {{ product.name }}
          </h2>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <NuxtLink
            :to="`/product/${product.id}`"
            class="text-pink-600 hover:text-pink-800 font-semibold"
          >
            Lihat Detail
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/product";

const productStore = useProductStore();
const { products } = productStore;
</script>

<style scoped>
/* Styling untuk kontainer scrolling */
.scrolling-wrapper {
  display: flex; /* Mengatur item agar berbaris horizontal */
  width: fit-content; /* Memastikan lebar sesuai dengan kontennya */
  animation: scroll-left 40s linear infinite; /* Animasi scroll */
}

/* Styling untuk setiap kartu produk */
.product-card {
  flex-shrink: 0; /* Mencegah kartu mengecil */
  width: 300px; /* Lebar tetap untuk setiap kartu */
  margin-right: 24px; /* Gap antara kartu (sesuaikan dengan px-4 py-8) */
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); /* shadow-lg */
  padding: 1.5rem; /* p-6 */
  transition: box-shadow 300ms ease-in-out; /* hover:shadow-xl transition-shadow duration-300 */
}

.product-card:hover {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1); /* hover:shadow-xl */
}

/* Keyframes untuk animasi scroll */
@keyframes scroll-left {
  0% {
    transform: translateX(0%); /* Mulai dari posisi asli */
  }
  100% {
    transform: translateX(
      -50%
    ); /* Geser ke kiri sejauh 50% dari total lebar konten */
  }
}
</style>
