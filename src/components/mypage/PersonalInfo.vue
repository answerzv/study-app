<template>
  <div class="app" style="height: 100vh; background-color: #f2f2f2;">
    <div class="PersonalInfo-list" >
      <div class="PersonalInfo-avatar">
        <div>头像</div>
        <img   id="imgTarget" alt="" style="position:absolute; right:0 " class="Avatar-img" :src="$store.state.data.image" > <!--$store.state.data.image-->
        <input @click="uploadImg()" style="height: 13vh; opacity: .0; width: 83vw;" />
      </div>
      <div class="PersonalInfo-name">
        <div>昵称</div>
        <div>
          <div class="alter-name">
             <input class="hiddenInput" type="text" v-model="$store.state.data.name"   style="text-align:right"  maxlength="3" placeholder=""/>
          <div class="PersonalInfo-arrow">
            <van-icon name="arrow" />
          </div>
         </div>
        </div>
      </div>
      <div class="PersonalInfo-name" @click="gender()">
        <div>性别</div>
        <div style="display: flex">
        <div class="alter-name"  v-text="$store.state.data.sex==0?'女':'男' " >
          </div>
          <div class="PersonalInfo-gender">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div style="cursor:pointer" class="PersonalInfo-name" @click="phone()">
        <div>手机号</div>
        <div>
          <div class="alter-name">
            {{$store.state.data.phone}}      <!--  简写-->
            <div class="PersonalInfo-gender">
                <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </div>
      <div class="PersonalInfo-grade" style="cursor:pointer" @click="showPopup()">
        <div>年级</div>
        <div>
         <div class="alter-name">
           {{$store.state.data.grade}}
           <div class="PersonalInfo-gender">
           <van-icon name="arrow" />
           </div>
         </div>
        </div>
      </div>

     <van-dialog v-model="show3" title="性别"  :before-close="beforeClose" show-confirm-button  show-cancel-button>
    <van-radio-group class="gender-get" >
      <div class="select-get">
        <input id="appoint-index" type="radio"  class="gender-k" v-model="$store.state.data.sex"  name="sex" value="1"  checked>
        <label style="display: initial;"  class="fa fa-mars fa-fw" for="appoint-index">
        男
        </label>
      </div>
      <div class="select-get">
        <span></span>
        <input id="appoint-two" type="radio" class="gender-k" v-model="$store.state.data.sex"  name="sex" value="0" checked>
        <label style="display: initial;" for="appoint-two" class="fa fa-venus fa-fw">
         女
        </label>
      </div>
    </van-radio-group>
  </van-dialog>
<!--   手机号弹框     -->
  <van-dialog v-model="show2" title="手机号" show-confirm-button show-cancel-button :before-close="phone2">
    <div class="phone-get" >
      <van-cell-group>
        <van-field  type="number" pattern="\d*" class="phone-box" maxlength="11" v-model="$store.state.data.phone" placeholder="请绑定手机号" />
      </van-cell-group>
    </div>
    <div class="verify-get" >
      <div class="verify-style">
        <van-cell-group>
          <van-field type="number" pattern="\d*" class="verify-box" v-model="$store.state.data.yzm"   maxlength="6" placeholder="" />
        </van-cell-group>
      </div>
        <div v-show="sendAuthCode" class="verify-button" @click="grtCode()">获取验证码</div>
        <div v-show="!sendAuthCode" class="verify-button"><span style="text-align: center;display: block;">{{auth_time}}s后验证</span></div>
      </div>
      <div v-show="taps.d" :v-text="taps.zz" style="margin:1vw 0 1vw 5vw ; font-size: 13px; color: red">{{taps.zz}}</div>
  </van-dialog>
<!--   年级弹框-->
  <van-popup round   v-model="show1"  >
    <div class="grade-box" >
      <div class="site-grade">设置年级</div>
      <div class="Margin"  v-for="(self,index) in getData" :key="index">
        <div class="stage">{{self.name}}</div>  <!-- 学习阶段-->
        <div class="Margin-1">
          <div :class="stage(name)"
               v-for="(name,index) in self.grade"
               :key="index" @click="stageTrigger(name)">{{name}}</div>
        </div>
      </div>
    </div>
  </van-popup>

</div>
    <div style="display: flex; justify-content: center;margin-top: 2rem">
    <van-button round   @click="edit"  class="Preservation"  type="info">
      <div>
        保存
      </div>
    </van-button>
    </div>
  </div>
</template>

<script>
    import PersonalInfo from './utils/js/PersonalInfo'
    export default PersonalInfo



</script>
<style src="./utils/style/Personallnfo.css" scoped>
</style>

