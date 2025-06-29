<template>
  <div
    class="mb-14 p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-8"
  >
    <div class="w-full md:w-2/5 relative flex-grow">
      <input
        type="text"
        v-model="internalSearchTerm"
        @input="emitChanges"
        placeholder="Cari nama produk. . ."
        class="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-base shadow-sm"
      />
      <svg
        class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>

    <div
      class="flex flex-col sm:flex-row items-center justify-end gap-6 w-full md:w-3/5 flex-shrink-0"
    >
      <select
        v-model="internalSortBy"
        @change="emitChanges"
        class="w-full sm:w-auto p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-base shadow-sm cursor-pointer"
      >
        <option value="default" disabled>Urutkan Berdasarkan</option>
        <option value="price-asc">Harga: Rendah ke Tinggi</option>
        <option value="price-desc">Harga: Tinggi ke Rendah</option>
        <option value="name-asc">Nama: A-Z</option>
        <option value="name-desc">Nama: Z-A</option>
      </select>

      <label
        class="flex items-center space-x-4 text-base text-gray-700 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      >
        <input
          type="checkbox"
          v-model="internalFilterAvailable"
          @change="emitChanges"
          class="form-checkbox h-5 w-5 text-pink-600 rounded-md focus:ring-pink-500 transition-colors duration-200 flex-shrink-0"
        />
        <span>Hanya Stok Tersedia</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  searchTerm?: string;
  sortBy?: string;
  filterAvailable?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:searchTerm", value: string): void;
  (e: "update:sortBy", value: string): void;
  (e: "update:filterAvailable", value: boolean): void;
}>();

const internalSearchTerm = ref(props.searchTerm || "");
const internalSortBy = ref(props.sortBy || "default");
const internalFilterAvailable = ref(props.filterAvailable || false);

watch(
  () => props.searchTerm,
  (newValue) => {
    internalSearchTerm.value = newValue || "";
  }
);
watch(
  () => props.sortBy,
  (newValue) => {
    internalSortBy.value = newValue || "default";
  }
);
watch(
  () => props.filterAvailable,
  (newValue) => {
    internalFilterAvailable.value = newValue || false;
  }
);

const emitChanges = () => {
  emit("update:searchTerm", internalSearchTerm.value);
  emit("update:sortBy", internalSortBy.value);
  emit("update:filterAvailable", internalFilterAvailable.value);
};
</script>

<style scoped>
/* Style untuk checkbox bawaan agar sesuai Tailwind */
input[type="checkbox"].form-checkbox {
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.25em;
  height: 1.25em;
  border: 2px solid #a0aec0;
  border-radius: 0.25em;
  display: grid;
  place-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

input[type="checkbox"].form-checkbox::before {
  content: "";
  width: 0.75em;
  height: 0.75em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  background-color: #fff;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 60%);
}

input[type="checkbox"].form-checkbox:checked {
  background-color: #db2777; /* pink-600 */
  border-color: #db2777;
}

input[type="checkbox"].form-checkbox:checked::before {
  transform: scale(1);
}

input[type="checkbox"].form-checkbox:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.5);
}
</style>
