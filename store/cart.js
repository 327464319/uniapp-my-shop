export default {
namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),

  // 模块的 mutations 方法
  mutations: {
    saveToStorage(state) {
       uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
     addToCart(state, goods) {
          // 根据提交的商品的Id，查询购物车中是否存在这件商品
          // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
          const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
    
          if (!findResult) {
            // 如果购物车中没有这件商品，则直接 push
            state.cart.push(goods)
          } else {
            // 如果购物车中有这件商品，则只更新数量即可
            findResult.goods_count++
          }
           // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
             this.commit('my_cart/saveToStorage')
        },
  },
  // 模块的 getters 属性
  getters: {
     total(state) {
        
          // 循环统计商品的数量，累加到变量 c 中
        let c=  state.cart.reduce(function(counts,goods){
            return counts+goods.goods_count
          },0)
          return c
       }
  },
}
