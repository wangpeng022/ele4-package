<template>
    <div class='login'>
        <div class="middle">
            <Input v-model="username" icon="ios-personadd" size="large" placeholder="admin" clearable style="width: 300px;textAlign:center" autofocus @on-focus="back2empy"></Input>
            <br/>
            <Input v-model="password" icon="ios-locked-outline" size="large" placeholder="admin" clearable style="width: 300px;textAlign:center;margin:10px 0" @on-enter="login" @on-focus="back2empy"></Input>
            <br/>
            <Button type="success" style="width:300px;marginBottom:10px" @click.native="login">登录</Button>
            <br/>
            <span style="color:red">{{returntext}}</span>
            <div class="forget">
                <span v-show='!flag' @click="oppo">忘记密码？</span>
                <span v-show='flag'>再好好想想</span>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
const {session} = require('electron').remote;
    export default {
        data () {
            return {
                flag : false,
                username:'',
                password:'',
                returntext:'',
                err:'',
            }
        },
        methods:{
            login(){
                if (this.username == '') {
                    this.returntext = "账号不能为空"
                }else if(this.password == ''){
                    this.returntext = "密码不能为空"
                }else{
                    // axios.post("http://192.168.100.81:3000/login",{
                    //     data:{name:this.username,password:this.password}
                    // }).then((res)=>res.data).then((res)=>{
                    //     console.log(res);
                    //     this.returntext = res.error;
                    //     if (!res.code) {
                    //         this.$store.state.username = res.oldUser.name;
                    //         setCookie('admin',222222);
                    //         this.$Message.success('欢迎回来');
                    //         this.$router.push("/home");
                    //     }else{
                    //         this.$Message.warning('登录失败');
                    //     }
                    // })

                    const cookie = {url: 'http://www.github.com', name: 'admin', value: '4444'}
                    session.defaultSession.cookies.set(cookie, (error) => {
                        if (error) console.error(error)
                    });
                    // console.log(session);

                    this.$store.state.username = 'admin'
                    this.$Message.success('欢迎回来');
                    this.$router.push("/home");
                }
            },
            back2empy(){
                this.returntext=''
            },
            oppo(){
                this.flag = !this.flag;
            }
        },
        mounted(){


        }
    }
</script>
<style>
    .login{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(lightblue, pink);
        z-index: 1000;
    }
    .middle{
        position: absolute;
        top: 50%;
        left: 50%;
        height: 160px;
        transform: translate(-50%,-50%);
        text-align: center;
    }
    .forget{
        position: absolute;
        bottom: 0;
        right: 0;
    }
</style>