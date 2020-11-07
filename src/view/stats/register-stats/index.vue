<template>
  <div class="portStats">
     <!-- <p>注册统计</p> -->
      <Row class="portStats__query">
        <span>日期：</span>
        <Col>
            <DatePicker :value="dateRange" :options="optionsFuture" type="daterange" placement="bottom-end" style="width: 400px" @on-change="changeDateRange"></DatePicker>
        </Col>
        <Button type="primary" class="portStats__query__btn" @click="getQuery">刷新</Button>
    </Row>
    <div ref="myChart" id="my_chart" :style="{width: '100%', height: '400px'}"></div>
    <Table border width="80%" :columns="columnsList" :data="loginData" :loading="registerLoad" class="portStats__tab">
    </Table>
  </div>
</template>

<script>
import { GetDailyRegister } from '@/api/stats'
import { getToken, defaultDateRange } from '@/libs/util'
import echarts from 'echarts'
export default {
  data () {
    return {
      token: getToken(),
      registerLoad: false,
      xAxisTimeData: [], // 时间数据
      allData: [], // 全部注册
      monthAgo: [], // 同比上个月
      loginData: [], // 全部数据
      dateRange: ['', ''],
      columnsList: [
        {
          title: '日期',
          key: 'date',
          align: 'center'
        },
        {
          title: '当天注册人数',
          key: 'reg_num',
          align: 'center'
        }
      ],
      optionsFuture: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },
  created () {
    let dr = defaultDateRange()
    this.dateRange[0] = dr.starttime
    this.dateRange[1] = dr.endtime
    this.getQuery()
  },
  mounted () {
  },
  methods: {
    getQuery () {
      this.registerLoad = true
      const formdata = new FormData()
      formdata.append('start_date', this.dateRange[0])
      formdata.append('end_date', this.dateRange[1])
      GetDailyRegister(formdata).then(res => {
        this.loginData = res.data && res.data.data && res.data.data.items ? res.data.data.items : []
        this.xAxisTimeData = []
        this.allData = []
        this.registerLoad = false
        this.loginData.forEach(item => {
          this.xAxisTimeData.push(item.date)
          this.allData.push(item.reg_num)
        })
        this.createEchars()
      })
    },
    changeDateRange (e) {
      // 包含结束当天
      this.dateRange = [e[0] + ' 00:00:00', e[1] + ' 23:59:59']
    },
    createEchars () {
      let myChartData = echarts.init(this.$refs.myChart)
      let option = {
        // 标题
        title: {
          text: '注册统许计',
          subtext: '会员每天注册的情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        // 标注
        legend: {
          right: '20%',
          data: ['日期', '当天注册人数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        // X轴
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisTimeData
        },
        // Y轴
        yAxis: {
          type: 'value'
        },
        // 显示
        series: [
          {
            name: '当天注册人数',
            type: 'line',
            data: this.allData,
            markPoint: {
              data: [
                { type: 'max', name: '最大' },
                { type: 'min', name: '最小' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      }
      myChartData.setOption(option)
      // 建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize', function () { myChartData.resize() })
    }
  }

}
</script>

<style  lang="scss" scoped>
.portStats{
  &__query{
    height:72px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 30px 0px rgba(0,0,0,0.05);
    border-radius:10px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 30px;
    &__btn{
      margin-left: 30px;
    }
  }
  &__tab{
    background: #fff;
    border-radius: 10px;
  }
}
#my_chart{
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
}
/deep/.ivu-input{
  text-align: center;
}
</style>
