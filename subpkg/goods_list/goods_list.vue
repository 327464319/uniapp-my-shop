<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
    <my-goods-item :goods='goods' ></my-goods-item>
    </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
        //节流阀
           loading:true,
        // 请求参数对象
            queryObj: {
              // 查询关键词
              query: '',
              // 商品分类Id
              cid: '',
              // 页码值
              pagenum: 1,
              // 每页显示多少条数据
              pagesize: 10
            },
            // 商品列表的数据
                goodsList: [],
                // 总数量，用来实现分页
                total: 0
				
			};
		},
    onLoad(options){
       // 将页面参数转存到 this.queryObj 对象中
        this.queryObj.query = options.query || ''
        this.queryObj.cid = options.cid || '',
         this.getGoodsList()
    },
    onReachBottom(){
      // 如果if(!this.loading) return在下面,当我连续上拉加载的时候,第一次请求没完成,但是this.queryObj.pagesize*this.queryObj.pagenum>=this.total
      // 成立了,实际上数据还没有加上来
       if(!this.loading) return
      if(this.queryObj.pagesize*this.queryObj.pagenum>=this.total) return uni.$showMsg("加载完毕！")
     
      uni.showLoading({
        mask:true,
        title:'加载中...',
      })
      this.queryObj.pagenum++
      this.getGoodsList()
      
    },
    onPullDownRefresh(){
       if(!this.loading) return
      uni.showLoading({
        mask:true,
        title:'加载中...',
      })
      this.queryObj.pagenum=1
      this.total = 0
      this.goodsList=[]

      this.getGoodsList(()=>uni.stopPullDownRefresh())
    },
    methods:{
      // 点击跳转到商品详情页面
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      // 获取商品列表数据的方法
        async getGoodsList(cb) {
          // 发起请求
          this.loading=false
          const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
          this.loading=true
           cb&&cb()
           
          if (res.meta.status !== 200) return uni.$showMsg()
          // 为数据赋值
         this.goodsList.push(...res.message.goods) 
          this.total = res.message.total
        
        }
    }
	}
</script>

<style lang="scss">

</style>
