<template>
<transition name="fade">
  <div class="front-side" v-show="visible">
    <form class="input-box" target="_blank" :action="searchUrl">
      <input type="text"
        name="word"
        size="30"
        placeholder="search"
        class="search-input not-hide"
        autocomplete="off"
        :class="{'active': inputActive}"
        v-model="keyword"
        @focus="inputFocus"
        @keydown="inputKeydown"
      >

      <div class="search-options not-hide" :class="{'active': inputActive}">
        <span class="option not-hide">
          <i class="iconfont icon-baidu not-hide" @click="searchEngin = 0"></i>
          <i class="iconfont icon-Bing not-hide" @click="searchEngin = 1"></i>
          <i class="iconfont icon-google not-hide"></i>
        </span>
      </div>

      <transition name="drop">
        <div class="search-list" v-if="inputActive && searchList">
          <p v-for="(item, index) in searchList" 
            :key="index"
            :class="{'active': index === searchListIndex}"
            @click="clickKeyword(item)">
            {{ item }}
          </p>
        </div>    
      </transition>
    </form>

    <transition name="fade">
      <div class="collect-site" v-show="!inputActive">
        <div class="site-item" 
          v-for="item in collectSiteList" 
          :key="item.url"
          @click="openUrl(item.url)"
          @contextmenu="showContext(item.url)">
          <img class="icon" :src="`${item.url}/favicon.ico`" :alt="item.name">
          <span class="name">{{ item.name }}</span>
        </div>
        <div class="site-item"
          v-for="(item, index) in (8 - collectSiteList.length)"
          :key="index" 
          @click="collectSite">
          <i class="add-btn">+</i>
        </div>
      </div>
    </transition>

    <site-menu 
      @close="siteMenuProp.visible = false"
      @addSite="collectSiteList = $event"
      :visible="siteMenuProp.visible" 
      :clientX="siteMenuProp.clientX" 
      :clientY="siteMenuProp.clientY">
    </site-menu>

    <context-menu
      :visible="contextMenuProp.visible"
      :clientX="contextMenuProp.clientX"
      :clientY="contextMenuProp.clientY"
      @close="contextMenuProp.visible = false">
      <div class="notice" @click="deleteSite">
        <i class="iconfont icon-delete"></i>
        删除网站
      </div>
    </context-menu>
  </div>
</transition>
</template>

