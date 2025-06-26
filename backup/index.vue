<template>
    <div class="antialiased font-sans relative overflow-hidden">
        <div class="absolute inset-0 w-full h-full overflow-hidden -z-10">
            <div class="w-[500px] h-[500px] bg-pink-200 opacity-30 rounded-full blur-3xl absolute top-[-50px] left-[-150px]"></div>
            <div class="w-[300px] h-[300px] bg-pink-300 opacity-20 rounded-full blur-2xl absolute bottom-[-50px] right-[-100px]"></div>
        </div>
            
        <section class="pt-16 pb-32 bg-gradient-to-r from-pink-100 via-white to-pink-100">
            <div class="container mx-auto px-4 text-center max-w-4xl py-12"> 
                <h1 class="text-5xl md:text-6xl font-extrabold leading-tight text-pink-700 mb-5 drop-shadow-sm"> Empower Your Natural Beauty with <span class="text-pink-600">Hi.YouCan!</span>
                </h1>
                <p class="text-lg md:text-xl text-pink-500 mb-10 leading-relaxed max-w-2xl mx-auto"> Buka potensi perawatan kulit Anda dengan produk dan solusi yang dirancang untuk memelihara dan meningkatkan cahaya Anda.
                </p>
                <NuxtLink to="/product">
                    <WidgetsButton variant="primary" class="px-8 py-4 text-lg"> Cari Produk Kami
                    </WidgetsButton>
                </NuxtLink>
            </div>
        </section>

        <section class="py-16 bg-gradient-to-r from-pink-50 via-white to-pink-50">
            <div class="container mx-auto px-4 max-w-6xl"> 
                <h2 class="text-4xl md:text-5xl font-extrabold text-center text-pink-700 mb-8">Jelajahi Koleksi Kami ✨</h2> 
                
                <div
                    ref="galleryContainer"
                    class="flex overflow-x-hidden space-x-8 pb-8 pt-6 hide-scrollbar items-center auto-scroll-gallery" 
                    :style="scrollPaddingStyle"
                    @scroll="handleScroll" 
                >
                    <div
                        v-for="product in duplicatedProducts"
                        :key="product.id + '-' + product.duplicateId"
                        :ref="el => { if (el) duplicatedProductRefs.set(product.id + '-' + product.duplicateId, el as HTMLElement); }" 
                        class="flex-none w-80 md:w-96 rounded-xl overflow-hidden shadow-lg transform transition-all duration-100 ease-out cursor-pointer" 
                        :style="getProductStyle(product.id + '-' + product.duplicateId)"
                        >
                        <div class="block">
                            <img :src="product.imageUrl" :alt="product.name" class="w-full h-72 object-cover"/> 
                            <div class="p-6 bg-white"> 
                                <h3 class="text-xl font-semibold text-gray-900 truncate mb-2">{{ product.name }}</h3>
                                <p class="text-base text-gray-600 truncate mb-3 leading-snug">{{ product.description }}</p> 
                                <p class="text-2xl font-bold text-indigo-600">Rp{{ product.price.toLocaleString('id-ID') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="bg-white text-pink-500 py-10 border-t border-pink-200">
            <div class="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center text-sm">
                <p class="mb-4 md:mb-0">&copy; 2024 Hi.Ican! All rights reserved.</p>
                <p class="mb-4 md:mb-0">&copy; Made by Rezky Putri Wira Utami.</p>
                <nav class="flex space-x-6">
                    <NuxtLink to="/" class="hover:text-pink-700 transition" aria-label="Home">Home</NuxtLink>
                    <NuxtLink to="/product" class="hover:text-pink-700 transition" aria-label="Product">Product</NuxtLink>
                    <NuxtLink to="/cart" class="hover:text-pink-700 transition" aria-label="Cart">Cart</NuxtLink>
                </nav>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue';
import { useProductStore } from '~/store/product';
import type { TProduct } from '~/types/TProduct'; 

const productStore = useProductStore();

const galleryContainer = ref<HTMLElement | null>(null);
const duplicatedProductRefs = ref<Map<string, HTMLElement>>(new Map()); 

const itemPositions = ref<{ [key: string]: { scale: number; blur: number; opacity: number } }>({});

// --- Auto-Scroll Logic ---
const scrollSpeed = ref(0.5); // Kecepatan scroll (px per frame)
let animationFrameId: number | null = null;
// Variabel userInteracted dan interactionTimeout TIDAK DIGUNAKAN LAGI

const duplicatedProducts = computed(() => {
    const originalProducts = productStore.getAllProducts as (TProduct & { duplicateId?: number })[];
    if (originalProducts.length === 0) return [];

    const firstCopy = originalProducts.map(p => ({ ...p, duplicateId: 1 }));
    const secondCopy = originalProducts.map(p => ({ ...p, duplicateId: 2 }));
    const thirdCopy = originalProducts.map(p => ({ ...p, duplicateId: 3 }));
    
    return [...firstCopy, ...secondCopy, ...thirdCopy];
});

const getProductStyle = (combinedId: string) => {
    const pos = itemPositions.value[combinedId];
    if (pos) {
        return {
            transform: `scale(${pos.scale})`,
            filter: `blur(${pos.blur}px)`,
            opacity: pos.opacity,
            'z-index': pos.scale > 0.9 ? 10 : 1, 
        };
    }
    return {};
};

const scrollPaddingStyle = computed(() => {
    if (galleryContainer.value) {
        const containerWidth = galleryContainer.value.offsetWidth;
        const firstProductEl = duplicatedProductRefs.value.values().next().value; 
        const itemWidth = firstProductEl ? firstProductEl.offsetWidth : 384; 

        const padding = (containerWidth - itemWidth) / 2;
        
        if (padding > 0) {
            return {
                'scroll-padding-left': `${padding}px`,
                'scroll-padding-right': `${padding}px`,
            };
        }
    }
    return {}; 
});

const handleScroll = () => {
    if (!galleryContainer.value) return;

    const containerRect = galleryContainer.value!.getBoundingClientRect();
    const containerCenterInViewport = containerRect.left + containerRect.width / 2;

    const newPositions: { [key: string]: { scale: number; blur: number; opacity: number } } = {};

    duplicatedProductRefs.value.forEach((el, id) => { 
        if (el) {
            const itemRect = el.getBoundingClientRect();
            const itemCenterInViewport = itemRect.left + itemRect.width / 2;
            
            const distance = Math.abs(containerCenterInViewport - itemCenterInViewport);
            const maxEffectDistance = (containerRect.width / 2) + (itemRect.width / 2); 
            const normalizedDistance = Math.min(1, distance / (maxEffectDistance * 0.75)); 

            const scale = 1 - (normalizedDistance * 0.15); 
            const blur = normalizedDistance * 5;           
            const opacity = 1 - (normalizedDistance * 0.4); 

            newPositions[id] = { scale, blur, opacity };
        }
    });
    itemPositions.value = newPositions;

    const scrollLeft = galleryContainer.value.scrollLeft;
    const scrollWidth = galleryContainer.value.scrollWidth;
    const originalContentWidth = scrollWidth / 3; 

    if (scrollLeft >= originalContentWidth * 2) {
        galleryContainer.value.scrollLeft -= originalContentWidth; 
    } else if (scrollLeft <= originalContentWidth * 0.5 && scrollLeft > 0) { 
         galleryContainer.value.scrollLeft += originalContentWidth;
    }
};

const animateScroll = () => {
    // userInteracted.value sudah tidak digunakan
    if (!galleryContainer.value) {
        animationFrameId = null;
        return;
    }

    if (galleryContainer.value.scrollWidth <= galleryContainer.value.offsetWidth) {
        animationFrameId = null;
        return;
    }

    galleryContainer.value.scrollLeft += scrollSpeed.value;
    handleScroll();

    animationFrameId = requestAnimationFrame(animateScroll);
};

// Fungsi ini hanya untuk memulai animasi
const startAutoScroll = () => {
    if (!animationFrameId) { // Hanya mulai jika belum berjalan
        animationFrameId = requestAnimationFrame(animateScroll);
    }
};

// Fungsi ini sekarang tidak melakukan apa-apa dan bisa dihapus jika tidak ada pemanggilan eksternal
const stopAutoScroll = () => {
    // Kosong, karena auto-scroll tidak akan berhenti oleh interaksi
};

// Semua logika dan variabel terkait attach/cleanup event listener untuk interaksi mouse/touch telah dihapus/dilewati

const initializeScrollEffect = () => {
    duplicatedProductRefs.value.clear(); 
    
    nextTick(() => {
        setTimeout(() => {
            if (galleryContainer.value && productStore.getAllProducts.length > 0 && duplicatedProductRefs.value.size > 0) {
                const originalContentWidth = galleryContainer.value.scrollWidth / 3;

                galleryContainer.value.scrollLeft = originalContentWidth;
                
                handleScroll(); 
                startAutoScroll(); // Mulai auto scroll
            } else {
                console.warn('initializeScrollEffect: galleryContainer or productRefs not ready for auto-scroll.');
            }
        }, 300); 
    });
};

watch(() => productStore.getAllProducts, (newProducts) => {
    if (newProducts.length > 0) {
        initializeScrollEffect();
    } else {
        stopAutoScroll(); 
    }
}, { immediate: true }); 

onMounted(() => {
    // initializeScrollEffect akan memanggil startAutoScroll
});

onUnmounted(() => {
    if (animationFrameId) { // Pastikan animasi dihentikan saat komponen tidak aktif
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
});

function handleSayHalo() {
    alert('Halo! Welcome to Hi.Ican!');
}
</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;700;900&display=swap');

html {
    font-family: 'Urbanist', sans-serif;
}

/* Custom scrollbar hiding (for aesthetics) */
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Optional: Untuk membuat item snap ke tengah saat berhenti scroll */
.auto-scroll-gallery {
    scroll-snap-type: none; /* Nonaktifkan snap-scroll untuk auto-scroll halus */
}
</style>