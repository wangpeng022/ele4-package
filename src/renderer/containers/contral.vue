<template>
    <div class="box">
        <div class="win">
            <h3>窗口</h3>
            <i-button id="newWindowBtn" @click="creatWindowfn">
                创建窗口
            </i-button>
        </div>
        <div class="noted">
            <h3>系统通知</h3>
            <i-button id="basic-noti" @click="baseNoted">
                基本通知
            </i-button>
            <i-button id="img-noti" @click="imgNoted">
                图像通知
            </i-button>
        </div>
        <div class="file">
            <h3>选取文件</h3>
            <i-button id="fileBtn" @click="findFile">
                选取文件
            </i-button>
            <span>{{filePath1}}</span>
        </div>
        <div class="errDialog">
            <h3>错误弹窗</h3>
            <i-button id="errBtn" @click="errDialog">
                错误弹窗
            </i-button>
        </div>
        <div class="copy">
            <h3>复制粘贴</h3>
            <i-button @click="copyText">
                复制
            </i-button>
            <Input v-model="valueC" placeholder="Enter something..." style="width: 300px"></Input>
            <br/>
            <i-button @click="pasteText">
                粘贴
            </i-button>
            <Input v-model="valueP" placeholder="Enter something..." style="width: 300px"></Input>
        </div>
        <div class="showFilder">
            <h3>打开指定路径文件夹</h3>
            <i-button @click="showFilder('用户')">
                打开用户文件夹
            </i-button>
            <i-button @click="showFilder('c')">
                打开C盘
            </i-button>
        </div>
        <div class="openTab">
            <h3>打开外部网页</h3>
            <i-button @click="openTab">
                打开electron官网
            </i-button>
        </div>
    </div>
</template>
<script>
const BrowserWindow = require("electron").remote.BrowserWindow;
const path = require("path");
const ipc = require('electron').ipcRenderer;
const clipboard = require('electron').clipboard;
const shell = require('electron').shell
const os = require('os')

//这里的this问题
ipc.on('selected-directory', (event, path)=> {
    this.filePath1 = `你选择的路径是：${path}`;
});

const newWindowBtn = document.getElementById("new-window");
export default {
  data() {
    return {
        notification : {
            title: '基本通知',
            body: '这里是内容',
        },
        notification1 : {
            title: '带图像通知',
            body: '这里是内容',
            icon: path.join(__dirname, '../static/images/bigErr.png')
        },
        filePath1: '',
        valueC: '',
        valueP: ''
    };
  },
  methods: {
    creatWindowfn(event) {
        const modalPath = path.join(
          "file://",
          __dirname,
          "../windows/modal.html"
        );
        // console.log(modalPath);

        let win = new BrowserWindow({ width: 400, height: 320 });
        win.on("close", function() {
          win = null;
        });
        win.loadURL('modalPath');
        win.show();
    },
    //基本通知
    baseNoted() {
        const myNotification = new window.Notification(this.notification.title, this.notification)
    },
    //带图像通知
    imgNoted(){
        alert(this.notification1.icon);
        const myNotification = new window.Notification(this.notification1.title, this.notification1)
    },
    //选择文件
    findFile () {
        ipc.send('open-file-dialog')
    },
    //错误弹窗
    errDialog(){
        ipc.send('open-error-dialog')
    },
    //剪贴板clipboard
    copyText(){
        var value = this.valueC;
        clipboard.writeText(value)
    },
    pasteText(){
        this.valueP = this.valueC;
    },
    //打开文件夹
    showFilder(p) {
        var filePath;
        switch (p) {
            case 'c':
                filePath = 'c:\\';
                break;
            case '用户':
                filePath = os.homedir();
            default:
                break;
        }
        shell.showItemInFolder(filePath)
    },
    openTab(){
        shell.openExternal('http://electron.atom.io')
    }

  }
};
</script>
<style scoped>
.box{
    padding: 10px;
}
.box>div{
    margin: 10px auto;
}
</style>