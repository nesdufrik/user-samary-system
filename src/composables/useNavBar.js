import { storeToRefs } from 'pinia'
import { getNavBar } from '../helpers/helpNavBar'
import { useNavBarStore } from '../stores/navBar'
import { useCajaStore } from '../stores/cajaStore'

export const useNavBar = () => {
    const navBarStore = useNavBarStore()
    const cajaStore = useCajaStore()
    const { itemsNavBar } = storeToRefs(navBarStore)
    const { cajaActual } = storeToRefs(cajaStore)

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
