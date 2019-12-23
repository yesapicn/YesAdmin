<style lang="less">
  @import './register.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <div class="login-title">YesAdmin-小白后台</div>
      <Card icon="log-in" title="欢迎注册" :bordered="false">
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
      'handleRegister',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      password = md5(password)
      this.handleRegister({ userName, password }).then((res) => {
        this.$Message.success(res.data.data.err_msg || "注册成功，为您跳转至登录页面")
        if(res.data.data.err_code == 0) {
          setTimeout(() => {
            this.$router.push({
            name: "login"
          })
        }, 1000);
        }
      })
    }
  }
}
</script>

<style>

</style>
