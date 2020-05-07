<template>
<transition name="fade">
  <div class="reserve-side" v-show="visible">
    <div class="user-tools">
      <i class="iconfont icon-user" @click="showLogin"></i>
      <i class="iconfont icon-setting" @click="toggleSettingMenu"></i>
      <setting-menu :visible="settingMenuVisible" @close="settingMenuVisible = false"></setting-menu>
    </div>

    <div class="main-box">
      <div class="favor-site" :style="{'left': boxIndex === 0 ? '0' : '-100%'}">
        <ul>
          <li><a href="https://www.bilibili.com/">哔哩哔哩</a></li>
          <li><a href="https://tieba.baidu.com/index.html">百度贴吧</a></li>
          <li><a href="http://fanyi.youdao.com/">有道翻译</a></li>
          <li><a href="https://juejin.im/">掘金</a></li>
          <li><a href="https://mail.qq.com/">QQ邮箱</a></li>
          <li><a href="https://github.com">github</a></li>
          <li><a href="http://i.mooc.chaoxing.com/">学习通</a></li>
        </ul>
      </div>
      <div class="sticky-note" :style="{'left': boxIndex === 1 ? '0' : '100%'}">
        <div class="note-list-wrapper">
          <div class="note-list">
            <span class="add-note" @click="newNote">+ 新便签</span>
            <div class="note-item" v-for="(item, index) in noteList" :key="index" 
              @click="editNote(item, index)">
              <p class="content">{{ item.content }}</p>
              <p class="time">{{ item.create_time | formatDate('yyyy-MM-dd hh:mm:ss') }}</p>
              <div class="tools">
                <i class="iconfont icon-delete" @click="deleteNote(index)"></i>
                <i class="iconfont icon-fixed" @click="fixedNote(index)"></i>
              </div>
            </div>
          </div>
        </div>
        <textarea
          ref="textarea"
          class="note-input" 
          placeholder="按回车健就能创建新便签哦！"
          v-model="noteContent"
          @keydown.enter="addNote">
        </textarea>
      </div>
    </div>

    <div class="switch-btn">
      <span @click="boxIndex = 0" :class="{'active': boxIndex === 0}"></span>
      <span @click="boxIndex = 1" :class="{'active': boxIndex === 1}"></span>
    </div>

    <login-page ref="login"></login-page>
  </div>
</transition>
</template>

<script>
import SettingMenuVue from '../components/SettingMenu.vue'
import LoginVue from './Login.vue'

export default {
  name: 'ReserveSide',
  props: ['visible'],
  data() {
    return {
      boxIndex: 0,
      noteContent: '',
      noteList: [],
      currentNoteIndex: 0,
      settingMenuVisible: false
    }
  },
  created() {
    this.noteList = JSON.parse(localStorage.getItem('NOTE')) || []
  },
  methods: {
    showLogin() {
      this.$refs.login.show()
    },
    toggleSettingMenu() {
      this.settingMenuVisible = !this.settingMenuVisible
    },
    mouseWheel(e) {
      e.preventDefault()
      let event = e || window.event
      console.log('aaaa' + event)
    },
    newNote() {
      this.noteContent = ''
      this.$refs.textarea.focus()
    },
    deleteNote(index) {
      if (confirm('确认删除此便签吗?')) {
        this.noteList.splice(index, 1)
        localStorage.setItem('NOTE', JSON.stringify(this.noteList))
      }
    },
    fixedNote(index) {
      const note = this.noteList[index]
      localStorage.setItem('FIXED_NOTE', JSON.stringify(note))
    },
    editNote(note, index) {
      this.noteContent = note.content
      this.currentNoteIndex = index
    },
    addNote() {
      if (this.currentNoteIndex) {
        this.noteList.splice(this.currentNoteIndex, 1)
      }
      let form = {}
      form.content = this.noteContent
      form.create_time = Date.now()
      this.noteList.unshift(form)
      localStorage.setItem('NOTE', JSON.stringify(this.noteList))
    }
  },
  components: {
    'setting-menu': SettingMenuVue,
    'login-page': LoginVue
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';
.reserve-side {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .user-tools {
    position: absolute;
    top: 2rem;
    right: 3rem;
    .iconfont {
      font-size: 1.4rem;
      margin-left: 1rem;
      color: #ccc;
      transition: all .3s;
      &:hover {
        color: $text;
      }
    }
  }
}
.main-box {
  position: absolute;
  top: 12rem;
  left: 50%;
  transform: translateX(-50%);
  width: 48rem;
  height: 18rem;
  overflow: hidden;
  .favor-site {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .3s;
    ul {
      width: 100%;
      display: block;
      li {
        position: relative;
        display: inline-block;
        width: 15%;
        padding: 1rem 0;
        margin: 1rem;
        border-radius: 4px;
        overflow: hidden;
        a {
          font-size: .9rem;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          color: $text;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          background: transparent;
          transition: all .2s;
          &:hover {
            color: $green;
            background: $bg-5;
          }
        }
      }
    }
  }
  .sticky-note {
    position: absolute;
    left: 100%;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    transition: all .3s;
    .note-list-wrapper {
      width: 12rem;
      height: 100%;
      overflow: hidden;
      border-radius: 1rem;
    }
    .note-list {
      width: 14rem;
      height: 100%;
      border-radius: 1rem;
      overflow-y: auto;
      color: #fff;
      .add-note {
        cursor: pointer;
      }
      .note-item {
        position: relative;
        cursor: default;
        width: 100%;
        padding: 1rem;
        border-bottom: solid 1px rgba(255,255,255,.1);
        background: transparent;
        transition: all .3s;
        &.active {
          border-left: 3px solid $green;
        }
        &:hover {
          background: $bg-2;
          .tools {
            display: block;
          }
        }
        .time {
          margin-top: .3rem;
          font-size: $font-size-small;
          color: #ccc;
        }
        .tools {
          position: absolute;
          width: 5rem;
          top: 1rem;
          right: 0;
          bottom: 0;
          display: none;
          &:hover {
            color: $text
          }
          .iconfont {
            cursor: pointer;
            margin-right: .4rem;
          }
        }
      }
    }
    .note-input {
      height: 100%;
      color: $text;
      border: none;
      border-radius: 1rem;
      background: $bg-5;
      resize: none;
      padding: 1rem;
    }
    .note-input {
      margin-left: 1rem;
      flex: 1;
    }
  }
}
.switch-btn {
  position: absolute;
  bottom: 10rem;
  left: 50%;
  transform: translateX(-50%);
  span {
    display: inline-block;
    width: 2rem;
    height: .5rem;
    background: $bg-5;
    cursor: pointer;
    margin-right: 1rem;
    border-radius: 6px;
    transition: all .25s;
    &:hover {
      background: $bg-2;
    }
    &.active {
      background: $bg-1;
    }
  }
}
</style>