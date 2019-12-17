<template>
  <div class="assets-manage">
    <div class="assets-manage-search">
        <Input class="assets-manage-input" v-model="search_option1" placeholder="查找：文件名"/>
        <Input class="assets-manage-input" v-model="search_option2" placeholder="查找：文件分类"/>
          <div class="dropdown">
            <Dropdown trigger="click" @on-click="handle_select">
              <Button class="dropdown-btn">{{sequence}}<Icon type="ios-arrow-down"></Icon></Button>
              <DropdownMenu slot="list">
                   <DropdownItem v-for="(item,index) in seqList" :name="item" :key="index">{{item}}</DropdownItem>
              </DropdownMenu>
           </Dropdown>
        </div>
        <Button type="primary" @click="search">搜索</Button>
    </div>
    <div class="assets-collection">
      <item-card v-for="i in 20" :key="i"></item-card>
    </div>
    <div class="pagination">
      <Page :total="100" show-sizer @on-page-size-change='changeSize' @on-change='changePage'/>
    </div> 

    
    

  </div>
</template>

<script>
import ItemCard from './item-card.vue'
export default {
  components: {
    ItemCard
  },
  data() {
    return {
      search_option1: '',
      search_option2: '',
      sequence: '上传时间降序',
      seqList: ['上传文件大小降序','上传文件大小升序','上传时间升序','上传文件降序','上传文件升序']
    }
  },
  methods: {
    handle_select(name) {
      this.sequence = name
    },
    changeSize(event) {
      console.log(event)
    },
    changePage(event) {
      console.log(event)
    },
    search() {
      console.log('//todo 对接接口')
      //todo 对接接口
    }
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
    justify-content: space-between;
  }

  .pagination {
    height: 180px;
    padding: 50px 0 50px 500px;
  }
}
  
</style>