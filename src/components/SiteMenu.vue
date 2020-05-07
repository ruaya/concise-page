<template>
<transition name="fade">
  <div class="site-menu" v-show="menuVisible" :style="{'left': clientX - 140 + 'px', 'top': clientY - 160 + 'px'}">
    <div class="menu-item header">
      <h3 class="text">收藏网站</h3>
      <i class="close-btn" @click="close">X</i>
    </div>
    <div class="menu-item">
      <input type="text" v-model="form.url" placeholder="网站地址">
    </div>
    <div class="menu-item">
      <input type="text" v-model="form.name" placeholder="网站名称">
    </div>
    <div class="menu-item">
      <button class="submit" @click="submit">添加</button>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'SiteMenu',
  props: ['visible', 'clientX', 'clientY'],
  data() {
    return {
      form: {
        url: '',
        name: ''
      }
    }
  },
  computed: {
    menuVisible() {
      return this.visible
    }
  },
  methods: {
    submit() {
      if (this.form.url === '') return alert('请输入网址')
      let collectSiteList = JSON.parse(localStorage.getItem('COLLECT_SITE')) || []
      let isCollected = collectSiteList.find(item => item.url === this.form.url)
      if (isCollected) return alert('存在相同网址')
      collectSiteList.push(this.form)
      localStorage.setItem('COLLECT_SITE', JSON.stringify(collectSiteList))
      this.form = {
        url: '',
        name: ''
      }
      
      this.$emit('addSite', collectSiteList)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';
.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
.site-menu {
  position: absolute;
  width: 21rem;
  height: 11rem;
  padding: 1rem;
  border-radius: 8px;
  background: $white;
  box-shadow: rgba(0,0,0,.1) 0 10px 15px;
  transition: all .3s;
  .menu-item {
    width: 100%;
    margin-bottom: .5rem;
    &.header {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      i {
        cursor: pointer;
      }
    }
    
    input {
      width: 100%;
      border: none;
      padding: .3rem 1rem;
      background: #ccc;
      border-radius: 8px;
      transition: all .3s;
    }
    .submit {
      text-align: right;
      padding: .3rem 1rem;
      background: $green;
      color: $white;
      transition: all .3s;
      &:hover {
        transform: scale(1.1)
      }
    }
  }
}
</style>