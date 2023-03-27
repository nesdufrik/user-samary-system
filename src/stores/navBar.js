import { defineStore } from 'pinia'

export const useNavBarStore = defineStore('navbar', {
    state: () => {
        return {
            itemsNavBar: [],
        }
    },
    actions: {
        loadNavBar(data) {
            this.itemsNavBar = data
        },
    },
})
