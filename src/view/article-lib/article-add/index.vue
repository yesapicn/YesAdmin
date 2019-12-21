<template>
  <div class="article-add">
    <div class="container">
      <div class="haedline">
        文章标题：<Input v-model="title" placeholder="编辑文章标题..." style="width: 100%;" />
        文章副标题：<Input v-model="subtitle" placeholder="编辑文章副标题..." style="width: 100%;" />
      </div>
      <div class="editor">
        <div class="editor-title">文章内容：</div>
        <editor ref="editor" :value="content" @on-change="handleChange"/>
      </div>
      <Button type="primary" size="large" class="add_btn" @click="publish">添加文章</Button>
    </div>
  </div>
</template>

<script>
import Editor from '_c/editor'
export default {
  components: {
    Editor
  },
  data() {
    return {
      title: '',
      subtitle: ''
    }
  },
  methods: {
    handleChange (html, text) {
      console.log(html, text)
    },
    publish() {
      
    }
  },
}
</script>

<style lang="less">
  .article-add {
  background-color: #fff;
  padding: 18px;

  .container {
    width: 100%;
    max-width: 1260px;
    margin: 0 auto;
  }

  .haedline {
    display: flex;
    flex-flow: column;
    height: 150px;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 600;
  }

  .editor {
    &-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    }
    width: 100%;
  }

  .add_btn {
    margin: 20px 0 60px 0;
  }
  }
</style>