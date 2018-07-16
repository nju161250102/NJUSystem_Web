<template>
  <div id="app">
    <router-view></router-view>
    <v-snackbar :timeout="timeout" v-model="snackBar" top>
      {{snackBarText}}
      <v-btn flat color="pink" @click.native="snackBar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import bus from '@/eventBus'
  export default {
    name: 'App',
    data() {
      return {
        timeout:2000,
        snackBar: false,
        snackBarText: '',
      }
    },
    methods: {
      showSnackBar(str) {
        this.snackBar = true;
        this.snackBarText = str;
      }
    },
    created() {
      bus.$on('show-info', this.showSnackBar);
    }
  }
</script>

<style>
</style>
