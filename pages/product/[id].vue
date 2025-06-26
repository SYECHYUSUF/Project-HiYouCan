<template>
    <div class="container mx-auto px-6 py-12 max-w-6xl" v-if="product">
        <h1 class="text-4xl md:text-5xl font-extrabold text-pink-700 mb-4 text-center">Detail Produk</h1>
        <p class="mb-14 text-lg text-pink-500 text-center max-w-2xl mx-auto leading-relaxed">
            Informasi lengkap mengenai produk pilihan Anda.
        </p>
        
        <div class="bg-white rounded-xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
            <div class="w-full md:w-5/12 lg:w-2/5 flex-shrink-0 flex flex-col items-center">
                <img 
                    :src="currentImage" 
                    :alt="product.name" 
                    class="w-full h-auto object-cover rounded-lg shadow-md max-h-[500px] mb-4"
                >
                
                <div v-if="product.galleryImages && product.galleryImages.length > 1" class="flex space-x-3 overflow-x-auto hide-scrollbar p-1">
                    <img
                        v-for="(img, index) in product.galleryImages"
                        :key="index"
                        :src="img"
                        :alt="`Thumbnail ${index + 1}`"
                        @click="setCurrentImage(img)"
                        :class="{'border-2 border-pink-500': currentImage === img, 'opacity-70': currentImage !== img}"
                        class="w-20 h-20 object-cover rounded-md cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-105 flex-shrink-0"
                    >
                </div>
            </div>

            <div class="w-full md:w-7/12 lg:w-3/5 flex flex-col justify-between">
                <div>
                    <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{{ product.name }}</h2>
                    
                    <div class="mb-6">
                        <p v-if="product.oldPrice" class="text-gray-500 line-through text-lg font-medium">
                            Rp{{ product.oldPrice.toLocaleString('id-ID') }}
                        </p>
                        <p class="text-4xl font-bold text-indigo-600">
                            Rp{{ product?.price?.toLocaleString('id-ID') || 'N/A' }},-
                        </p>
                    </div>

                    <p class="text-base text-gray-600 mb-6" v-if="product.quantity !== undefined">
                        Stok Tersedia: <span :class="{'text-green-600 font-semibold': product.quantity > 0, 'text-red-600 font-semibold': product.quantity === 0}">
                                {{ product.quantity }}
                            </span>
                    </p>
                    
                    <p class="text-gray-700 leading-relaxed text-base mb-8">{{ product.description }}</p>
                </div>

                <div class="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div class="flex items-center space-x-3">
                        <label for="quantity" class="text-lg font-semibold text-gray-700">Jumlah:</label>
                        <div class="flex border border-gray-300 rounded-md overflow-hidden">
                            <button
                                @click="selectedQuantity = Math.max(1, selectedQuantity - 1)"
                                class="p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-700 font-bold text-lg"
                                :disabled="selectedQuantity <= 1"
                            >
                                -
                            </button>
                            <span class="px-4 py-3 bg-white text-gray-800 text-lg font-semibold border-x border-gray-300 w-20 text-center">
                                {{ selectedQuantity }}
                            </span>
                            <button
                                @click="selectedQuantity = Math.min(product.quantity, selectedQuantity + 1)"
                                class="p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-700 font-bold text-lg"
                                :disabled="selectedQuantity >= product.quantity"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <WidgetsButton
                        @click="handleAddToCart(product)"
                        :disabled="selectedQuantity === 0 || selectedQuantity > product.quantity || product.quantity === 0"
                        class="w-full sm:w-auto px-8 py-4 text-lg"
                    >
                        Add to Cart
                    </WidgetsButton>
                </div>
            </div>
        </div>
    </div>
    
    <div v-else class="container mx-auto px-6 py-12 max-w-6xl text-center">
        <p class="text-gray-500 text-xl py-10">Produk tidak ditemukan.</p>
    </div>

    <WidgetsSuccessPopup v-model:isVisible="showSuccessPopup" /> 
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '~/store/cart';
import { useProductStore } from '~/store/product';
import type { TProduct } from '~/types/TProduct';

import WidgetsSuccessPopup from '~/components/widgets/SuccessPopup.vue'; 

const productStore = useProductStore();
const cartStore = useCartStore();
const route = useRoute();

const productId = route.params.id as string;

const product = ref<TProduct | null>(null);
// State untuk gambar yang sedang ditampilkan di galeri
const currentImage = ref(''); 

// Watch untuk mengambil produk ketika ID atau store produk siap
watch(() => productStore.getAllProducts, (newProducts) => {
    product.value = productStore.getProductById(productId);
    // Set gambar utama ke imageUrl produk atau gambar pertama dari galeri jika ada
    if (product.value) {
        currentImage.value = product.value.imageUrl || (product.value.galleryImages?.[0] || '');
        // Jika imageUrl tidak ada, dan galleryImages kosong, currentImage akan kosong.
    }
}, { immediate: true });

// Fungsi untuk mengganti gambar utama
const setCurrentImage = (imgUrl: string) => {
  currentImage.value = imgUrl;
};

const selectedQuantity = ref(1);

const showSuccessPopup = ref(false); 

let popupTimer: ReturnType<typeof setTimeout> | null = null; 

watch(() => product.value?.quantity, (newQuantity) => {
    if (newQuantity !== undefined) {
        if (selectedQuantity.value > newQuantity) {
            selectedQuantity.value = newQuantity > 0 ? newQuantity : 1;
        }
        if (newQuantity === 0) {
            selectedQuantity.value = 0;
        }
    }
}, { immediate: true });

function handleAddToCart(productToAdd: TProduct) {
    if (productToAdd && selectedQuantity.value > 0 && selectedQuantity.value <= productToAdd.quantity) {
        cartStore.addItem(productToAdd, selectedQuantity.value);
        
        productStore.decreaseProductQuantity(productToAdd.id, selectedQuantity.value);
        
        console.log("Item in Cart:", cartStore.items);
        console.log("Total Price:", cartStore.totalPrice); 

        showSuccessPopup.value = true; 

        if (popupTimer) {
            clearTimeout(popupTimer); 
        }
        popupTimer = setTimeout(() => {
            showSuccessPopup.value = false;
        }, 3000); 

        selectedQuantity.value = 1; 
    } else {
        alert('Mohon masukkan jumlah yang valid atau stok tidak mencukupi.');
    }
}
</script>