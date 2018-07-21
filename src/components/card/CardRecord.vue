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
        </v-layout>
      </v-card-actions>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      hide-actions
      class="elevation-1">
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
      <v-pagination v-model="pagination.page" :length="pages" :total-visible="6" align="right"></v-pagination>
    </div>
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
      queryData() {
        if (this.startDate == null || this.endDate == null) {
          bus.$emit('show-info', "请选择日期范围");
        } else {
          this.$http.get('/card/record?from=' + this.startDate + '&to=' + this.endDate)
            .then((response) => {
              this.items = response.data;
            })
            .catch((response) => {
              bus.$emit('show-info', "服务器错误："+response.status);
            })
        }
      }
    },
    mounted() {
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
    }
  }
</script>

<style scoped>
  table.v-table tbody td {
    height: 40px;
  }
</style>
