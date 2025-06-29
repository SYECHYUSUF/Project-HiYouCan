<template>
  <div
    class="container mx-auto px-4 pt-10 pb-8 md:pt-12 md:pb-10 max-w-5xl relative"
    v-if="product"
    ref="productPage"
  >
    <Transition name="slide-fade">
      <div class="absolute top-4 left-4 md:left-8 z-20">
        <NuxtLink to="/product">
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
          </WidgetsButton>
        </NuxtLink>
      </div>
    </Transition>

    <h1
      class="text-3xl md:text-4xl font-extrabold text-pink-700 mb-3 text-center mt-4"
    >
      Detail Produk
    </h1>
    <p
      class="mb-8 md:mb-10 mt-2 text-base text-pink-500 text-center max-w-xl mx-auto leading-relaxed"
    >
      Informasi lengkap mengenai produk pilihan Anda.
    </p>

    <div
      class="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start"
    >
      <div
        class="w-full md:w-5/12 lg:w-2/5 flex-shrink-0 flex flex-col items-center"
      >
        <div class="relative w-full mb-3">
          <img
            :src="currentImage"
            :alt="product?.name ?? 'Product Image'"
            class="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
          />

          <button
            v-if="product?.galleryImages && product.galleryImages.length > 1"
            @click="navigateImage(-1)"
            :disabled="currentImageIndex === 0"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous image"
          >
            <svg
              class="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          <button
            v-if="product?.galleryImages && product.galleryImages.length > 1"
            @click="navigateImage(1)"
            :disabled="
              currentImageIndex === (product?.galleryImages?.length ?? 0) - 1
            "
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next image"
          >
            <svg
              class="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>

        <div
          v-if="product?.galleryImages && product.galleryImages.length > 1"
          class="flex space-x-2 overflow-x-auto hide-scrollbar p-0.5"
          ref="galleryContainer"
        >
          <img
            v-for="(img, index) in product.galleryImages"
            :key="index"
            :src="img"
            :alt="`Thumbnail ${index + 1}`"
            @click="setCurrentImage(img)"
            :class="{
              'border-2 border-pink-500': currentImage === img,
              'opacity-70': currentImage !== img,
            }"
            class="w-16 h-16 object-cover rounded-md cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-105 flex-shrink-0"
          />
        </div>
      </div>

      <div class="w-full md:w-7/12 lg:w-3/5 flex flex-col justify-between">
        <div>
          <h2
            class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight"
          >
            {{ product?.name ?? "Produk Tidak Ditemukan" }}
          </h2>

          <div class="flex items-center text-gray-600 text-sm mb-4">
            <span v-if="product?.soldCount !== undefined">
              Terjual
              {{
                (product.soldCount / 1000).toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 1,
                })
              }}rb+
            </span>
            <span
              v-if="
                product?.averageRating !== undefined &&
                product?.ratingCount !== undefined
              "
              class="ml-3 flex items-center"
            >
              <span class="text-yellow-500 mr-1">⭐</span>
              {{ product.averageRating.toFixed(1) }} ({{
                product.ratingCount.toLocaleString("id-ID")
              }}
              rating)
            </span>
            <span
              v-else-if="product?.averageRating !== undefined"
              class="ml-3 flex items-center"
            >
              <span class="text-yellow-500 mr-1">⭐</span>
              {{ product.averageRating.toFixed(1) }}
            </span>
          </div>
          <div class="mb-4">
            <p
              v-if="product?.oldPrice"
              class="text-gray-500 line-through text-base font-medium"
            >
              Rp{{ product.oldPrice.toLocaleString("id-ID") }}
            </p>
            <p class="text-3xl font-bold text-indigo-600">
              Rp{{ product?.price?.toLocaleString("id-ID") || "N/A" }},-
            </p>
          </div>

          <p
            class="text-sm text-gray-600 mb-4"
            v-if="product?.quantity !== undefined"
          >
            Stok Tersedia:
            <span
              :class="{
                'text-green-600 font-semibold': (product?.quantity ?? 0) > 0,
                'text-red-600 font-semibold': (product?.quantity ?? 0) === 0,
              }"
            >
              {{ product.quantity }}
            </span>
          </p>

          <p class="text-sm text-gray-700 leading-relaxed mb-6">
            {{ product?.description ?? "Deskripsi tidak tersedia." }}
          </p>
        </div>

        <div
          class="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4"
        >
          <div class="flex items-center space-x-2">
            <label for="quantity" class="text-base font-semibold text-gray-700"
              >Jumlah:</label
            >
            <div class="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                @click="decreaseQuantity"
                class="p-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-700 font-bold text-base"
                :disabled="
                  parsedQuantity <= 0 || (product?.quantity ?? 0) === 0
                "
              >
                -
              </button>
              <input
                type="number"
                v-model="quantityInput"
                @input="handleQuantityInput"
                @blur="handleQuantityBlur"
                class="px-3 py-2 bg-white text-gray-800 text-base font-semibold border-x border-gray-300 w-16 text-center appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                min="0"
                :max="product?.quantity ?? 0"
                :disabled="(product?.quantity ?? 0) === 0"
              />
              <button
                @click="increaseQuantity"
                class="p-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-700 font-bold text-base"
                :disabled="
                  parsedQuantity >= (product?.quantity ?? 0) ||
                  (product?.quantity ?? 0) === 0
                "
              >
                +
              </button>
            </div>
          </div>
          <WidgetsButton
            @click="handleAddToCart(product)"
            :disabled="
              parsedQuantity === 0 ||
              parsedQuantity > (product?.quantity ?? 0) ||
              (product?.quantity ?? 0) === 0
            "
            class="w-full sm:w-auto px-6 py-3 text-base"
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

  <div class="container mx-auto px-4 py-2 max-w-5xl">
    <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div
        class="flex border-b border-gray-200 mb-6 -mx-6 md:-mx-8 px-6 md:px-8"
      >
        <button
          @click="activeTab = 'detail'"
          :class="{
            'border-pink-500 text-pink-600': activeTab === 'detail',
            'border-transparent text-gray-500 hover:text-gray-700':
              activeTab !== 'detail',
          }"
          class="py-3 px-4 md:px-6 -mb-px border-b-2 font-semibold text-base focus:outline-none transition-colors duration-200 flex-grow text-center"
        >
          Detail
        </button>
        <button
          @click="activeTab = 'spesifikasi'"
          :class="{
            'border-pink-500 text-pink-600': activeTab === 'spesifikasi',
            'border-transparent text-gray-500 hover:text-gray-700':
              activeTab !== 'spesifikasi',
          }"
          class="py-3 px-4 md:px-6 -mb-px border-b-2 font-semibold text-base focus:outline-none transition-colors duration-200 flex-grow text-center"
        >
          Spesifikasi
        </button>
        <button
          @click="activeTab = 'info'"
          :class="{
            'border-pink-500 text-pink-600': activeTab === 'info',
            'border-transparent text-gray-500 hover:text-gray-700':
              activeTab !== 'info',
          }"
          class="py-3 px-4 md:px-6 -mb-px border-b-2 font-semibold text-base focus:outline-none transition-colors duration-200 flex-grow text-center"
        >
          Info Penting
        </button>
      </div>

      <div
        class="tab-content text-gray-700 leading-relaxed text-sm md:text-base"
      >
        <div v-if="activeTab === 'detail'">
          <h3 class="font-bold text-lg mb-2 text-gray-800">Detail Produk</h3>
          <p>
            {{
              product?.longDescription ||
              product?.description ||
              "Tidak ada detail produk tersedia."
            }}
          </p>
          <ul class="list-disc pl-5 mt-4 text-sm">
            <li>Varian: {{ product?.variant || "Tidak ada" }}</li>
            <li>Isi Bersih: {{ product?.netWeight || "Tidak ada" }}</li>
            <li>Jenis Kulit: {{ product?.skinType || "Semua Jenis Kulit" }}</li>
          </ul>
        </div>

        <div v-if="activeTab === 'spesifikasi'">
          <h3 class="font-bold text-lg mb-2 text-gray-800">
            Spesifikasi Produk
          </h3>
          <div v-if="product?.specifications">
            <ul class="list-disc pl-5">
              <li v-for="(value, key) in product.specifications" :key="key">
                <strong>{{ key }}:</strong> {{ value }}
              </li>
            </ul>
          </div>
          <p v-else>Tidak ada data spesifikasi produk.</p>
          <ul class="list-disc pl-5 mt-4 text-sm">
            <li>Ukuran: 15 cm x 5 cm x 5 cm</li>
            <li>Berat: 100 gram</li>
            <li>Bahan Aktif: Niacinamide, Hyaluronic Acid</li>
          </ul>
        </div>

        <div v-if="activeTab === 'info'">
          <h3 class="font-bold text-lg mb-2 text-gray-800">
            Info Penting & Garansi
          </h3>
          <p>
            Produk ini telah melalui uji dermatologis dan aman untuk sebagian
            besar jenis kulit.
          </p>
          <p class="mt-2">
            Garansi 7 hari setelah pembelian, syarat dan ketentuan berlaku.
            Untuk informasi lebih lanjut, silakan hubungi layanan pelanggan
            kami.
          </p>
          <ul class="list-disc pl-5 mt-4 text-sm">
            <li>
              Penyimpanan: Simpan di tempat sejuk dan kering, hindari sinar
              matahari langsung.
            </li>
            <li>Kadaluwarsa: Lihat pada kemasan produk.</li>
            <li>Nomor BPOM: NA18230100001</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <WidgetsSuccessPopup v-model:isVisible="showSuccessPopup" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "~/store/cart";
