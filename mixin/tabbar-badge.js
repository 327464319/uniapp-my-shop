import { mapGetters } from 'vuex'
export default {
   computed: {
      ...mapGetters('my_cart', ['total']),
    },
     onShow() {
        // 在页面刚展示的时候，设置数字徽标
       
        this.setBadge()
      },
      watch:{
        total:function(){
           this.setBadge()
        }
      },
      
       methods: {
          setBadge() {
            // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
            uni.setTabBarBadge({
              index: 2,
              text: this.total?this.total + '':false, // 注意：text 的值必须是字符串，不能是数字
            })
          },
        },
        
}