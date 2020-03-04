
<template>
  <div class="home">
    <div class="swiperWrap" v-if="recordsList.length > 0">
      <swiper :options="swiperOption" class="gallery-top" ref="swiperTop" @slideChangeTransitionEnd="setCurrIndex">
        <swiper-slide class="swiper-wrap" v-for="(item, index) in recordsList" :key="index">
          <div class="swiper-zoom-container">
            <img :src="item.backImageUrl" class="itemImg" :id="'backBg'+index"/>
            <img :src="item.coverImageUrl" class="itemImg" :id="'coverBg'+index"/>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets" ref="navList" id="navList" slot="pagination"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return{
      platform: null,
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
      // recordsList: [
      //   {
      //     "id": 1,
      //     "iconImageUrl": "http://img.creasy.365zhang.com/icon4.png",
      //     "coverImageUrl": "http://img.creasy.365zhang.com/c1.png",
      //     "backImageUrl": "http://img.creasy.365zhang.com/base_swiper_jerry_01.jpg",
      //   },
      //   {
      //     "id": 2,
      //     "iconImageUrl": "http://img.creasy.365zhang.com/icon2.png",
      //     "coverImageUrl": "http://img.creasy.365zhang.com/c1.png",
      //     "backImageUrl": "http://img.creasy.365zhang.com/base_swiper_jerry_02.jpg",
      //   },
      //   {
      //     "id": 3,
      //     "iconImageUrl": "http://img.creasy.365zhang.com/icon3.png",
      //     "coverImageUrl": "http://img.creasy.365zhang.com/c1.png",
      //     "backImageUrl": "http://img.creasy.365zhang.com/base_swiper_jerry_03.jpg",
      //   },
      //   {
      //     "id": 4,
      //     "iconImageUrl": "http://img.creasy.365zhang.com/icon1.png",
      //     "coverImageUrl": "http://img.creasy.365zhang.com/c1.png",
      //     "backImageUrl": "http://img.creasy.365zhang.com/base_swiper_jerry_04.jpg",
      //   },
      //   {
      //     "id": 5,
      //     "iconImageUrl": "http://img.creasy.365zhang.com/icon5.png",
      //     "coverImageUrl": "http://img.creasy.365zhang.com/c1.png",
      //     "backImageUrl": "http://img.creasy.365zhang.com/base_swiper_jerry_05.jpg",
      //   },
      //   {
      //     "id": 6,
      //     "iconImageUrl": "http://img.creasy.365zhang.com/icon6.png",
      //     "coverImageUrl": "http://img.creasy.365zhang.com/c1.png",
      //     "backImageUrl": "http://img.creasy.365zhang.com/base_swiper_ani_01.jpg",
      //   }
      // ]
      recordsList: []
    }
  },
  beforeMount() {
    this.platform = this.checkPlatForm();

    let timer1 = setInterval(() => {
      let rootFontSize = (document.documentElement.clientWidth || document.body.clientWidth) / 10;
      document.getElementsByTagName("html")[0].style.fontSize = rootFontSize + "px";
      if (this.platform != 'PC') {
        if (rootFontSize > 32) {
          clearInterval(timer1);
        }
      } else {
        rootFontSize = '37.5'
        document.getElementsByTagName("html")[0].style.fontSize = rootFontSize + "px";
      }
    }, 60);
    let timer2 = setTimeout(() => {
      clearInterval(timer1);
      clearTimeout(timer2);
    }, 3000);
  },
  mounted() {
    let timer = setTimeout(() => {
      this.recordsList = [{"id":1,"iconImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_i01.jpg","coverImageUrl":"http://img.creasy.365zhang.com/c1.png","backImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_01.jpg",},{"id":2,"iconImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_i02.jpg","coverImageUrl":"http://img.creasy.365zhang.com/c1.png","backImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_02.jpg",},{"id":3,"iconImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_i03.jpg","coverImageUrl":"http://img.creasy.365zhang.com/c1.png","backImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_03.jpg",},{"id":4,"iconImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_i04.jpg","coverImageUrl":"http://img.creasy.365zhang.com/c1.png","backImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_04.jpg",},{"id":5,"iconImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_i05.jpg","coverImageUrl":"http://img.creasy.365zhang.com/c1.png","backImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_05.jpg",},{"id":6,"iconImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_i13.jpg","coverImageUrl":"http://img.creasy.365zhang.com/c1.png","backImageUrl":"http://img.creasy.365zhang.com/base_swiper_jerry_13.jpg",}]
      clearTimeout(timer)
    }, 500)
  },
  methods: {
    // 当前模板索引
    setCurrIndex() {
      this.activeIndex = this.$refs.swiperTop.swiper.activeIndex;
    },
    checkPlatForm() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //Ios
        return "iOS";
      } else if (/(Android)/i.test(navigator.userAgent)) {
        //Android终端
        return "Android";
      } else {
        return "PC"
      }
    },
    // 图片加载完处理 [宽、位移]
    imgload(i, item) {
      if (item.imgW > 0) {
        // console.log('图片实际宽:', item.imgW*630/750/2/37.5)
        // console.log('图片left:', item.imgX*630/750/2/37.5+'rem')
        // console.log('图片top:', item.imgY*840/1000/2/37.5+'rem')
        if (item.imgW < 750) { // 1. 说明图片进行了缩放
          if (item.imgX === 0 && item.imgY === 0) { // 2. 经过【1】，上下左右垂直居中
            $('#zzImg'+i).css({width: item.imgW*630/750/2/37.5+'rem'})
          } else { // 3. 经过【1】，有位移。
            $('#zzImg'+i).css({width: item.imgW*630/750/2/37.5+'rem', transform: 'translate(0, 0)', position: 'absolute'})
            if (item.imgW - item.imgX === 750) { // 图片缩小了，缩小的大小就是imgX、imgY，所以图片只要以左上角为原点对齐就好
              $('#zzImg'+i).css({left: 0})
            } else {
              $('#zzImg'+i).css({left: item.imgX*630/750/2/37.5+'rem'})
            }
            if (item.imgH - item.imgY === 1000) { // 图片缩小了，缩小的大小就是imgX、imgY，所以图片只要以左上角为原点对齐就好
              $('#zzImg'+i).css({top: 0})
            } else {
              $('#zzImg'+i).css({top: item.imgY*840/1000/2/37.5+'rem'})
            }
            // $('#zzImg'+i).css({width: item.imgW*630/750/2/37.5+'rem', transform: 'translate(0, 0)', position: 'absolute', left: 0, top: item.imgY*840/1000/2/37.5+'rem'})
          }
        } else { // item.imgW === 750，图片没有缩放，直接进行位移了
          $('#zzImg'+i).css({width: item.imgW*630/750/2/37.5+'rem', transform: 'translate(0, 0)', position: 'absolute', left: item.imgX*630/750/2/37.5+'rem', top: item.imgY*840/1000/2/37.5+'rem'})
        }
      }
    },
  }
}
</script>
<style lang="scss">
.home{
  background: #161616;
  height: 100%;
  padding-top: 128px;
  box-sizing: border-box;
}
.swiperWrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 25px;
}
.gallery-top {
  width: 630px;
  height: 840px;
}
// .swiper-wrap{
//   width: 630px!important;
// }
// .swiper-slide{
//   width: 630px!important;
// }
// .swiper-slide-active{
//   width: 630px!important;
// }
.swiper-zoom-container img {
  border-radius: 30px;
}
.itemImg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

// 缩略图 icon 样式，我是将分页器样式覆盖改成缩略图的
::-webkit-scrollbar{width:0;height:0}
.swiper-pagination {
  width: 100%;
  height: 180px;
  box-sizing: border-box;
  padding: 16px 25px;
  overflow-x: scroll;
  white-space: nowrap;
  position: static!important;
  overflow-y: hidden;
}
.swiper-pagination-bullet {
  width: 148px!important;
  height: 148px!important;
  border-radius: 24px!important;
  background: #d0d0d0!important;
  padding: 6px;
  border: 4px solid transparent;
  box-sizing: border-box;
  opacity: 1!important;
  margin-right: 14px;
  position: relative;
  font-size: 0;
}
.swiper-pagination-bullet-active {
  background: #fff!important;
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
</style>
