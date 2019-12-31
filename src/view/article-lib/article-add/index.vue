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
      <div>
        <div class="article-label">
          文章作者：<Input v-model="author" placeholder="编辑文章作者..." style="width:15%; margin-right: 15px;" />文章标签：<Input v-model="label" placeholder="编辑文章标签..." style="width:15%;" />
        </div>
      </div>
      <Button type="primary" size="large" class="add_btn" @click="publish">添加文章</Button>
    </div>
  </div>
</template>

<script>
import Editor from '_c/editor'
import { createArticleData } from '@/api/data.js'
export default {
  components: {
    Editor
  },
  data () {
    return {
      title: '',
      subtitle: '',
      content: '',
      author: '',
      label: ''
    }
  },
  methods: {
    handleChange (html, text) {
      console.log(html, text)
      this.content = html // bug 推出页面再进入后 data中conten刷新但编辑框内容没刷新
    },
    publish () {
      let params = {}
      params.model_name = 'okayapi_article'
      let data = {}
      data.article_title = this.title
      data.article_sub_title = this.subtitle
      data.article_author = this.author
      data.article_content = this.content
      data.article_label = this.label

      params.data = JSON.stringify(data)

      console.log(createArticleData, params.data, data)

      createArticleData(params).then(res => {
        console.log(res)
      })
      this.$refs.editor.value = ''
      this.$router.push({ name: 'articles_manage' })
    }
  }
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

  .article-label {
    margin-top: 20px;
  }

  .add_btn {
    margin: 20px 0 60px 0;
  }
  }
</style>
