<!--
 * @Description:
 * @Author: He Jiecong
 * @Date: 2019-12-16 16:49:11
 * @LastEditTime: 2019-12-31 16:22:11
 * @LastEditors: He Jiecong
 -->
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
import { uploadImg, uploadFile } from '@/api/data'
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
    handleCroped (fileData, isImage) {
      const file = fileData.dataUrl,
        file_name = fileData.name,
        file_type = fileData.type

      if (isImage == 1) {
        // 上传图片
        uploadImg({ file, file_name, file_type }).then((res) => {
          if (res.status == 200) {
            this.$router.push({ name: 'assets_manage' })
            this.$Message.success('图片上传成功')
          } else {
            this.$Message.success(res.msg)
          }
        })
      } else if (isImage == 2) {
        // 上传文件
        console.log('444', uploadFile)
        uploadFile({ file, file_name, file_type }).then(res => {
          if (res.status == 200) {
            this.$Message.success('文件上传成功')
          } else {
            this.$Message.success(res.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
.cropper-example{
  // min-height: 500px;
}
</style>
