<template>
  <view>
    <view class="search-box"><my-search @click='gotoSearch'></my-search></view>
    
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view class="left-scroll-view-item " :class="i===active?'active':''" @click="activeChanged(i)">{{item.cat_name}}</view>
        </block>
        
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <block v-for="(item2,i2) in cateLevel2" :key="i2">
          <view class="left-scroll-view-item">
            <view class=".cate-lv2-title">
              / {{item2.cat_name}} /
            </view>
            <!-- 动态渲染三级分类的列表数据 -->
                <view class="cate-lv3-list">
                  <!-- 三级分类 Item 项 -->
                  <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
                    <!-- 图片 -->
                    <image :src="item3.cat_icon"></image>
                    <!-- 文本 -->
                    <text>{{item3.cat_name}}</text>
                  </view>
                </view>
          </view>
        </block>
        
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import uniIcons from "@/components/uni-icons/uni-icons.vue"
  import badgeMix from '@/mixin/tabbar-badge.js' 
	export default {
    mixins:[badgeMix],
    components: {uniIcons},
		data() {
			return {
        scrollTop:0,
				wh:0,
        active: 0,
        cateList: [],
        // 二级分类列表
            cateLevel2: []
			};
		},
onLoad(){
    const info= uni.getSystemInfoSync()
    this.wh=info.windowHeight-50,
    // 调用获取分类列表数据的方法
      this.getCateList()
    },
    methods:{
      gotoSearch() {
           uni.navigateTo({
             url: '/subpkg/search/search'
           })
         },
      gotoGoodsList(item3){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item3.cat_id
        })
      },
      activeChanged(i){
       
        this.active = i
        this.cateLevel2=this.cateList[i].children
        this.scrollTop = this.scrollTop ? 0 : 1
      },
      async getCateList() {
          // 发起请求
          const { data: res } = await uni.$http.get('/api/public/v1/categories')
          // 判断是否获取失败
          if (res.meta.status !== 200) return uni.$showMsg()
          // 转存数据
          this.cateList = res.message
          this.cateLevel2=res.message[0].children
        }
    }
      
	}
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;
  
    .cate-lv3-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
  
      image {
        width: 60px;
        height: 60px;
      }
  
      text {
        font-size: 12px;
      }
    }
  }
  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.search-box {
  // 设置定位效果为“吸顶”
  position: sticky;
  // 吸顶的“位置”
  top: 0;
  // 提高层级，防止被轮播图覆盖
  z-index: 999;
}
</style>
