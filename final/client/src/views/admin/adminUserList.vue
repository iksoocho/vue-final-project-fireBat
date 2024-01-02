<template>
  <div id="users">
    <h3>회원정보</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>회원 ID</th>
                <th>회원 PW</th>
                <th>이메일</th>
                <th>이름</th>
                <th>휴대폰 번호</th>
                <th>거주지</th>
                <th>주민번호</th>
                <th>누적판매량</th>
            </tr>
        </thead>
        <tbody>
            <tr :key="i" v-for="(users, i) in adminUserList">
              <th>{{users.user_id }}</th>
              <th>{{users.user_pw }}</th>
              <th>{{users.user_email }}</th>
              <th>{{users.user_name }}</th>
              <th>{{users.user_tel }}</th>
              <th>{{users.user_address }}</th>
              <th>{{users.user_birth }}</th>
              <th>{{ }}</th>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // data(){
  //   return {
  //     adminUserList: [],
  //   }
  // },
  // created(){
  //   this.getAdminUserList();
  // },
  // methods : {
  //   async getAdminUserList(){
  //     this.adminUserList = (await axios.get('/api/product'))
  //                                       .catch(err => console.log(err)).data;
  //   }
  // }
}
</script>

<style>

</style>