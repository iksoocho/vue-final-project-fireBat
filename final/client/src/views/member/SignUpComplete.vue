<template>
  <div class="container">
    <h1>축하합니다. 회원가입이 완료되었습니다.</h1>
    <div class="container-one">
      <div class="container-two">
        <h5>저희 FESTIVAL NU CYA 를 이용해 주셔서 감사합니다.</h5>
      </div>
      <div class="container-three">
        <b>>아이디 : {{ user.user_id }}</b><br>
        <b>>이름 : {{ user.user_name }}</b><br>
        <b>>이메일 : {{ user.user_email }}</b>
      </div>
      <div class="container-four">
        <button class="btn btn-danger" type="button">로그인</button>
        <button class="btn btn-danger" type="button" style="margin-left: 20px;">메인화면</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        user_id: this.$route.query.user_id,
        user_name: this.$route.query.user_name,
        user_email: this.$route.query.user_email,
      },
    };
  },
};
</script>
<style scoped>
.container{
  text-align: center;
}
.container-one{
  border: solid 1px rgb(163, 163, 163);
  width: 800px;
  margin: 0 auto;
  margin-bottom: 50px;
}
.container-two{
  margin-top: 20px;
}
.container-three{
  margin-top: 30px;
  text-align: left;
  padding-left: 220px;
  
}
.container-four{
  margin-top: 50px;
  margin-bottom: 20px;
}
</style>