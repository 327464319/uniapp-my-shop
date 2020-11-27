import vuex from 'vuex'
import vue from 'vue'
import my_cart from './cart.js'
// 导入用户的 vuex 模块
import moduleUser from './user.js'
vue.use(vuex)
const store =new vuex.Store({
  modules:{
    my_cart,
    m_user: moduleUser,
  }
})
export default store
