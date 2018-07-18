<template>
  <v-footer style="background-color: #6A005F" :height="footerHeight">
    <v-layout row wrap align-center>
      <v-flex xs12 text-xs-center>
        <div class="white--text ml-3">
          Made By 161250102
        </div>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {
    name: "Footer",
    props: ['footerHeight']
  }
</script>

<style scoped>

</style>
