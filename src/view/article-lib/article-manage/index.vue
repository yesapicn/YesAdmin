<template>
  <div class="article-manage">
    <div class="article-manage-search">
        文章ID：<Input class="article-manage-input" v-model="art_ID" placeholder="查找：文章ID"/>
        标题：<Input class="article-manage-input" v-model="art_title" placeholder="查找：文章标题"/>
        标签：<Input class="article-manage-input" v-model="art_label" placeholder="查找：文章分类"/>
        创建时间：<DatePicker type="daterange" 
        :start-date="new Date()" 
        placement="bottom-end" 
        placeholder="Select date" 
        style="width: 200px; margin-right:12px"
        @on-change="selectDate"
        ></DatePicker>
        
        <Button type="primary" @click="search">搜索</Button>
    </div>
    <Table border :columns="field" :data="dataList">
      <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" icon="ios-create-outline" style="margin-right: 10px" @click="edit(row)">编辑</Button>
          <Button type="warning" icon="md-close" @click="remove(row)">删除</Button>
      </template>
    </Table>
    <div class="pagination">
      <Page :total="total" show-sizer @on-page-size-change='changeSize' @on-change='changePage'/>
    </div>
    <Button type="primary" icon="md-download" @click="output">导出为csv文件</Button> 
  </div>
</template>

<script>
import { getArticleList, removeArticleData } from '@/api/data'
import excel from '@/libs/excel'
export default {
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      art_ID: '',
      art_title: '',
      art_label: '',
      dateRange:'',
      field: [
        {
          title: '文章标题',
          key: 'article_title'
        },
        {
          title: '作者',
          key: 'article_author'
        },
        {
          title: '创建事件',
          key: 'add_time'
        },
        {
          title: '阅读次数',
          key: 'article_view_time',
          width: '150'
        },
        {
          title: '标签',
          key: 'article_label',
          width: 150
        },
        {
          title: '操作区',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      dataList: []
    }
  },
  methods: {
    _initOption(){
      //sql中where的参数格式参考 http://yesapi.cn/docs/#/v2.0/table_sql
      let data = {}
      data.page = this.page
      data.perpage = this.pageSize
      let filter = []
      this.art_ID? filter.push(["id","=",this.art_ID]) : filter.push(["id",">","0"])
      this.art_title && filter.push(["article_title","LIKE",this.art_title])
      this.art_label && filter.push(["article_label","LIKE",this.art_label])
      this.dateRange && filter.push(["article_post_time","BETWEEN",this.dateRange])
      data.where = filter
      data.model_name= 'okayapi_article'
      return data
    },
    selectDate(e){
      let dateRange = []
      dateRange[0] = e[0] + " 00:00"
      dateRange[1] = e[1] + " 23:59"
      this.dateRange = dateRange
    },
    search() {
      let data = this._initOption()
      getArticleList(data).then(res=>{
        let dataList = res.data.data.list
        // for(let key in dataList[0]) {
        //   field.push({ title: key, key: key })
        // }
        this.dataList = dataList
        console.log(dataList)
      })

    },
    changeSize(size) {
      this.pageSize = size
      this.search()
    },
    changePage(page) {
      this.page = page
      this.search()
    },
    output() {
      let title = [],
          key = []
      this.field.forEach(e=>{
        title.push(e.title)
        key.push(e.key)
      })
      const params = {
        title,
        key,
        data: this.dataList,
        autoWidth: true,
        filename: '文章管理列表'
      }
      excel.export_array_to_excel(params)
    },
    edit(row) {
      removeArticleData({model_name: 'okayapi_article', id: row.id}).then(res=>{
        if(res.ret == 200) {
          this.$Message.success('图片上传成功')
          }else{
            this.$Message.success(res.msg)
          }
      })
    },
    remove(row) {
      removeArticleData({model_name: 'okayapi_article', id: row.id}).then(res=>{
        if(res.ret == 200) {
          this.$Message.success('图片上传成功')
          }else{
            this.$Message.success(res.msg)
          }
      })
    }
  },
  created() {
    this.search()
  },
}
</script>

<style lang="less">
  .article-manage {
  background-color: #fff;
  padding: 18px;

  .article-manage-search {
    margin-bottom: 20px;
  }

  &-input {
    width: 200px;
    margin-right: 10px;
  }
  .dropdown {
    display: inline-block;
    margin-right: 10px;

    &-btn {
      width: 135px;
      text-align: center;
    }
  }
  .article-collection {
    width: 1560px;
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;

    &-item {
      margin-right: 15px;
    }
    &-item:nth-child(5n+0) {
      margin-right: 0;
    }
  }

  .pagination {
    padding: 50px 0 20px 0;
  }

  .demo-spin-icon-load{
        margin-bottom: 5px;
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
    }
}
</style>