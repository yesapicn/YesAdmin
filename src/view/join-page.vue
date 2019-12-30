<template>
  <div>
    <Card shadow title="社区">
      <row class="join-page" :gutter="32">
        <i-col span="10">
          <img class="qq-group-img" src="http://cdn7.okayapi.com/yesyesapi_20191230181632_e57566d9edd5b142cbf8bfc401d16988.jpeg">
          <row type="flex" justify="center">
            <i-col span="12">
              <p>QQ 群号：621780943</p>
            </i-col>
            <i-col span="12"></i-col>
          </row>
        </i-col>
      </row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'join_page',
  data () {
    return {
    }
  }
}
</script>
<style>
  .join-page{
    text-align: center;
  }
  .qq-group-img{
    width: 100%;
  }
  .join-page-other-icon{
    width: 20px;
    vertical-align: middle;
    margin-right: 6px;
  }
  .join-page-other{
    text-align: left;
  }
  .join-page-other .ivu-btn{
    margin-right: 6px;
  }
</style>
