<template>
  <div class="article-manage">
    <div class="article-manage-search">
        文章ID：<Input class="article-manage-input" v-model="art_ID" placeholder="查找：文章ID"/>
        标题：<Input class="article-manage-input" v-model="art_title" placeholder="查找：文章标题"/>
        分类：<Input class="article-manage-input" v-model="art_label" placeholder="查找：文章分类"/>
        创建时间：<DatePicker type="daterange" 
        :start-date="new Date()" 
        placement="bottom-end" 
        placeholder="Select date" 
        style="width: 200px; margin-right:12px"
        @on-change="selectDate"
        ></DatePicker>
        
        <Button type="primary" @click="search">搜索</Button>
    </div>
    <Table border :columns="field" :data="dataList"></Table>
    <div class="pagination">
      <Page :total="total" show-sizer @on-page-size-change='changeSize' @on-change='changePage'/>
    </div>
    <Button type="primary" icon="md-download" @click="output">导出为csv文件</Button> 
  </div>
</template>

<script>
import { getArticleList } from '@/api/data'
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
      field: [{title: '提示：',key: 'name'}],
      dataList: [{name: '没有请求到对应的文章'}]
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
        let field = []
        let dataList = res.data.data.list
        for(let key in dataList[0]) {
          field.push({ title: key, key: key })
        }
        this.field = field
        this.dataList = dataList
        console.log(field, dataList)
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
        filename: '数据表'
      }
      excel.export_array_to_excel(params)
    }
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