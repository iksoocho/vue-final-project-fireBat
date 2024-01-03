<template>
  <h1>마이페이지입니다.</h1>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInfo: {},
      user_no: ''
    }
  },
  methods : {
    async userInfo(){
      let data = {
        param : {
          user_id: '',
          user_pw: '',
          user_recpw: '',
          user_name: '',
          user_birth:'',
          user_tel: '',
          user_email: '',
          user_zip: '',
          user_addr: '',
          user_detail_addr: '',
          user_receive_email: '',
          user_regdate: '',
          user_status: '',
          user_deldate: '',
          user_gender: '',
        }
      }
    }
  }
}
</script>