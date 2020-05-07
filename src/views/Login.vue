<template>
  <div class="login" v-show="visible">
    <div class="login-wrapper">
      <div class="close-btn" @click="hide">X</div>
      <div class="tab">
        <div class="tab-btn" :class="{'active': currentIndex === 0}" @click="currentIndex = 0">登录</div>
        <div class="tab-btn" :class="{'active': currentIndex === 1}" @click="currentIndex = 1">注册</div>
      </div>

      <div class="login-form">
        <form class="form-body" :class="{'active': currentIndex === 0}">
          <div class="form-item">
            <label for="user">用户名</label>
            <input type="text" placeholder="username" v-model="form1.name">
          </div>
          <div class="form-item">
            <label>密码</label>
            <input type="password" placeholder="password" v-model="form1.password">
          </div>
          <div class="form-item">
            <input type="checkbox" id="check" style="display: none;" v-model="form1.keepLogin">
            <label for="check" class="check-box" :class="{'active': form1.keepLogin}">
              <span class="icon"></span> 保持登录
            </label>
          </div>
          <div class="form-item">
            <input type="submit" value="登录" class="submit">
          </div>
          <div class="hr"></div>

        </form>

        <form class="form-body" :class="{'active': currentIndex === 1}">
          <div class="form-item">
            <label>用户名</label>
            <input type="text" placeholder="username" v-model="form2.name">
          </div>
          <div class="form-item">
            <label>密码</label>
            <input type="password" v-model="form2.password">
          </div>
          <div class="form-item">
            <label>确认密码</label>
            <input type="password" v-model="form2.checkPassword">
          </div>
          <div class="form-item">
            <label>邮箱地址</label>
            <input type="text" placeholder="email" v-model="form2.email">
          </div>
          <div class="form-item">
            <input type="submit" value="登录" class="submit">
          </div>
          <div class="hr"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      visible: false,
      currentIndex: 0,
      form_rules: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      },
      form1: {
        name: '',
        password: '',
        keepLogin: false
      },
      form2: {
        name: '',
        password: '',
        checkPassword: '',
        email: ''
      }
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    login() {
      if (this.form1.name === '' || this.form1.password === '') return alert('请输入完整表单!')

    },
    register() {
      if (!this.form2.name || !this.form2.password) return alert('请确保表单完整!')
      if (this.form2.password !== this.form2.checkPassword) return alert('请确认密码的相同!')
      if (!this.form_rules.email.test(this.form2.email)) return alert('邮箱不合法')

    }
  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
.login {
  z-index: 99;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 525px;
  min-height: 600px;
  box-shadow: 0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
  .login-wrapper {
    width: 30rem;
    height: 100%;
    padding: 90px 70px 50px 70px;
    background: rgba(40,57,101,.9);
    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
      font-size: 1.5rem
    }
    .tab {
      width: 10rem;
      margin-bottom: 1rem;
      .tab-btn {
        cursor: pointer;
        display: inline-block;
        font-size: 1.5rem;
        padding-bottom: 1rem;
        margin-right: 1rem;
        color: #aaa;
        &.active {
          color: #fff;
          border-bottom: 2px solid green;
        }
      }
    }
  }
  
  .login-form {
    min-height: 345px;
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
    .form-body {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: rotateY(180deg);
      backface-visibility: hidden;
      transition: all .4s linear;
      &.active {
        transform: rotate(0);
      }
      .hr {
        height: 2px;
        width: 100%;
        background: rgba(255,255,255,.2);
        margin: 3rem 0;
      }
      .form-item {
        margin-bottom: 1rem;
        label {
          width: 100%;
          display: block;
          font-size: 0.85rem;
          color: #aaa;
        }
        input {
          display: block;
          width: 100%;
          padding: 1rem 1.5rem;
          background: rgba(255,255,255,.1);
          border-radius: 25px;
          border: none;
        }
        .submit {
          background: #1161ee;
          text-align: center;
        }
      }
    }
  }

  .check-box {
    transition: all .3s;
    &.active {
      color: #fff !important;
    }
    &.active .icon::before {
      transform: scale(1) rotate(45deg);
    }
    &.active .icon::after {
      transform: scale(1) rotate(-45deg);
    }
    .icon {
      position: relative;
      width: 1rem;
      height: 1rem;
      border-radius: 2px;
      display: inline-block;
      background:rgba(255,255,255,.1);
    }
    .icon::before, .icon::after {
      content: '';
      width: 10px;
      height: 2px;
      background: #fff;
      position: absolute;
      transition: all .2s ease-in-out 0s;
    }
    .icon::before {
      left:3px;
      width:5px;
      bottom:6px;
      transform: rotate(0) scale(0);
    }
    .icon::after {
      top:6px;
      right:0;
      transform: rotate(0) scale(0);
    }
  }
}
</style>