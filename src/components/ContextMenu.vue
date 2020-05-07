<template>
<transition name="fade">
  <div class="context-menu" 
    v-show="visible" 
    :style="{'left': clientX + 'px', 'top': clientY + 'px'}"
    v-click-outside="hide">
    <slot></slot>
  </div>
</transition>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: ['visible', 'clientX', 'clientY'],
  data() {
    return {
      
    }
  },
  methods: {
    hide() {
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
.context-menu {
  position: absolute;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: rgba(0,0,0,.1) 0 10px 15px;
  background: $white;
  transition: all .3s;
}
</style>