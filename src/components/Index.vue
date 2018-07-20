<template>
  <v-app>
    <v-toolbar style="background-color: #6A005F" clipped-left app>
      <v-toolbar-title class="white--text headline">学生综合服务平台</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer width="250" clipped permanent app>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{student.name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{student.id}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group v-model="item.active"
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.action"
          no-action>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items"
            :key="subItem.title"
            @click="goto(subItem.path)">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
    <my-footer></my-footer>
  </v-app>
</template>

<script>
  import myFooter from './Footer'
  export default {
    name: "Index",
    components: {myFooter},
    data() {
      return {
        items: [],
        cardItem: {
          action: 'credit_card',
          title: '校园一卡通',
          items: [
            {
              title: '个人信息',
              action: 'account_box',
              path: '/cardInfo'
            },
            {
              title: '明细查询',
              action: 'description',
              path: '/cardRecord'
            },
            {
              title: '每月账单',
              action: 'assessment',
            },
          ]
        },
        student: {}
      }
    },
    methods: {
      goto(path) {
        this.$router.push(path);
      }
    },
    mounted() {
      this.$http.get('/personInfo/')
        .then((response) => {
          this.student = response.data;
        });
      let loginResult = sessionStorage.getItem("loginResult");
      if (loginResult.indexOf("cer_success") >= 0) this.items.push(this.cardItem);
    }
  }
</script>

<style scoped>

</style>
