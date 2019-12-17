<template>
  <div class="item-card">
    <div class="img-container">
      <img src="@/assets/images/login-bg.jpg" alt="">
    </div>
    <div class="item-name" :title="fileData.name">{{fileData.name}}</div>
    <div class="item-info">
      <span>{{fileData.fileClass}}</span>
      <span>大小：<span>{{fileData.capacity}}</span></span>
      <span>上传于：<span>{{fileData.uploadTime}}</span></span>
    </div>
    <Input v-model="fileData.link" readonly>
        <a href="javascript:void(0);" class="copyButton" slot="append" @click="copyLink">复制</a>
    </Input>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fileData: {
        name: 'F9B20374B4CBD344913900A437BA56A2_20191128124203_5863b606b239cdad83640da3e4d009dd.pn',
        fileClass: 'image/png',
        capacity: '44KB',
        uploadTime: '2019-11-29',
        link: 'http://cd7.yesapi.net/F9B20374B4CBD344913900A437BA56A2_20191128124203_5863b606b239cdad83640da3e4d009dd.png'
      }
    }
  },
  methods: {
    copyLink() {
      console.log(this.fileData.link)
    }
  },
}
</script>

<style lang="less">
  .item-card {
    width: 300px;
    font-size: 14px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    margin-top: 30px;
    .img-container {
      width: 100%;
      height: 200px;
      margin-bottom: 5px;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .item-name {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-weight: 600;
      color: #57a3f3
    }

    .item-info {
      display: flex;
      justify-content: space-between;
      color: #838383;
      margin-bottom: 10px;
    }

    .copyButton {
      color: #515a6e;
    }

    .copyButton:hover {
      color: #57a3f3;
    }
    
  }
</style>