import { useProductStore } from "~/store/product";
import type { TProduct } from "~/types/TProduct";

import WidgetsSuccessPopup from "~/components/widgets/SuccessPopup.vue";
import WidgetsButton from "~/components/widgets/Button.vue";

const productStore = useProductStore();
const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();

const productId = route.params.id as string;

const product = ref<TProduct | null>(null);
const currentImage = ref("");

// Deklarasi quantityInput untuk v-model (string)
const quantityInput = ref<string>("1");
// Computed property untuk mendapatkan nilai numerik yang divalidasi dari quantityInput
const parsedQuantity = computed<number>(() => {
  // Selalu parse nilai, jika NaN (kosong/bukan angka), anggap 0
  const num = parseInt(quantityInput.value);
  return isNaN(num) ? 0 : num;
});

// State untuk tab aktif
const activeTab = ref("detail"); // Default tab aktif

const currentImageIndex = computed(() => {
  if (!product.value || !product.value.galleryImages) return -1;
  return product.value.galleryImages.indexOf(currentImage.value);
});

const navigateImage = (direction: 1 | -1) => {
  if (
    !product.value ||
    !product.value.galleryImages ||
    product.value.galleryImages.length === 0
  ) {
    return;
  }

  const totalImages = product.value.galleryImages.length;
  let newIndex = currentImageIndex.value + direction;

  if (newIndex < 0) {
    newIndex = 0;
  } else if (newIndex >= totalImages) {
    newIndex = totalImages - 1;
  }

  setCurrentImage(product.value.galleryImages[newIndex]);
};

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/product");
  }
};

