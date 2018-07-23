<template>
  <div>
    <v-card>
      <v-card-title><span class="subheading">消费明细查询</span></v-card-title>
      <v-card-actions>
        <v-layout align-center justify-space-around>
          <v-flex xs3>
            <v-menu v-model="startMenu"
              transition="scale-transition"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              offset-y
              full-width
              min-width="270px">
              <v-text-field
                slot="activator"
                v-model="startDate"
                label="开始日期"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                v-model="startDate"
                no-title
                scrollable
                :max="minDate()"
                @input="startMenu = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs3>
            <v-menu
              v-model="endMenu"
              transition="scale-transition"
              min-width="270px"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              offset-y
              full-width>
              <v-text-field
                slot="activator"
                v-model="endDate"
                label="结束日期"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                v-model="endDate"
                :min="startDate"
                :max="today"
                no-title
                scrollable
                @input="endMenu = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs2>
            <v-btn color="primary" @click.stop="queryData">查询</v-btn>
          </v-flex>
          <v-flex xs2>
            <v-radio-group v-model="radioValue" row>
              <v-radio key="table" value="table" label="表格" ></v-radio>
              <v-radio key="stats" value="stats" label="图表" ></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      :loading="loadFlag"
      v-if="radioValue === 'table'"
      hide-actions
      class="elevation-1">
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.transTime }}</td>
        <td class="text-xs-center">{{ props.item.amount }}</td>
        <td class="text-xs-center">{{ props.item.balance }}</td>
        <td class="text-xs-center">{{ props.item.transName }}</td>
        <td class="text-xs-center">{{ props.item.termName }}</td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          请先选择时间区间
        </v-alert>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-1">
      <span>转入金额总计：{{income}}，消费金额总计：{{expense}}</span>
      <v-pagination v-model="pagination.page"
                    :length="pages"
                    :total-visible="6"
                    v-if="radioValue === 'table'">
      </v-pagination>
    </div>
    <v-layout row>
      <v-flex xs12 class="chartOuter" style="height: 400px">
        <div class="chartInner" id="bar"></div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import bus from '@/eventBus'
  export default {
    name: "CardRecord",
    data() {
      return {
        today: '',
        startDate: null,
        startMenu: false,
        endDate: null,
        endMenu: false,
        loadFlag: false,
        radioValue: 'table',
        income: 0,
        expense: 0,
        headers: [
          { text: '时间', value: 'transTime', align: 'center'},
          { text: '金额变动', value: 'amount', align: 'center', sortable: false},
          { text: '余额', value: 'balance', align: 'center', sortable: false},
          { text: '类型', value: 'transName', align: 'center', sortable: false},
          { text: '地点', value: 'termName', align: 'center', sortable: false},
        ],
        items: [],
        pagination: {
          page: 1,
          rowsPerPage: 7,
        },
        barChart: {},
        barChartOption: {
          title: {
            text: '每日支出情况'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data:['支出金额']
          },
          xAxis : {
            type: 'category',
            data : []
          },
          dataZoom: [
            {   // 这个dataZoom组件，默认控制x轴。
              type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
              start: 10,      // 左边在 10% 的位置。
              end: 60         // 右边在 60% 的位置。
            }
          ],
          yAxis : {
            type: 'value'
          },
          series : [
            {
              name:'支出金额',
              type:'bar',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              data:[]
            }
          ]
        }
      }
    },
    computed: {
      pages () {
        if (this.items.length === 0) return 0;
        return Math.ceil(this.items.length / this.pagination.rowsPerPage)
      }
    },
    methods: {
      minDate() {
        if (this.endDate == null) return this.today;
        return this.endDate < this.today ? this.endDate : this.today;
      },
      getDateList() {
        let dateList = [];
        let dateA = new Date();
        let dateB = new Date();
        let arrayA = this.startDate.split("-");
        let arrayB = this.endDate.split("-");
        dateA.setFullYear(arrayA[0], arrayA[1]-1, arrayA[2]);
        dateB.setFullYear(arrayB[0], arrayB[1]-1, arrayB[2]);
        while (dateB >= dateA) {
          dateList.unshift((dateB.getMonth() + 1) + "-" + dateB.getDate());
          dateB.setDate(dateB.getDate()-1);
        }
        return dateList;
      },
      queryData() {
        if (this.startDate == null || this.endDate == null) {
          bus.$emit('show-info', "请选择日期范围");
        } else {
          this.loadFlag = true;
          this.$http.get('/card/record?from=' + this.startDate + '&to=' + this.endDate)
            .then((response) => {
              this.items = response.data.details;
              this.income = response.data.income;
              this.expense = response.data.expense;
              this.loadFlag = false;
              console.log(document.getElementById('bar'));
              this.barChartOption.xAxis.data = this.getDateList();
              this.barChartOption.series[0].data = response.data.daily;
              //this.$echarts.init(document.getElementById('barChart')).setOption(this.barChartOption);
              this.barChart.setOption(this.barChartOption);
            })
        }
      }
    },
    mounted() {
      //获取今天的日期
      let date = new Date();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 1 && day <= 9) {
        day = "0" + day;
      }
      this.today = date.getFullYear() + '-' + month + '-' + day;

      //调整图表区域的大小
      let chartOuter = document.getElementsByClassName('chartOuter');
      let chartInner = document.getElementsByClassName('chartInner');
      for (let i = 0; i < chartOuter.length; i++) {
        chartInner[i].style.height = window.getComputedStyle(chartOuter[i]).height;
        chartInner[i].style.width = window.getComputedStyle(chartOuter[i]).width;
      }
      //console.log(document.getElementById('bar'));
      this.barChart = this.$echarts.init(document.getElementById('bar'));
      this.barChart.setOption(this.barChartOption)
    }
  }
</script>

<style scoped>
  table.v-table tbody td {
    height: 40px;
  }
</style>
