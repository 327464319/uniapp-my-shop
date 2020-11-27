import { mapGetters } from 'vuex'
export default {
   computed: {
      ...mapGetters('my_cart', ['total']),
    },
     onShow() {
        // 在页面刚展示的时候，设置数字徽标
       
        this.setBadge()
       this.removeTabBar0()
      },
      watch:{
        total:function(val){        
            // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
           this.setBadge()  
           this.removeTabBar0()
        }
      },
       methods: {
         removeTabBar0(){
           if(this.total===0){
             uni.removeTabBarBadge({
               index:2
             })
           }
         },
          setBadge() {
            // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
            uni.setTabBarBadge({
              index: 2,
              text: this.total+'', // 注意：text 的值必须是字符串，不能是数字
            })
          },
        },
        
}