const productPage = ref<HTMLElement | null>(null);
let startXPage = 0;
const thresholdPage = 75;

const handleTouchStartPage = (event: TouchEvent) => {
  startXPage = event.touches[0].clientX;
};

const handleTouchEndPage = (event: TouchEvent) => {
  const endXPage = event.changedTouches[0].clientX;
  const diffXPage = endXPage - startXPage;

  if (diffXPage > thresholdPage) {
    router.back();
  }
  startXPage = 0;
};

const galleryContainer = ref<HTMLElement | null>(null);
let startXGallery = 0;
const thresholdGallery = 50;

const handleTouchStartGallery = (event: TouchEvent) => {
  startXGallery = event.touches[0].clientX;
};

const handleTouchEndGallery = (event: TouchEvent) => {
  const endXGallery = event.changedTouches[0].clientX;
  const diffXGallery = endXGallery - startXGallery;

  if (
    !product.value ||
    !product.value.galleryImages ||
    product.value.galleryImages.length === 0
  ) {
    return;
  }

  if (diffXGallery < -thresholdGallery) {
    navigateImage(1);
  } else if (diffXGallery > thresholdGallery) {
    navigateImage(-1);
  }
  startXGallery = 0;
};

onMounted(() => {
  if (productPage.value) {
    productPage.value.addEventListener("touchstart", handleTouchStartPage);
    productPage.value.addEventListener("touchend", handleTouchEndPage);
  }
  if (galleryContainer.value) {
    galleryContainer.value.addEventListener(
      "touchstart",
      handleTouchStartGallery
    );
    galleryContainer.value.addEventListener("touchend", handleTouchEndGallery);
  }
});

onUnmounted(() => {
  if (productPage.value) {
    productPage.value.removeEventListener("touchstart", handleTouchStartPage);
    productPage.value.removeEventListener("touchend", handleTouchEndPage);
  }
  if (galleryContainer.value) {
    galleryContainer.value.removeEventListener(
      "touchstart",
      handleTouchStartGallery
    );
    galleryContainer.value.removeEventListener(
      "touchend",
      handleTouchEndGallery
    );
  }
});

