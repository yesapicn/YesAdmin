<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <div class="login-title">YesAdmin-小后台</div>
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">©2019 羚羊 - Top自媒体运营平台 Top.YesApi.Top 广州果创网络科技有限公司 All Rights Reserved.</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import md5 from 'js-md5'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      // 'getUserInfo'
    ]),
    handleSubmit ({ userName, password, cookiesExp }) {
      password = md5(password)
      this.handleLogin({ userName, password, cookiesExp }).then((res) => {
        if(res.data.data.err_code == 0) {
          this.$Message.success("登录成功")
          this.$router.push({
            name: this.$config.homeName
          })
        } else  this.$Message.warning(res.data.data.err_msg)
      })
    }
  }
}
</script>

<style>

</style>
