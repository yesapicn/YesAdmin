<template>
  <div class="cropper-wrapper">
    <!-- 上传图片时出现cropper -->
    <div class="cropper-box" v-show="isImage == 1">
      <div class="img-box">
        <img class="cropper-image" :id="imgId">
      </div>
    </div>
    <div class="button-box">
      <div v-show="isImage == 1">
        <Button type="primary" @click="rotate">
          <Icon type="md-refresh" :size="18"/>
        </Button>
        <Button type="primary" @click="scale('X')">
          <Icon custom="iconfont icon-shuipingfanzhuan" :size="18"/>
        </Button>
        <Button type="primary" @click="scale('Y')">
          <Icon custom="iconfont icon-chuizhifanzhuan" :size="18"/>
        </Button>
        <Button type="primary" @click="startCrop">
          <Icon type="md-crop" :size="18"/>
        </Button>
        <Button type="primary" @click="cancelCrop">
          使用原尺寸
        </Button>
      </div>
    </div>
    <!-- 其他文件时出现文件类型图片 -->
    <div class="file_logo" v-show="isImage == 2">
      <img :src="fileLogo">
      <div class="file_name">{{fileName}}</div>
    </div>
    <div class="underline">

      <Upload
        type="drag"
        :before-upload="beforeUpload"
        action="image/upload"
        v-show="!insideSrc">
        <div style="padding: 30px 180px">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击选取或者拖动图片到方框中</p>
        </div>
     </Upload>

      <Upload action="image/upload" :before-upload="beforeUpload" v-show="insideSrc">
        <Button icon="ios-cloud-upload-outline" style="width: 150px;">重选文件</Button>
      </Upload>
      <Button style="width: 150px;margin-left: 10px;height: 31.9px" type="primary" @click="comfirm" v-show="insideSrc">{{ cropButtonText }}</Button>
    </div>
    
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import './index.less'
import 'cropperjs/dist/cropper.min.css'
export default {
  name: 'Cropper',
  props: {
    cropButtonText: {
      type: String,
      default: '确定'
    } 
  },
  data () {
    return {
      cropper: null,
      insideSrc: '',
      fileName: '',
      fileType: '',
      isImage: '', //0表示无文件 1表示文件为图片 2表示其他类型文件
      fileLogo: ''
    }
  },
  computed: {
    imgId () {
      return `cropper${this._uid}`
    }
  },
  watch: {
    insideSrc (src) {
      this.replace(src)
    }
  },
  methods: {
    beforeUpload (file) {
      //使用html5的fileReader将图片转换成base64编码
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.insideSrc = event.srcElement.result
        this.fileName = file.name
        this.fileType = file.type
      }
      //判断文件类型是否为图片 0无 1为图片 2其他类型文件
      if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
          this.isImage = 1
        }else if( /\.(xlsx?)$/i.test(file.name) ){
          this.isImage = 2
          this.fileLogo = require('@/assets/icons/file-icon/xls_logo.jpg')
        }else if( /\.(docx?)$/i.test(file.name) ){
          this.isImage = 2
          this.fileLogo = require('@/assets/icons/file-icon/doc_logo.jpg')
        }else if( /\.(ppt?)$/i.test(file.name) ){
          this.isImage = 2
          this.fileLogo = require('@/assets/icons/file-icon/ppt_logo.jpg')
        }else if( /\.(html)$/i.test(file.name) ){
          this.isImage = 2
          this.fileLogo = require('@/assets/icons/file-icon/html_logo.jpg')
        }else{
          this.isImage = 2
          this.fileLogo = require('@/assets/icons/file-icon/others_logo.jpg')
        }
      
      return false
    },
    replace (src) {
      this.cropper.replace(src)
      this.insideSrc = src
    },
    rotate () {
      this.cropper.rotate(90)
    },
    scale (d) {
      this.cropper[`scale${d}`](-this.cropper.getData()[`scale${d}`])
    },
    move (...argu) {
      this.cropper.move(...argu)
    },
    startCrop() {
      this.cropper.crop()
    },
    cancelCrop() {
      this.cropper.clear()
    },
    comfirm () {
      let dataUrl
      if (this.isImage == 1) {
        dataUrl = this.cropper.getCroppedCanvas().toDataURL()
        console.log("ccc", dataUrl)
      } else if(this.isImage == 2) {
        dataUrl = this.insideSrc
      }
      
      let name = this.fileName,
          type = this.fileType,
          fileData = {
            dataUrl,
            name,
            type
          }
      console.log(fileData , 'filedata')
      this.$emit('on-crop', fileData, this.isImage)
      this.isImage= 0
      this.insideSrc=''
    },
  },
  mounted () {
    this.$nextTick(() => {
      let dom = document.getElementById(this.imgId)
      this.cropper = new Cropper(dom, {
        checkCrossOrigin: true,
        autoCrop: false
      })
    })
  }
}
</script>
