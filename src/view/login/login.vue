<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <div class="login-title">YesAdmin-小白后台</div>
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
    handleSubmit ({ userName, password }) {
      password = md5(password)
      this.handleLogin({ userName, password }).then((res) => {
        this.$Message.success(res.data.data.err_msg ||"登录成功")
        if(res.data.data.err_code == 0) {
          this.$router.push({
            name: this.$config.homeName
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
