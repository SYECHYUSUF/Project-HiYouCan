<template>
  <div class="container mx-auto px-4 py-8 relative">
    <Transition name="slide-fade">
      <div class="absolute top-4 left-4 md:left-8 z-20">
        <NuxtLink to="/">
          <WidgetsButton
            variant="secondary"
            class="px-4 py-1.5 text-sm flex items-center shadow-md rounded-lg"
            @click.prevent="goBack"
          >
            <svg
              class="w-3.5 h-3.5 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Kembali
          </WidgetsButton>
        </NuxtLink>
      </div>
    </Transition>

    <h2
      class="text-3xl font-bold mb-6 text-gray-800 text-center pt-12 md:pt-16"
    >
      Keranjang Belanja Anda
    </h2>
    <div
      v-if="cart.itemCount === 0"
      class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg mt-8"
      role="alert"
    >
      <p class="font-bold">Keranjang Anda Kosong!</p>
      <p>Ayo jelajahi produk kami dan tambahkan barang ke keranjang.</p>
    </div>

    <div v-else>
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <ul class="divide-y divide-gray-200">
          <li
            v-for="item in cart.items"
            :key="item.id"
            class="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div class="flex items-center space-x-4">
              <img
                :src="item.imageUrl"
                alt="Product"
                class="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p class="text-lg font-semibold text-gray-900">
                  {{ item.name }}
                </p>
                <div class="flex items-center mt-1">
                  <button
                    @click="cart.decreaseQuantity(item.id)"
                    class="px-2 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300 transition duration-150"
                    :disabled="item.quantityInCart <= 1"
                  >
                    -
                  </button>
                  <span
                    class="px-3 py-1 bg-gray-100 border-t border-b border-gray-200 text-gray-800 font-medium"
                  >
                    {{ item.quantityInCart }}
                  </span>
                  <button
                    @click="cart.increaseQuantity(item.id)"
                    class="px-2 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300 transition duration-150"
                    :disabled="false"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-gray-800">
                Rp{{
                  (item.price * item.quantityInCart).toLocaleString("id-ID")
                }}
              </p>
              <p class="text-sm text-gray-500">
                Harga Satuan: Rp{{ item.price.toLocaleString("id-ID") }}
              </p>
              <button
                @click="cart.removeItem(item.id)"
                class="mt-2 text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Hapus
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <p class="text-lg font-semibold text-gray-700">Total Item:</p>
          <p class="text-xl font-bold text-gray-900">{{ cart.itemCount }}</p>
        </div>
        <div class="flex justify-between items-center mb-6">
          <p class="text-lg font-semibold text-gray-700">Total Harga:</p>
          <p class="text-2xl font-bold text-indigo-600">
            Rp{{ cart.totalPrice.toLocaleString("id-ID") }}
          </p>
        </div>

        <div
          class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4"
        >
          <button
            @click="cart.clearCart"
            class="w-full md:w-auto bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out font-semibold text-lg shadow-md"
          >
            Kosongkan Keranjang
          </button>

          <button
            @click="handleCheckout"
            :disabled="cart.itemCount === 0"
            class="w-full md:w-auto bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out font-semibold text-lg shadow-md"
          >
            Checkout via WhatsApp
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import WidgetsButton from "~/components/widgets/Button.vue"; // Pastikan sudah diimpor
import { useRouter } from "vue-router"; // Impor useRouter

const cart = useCartStore();
const router = useRouter(); // Inisialisasi useRouter

// Nomor WhatsApp tujuan
const whatsappNumber = "6289655562005";

// Fungsi untuk kembali ke halaman sebelumnya
const goBack = () => {
  if (window.history.length > 1) {
    // Cek apakah ada riwayat navigasi
    router.back();
  } else {
    router.push("/product"); // Jika tidak ada riwayat, kembali ke halaman produk
  }
};

function handleCheckout() {
  if (cart.itemCount === 0) {
    alert("Keranjang Anda kosong. Tambahkan produk sebelum checkout.");
    return;
  }

  let message = "Halo! Saya ingin memesan produk berikut dari Hi.YouCan!:\n\n";

  cart.items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `  Jumlah: ${item.quantityInCart}\n`;
    message += `  Harga Satuan: Rp${item.price.toLocaleString("id-ID")}\n`;
    message += `  Subtotal: Rp${(
      item.price * item.quantityInCart
    ).toLocaleString("id-ID")}\n`;
    if (index < cart.items.length - 1) {
      message += "--------------------\n";
    }
  });

  message += `\n====================\n`;
  message += `*Total Harga: Rp${cart.totalPrice.toLocaleString("id-ID")}*\n`;
  message += `====================\n\n`;
  message += "Mohon konfirmasi pesanan saya. Terima kasih!";

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}
</script>

<style scoped>
/* Transisi untuk tombol kembali (sama dengan yang sudah ada) */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
