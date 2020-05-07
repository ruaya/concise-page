<template>
<transition name="fade">
  <div class="setting-card" v-show="cardVisible">
    <div class="header">
      <h1 class="card-title">{{ title }}</h1>
      <div class="close-btn" @click="colseCard">X</div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'Setting-card',
  props: ['title'],
  data() {
    return {
      cardVisible: false
    }
  },
  methods: {
    openCard() {
      this.cardVisible = true
    },
    colseCard() {
      this.cardVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.setting-card {
  z-index: 10;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 42rem;
  height: 35rem;
  border-radius: 1rem;
  background: $white;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,.05);
  padding: 2rem;
  .header {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .close-btn {
      cursor: pointer;
      font-size: $font-size-large
    }
  }
  .content {
    margin-top: 1rem;
    height: calc(100% - 3rem);
    overflow-y: auto;
  }
}

</style>