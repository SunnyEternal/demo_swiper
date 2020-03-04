
<template>
  <div class="home">
    <div class="swiperWrap" v-if="recordsList.length > 0">
      <swiper :options="swiperOption" class="gallery-top" ref="swiperTop" @slideChangeTransitionEnd="setCurrIndex">
        <swiper-slide v-for="(item, index) in recordsList" :key="index">
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
      recordsList: [
        {
          "id": 1,
          "iconImageUrl": "http://img.creasy.365zhang.com/icon4.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/c1.png",
          "backImageUrl": "http://d.paper.i4.cn/max/2016/11/25/14/1480055792014_800031.jpeg",
        },
        {
          "id": 2,
          "iconImageUrl": "http://img.creasy.365zhang.com/icon2.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/c2.png",
          "backImageUrl": "http://img.creasy.365zhang.com/bg2.png",
        },
        {
          "id": 3,
          "iconImageUrl": "http://img.creasy.365zhang.com/icon3.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/c3.png",
          "backImageUrl": "http://img.creasy.365zhang.com/bg3.png",
        },
        {
          "id": 4,
          "iconImageUrl": "http://img.creasy.365zhang.com/icon1.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/c4.png",
          "backImageUrl": "http://img.creasy.365zhang.com/bg4.png",
        },
        {
          "id": 5,
          "iconImageUrl": "http://img.creasy.365zhang.com/icon5.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/c5.png",
          "backImageUrl": "http://img.creasy.365zhang.com/bg1.png",
        },
        {
          "id": 6,
          "iconImageUrl": "http://img.creasy.365zhang.com/icon6.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/c6.png",
          "backImageUrl": "http://img.creasy.365zhang.com/bg2.png",
        }
      ]
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
.swiper-slide{
  width: 630px!important;
}
.swiper-slide-active{
  width: 630px!important;
}
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