<script>
import SiteMenuVue from '../components/SiteMenu.vue'
import ContextMenuVue from '../components/ContextMenu.vue'
import { debounbce } from '../utils/debounce'
import { jsonp } from '../utils/jsonp'
export default {
  name: 'FrontSide',
  props: ['visible'],
  data() {
    return {
      inputActive: false,
      searchEngin: 0,
      siteMenuProp: {
        visible: false,
        clientX: 250,
        clientY: 240
      },
      contextMenuProp: {
        visible: false,
        clientX: 250,
        clientY: 240
      },
      collectSiteList: [],
      deleteSiteUrl: '',
      keyword: '',
      searchList: [],
      searchListIndex: 0
    }
  },
  computed: {
    searchUrl() {
      return this.searchEngin === 0 ? 'http://www.baidu.com/baidu' : 'https://cn.bing.com/search'
    }
  },
  created() {
    this.collectSiteList = JSON.parse(localStorage.getItem('COLLECT_SITE')) || []
  },
  mounted() {
    let theme = localStorage.getItem('THEME') || 'light'
    document.body.id = theme
    document.querySelector('.search-input').oninput = debounbce(this.handerInput, 400)
  },
  methods: {
    inputKeydown(e) {
      const event = window.event || e
      switch (event.keyCode) {
        case 38:
          this.selectKeyword(-1)
          break;
        case 40:
          this.selectKeyword(1)
          break;
      }
    },
    selectKeyword(step) {
      let length = this.searchList.length
      this.searchListIndex += step
      if (this.searchListIndex > length - 1) {
        this.searchListIndex = 0
      } else if (this.searchListIndex < 0) {
        this.searchListIndex = length - 1
      }
      this.keyword = this.searchList[this.searchListIndex]
    },
    clickKeyword(kw) {
      this.keyword = kw
      window.open(`https://www.baidu.com/s?word=${kw}`)
    },
    handerInput() {
      this.$nextTick(() => {
        jsonp({
          url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
          data: { wd: this.keyword },
          cb: 'cb'
        }).then(res => this.searchList = res.s)
      })
    },
    openUrl(url) {
      window.open(url)
    },
    inputFocus() {
      this.inputActive = true
      this.$emit('bgFilter', true)
    },
    inputFocusHide() {
      this.inputActive = false
      this.$emit('bgFilter', false)
    },
    showContext(url) {
      let event = window.event
      event.preventDefault()
      this.contextMenuProp.visible = true
      this.contextMenuProp.clientX = event.clientX
      this.contextMenuProp.clientY = event.clientY
      this.deleteSiteUrl = url
    },
    deleteSite() {
      let index = this.collectSiteList.findIndex(item => item.url === this.deleteSiteUrl)
      this.collectSiteList.splice(index, 1)
      localStorage.setItem('COLLECT_SITE', JSON.stringify(this.collectSiteList))
      this.contextMenuProp.visible = false
    },
    collectSite(e) {
      let event = window.event || e
      this.siteMenuProp.clientX = event.clientX
      this.siteMenuProp.clientY = event.clientY
      this.siteMenuProp.visible = true
    }
  },
  components: {
    'site-menu': SiteMenuVue,
    'context-menu': ContextMenuVue
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';
$mylove: #1e1e1e;
.front-side {
  .input-box {
    .search-input {
      position: absolute;
      top: 12rem;
      left: 50%;
      transform: translateX(-50%);
      width: 16rem;
      border: none;
      border-radius: 2.5rem;
      padding: 0.8rem 1rem;
      background-color: $bg-2;
      text-align: center;
      font-size: 1.4rem;
      color: $text;
      box-shadow: rgba(0,0,0,.2) 0 0 10px;
      transition: all .25s;
      &:hover {
        width: 37rem;
        background: $bg-6;
      }
      &.active {
        width: 37rem;
        background: $white;
      }
    }

    .search-list {
      position: absolute;
      top: 20rem;
      left: 50%;
      transform: translateX(-50%);
      width: 37rem;
      border-radius: 15px;
      p {
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        font-size: $font-size-small;
        color: #fff;
        word-wrap: break-word;
        padding-left: 1rem;
        cursor: pointer;
        transition: all .3s;
        &:hover {
          background: rgba($mylove, .2);
        }
        &.active {
          background: $bg-6;
        }
      }
    }

    .search-options {
      position: absolute;
      top: 17rem;
      left: 50%;
      transform: translateX(-50%);
      display: none;
      opacity: 0;
      transition: all .25s;
      &.active {
        display: block;
        opacity: 1;
      }
      .option {
        display: flex;
        align-items: center;
        padding: .4rem .8rem;
        width: 10rem;
        border-radius: 8rem;
        justify-content: space-around;
        background: $bg-1;
        .iconfont {
          cursor: pointer;
          font-size: 1.5rem;
          color: $white;
          transition: all .25s;
          &:hover {
            background: $bg-2;
          }
        }
        &.select {
          background: $bg-2;
        }
      }
    }
  }
  .collect-site {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 13rem;
    text-align: center;
    width: 60rem;
    .site-item {
      position: relative;
      display: inline-block;
      width: 20%;
      height: 3rem;
      margin: 3px 3px;
      border-radius: 5px;
      background: $bg-1;
      cursor: pointer;
      overflow: hidden;
      transition: all .3s;
      &:hover {
        background: $bg-5;
      }
      .add-btn {
        font-size: 2rem;
      }
      .icon {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 3px
      }
      .name {
        font-size: $font-size-small;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .context-menu {
    .notice {
      width: 7rem;
      cursor: default;
    }
  }
}
</style>