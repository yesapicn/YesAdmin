<template>
  <div class="cropper-wrapper">
    <div class="cropper-box" v-show="insideSrc">
      <div class="img-box">
        <img class="cropper-image" :id="imgId">
      </div>
    </div>
    <div class="button-box">
      <div v-show="insideSrc">
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
    <div class="underline">

      <Upload
        type="drag"
        :before-upload="beforeUpload"
        action="image/upload"
        v-show="!insideSrc">
        <div style="padding: 30px 180px">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击选取或者拖动图片自此</p>
        </div>
     </Upload>

      <Upload action="image/upload" :before-upload="beforeUpload" v-show="insideSrc">
        <Button icon="ios-cloud-upload-outline" style="width: 150px;">重选图片</Button>
      </Upload>
      <Button style="width: 150px;margin-left: 10px;height: 31.9px" type="primary" @click="crop" v-show="insideSrc">{{ cropButtonText }}</Button>
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
    src: {
      type: String,
      default: ''
    },
    preview: {
      type: Boolean,
      default: true
    },
    moveStep: {
      type: Number,
      default: 4
    },
    cropButtonText: {
      type: String,
      default: '裁剪'
    }
  },
  data () {
    return {
      cropper: null,
      insideSrc: ''
    }
  },
  computed: {
    imgId () {
      return `cropper${this._uid}`
    }
  },
  watch: {
    src (src) {
      this.replace(src)
    },
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
      }
      //禁止上传
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
    crop () {
      this.cropper.getCroppedCanvas().toDataUrl(dataUrl => {
        this.$emit('on-crop', dataUrl)
      })
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
