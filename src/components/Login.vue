<template>
  <v-app>
    <v-toolbar style="background-color: #6A005F" :height="navHeight">
      <v-toolbar-title class="white--text headline">学生综合服务平台</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <img src="https://cas.nju.edu.cn/cas/randombgpic" id="background"/>
        <div class="login">
          <div class="login-box">
            <v-card class="login-bag">
              <v-card-text>
                <v-form :model="loginData">
                  <v-container fluid>
                    <v-layout>
                      <v-flex xs12>
                        <v-text-field v-model="loginData.name"
                                      color="black"
                                      append-icon="person"
                                      label="学号 username"
                                      mask="#########"
                                      type="text" solo hide-details>
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12>
                        <v-text-field v-model="loginData.key"
                                      color="black"
                                      append-icon="lock"
                                      label="密码 password"
                                      type="password" solo hide-details>
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs8>
                        <v-text-field v-model="loginData.code"
                                      color="black"
                                      label="验证码 Verification code"
                                      mask="nnnn"
                                      type="text" solo hide-details>
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4 @click.stop="changeCode">
                        <img id="code-image" ref="codeImage" src="/api/login/cer_code"/>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12>
                        <v-btn @click="login"
                               style="background-color: #90138b"
                               depressed block>
                          <span class="white--text">登录</span>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-container>
    </v-content>
    <my-footer :footer-height="footerHeight"></my-footer>
  </v-app>
</template>

<script>
  import bus from '@/eventBus'
  import myFooter from './Footer'
  export default {
    name: "Login",
    components: {myFooter},
    data() {
      return {
        navHeight: 70,
        footerHeight: 30,
        loginData : {
          name:'',
          key:'',
          code: '',
        },
      }
    },
    methods: {
      changeCode() {
        this.$refs.codeImage.src = "/api/login/cer_code?" + Math.floor(Math.random()*100);
      },
      login() {
        this.$http.post('/login/', this.loginData)
          .then((response) => {
            let info = response.data;
            if (info.length === 0) {
              bus.$emit('show-info', "登录失败")
            } else {
              sessionStorage.setItem('loginResult', info);
              this.$router.push('/main/');
            }
          })
      }
    },
    mounted() {
      let image = document.getElementById("background");
      image.height = window.innerHeight - this.navHeight - this.footerHeight - 50;
    }
  }
</script>

<style scoped>
  #background {
    width: 100%;
  }

  #code-image {
    height: 100%;
    width: 100%;
    margin-bottom: -8px;
  }

  .login {
    width: 462px;
    position: absolute;
    left: 70%;
    top:70%;
    margin-top: -257.4px;
    margin-left: -231px;
  }

  .login-bag {
    height: auto;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
  }

</style>
