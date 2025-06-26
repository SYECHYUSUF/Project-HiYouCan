<template>
    <div class="container mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold mb-6 text-gray-800">Keranjang Belanja Anda</h2>

        <div v-if="cart.itemCount === 0" class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg" role="alert">
            <p class="font-bold">Keranjang Anda Kosong!</p>
            <p>Ayo jelajahi produk kami dan tambahkan barang ke keranjang.</p>
        </div>

        <div v-else>
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
                <ul class="divide-y divide-gray-200">
                    <li v-for="item in cart.items" :key="item.id" class="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div class="flex items-center space-x-4">
                            <img :src="item.imageUrl" alt="Product" class="w-16 h-16 object-cover rounded-md">
                            <div>
                                <p class="text-lg font-semibold text-gray-900">{{ item.name }}</p>
                                <div class="flex items-center mt-1">
                                    <button
                                        @click="cart.decreaseQuantity(item.id)"
                                        class="px-2 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300 transition duration-150"
                                        :disabled="item.quantityInCart <= 1"
                                    >
                                        -
                                    </button>
                                    <span class="px-3 py-1 bg-gray-100 border-t border-b border-gray-200 text-gray-800 font-medium">
                                        {{ item.quantityInCart }}
                                    </span>
                                    <button
                                        @click="cart.increaseQuantity(item.id)"
                                        class="px-2 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300 transition duration-150"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-lg font-bold text-gray-800">Rp{{ (item.price * item.quantityInCart).toLocaleString('id-ID') }}</p>
                            <p class="text-sm text-gray-500">Harga Satuan: Rp{{ item.price.toLocaleString('id-ID') }}</p>
                            <button @click="cart.removeItem(item.id)" class="mt-2 text-red-500 hover:text-red-700 text-sm font-medium">Hapus</button>
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
                    <p class="text-2xl font-bold text-indigo-600">Rp{{ cart.totalPrice.toLocaleString('id-ID') }}</p>
                </div>
                
                <div class="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
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
                        <span class="ml-2">📞</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'; 

const cart = useCartStore();

// Nomor WhatsApp tujuan
const whatsappNumber = '6289655562005'; // Format internasional tanpa '+' atau '0' di depan

function handleCheckout() {
    if (cart.itemCount === 0) {
        alert('Keranjang Anda kosong. Tambahkan produk sebelum checkout.');
        return;
    }

    let message = 'Halo! Saya ingin memesan produk berikut dari Hi.YouCan!:\n\n';

    // Iterasi item di keranjang untuk membuat detail pesanan
    cart.items.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`; // Nomor item dan nama produk tebal
        message += `   Jumlah: ${item.quantityInCart}\n`;
        message += `   Harga Satuan: Rp${item.price.toLocaleString('id-ID')}\n`;
        message += `   Subtotal: Rp${(item.price * item.quantityInCart).toLocaleString('id-ID')}\n`;
        if (index < cart.items.length - 1) {
            message += '--------------------\n'; // Pemisah antar item
        }
    });

    // Tambahkan total harga
    message += `\n====================\n`;
    message += `*Total Harga: Rp${cart.totalPrice.toLocaleString('id-ID')}*\n`;
    message += `====================\n\n`;
    message += 'Mohon konfirmasi pesanan saya. Terima kasih!';

    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);

    // Buat URL WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Buka tab baru dengan URL WhatsApp
    window.open(whatsappUrl, '_blank');

    // Opsional: Kosongkan keranjang setelah checkout (tergantung alur bisnis Anda)
    // cart.clearCart(); 
}
</script>