<style lang="less">
  @import './register.less';
</style>

<template>
  <div class="login">
    <div class="login-con"> 
      <div class="login-title">YesAdmin-小白后台</div>
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <register-form @on-success-valid="handleSubmit"></register-form>
          <!-- <p class="login-tip">©2019 羚羊 - Top自媒体运营平台 Top.YesApi.Top 广州果创网络科技有限公司 All Rights Reserved.</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import registerForm from '_c/register-form'
import { mapActions } from 'vuex'
import md5 from 'js-md5'
export default {
  components: {
    registerForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      password = md5(password)
      this.handleLogin({ userName, password }).then(res => {
        console.log(res)
        // this.getUserInfo().then(res => {
        //   this.$router.push({
        //     name: this.$config.homeName
        //   })
        // })
      })
    }
  }
}
</script>

<style>

</style>
