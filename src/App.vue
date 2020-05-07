<template>
  <div id="app" @click="hideActive">
    <div class="title">
      <h1 @click="toggleSide">开始</h1>
    </div>

    <div class="background">
      <img class="bg-img" :src="currentBg" alt="backgroud" :class="{'active': blurBg}">
      <div class="mask"></div>
    </div>

    <front-side :visible="currentSide === 0" ref="frontSide" @bgFilter="blurBg = $event"></front-side>
    <reserve-side :visible="currentSide === 1" ref="reserveSide"></reserve-side>

    <fixed-note></fixed-note>
  </div>
</template>

<script>
import ReserveSideVue from './views/ReserveSide.vue'
import FrontSideVue from './views/FrontSide.vue'
import FixedNoteVue from './components/FixedNote.vue'

export default {
  data() {
    return {
      currentBg: '',
      currentSide: 0,
      blurBg: false
    }
  },
  mounted() {
    this.currentBg = JSON.parse(localStorage.getItem('CURRENT_BG')) || ''
  },
  methods: {
    toggleSide() {
      this.currentSide = this.currentSide === 0 ? 1 : 0
    },
    hideActive(e) {
      let target = e.target
      if (target && target.classList.contains("not-hide") === false) {
        this.$refs.frontSide.inputFocusHide()
      }
    }
  },
  components: {
    'front-side': FrontSideVue,
    'reserve-side': ReserveSideVue,
    'fixed-note': FixedNoteVue
  }
}
</script>

<style lang="scss">
@import './assets/scss/index.scss';
#app {
  width: 100%;
  height: 100%;
}
.title {
  z-index: 9;
  position: absolute;
  left: 50%;
  top: 7rem;
  margin-left: -2.5rem;
  text-align: center;
  transition: all .3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    border-bottom: 3px solid $green;
  }
  h1 {
    color: rgb(209, 203, 203);
    font-size: $font-size-large;
    padding: 5px 10px;
  }
}
.background {
  .bg-img {
    z-index: -3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-size: cover;
    display: block;
    background-position: center center;
    transition: filter .25s;
    &.active {
      filter: blur(10px)
    }
  }
  .mask {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,0.3) 166%);
    transition: all .25s;
  }
}
</style>
