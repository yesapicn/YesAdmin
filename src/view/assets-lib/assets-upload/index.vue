<template>
  <div>
    <Card>
      <div class="cropper-example cropper-first">
        <cropper
          :src="exampleImageSrc"
          crop-button-text="确认提交"
          @on-crop="handleCroped"
        ></cropper>
      </div>
    </Card>
  </div>
</template>

<script>
import Cropper from '@/components/cropper'
import { uploadImg } from '@/api/data'
export default {
  name: 'cropper_page',
  components: {
    Cropper
  },
  data () {
    return {
      exampleImageSrc: ''
    }
  },
  methods: {
    handleCroped (blob) {
      const formData = new FormData()
      formData.append('croppedImg', blob)

      //todo 上传图片
      uploadImg(formData).then(() => {
        this.$Message.success('Upload success~')
      })
    }
  }
}
</script>

<style lang="less">
.cropper-example{
  // min-height: 500px;
}
</style>
