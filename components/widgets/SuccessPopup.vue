<template>
    <Transition name="fade">
        <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black bg-opacity-40" @click="closePopup"></div>

            <div class="relative bg-white rounded-lg shadow-xl p-8 max-w-sm w-full transform transition-all duration-300 ease-out scale-100 opacity-100">
                <div class="text-center">
                    <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                        <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="mt-5 text-xl leading-6 font-medium text-gray-900">Berhasil Ditambahkan!</h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">
                            Produk Anda telah berhasil ditambahkan ke keranjang.
                        </p>
                    </div>
                    <div class="mt-4 flex justify-center space-x-3">
                        <NuxtLink to="/cart">
                            <WidgetsButton @click="closePopup" class="bg-pink-500 hover:bg-pink-600">
                                Lihat Keranjang
                            </WidgetsButton>
                        </NuxtLink>
                        <WidgetsButton @click="closePopup" class="bg-gray-300 text-gray-800 hover:bg-gray-400">
                            Lanjutkan Belanja
                        </WidgetsButton>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    isVisible: boolean;
}>();

const emit = defineEmits(['update:isVisible', 'close']);

const closePopup = () => {
    emit('update:isVisible', false); // Untuk v-model
    emit('close'); // Untuk event @close terpisah
};
</script>

<style scoped>
/* Transisi Fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Transisi Scale (opsional, untuk efek modal itu sendiri) */
.fade-enter-active .relative {
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.fade-leave-active .relative {
    transition: all 0.2s ease-out;
}

.fade-enter-from .relative,
.fade-leave-to .relative {
    transform: scale(0.9);
    opacity: 0;
}
</style>