<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Checkbox @on-change="toggle">保持登录状态</Checkbox>
      <div class="flexbox">
        <Button class="flexbox-btn" @click="handleSubmit" type="primary" long>登录</Button>
        <router-link :to="{path:'/register'}">还没账号？免费注册&gt;&gt;</router-link>
      </div>
    </FormItem>
  </Form>
</template>
<script>
import config from '@/config'
const {cookieExpires_long, cookieExpires_short} = config

export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: '',
        password: ''
      },
      cookiesExp: 1
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            cookiesExp: this.cookiesExp
          })
        }
      })
    },
    toggle(value) {
      this.cookiesExp = value? cookieExpires_long: cookieExpires_short
    }
  }
}
</script>

<style lang="less" scope>
 .flexbox {
   margin-top: 10px;
   width: 400px;
   display: flex;
   flex-flow: row;
   justify-content: space-between;

   &-btn {
     width: 65%;
     height: 34px;
   }
 }

</style>
