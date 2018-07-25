<template>
    <div class="page_content" :class='{"bigErr":allstatus==1,"close":runStatus==0}'>
                <div class="online">
                    <span :title="linkTime" :class='{"online":linkStatus==1}'></span>
                    <span v-text='linkStatus==0?"断开":"在线"'></span>
                </div>
                <div class="state">
                    <span :class='{"bigErr":runStatus==2,"normal":runStatus==1}'></span>
                    <span :class='{"bigErr":runStatus==2}'>{{runStatus==-1?"未知":(runStatus==0?"关闭":(runStatus==1?"正常":(runStatus==2?"故障报警":"&nbsp;")))}}</span>
                </div>
                <div class="ee">
                    <span v-text="cop?cop:'--'"
                    :class="{'blue':copStatus==1,
                            'green':copStatus==2,
                            'yellow':copStatus==3,
                            'red':copStatus==4}">--</span>
                    <span>今日能效指标 (EER)</span>
                </div>
            </div>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      // resulte0: {},
      // resulte: {},
      linkStatus: "",
      linkTime: "",
      cop: "",
      copStatus: "",
      runStatus: "",
    };
  },
  props: ["code", "loading", "allstatus"],
  methods: {
    getData() {
      axios
        .post("http://192.168.100.81:3000/CPSystemStatusService", {
          data: this.code
        })
        .then(res => res.data)
        .then(res => {
          //   res = JSON.parse(res);
          // console.log(res);
          // this.resulte.linkStatus = res[0].linkStatus.status;
          // this.resulte.linkTime = res[0].linkStatus.lastUpdateTime;
          // this.resulte.cop = res[0].cop.value;
          // this.resulte.copStatus = res[0].cop.status;
          // this.resulte.runStatus = res[0].runStatus.status;
          // this.$set(this.resulte,"runStatus",res[0].runStatus.status);
          // this.resulte0.runStatus = 2;
          // this.resulte = this.resulte0;
          // console.log(this.resulte0);
          // var temp = res[0];
          // this.resulte = Object.assign({}, { linkStatus: temp.linkStatus.status, linkTime: temp.linkStatus.lastUpdateTime,cop: temp.cop.value,copStatus:temp.cop.status,runStatus:temp.runStatus.status})
          var temp = res[0];
          this.linkStatus = temp.linkStatus.status;
          this.linkTime = temp.linkStatus.lastUpdateTime;
          this.cop = temp.cop.value;
          this.copStatus = temp.cop.status;
          this.runStatus = temp.runStatus.status;
        });
    }
  },
  mounted() {
    this.getData();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (!this.neterr) {
        this.getData();
      }
    }, 5000);
  }
};
</script>
<style scoped>

</style>