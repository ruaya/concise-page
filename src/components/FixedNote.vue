<template>
  <div class="fixed-note" v-show="noteContent" id="fixed-note">
    <div class="note-wrapper">
      <div class="content">{{ noteContent.content }}</div>
      <div class="time">{{ noteContent.create_time | formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
    </div>
    <div class="close-btn" @click="deleteFixed">X</div>
  </div>
</template>

<script>
export default {
  name: 'FiexedNote',
  data() {
    return {
      noteContent: '',
      visible: false
    }
  },
  mounted() {
    this.noteContent = JSON.parse(localStorage.getItem('FIXED_NOTE')) || ''
  },
  methods: {
    openFixed() {
      this.visible = true
    },
    deleteFixed() {
      this.visible = false
      localStorage.removeItem('FIXED_NOTE')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';
.fixed-note {
  position: fixed;
  top: 1rem;
  left: 1rem;
  width: 10rem;
  height: 5rem;
  background: $white;
  padding: 1rem;
  border-radius: 8px;
  .note-wrapper {
    position: relative;
    width: 100%;
    .content {
      word-break: break-all;
    }
    .time {
      font-size: $font-size-small;
    }
  }
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
}
</style>