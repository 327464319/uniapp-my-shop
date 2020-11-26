import vuex from 'vuex'
import vue from 'vue'
import my_cart from './cart.js'
vue.use(vuex)
const store =new vuex.Store({
  modules:{
    my_cart
  }
})
export default store
