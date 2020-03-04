<template>
  <div class="home" :class="{bigScreen: true}">
    <!-- 2. 图片展示区  @touchmove.prevent="touchPrevent" -->
    <div class="swiperWrap" v-if="recordsList.length > 0">
      <swiper
        :options="swiperOption"
        class="gallery-top"
        ref="swiperTop"
        @slideChangeTransitionEnd="setCurrIndex"
      >
        <swiper-slide v-for="(item, index) in recordsList" :key="index">
          <div class="swiper-zoom-container">
            <img :src="item.backImageUrl" class="itemImg" :id="'backBg'+index"/>

            <img
              v-if="item.coverImageUrl"
              :src="item.coverImageUrl"
              class="itemImg"
              :id="'cover'+index"
              alt
            />

            <canvas :id="'canvas'+index" class="zzCanvas"></canvas>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- 3. 缩略图 -->
    <div
      class="swiper-pagination swiper-pagination-bullets"
      ref="navList"
      id="navList"
      slot="pagination"
    ></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return{
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          spaceBetween: 10,
          clickable: true,
          renderBullet: (index, className) => {
            this.activeIndex = index
            // console.log('index:'+index)
            return `<span id=a${index} class="${className} swiper-pagination-bullet-custom">
            <img src="${this.recordsList[index].iconImageUrl}" class="iconImg" alt="0" />
            <em class="redPoint${index}"></em>
            </span>`
          }
        }
      },
      activeIndex: 0, // 当前轮播的图
      recordsList: []
    }
  },
  mounted() {
    this.recordsList = [{"id":1,"iconImageUrl":"https://i.postimg.cc/DfgSWhQn/icon1.png","coverImageUrl":"https://i.postimg.cc/BZyg783K/pig.png","backImageUrl":"https://i.postimg.cc/65bbLrkT/x.jpg",},{"id":2,"iconImageUrl":"https://i.postimg.cc/DfgSWhQn/icon1.png","coverImageUrl":"https://i.postimg.cc/BZyg783K/pig.png","backImageUrl":"https://i.postimg.cc/J4h6B1XL/13.jpg",},{"id":3,"iconImageUrl":"https://i.postimg.cc/DfgSWhQn/icon1.png","coverImageUrl":"https://i.postimg.cc/BZyg783K/pig.png","backImageUrl":"https://i.postimg.cc/zB12LKCt/12.jpg",},{"id":4,"iconImageUrl":"https://i.postimg.cc/DfgSWhQn/icon1.png","coverImageUrl":"https://i.postimg.cc/BZyg783K/pig.png","backImageUrl":"https://i.postimg.cc/NjsgX240/4.jpg",},{"id":5,"iconImageUrl":"https://i.postimg.cc/DfgSWhQn/icon1.png","coverImageUrl":"https://i.postimg.cc/BZyg783K/pig.png","backImageUrl":"https://i.postimg.cc/3J77M0zZ/8.jpg",},{"id":6,"iconImageUrl":"https://i.postimg.cc/DfgSWhQn/icon1.png","coverImageUrl":"https://i.postimg.cc/BZyg783K/pig.png","backImageUrl":"https://i.postimg.cc/BZyg783K/pig.png",},{"id":7,"iconImageUrl":"https://i.postimg.cc/DfgSWhQn/icon1.png","coverImageUrl":"https://i.postimg.cc/BZyg783K/pig.png","backImageUrl":"https://i.postimg.cc/28fjzKLh/3.jpg",},{"id":8,"iconImageUrl":"https://i.postimg.cc/DfgSWhQn/icon1.png","coverImageUrl":"https://i.postimg.cc/BZyg783K/pig.png","backImageUrl":"https://i.postimg.cc/m2Vv0XYb/10.jpg",},{"id":9,"iconImageUrl":"https://i.postimg.cc/DfgSWhQn/icon1.png","coverImageUrl":"https://i.postimg.cc/BZyg783K/pig.png","backImageUrl":"https://i.postimg.cc/LX1RStHx/6.jpg",},{"id":10,"iconImageUrl":"https://i.postimg.cc/DfgSWhQn/icon1.png","coverImageUrl":"https://i.postimg.cc/BZyg783K/pig.png","backImageUrl":"https://i.postimg.cc/KcTvh2jm/2.jpg",}];

    // {
        //   "id": 5,
        //   "iconImageUrl": "https://i.postimg.cc/DfgSWhQn/icon1.png",
        //   "coverImageUrl": "https://i.postimg.cc/BZyg783K/pig.png",
        //   "backImageUrl": "http://attach.bbs.miui.com/forum/201708/14/183444z0e11zt0t20z791i.jpg",
        // },
        // {
        //   "id": 7,
        //   "iconImageUrl": "https://i.postimg.cc/DfgSWhQn/icon1.png",
        //   "coverImageUrl": "https://i.postimg.cc/BZyg783K/pig.png",
        //   "backImageUrl": "http://i0.hdslb.com/bfs/article/43c522c3255726fc33fea69bfbf6436ad6321895.jpg",
        // },
  },
  methods: {
    // 当前模板索引
    setCurrIndex() {
      this.activeIndex = this.$refs.swiperTop.swiper.activeIndex;
      console.log(this.activeIndex)
      if (parseInt(this.activeIndex / 10) === (this.pageNum - 1)) {
        console.log('下一页: ', this.pageNum, '>>>>', this.pageSize)
        this.getTemplateList((this.pageNum+1), this.pageSize)
        this.SetLoading({flag:0,text:'',bg:'transparent'})
      }
    }
  }
}
</script>
<style lang="scss">
.bigScreen .swiperWrap {
  height: calc(100% - 112px - 160px - 180px - 68px);
}
.swiperWrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(100% - 112px - 160px - 180px);
}