// Watcher utama untuk memuat data produk dan mengatur currentImage & quantityInput awal
watch(
  () => productStore.getAllProducts,
  (newProducts) => {
    product.value = productStore.getProductById(productId);
    if (product.value) {
      currentImage.value =
        product.value.imageUrl || product.value.galleryImages?.[0] || "";

      if (product.value.quantity === 0) {
        quantityInput.value = "0";
      } else {
        if (
          quantityInput.value === "0" ||
          quantityInput.value === "" ||
          isNaN(parseInt(quantityInput.value))
        ) {
          quantityInput.value = "1";
        }
        if (parseInt(quantityInput.value) > product.value.quantity) {
          quantityInput.value = String(product.value.quantity);
        }
      }
    }
  },
  { immediate: true }
);

const setCurrentImage = (imgUrl: string) => {
  currentImage.value = imgUrl;
};

// handleQuantityInput: Hanya untuk menjaga input tetap berupa angka valid saat mengetik
const handleQuantityInput = () => {
  const value = quantityInput.value;

  const numericValue = value.replace(/[^0-9]/g, "");

  if (numericValue !== value) {
    quantityInput.value = numericValue;
  }

  if (quantityInput.value === "") {
    quantityInput.value = "0"; // Langsung set ke '0' jika kosong
  }
};

// handleQuantityBlur: Validasi akhir saat input kehilangan fokus
const handleQuantityBlur = () => {
  const currentProductQuantity = product.value?.quantity ?? 0;
  let numValue = parseInt(quantityInput.value);

  if (isNaN(numValue)) {
    numValue = 0;
  }

  if (currentProductQuantity > 0) {
    numValue = Math.max(1, Math.min(numValue, currentProductQuantity));
  } else {
    numValue = 0;
  }

  quantityInput.value = String(numValue);
};

const decreaseQuantity = () => {
  const currentProductQuantity = product.value?.quantity ?? 0;
  let currentSelected = parsedQuantity.value;

  if (currentSelected > 0) {
    // Bisa dikurangi sampai 0
    quantityInput.value = String(currentSelected - 1);
  }
  handleQuantityBlur();
};

const increaseQuantity = () => {
  const currentProductQuantity = product.value?.quantity ?? 0;
  let currentSelected = parsedQuantity.value;

  if (currentProductQuantity > 0 && currentSelected < currentProductQuantity) {
    quantityInput.value = String(currentSelected + 1);
  } else if (currentProductQuantity > 0 && currentSelected === 0) {
    quantityInput.value = "1";
  }
  handleQuantityBlur();
};

const showSuccessPopup = ref(false);
let popupTimer: ReturnType<typeof setTimeout> | null = null;

// Watcher ini mengamati perubahan pada product.value?.quantity
watch(
  () => product.value?.quantity,
  (newQuantity, oldQuantity) => {
    if (newQuantity !== undefined && product.value) {
      let currentSelected = parsedQuantity.value;

      if (newQuantity === 0) {
        quantityInput.value = "0";
      } else if (newQuantity > 0) {
        if (currentSelected > newQuantity) {
          quantityInput.value = String(newQuantity);
        } else if (currentSelected <= 0) {
          quantityInput.value = "1";
        }
      }
    }
  }
);

function handleAddToCart(productToAdd: TProduct) {
  const availableQuantity = productToAdd?.quantity ?? 0;
  const finalQuantity = parsedQuantity.value;

  if (productToAdd && finalQuantity > 0 && finalQuantity <= availableQuantity) {
    cartStore.addItem(productToAdd, finalQuantity);

    productStore.decreaseProductQuantity(productToAdd.id, finalQuantity);

    console.log("Item in Cart:", cartStore.items);
    console.log("Total Price:", cartStore.totalPrice);

    showSuccessPopup.value = true;

    if (popupTimer) {
      clearTimeout(popupTimer);
    }
    popupTimer = setTimeout(() => {
      showSuccessPopup.value = false;
    }, 3000);

    quantityInput.value = availableQuantity > 0 ? "1" : "0";
  } else {
    alert("Mohon masukkan jumlah yang valid atau stok tidak mencukupi.");
  }
}
</script>

<style scoped>
/* Transisi untuk tombol kembali */
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
