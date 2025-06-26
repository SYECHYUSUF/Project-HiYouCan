<template>
    <div class="container mx-auto px-6 py-8 max-w-6xl"> 
        <WidgetsProductControls
            v-model:searchTerm="searchTerm"
            v-model:sortBy="sortBy"
            v-model:filterAvailable="filterAvailable"
        />
        <h1 class="text-3xl md:text-4xl font-extrabold text-pink-700 mb-4 mt-12 text-center">Our Products</h1>
        <p class="mb-14 text-base text-pink-500 text-center max-w-2xl mx-auto leading-relaxed">
            Jelajahi koleksi produk perawatan kulit kami yang dirancang untuk kecantikan alami Anda.
        </p>
        <div v-if="filteredAndSortedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <NuxtLink 
                v-for="product in filteredAndSortedProducts" 
                :key="product.id" 
                :to="`/product/${product.id}`" 
                class="bg-white h-full rounded-xl shadow-lg p-5 hover:shadow-xl transition hover:scale-105 duration-300 flex flex-col overflow-hidden"
            >
                <h3 class="text-xl font-semibold text-gray-900 mb-2 leading-snug flex-grow">{{ product.name }}</h3>
                <div class="flex-shrink-0 mb-4">
                    <img 
                        :src="product.imageUrl" 
                        :alt="product.name" 
                        class="w-full h-56 object-cover rounded-lg"
                    >
                </div>
                <p class="text-pink-500 text-sm mb-4 leading-normal flex-grow description-clamp">{{ product.description }}</p> 

                <div class="mt-auto pt-3 border-t border-gray-100">
                    <p v-if="product.oldPrice" class="text-gray-500 line-through text-xs font-medium">
                        Rp{{ product.oldPrice.toLocaleString('id-ID') }}
                    </p>
                    <p class="text-2xl font-bold text-indigo-600">
                        Rp{{ product.price.toLocaleString('id-ID') }}
                    </p>
                </div>
            </NuxtLink>
        </div>
        <div v-else class="text-center text-gray-600 text-xl py-10">
            <p>Maaf, produk tidak ditemukan.</p>
            <p class="text-base text-gray-500 mt-2">Coba kata kunci lain atau sesuaikan filter Anda.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useProductStore } from '~/store/product';
import WidgetsProductControls from '~/components/widgets/ProductControls.vue';

const productStore = useProductStore();

const searchTerm = ref('');
const sortBy = ref('default');
const filterAvailable = ref(false);

const filteredAndSortedProducts = computed(() => {
    let currentProducts = productStore.getAllProducts;

    if (filterAvailable.value) {
        currentProducts = currentProducts.filter(product => product.quantity > 0);
    }

    if (searchTerm.value) {
        const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
        currentProducts = currentProducts.filter(
            product => 
                product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                product.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }

    if (sortBy.value !== 'default') {
        currentProducts = [...currentProducts].sort((a, b) => {
            switch (sortBy.value) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name) * -1;
                default:
                    return 0;
            }
        });
    }

    return currentProducts;
});
</script>

<style scoped>
.description-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 3; /* Untuk dukungan non-webkit */
    
}

/* Style untuk checkbox bawaan agar sesuai Tailwind */
input[type="checkbox"].form-checkbox {
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
}

input[type="checkbox"].form-checkbox::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
}

input[type="checkbox"].form-checkbox:checked {
    background-color: #db2777; /* pink-600 */
    border-color: #db2777;
    color: #fff; /* checkmark color */
}

input[type="checkbox"].form-checkbox:checked::before {
    transform: scale(1);
}
</style>