.gallery-top {
  width: 630px;
  height: 840px;
}
.swiper-zoom-container img {
  border-radius: 30px;
}
.zzImg {
  border-radius: 0;
}
.itemImg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.zzCanvas {
  width: 750px;
  height: 1000px;
  display: none;
}

.footBtn {
  width: 100%;
  height: 160px;
  padding-top: 36px;
  box-sizing: border-box;
  .btn {
    display: block;
    width: 280px;
    height: 88px;
    border-radius: 44px;
    margin: 0 auto;
    background: #5c46ff;
    font-size: 30px;
    color: #fff;
    font-weight: bold;
  }
}

// 缩略图 icon 样式
::-webkit-scrollbar{width:0;height:0}
.swiper-pagination {
  width: 100%;
  height: 180px;
  box-sizing: border-box;
  padding: 16px 25px;
  overflow-x: scroll; /*添加横向滚动条*/
  white-space: nowrap; /*不换行*/
  position: static!important;
  overflow-y: hidden;
}
.swiper-pagination-bullet {
  width: 148px!important;
  height: 148px!important;
  border-radius: 24px!important;
  background: #161616!important;
  padding: 6px;
  border: 4px solid transparent;
  box-sizing: border-box;
  opacity: 1!important;
  margin-right: 14px;
  position: relative;
  font-size: 0;
}
.swiper-pagination-bullet-active {
  background: #161616!important;
  border: 4px solid #5c46ff;
  box-sizing: border-box;
}
.swiper-pagination-bullet:focus {
  outline: none!important;
}
.swiper-pagination-bullet-active:focus {
  outline: none!important;
}
.swiper-pagination-bullet:active {
  outline: none!important;
}
.swiper-pagination-bullet-active:active {
  outline: none!important;
}
.iconImg{
  width: 128px;
  height: 128px;
  border-radius: 20px;
}
// .redPoint0, .redPoint1, .redPoint2 {
//   display: block;
//   width: 28px;
//   height: 28px;
//   position: absolute;
//   top: -6px;
//   right: -6px;
//   background-image: url("../assets/pic/dot_28@2x.png");
//   background-repeat: no-repeat;
//   background-size: 28px 28px;
//   background-position: center center;
// }


// .confRender-enter {
//   opacity: 0;
// }
// .confRender-enter-active {
//   transition: 0.3s linear;
// }
// .confRender-leave-active {
//   opacity: 0;
//   transition: 0.3s linear;
// }
</style>
