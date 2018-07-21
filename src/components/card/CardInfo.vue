<template>
  <v-card flat>
    <v-card-title class="subheading" id="card-title">基本信息</v-card-title>
    <v-card-text>
      <p>姓名：{{info.name}}</p>
      <p>余额：{{info.balance}}</p>
      <p>绑定银行卡号：{{info.bankCardNo}}</p>
      <p>状态：{{info.status}}</p>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "CardInfo",
    data() {
      return {
        info: {}
      }
    },
    mounted() {
      this.$http.get('/card/info')
        .then((response) => {
          this.info = response.data;
        });
    }
  }
</script>

<style scoped>
  #card-title {
    border-bottom: double #C0C0C0;
  }
</style>
