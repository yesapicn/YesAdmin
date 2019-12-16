<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <div class="flexbox">
        <div class="flexbox-l">用户名:</div>
        <div class="flexbox-r">
          <Input v-model="form.userName" placeholder="请输入用户名">
            <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
            </span>
          </Input>
        </div>
      </div>
    </FormItem>
    <FormItem prop="password">
      <div class="flexbox">
        <div class="flexbox-l">密码:</div>
        <div class="flexbox-r">
          <Input type="password" v-model="form.password" placeholder="请输入密码">
           <span slot="prepend">
             <Icon :size="14" type="md-lock"></Icon>
           </span>
          </Input>
        </div>
      </div>

    </FormItem>
    <FormItem prop="re_password">
       <div class="flexbox">
         <div class="flexbox-l">确认密码:</div>
        <div class="flexbox-r">
          <Input type="password" v-model="form.re_password" placeholder="请确认密码">
            <span slot="prepend">
              <Icon :size="14" type="md-lock"></Icon>
            </span>
          </Input>
        </div>
       </div>
    </FormItem>
    <FormItem>
      <div class="flexbox">
        <Button class="flexbox-btn" @click="handleSubmit" type="primary" long>注册</Button>
        <router-link :to="{path:'/login'}">已有账号？前往登录&gt;&gt;</router-link>
      </div>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      form: {
        userName: 'super_admin',
        password: '',
        re_password: ''
      }
    }
  },
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
          { required: true, message: '请输入6位数或以上的字母与数字组合密码', trigger: 'blur' },
          { pattern: /^\S+$/, message: '密码不能含有空格', trigger: 'blur' },
          { pattern: /(?=.*[0-9])(?=.*[a-zA-Z])/, message: '密码必须包含字母和数字', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '密码应为6-12位的字母与数字组合', trigger: 'blur' }
          // todo
        ]
      }
    },
    re_passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '请重新输入密码进行校验', trigger: 'blur' },
        ]
        // todo
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        re_password: this.re_passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
 .flexbox {
   margin-top: 10px;
   width: 100%;
   display: flex;
   justify-content: center;

   &-l {
     width: 80px;
   }
   &-r {
     width: 350px;
   }

   &-btn {
     width: 65%;
     height: 34px;
   }
 }

</style>
