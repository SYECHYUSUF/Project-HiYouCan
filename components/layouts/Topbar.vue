<script setup>
    import { ref } from 'vue'
    const isMobileMenuOpen = ref(false)
    const toggleMobileMenu = () => (isMobileMenuOpen.value = !isMobileMenuOpen.value)
    const closeMobileMenu = () => (isMobileMenuOpen.value = false)
</script>

<template>
    <div class="sticky top-0 z-50 bg-white shadow-sm">
        <div class="container mx-auto px-6 py-4 flex items-center justify-between max-w-[1200px]">
            <NuxtLink to="/" class="flex items-center space-x-4">
            <!-- Logo -->
            
            <img src="/images/logo3.png" alt="" class="w-30 h-auto">
            </NuxtLink>
            <ul v-show="!isMobileMenuOpen" class="hidden md:flex space-x-12 text-gray-500 font-medium text-lg">
            <ul class="grid grid-flow-col items-center gap-4">
            <!-- Home & Product -->
            <li><NuxtLink to="/" class="hover:text-pink-600">Home</NuxtLink></li>
            <li><NuxtLink to="/product" class="hover:text-pink-600">Product</NuxtLink></li>
                <!-- Cart Icon -->
            <li><NuxtLink to="/cart" class="hover:text-pink-600">Cart</NuxtLink></li>
            </ul>
            </ul>
            <button @click="toggleMobileMenu" aria-label="Toggle menu" class="md:hidden focus:outline-none text-gray-500" type="button">
            <svg v-if="!isMobileMenuOpen" class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            </button>
        </div>
        <!-- Mobile menu -->
        <div v-show="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-200 shadow-md">
            <ul class="flex flex-col space-y-4 p-6 text-gray-600 font-medium text-lg max-w-[1200px] mx-auto">
            <li><NuxtLink to="/" class="block hover:text-pink-600 transition" @click="closeMobileMenu">Home</NuxtLink></li>
            <li><NuxtLink to="/product" class="block hover:text-pink-600 transition" @click="closeMobileMenu">Product</NuxtLink></li>
            <li><NuxtLink to="/cart" class="block hover:text-pink-600 transition" @click="closeMobileMenu">Cart</NuxtLink></li>
            </ul>
        </div>
    </div>
</template>