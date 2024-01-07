<template>
  <div id="users" class="container">
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
          <!-- <th>누적판매량</th> -->
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(users, i) in adminUserList">
          <th class="id">{{ users.user_id }}</th>
          <th class="pw">{{ users.user_pw }}</th>
          <th class="email">{{ users.user_email }}</th>
          <th class="name">{{ users.user_name }}</th>
          <th class="tel">{{ users.user_tel }}</th>
          <th class="addr">{{ users.user_addr }}</th>
          <th class="date">{{ $dateFormat(users.user_birth, "yy-MM-dd") }}</th>
          <!-- <th class="count">{{ users.sellcount }}</th> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      adminUserList: [],
    };
  },
  created() {
    this.getAdminUserList();
  },
  methods: {
    async getAdminUserList() {
      this.adminUserList = (
        await axios
          .get("/api/product/adminUser")
          .catch((err) => console.log(err))
      ).data;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
}
.count {
  text-align: center;
}
</style>
