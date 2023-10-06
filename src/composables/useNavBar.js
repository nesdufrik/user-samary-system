import { storeToRefs } from 'pinia'
import { getNavBar } from '../helpers/helpNavBar'
import { useNavBarStore } from '../stores/navBar'

export const useNavBar = () => {
	const navBarStore = useNavBarStore()
	const { itemsNavBar } = storeToRefs(navBarStore)

	const contentNavBar = () => {
		navBarStore.loadNavBar(getNavBar())
	}

	return {
		//! propiedades
		itemsNavBar,

		//! metodos
		contentNavBar,
	}
}
