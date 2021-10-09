import { Toast,Dialog,NumberKeyboard } from 'vant';
import qs from 'qs'
import $  from 'jquery'
import wx from 'weixin-js-sdk';
import {apiAddSend,phoneEdit,mainEdit} from '@/assets/network/api'

export default {
  components: {
    [Toast.name]: Toast,
    [Dialog.Component.name]: Dialog.Component,
    [NumberKeyboard.name]: NumberKeyboard,
  },
  data(){
    return{
      title:'个人信息',
      Dialog:'',
      gradeShow: false,
      show1: false,
      show2: false,
      show3:false,
      show4:false,

      sendAuthCode:true,
      auth_time: 0,

      //yzm
      show: false,
      getCode:'获取验证码',
      taps: {
        confirm: '',
        d: false,
        zz: '',

      },
      tableData:{
        image:'',
        name:'',
        sex:'请选择',    //性别
        phone:'请绑定手机号',
        id:''
      },


  getData:[
    {name:'小学', grade:["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"] },
    {name:'初中', grade:["初一", "初二", "初三"]},
    {name: "高中", grade: ["高一", "高二", "高三"]}
  ],

      WX:{},
      localIds:''

    }
  },


  methods: {

    off(){
      this.$router.push({path:"/MyPage"})
    },
    showPopup() {
      this.show1 = true;
    },

    phone(){         //手机号点击进去的时触发
      this.show2 = true;
      this.date.phone='';
      this.sendAuthCode = true;
      clearInterval(this.auth_timetimer);
    },


    gender(){
      this.show3 = true;
    },

    beforeClose(action, done) {    //性别
      if (action === 'confirm') {
        let DataMale=this.$store.state.data.sex;
        console.log(DataMale,'h');
        done();
      } else {
        done();
      }
    },

    grtCode(){ //获取验证码

      let phone=qs.stringify({
        phone:this.$store.state.data.phone,
      });
      apiAddSend(phone).then(res=>{     //点击获取验证码
        console.log(res);
        this.code=res.code;
        if(this.code==507){
          this.sendAuthCode=true;
          setTimeout(() => {  //验证码计时器1s需求
            this.taps.d = false;
          }, 1000);
          this.taps.d = true;
          this.taps.zz = '手机号已绑定';
        }else if(this.code==505){
          this.sendAuthCode=true;
          setTimeout(() => {  //验证码计时器1s需求
            this.taps.d = false;
          }, 1000);
          this.taps.d = true;
          this.taps.zz = '验证码次数过多，明天尝试';
        }else {
          this.sendAuthCode = false;
          this.auth_time = 60;
          var auth_timetimer =  setInterval(()=>{
            this.auth_time--;
            if(this.auth_time<=0){
              this.sendAuthCode = true;
              clearInterval(auth_timetimer);
            }
          }, 1000);
        }
      });
    },

    phone2(action,done){     //手机号点击确定取消时触发
      if (action === 'confirm') {
        let MobilePhone=this.$store.state.data.phone;
        console.log(MobilePhone,'手机号');

        var idCode=qs.stringify(  //测试中
          {
            id:this.$store.state.data.id,
            phone:this.$store.state.data.phone,
            code:this.$store.state.data.yzm
          }
        );
        console.log(idCode)


        phoneEdit(idCode).then(res=>{
          this.confirm=res.code;

          console.log(this.confirm,'开始');
        if(this.confirm==200){
          this.$store.state.data.yzm='';
           done();
           console.log(this.confirm,'success');
        } else if(idCode==='id=33&phone=15051858002&code=' || idCode===undefined){
            done(false);
            setTimeout(() => {  //验证码计时器1s需求
              this.taps.d = false;
            }, 1000);
            this.taps.d=true;
            this.taps.zz='验证码不能为空';
            console.log(this.taps.zz)
          } else if(this.confirm==509){
          this.taps.zz='该验证码错误';
          setTimeout(() => {  //验证码计时器1s需求
            this.taps.d = false;
          }, 1000);
          this.taps.d =true;
          console.log(this.taps.zz);
          done(false);
        }

        });
      }else {
        this.taps.d=false;
        this.$store.state.data.yzm='';
        this.$store.state.data.phone='';
        done();
      }
    },

    stage(name){
      if(name===this.$store.state.data.grade){
        return 'grade-list-add '
      }else {
        return 'grade-list'
      }
    },

    stageTrigger(name) {        // 选择哪个年级
      console.log(name,'html年级回调');
      this.$store.commit("vv", name);
      this.$emit("refresh");
      this.show1 = false;
    },




    //头像img对接 上传功能
    uploadImg(){
      // console.log(this.WX.signature,'ffffffff')
      // wx.ready(function () {
      //   console.log('验证成功');
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            $('#imgTarget').attr('src',localIds[0]);
          }
        });
      // });
      // wx.error(function () {
      //   console.log('验证失败')
      // });
    },



    //编辑
    edit(){
      var getData=qs.stringify(
        {
          id:this.$store.state.data.id,
          name:this.$store.state.data.name,
          sex:this.$store.state.data.sex,
          grade:this.$store.state.data.grade
        }
      );
      console.log(this.$store.state.data.id,'222222222222222222222');
      mainEdit(getData).then(res=>{
        console.log(res,'修改性别接口、年级、姓名接口')
      });


      this.$router.push({path:"/MyPage"});
    },
  },

  created(){   //初始化获取列表数据
    this.$store.state.grade='请选择年级';
    this.$store.dispatch('getdata');

  },
  mounted(){

  }

}

