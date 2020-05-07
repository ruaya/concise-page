<template>
<transition-group name="fade-scale" tag="div">
  <div class="setting-menu" v-show="visible" key="1">
    <div class="setting-item" 
      v-for="(item, index) in menuList" 
      :key="index"
      @click="openSettingCard(index)">
      {{ item }}
    </div>
  </div>
  <setting-card title="常规设置" ref="card0" key="2">
    <div class="card-item">
      <span>开启深色主题</span>
      <toggle-button @change="toggleTheme"></toggle-button>
    </div>
  </setting-card>
  <setting-card title="背景设置" ref="card1" key="3">
    <div class="card-item">
      <p>自定义壁纸</p>
      <div class="setting-img">
        <div class="content-img" @click="changeBg(customBg)">
          <img :src="customBg" alt="background">
        </div>
        <div class="upload-img">
          <h3>请上传你喜欢的图片作为壁纸</h3>
          <p class="description">支持jpg,png,jpeg的图片哦!</p>
          <label for="file">浏览...</label>
          <input type="file" id="file" @change="uploadImg">
        </div>
      </div>
    </div>
    <div class="card-item">
      <p>默认壁纸</p>
      <div class="content-img">
        <img src="../assets/bg1.jpg" alt="">
      </div>
    </div>
  </setting-card>
  <setting-card title="打赏一个" ref="card2" key="4"></setting-card>
  <setting-card title="反馈给我" ref="card3" key="5"></setting-card>
</transition-group>
</template>

<script>
import settingCardVue from './SettingCard'
import { ToggleButton } from 'vue-js-toggle-button'
export default {
  name: 'Setting',
  props: ['visible'],
  data() {
    return {
      customBg: '',
      theme: '',
      menuList: ['常规设置', '背景设置', '打赏', '反馈'],
      currentSettingCard: ''
    }
  },
  mounted() {
    this.theme = document.body.id
    this.customBg = JSON.parse(localStorage.getItem('CUSTOM_BG'))
  },
  methods: {
    openSettingCard(index) {
      this.$emit('close')
      let currentCardIndex = `card${index}`
      this.$refs[currentCardIndex].openCard()
    },
    // card1
    toggleTheme() {
      let isLight = document.body.id === 'light'
      this.theme = isLight ? 'dark' : 'light'
      document.body.id = this.theme
      localStorage.setItem('THEME', this.theme)
    },
    // card2
    uploadImg(e) {
      let obj = e.target;
      let file = obj.files[0];
      let temArr = file.name.split(".");
      console.log('file: ' + temArr)
      let file_suffix = temArr[temArr.length-1];
      if(file_suffix != 'jpg' && file_suffix != 'png' && file_suffix != 'jpeg'){
        alert("上传图片失败，目前只支持jpg,png,jpeg的图片!");
        return;
      }
      let reader = new FileReader();
      let _self = this;
      reader.onload = function (ev) {
        _self.customBg = ev.target.result;
        localStorage.setItem('CUSTOM_BG', JSON.stringify(_self.customBg))
      }
      reader.readAsDataURL(file);
    },
    changeBg(url) {
      localStorage.setItem('CURRENT_BG', JSON.stringify(url))
    }
  },
  components: {
    'setting-card': settingCardVue,
    'toggle-button': ToggleButton
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';
.fade-scale-entry-active, .fade-scale-leave-active {
  transition: all .3s;
}
.fade-scale-entry, .fade-scale-leave-to {
  transform-origin: top right;
  opacity: 0;
  transform: scale(0.3)
}
.setting-menu {
  z-index: 11;
  position: absolute;
  bottom: -180px;
  right: -10px;
  width: 7rem;
  background: $white;
  &::before {
    z-index: -1;
    content: '';
    width: 1rem;
    height: 1rem;
    transform: rotate(45deg);
    background: $white;
    position: absolute;
    top: -0.5rem;
    right: 10px;
  }
  border-radius: 6px;
  .setting-item {
    cursor: pointer;
    width: 100%;
    text-align: center;
    padding: .85rem;
    &:hover {
      background: $bg-2;
    }
  }
}
.setting-card {
  .card-item {
    margin: .5rem 0;
    span {
      margin-right: 1rem;
    }
  }
  .content-img {
    margin: .5rem .5rem 0 0;
    width: 9.5rem;
    height: 6.5rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  .setting-img {
    margin-top: .5rem;
    display: flex;
    align-items: center;
    .upload-img {
      flex: 1;
      margin-left: 1rem;
      h3 {
        margin-bottom: .5rem;
      }
      .description {
        font-size: $font-size-small;
        color: $bg-6;
        margin-bottom: .3rem;
      }
      label {
        display: block;
        cursor: pointer;
        width: 100px;
        padding: 1rem 1rem;
        background: $green;
        transition: all .3s;
        border-radius: 6px;
        &:hover {
          background: green;
        }
      }
      input[type="file"] {
        display: none;
      }
    }
  }
}

</style>