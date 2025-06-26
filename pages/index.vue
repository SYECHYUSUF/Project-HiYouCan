<template>
    <div class="antialiased font-sans relative overflow-hidden">
        <div class="absolute inset-0 w-full h-full overflow-hidden -z-10">
            <div class="w-[500px] h-[500px] bg-pink-200 opacity-30 rounded-full blur-3xl absolute top-[-50px] left-[-150px]"></div>
            <div class="w-[300px] h-[300px] bg-pink-300 opacity-20 rounded-full blur-2xl absolute bottom-[-50px] right-[-100px]"></div>
        </div>
            
            <section class="pt-24 pb-32 bg-gradient-to-r from-pink-100 via-white to-pink-100">
                <div class="container mx-auto px-4 text-center max-w-4xl py-12"> <h1 class="text-5xl md:text-6xl font-extrabold leading-tight text-pink-700 mb-5 drop-shadow-sm"> Empower Your Natural Beauty with <span class="text-pink-600">Hi.YouCan!</span>
                </h1>
                <p class="text-lg md:text-xl text-pink-500 mb-10 leading-relaxed max-w-2xl mx-auto"> Buka potensi perawatan kulit Anda dengan produk dan solusi yang dirancang untuk memelihara dan meningkatkan cahaya Anda.
                </p>
                <NuxtLink to="/product">
                    <WidgetsButton variant="primary" class="px-8 py-4 text-lg"> Cari Produk Kami
                        <span class="ml-2">👉</span>
                    </WidgetsButton>
                </NuxtLink>
            </div>
        </section>
        <section class="py-16 bg-gradient-to-r from-pink-50 via-white to-pink-50">
            <div class="container mx-auto px-4 max-w-6xl"> <h2 class="text-2xl md:text-xl font-extrabold text-center text-pink-700 mb-8">Jelajahi Koleksi Kami ✨</h2> <div
                ref="galleryContainer"
                class="flex overflow-x-scroll snap-x snap-mandatory space-x-8 pb-8 pt-6 hide-scrollbar items-center" :style="scrollPaddingStyle"
                @scroll="handleScroll"
                >
                    <div
                        v-for="product in productStore.getAllProducts"
                        :key="product.id"
                        :ref="el => { if (el) productRefs[product.id] = el as HTMLElement; }"
                        class="flex-none w-80 md:w-96 snap-center rounded-xl overflow-hidden shadow-lg transform transition-all duration-100 ease-out cursor-pointer" :style="getProductStyle(product.id)"
                        >
                        <NuxtLink :to="`/products/${product.id}`" class="block">
                            <img :src="product.imageUrl" :alt="product.name" class="w-full h-72 object-cover"/> <div class="p-6 bg-white"> <h3 class="text-xl font-semibold text-gray-900 truncate mb-2">{{ product.name }}</h3>
                                <p class="text-base text-gray-600 truncate mb-3 leading-snug">{{ product.description }}</p> <p class="text-2xl font-bold text-indigo-600">Rp{{ product.price.toLocaleString('id-ID') }}</p>
                            </div>
                        </NuxtLink>
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

const productStore = useProductStore();

const galleryContainer = ref<HTMLElement | null>(null);
const productRefs: { [key: string]: HTMLElement } = {}; 

const itemPositions = ref<{ [key: string]: { scale: number; blur: number; opacity: number } }>({});

const getProductStyle = (productId: string) => {
    const pos = itemPositions.value[productId];
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
        const firstProductEl = Object.values(productRefs)[0];
        // Perbarui asumsi itemWidth sesuai dengan w-80 (320px) atau md:w-96 (384px)
        const itemWidth = firstProductEl ? firstProductEl.offsetWidth : 384; 

        // Padding yang dibutuhkan agar item di tengah
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
    if (!galleryContainer.value) {
        console.warn('handleScroll: galleryContainer.value is null, skipping scroll handling.');
        return;
    }

    const containerRect = galleryContainer.value!.getBoundingClientRect();
    const containerCenterInViewport = containerRect.left + containerRect.width / 2;

    const newPositions: { [key: string]: { scale: number; blur: number; opacity: number } } = {};

    Object.keys(productRefs).forEach(id => {
        const el = productRefs[id];
        if (el) {
            const itemRect = el.getBoundingClientRect();
            const itemCenterInViewport = itemRect.left + itemRect.width / 2;
            
            const distance = Math.abs(containerCenterInViewport - itemCenterInViewport);

            // maxEffectDistance adalah lebar setengah dari kontainer + setengah lebar item
            // Ini akan membuat efek paling kuat saat item berada di luar viewport
            const maxEffectDistance = (containerRect.width / 2) + (itemRect.width / 2); 
            
            // Normalisasi jarak dari 0 (tengah) ke 1 (sangat jauh)
            // Faktor 0.7-0.8 bisa memberikan transisi yang lebih halus dan 'golden'
            const normalizedDistance = Math.min(1, distance / (maxEffectDistance * 0.75)); 

            // Sesuaikan rumus untuk efek yang lebih halus dan terinspirasi Golden Ratio
            // Scale: 1.0 (tengah) -> 0.85 (jauh)
            // Blur: 0px (tengah) -> 5px (jauh)
            // Opacity: 1.0 (tengah) -> 0.6 (jauh)
            const scale = 1 - (normalizedDistance * 0.15); 
            const blur = normalizedDistance * 5;           
            const opacity = 1 - (normalizedDistance * 0.4); 

            newPositions[id] = { scale, blur, opacity };
        }
    });
    itemPositions.value = newPositions;
};

const initializeScrollEffect = () => {
    for (const key in productRefs) {
        delete productRefs[key];
    }
    
    nextTick(() => {
        setTimeout(() => {
            if (galleryContainer.value && Object.keys(productRefs).length > 0) {
                const firstProductEl = Object.values(productRefs)[0];
                if (firstProductEl) {
                    const scrollLeftToCenter = firstProductEl.offsetLeft - (galleryContainer.value.offsetWidth / 2) + (firstProductEl.offsetWidth / 2);
                    galleryContainer.value.scrollLeft = scrollLeftToCenter;
                }
                
                handleScroll(); 
            } else {
                console.warn('initializeScrollEffect: galleryContainer or productRefs not ready.');
            }
        }, 100); 
    });
};

watch(() => productStore.getAllProducts, initializeScrollEffect, { immediate: true }); 

onMounted(() => {
    nextTick(() => {
        if (galleryContainer.value) {
            galleryContainer.value!.addEventListener('scroll', handleScroll);
        }
    });
});

onUnmounted(() => {
    galleryContainer.value?.removeEventListener('scroll', handleScroll);
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
.snap-x {
    scroll-snap-type: x mandatory;
}

.snap-center {
    scroll-snap-align: center;
}
</style>    