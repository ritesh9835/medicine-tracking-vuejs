import { createStore } from 'vuex'
import medicineModule from '../modules/medicine-module';


export default createStore({
 
  modules: {
    medicineModule
  }
})
