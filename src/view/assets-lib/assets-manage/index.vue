<template>
  <div class="assets-manage">
    <div class="assets-manage-search">
        文件名：<Input class="assets-manage-input" v-model="fileName" placeholder="查找：文件名"/>
        文件类型：<Input class="assets-manage-input" v-model="fileType" placeholder="查找：文件分类"/>
          <div class="dropdown">
            <Dropdown trigger="click" @on-click="handle_select">
              <Button class="dropdown-btn">{{orderType}}<Icon type="ios-arrow-down"></Icon></Button>
              <DropdownMenu slot="list">
                   <DropdownItem v-for="(item, index) in seqList" :name="index" :key="item.order_type">{{item.name}}</DropdownItem>
              </DropdownMenu>
           </Dropdown>
        </div>
        <Button type="primary" @click="search">搜索</Button>
    </div>
    
    <div class="demo-spin-col" v-if="!fileList">
      <Spin fix>
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>资源正在加载中...</div>
      </Spin>
    </div>
    <div class="assets-collection">
      <item-card class="assets-collection-item" v-for="(item, index) in fileList" :key="index" :fileData="item" @refresh="search"></item-card>
    </div>
    <div class="pagination">
      <Page :total="total" show-sizer @on-page-size-change='changeSize' @on-change='changePage'/>
    </div> 


  </div>
</template>

<script>
import ItemCard from './item-card.vue'
import { getAssetsList } from '@/api/data'
export default {
  components: {
    ItemCard
  },
  data() {
    return {
      fileList: null,
      total: 0,
      fileName: '',
      fileType: '',
      currentOrder: 1,
      page: 1,
      perpage: 10,
      orderType: '上传时间降序',
      seqList: [
        {
          name:'上传时间降序',
          order_type: 1
        },{
          name:'上传时间升序',
          order_type: 2
        },{
          name: '文件名降序',
          order_type: 3
        },{
          name: '文件名升序',
          order_type: 4
        },{
          name: '文件大小降序',
          order_type: 5
        },{
          name: '文件大小升序',
          order_type: 6
        }
      ]
    }
  },
  methods: {
    _initOption() { //筛选条件初始化
      let file_name = this.fileName,
          file_type = this.fileType,
          order_type = this.currentOrder,
          page = this.page,
          perpage = this.perpage

      //post 参数为空的时候不加入
      let data = { order_type, page, perpage }
      file_name? data.file_name = file_name : null
      file_type? data.file_type = file_type : null
      return data
    },
    handle_select(index) {
      this.orderType = this.seqList[index].name
      this.currentOrder = this.seqList[index].order_type
    },
    changeSize(size) {
      this.perpage = size
      this.search()
    },
    changePage(page) {
      this.page = page
      this.search()
    },
    search() {
      let data = this._initOption()

      getAssetsList(data).then(res => {
        console.log(res)
        this.total = res.data.data.total
        this.fileList = res.data.data.list
      })
    }
  },
  created() {
    this.search()
  },
  
}
</script>

<style lang="less" scpoe>
.assets-manage {
  background-color: #fff;
  padding: 18px;

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
  .assets-collection {
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
    height: 180px;
    padding: 50px 0 50px 500px;
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