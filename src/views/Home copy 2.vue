<template>
  <div class="home" :class="{bigScreen: true}">
    <div class="swiperWrap" v-if="recordsList.length > 0">
      <swiper :options="swiperOption" class="gallery-top" ref="swiperTop" @slideChangeTransitionEnd="setCurrIndex">
        <swiper-slide v-for="(item, index) in recordsList" :key="index">
          <div class="swiper-zoom-container">
            <img :src="item.backImageUrl" class="itemImg" :id="'backBg'+index"/>
            <img :src="item.coverImageUrl" class="itemImg" :id="'cover'+index"/>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets" ref="navList" id="navList" slot="pagination"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
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
      recordsList: [
        {
          "id": 1,
          "iconImageUrl": "https://i.postimg.cc/DfgSWhQn/icon1.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/bg1.png",
          "backImageUrl": "http://d.paper.i4.cn/max/2016/11/25/14/1480055792014_800031.jpeg",
        },
        {
          "id": 2,
          "iconImageUrl": "https://i.postimg.cc/DfgSWhQn/icon1.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/bg2.png",
          "backImageUrl": "http://d.paper.i4.cn/max/2016/11/28/14/1480313424234_985054.jpg",
        },
        // {
        //   "id": 3,
        //   "iconImageUrl": "https://i.postimg.cc/DfgSWhQn/icon1.png",
        //   "coverImageUrl": "http://img.creasy.365zhang.com/bg1.png",
        //   "backImageUrl": "http://b-ssl.duitang.com/uploads/item/201701/14/20170114033048_rGCTM.jpeg",
        // },
        {
          "id": 4,
          "iconImageUrl": "https://i.postimg.cc/DfgSWhQn/icon1.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/bg3.png",
          "backImageUrl": "http://pic1.zhimg.com/50/v2-d90f73dc5a5cd06756ea820b1380aabd_hd.jpg",
        },
        
        {
          "id": 5,
          "iconImageUrl": "https://i.postimg.cc/DfgSWhQn/icon1.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/bg4.png",
          "backImageUrl": "http://pic1.zhimg.com/50/v2-a875d6730a6474cebb9d9c5d52ce1eb6_hd.jpg",
        },
        {
          "id": 6,
          "iconImageUrl": "https://i.postimg.cc/DfgSWhQn/icon1.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/bg1.png",
          "backImageUrl": "http://img2.imgtn.bdimg.com/it/u=3882474029,2107410337&fm=26&gp=0.jpg",
        },
        {
          "id": 7,
          "iconImageUrl": "https://i.postimg.cc/DfgSWhQn/icon1.png",
          "coverImageUrl": "http://img.creasy.365zhang.com/bg2.png",
          "backImageUrl": "http://img3.tbcdn.cn/tfscom/i2/207111955/TB2alOSeF5N.eBjSZFvXXbvMFXa_%21%21207111955.jpg",
        },
        
      ]
    }
  },
  beforeMount() {
    let timer = setInterval(() => {
      let rootFontSize = (document.documentElement.clientWidth || document.body.clientWidth) / 10;
      document.getElementsByTagName("html")[0].style.fontSize = rootFontSize + "px";
      if (rootFontSize > 32) {
        clearInterval(timer);
      }
    }, 60);
    setTimeout(() => {
      clearInterval(timer);
    }, 3000);
  },
  methods: {
    // 当前模板索引
    setCurrIndex() {
      this.activeIndex = this.$refs.swiperTop.swiper.activeIndex;
    }
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
.bigScreen .swiperWrap {
  // height: calc(100% - 112px - 160px - 180px - 68px);
}
.swiperWrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 25px;
  // height: calc(100% - 112px - 160px - 180px);
}

.gallery-top {
  width: 630px;
  height: 840px;
}
.swiper-zoom-container img {
  border-radius: 30px;
}
// .zzImg {
//   border-radius: 0;
// }
.itemImg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
// .zzCanvas {
//   width: 750px;
//   height: 1000px;
//   display: none;
// }

// 缩略图 icon 样式
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

</style>
