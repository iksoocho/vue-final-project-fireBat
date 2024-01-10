<template>
  <div>
    <a id="custum-login-btn" @click="kakaoLogin()">
      <img
        src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
        width="180"
        style="text-align: center"
      />
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'account_email',
        success: this.getKakaoUserProfile,
        fail: (err) => console.error(err),
      });
    },
    getKakaoUserProfile() {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (response) => {
          const kakao_account = response.kakao_account;
          const user_email = kakao_account.email;

          // // 여기서 서버로 토큰을 전송하고, 서버에서 로그인 처리를 진행할 수 있음
          // axios.post('/api/user/login', { token: YOUR_TOKEN, email: user_email})
          // .then(response => {
          //   console.log(response.data);
          // })
          // .catch(error => {
          //   console.error(error);
          // });
        },
        fail: (err) => console.error(err),
      });
    },
  },
};
</script>
