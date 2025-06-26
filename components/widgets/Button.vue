<template>
    <button :type="type" :class="buttonClass">
      <slot />
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonType = 'button' | 'submit' | 'reset';

const props = defineProps({
    type: {
        type: String as () => ButtonType,
        default: 'button'
    },
    addClass: {
        type: String,
        default: ''
    },
    variant: {
        type: String as () => ButtonVariant,
        default: 'primary'
    }
});

// Objek yang memetakan varian ke kelas Tailwind CSS spesifik
const buttonClasses = {
    // Menambahkan kelas transisi dan animasi hover untuk varian primary
    primary: 'bg-pink-600 text-white hover:bg-pink-700 focus:ring-pink-500 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 transition-all duration-200 ease-out',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 transition-all duration-200 ease-out'
};

// Kelas CSS akhir yang akan diterapkan ke tombol
// Menggabungkan kelas dasar, kelas varian, dan kelas tambahan
const buttonClass = `px-4 py-2 rounded focus:outline-none focus:ring-2 ${buttonClasses[props.variant]} ${props.addClass}`;
</script>