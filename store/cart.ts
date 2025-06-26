// store/cart.ts
import { defineStore } from 'pinia';
import type { TProduct } from '~/types/TProduct';

// Definisikan tipe untuk item di keranjang.
export type TCartItem = Omit<TProduct, 'quantity'> & {
    quantityInCart: number; // Kuantitas produk ini dalam keranjang
};

export const useCartStore = defineStore("cart", {
    state: () => ({
        items: [] as TCartItem[], 
    }),
    getters: {
        // Perbaikan: Ubah nama getter menjadi 'totalPrice'
        totalPrice: (state) => {
            return state.items.reduce((total, item) => total + (item.price * item.quantityInCart), 0);
        },
        itemCount: (state) => {
            return state.items.reduce((total, item) => total + item.quantityInCart, 0);
        },
        getAllItems: (state) => {
            return state.items;
        }
    },
    actions: {
        addItem(productToAdd: TProduct, quantityToAdd: number) {
            const existingItem = this.items.find(item => item.id === productToAdd.id);

            if (existingItem) {
                existingItem.quantityInCart += quantityToAdd;
            } else {
                const newCartItem: TCartItem = {
                    ...productToAdd, 
                    quantityInCart: quantityToAdd, 
                };
                this.items.push(newCartItem);
            }
            return true;
        },

        removeItem(itemId: string): boolean {
            const index = this.items.findIndex(item => item.id === itemId);

            if (index === -1) {
                return false;
            }

            this.items.splice(index, 1);
            return true;
        },
        
        decreaseQuantity(itemId: string): boolean {
            const item = this.items.find(item => item.id === itemId);
            if (item && item.quantityInCart > 1) {
                item.quantityInCart--;
                return true;
            } else if (item && item.quantityInCart === 1) {
                return this.removeItem(itemId);
            }
            return false;
        },

        increaseQuantity(itemId: string): boolean {
            const item = this.items.find(item => item.id === itemId);
            if (item) {
                item.quantityInCart++;
                return true;
            }
            return false;
        },

        clearCart() {
            this.items = [];
        },
    },
});