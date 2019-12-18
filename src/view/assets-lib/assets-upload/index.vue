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
    handleCroped (fileData) {
      const file = fileData.dataUrl,
      file_name = fileData.name,
      file_type = fileData.type

      console.log({ file, file_name, file_type })

      //todo 上传图片
      uploadImg({ file, file_name, file_type }).then((res) => {
        if(res.ret == "200"){
          this.$Message.success('图片上传成功')
        }else{
          this.$Message.success(res.msg)
        }
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
