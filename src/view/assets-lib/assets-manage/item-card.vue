<template>
  <div class="item-card">
    <div class="img-container">
      <img :src="fileData.file_url" alt="">
    </div>
    <div class="item-name" :title="fileData.name" @click="showPic">{{fileData.file_name}}</div>
    <div class="item-info">
      <span>{{fileData.file_type}}</span>
      <span>大小：<span>{{fileSize}}</span></span>
      <span>上传于：<span>{{fileAddTime}}</span></span>
    </div>
    <Input v-model="fileData.file_url" readonly>
        <a href="javascript:void(0);" class="copyButton" v-clipboard="copyLink" slot="append">复制</a>
    </Input>
  </div>
</template>

<script>
export default {
  props:{
    fileData: {
      type: Object
    }
  },
  data(){
    return {
      // fileData: {
      //   name: 'F9B20374B4CBD344913900A437BA56A2_20191128124203_5863b606b239cdad83640da3e4d009dd.png',
      //   fileClass: 'image/png',
      //   capacity: '44KB',
      //   uploadTime: '2019-11-29',
      //   file_url: 'http://cd7.yesapi.net/F9B20374B4CBD344913900A437BA56A2_20191128124203_5863b606b239cdad83640da3e4d009dd.png'
      // }
    }
  },
  methods: {
    showPic() {
      window.open(this.fileData.file_url, '_blank')
    }
  },
  computed: {
    fileSize() {
      let size = this.fileData.file_size/1024
      if(size > 1024) {
        size = size/1024
        size = Math.floor(size * 100) / 100 +'MB'
      }else{
        size = Math.floor(size * 100) / 100 + 'KB'
      }
      return size
    },
    fileAddTime() {
      let data_time = this.fileData.add_time
      let time = data_time.slice(0,10)
      return time
    },
    copyLink() {
      return {
        value: this.fileData.file_url,
        success: (e) => {
          this.$Message.success('复制成功')
        },
        error: () => {
          this.$Message.error('复制失败')
        }
      }
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
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
      
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .item-name {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-weight: 600;
      color: #57a3f3;
      cursor: pointer;
    }

    .item-info {
      display: flex;
      justify-content: space-between;
      color: #838383;
      margin: 5px 0;
      font-size: 12px;
    }

    .copyButton {
      color: #515a6e;
    }

    .copyButton:hover {
      color: #57a3f3;
    }
    
  }
</style>