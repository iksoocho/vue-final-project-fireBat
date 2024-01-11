<template>
  <header>
    <!--logo start-->
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-auto d-flex align-items-center">
          <a href="/main">
            <img width="238" height="140" src="../image/logo/메인로고2.png" />
          </a>
        </div>
      </div>
    </div>
    <!--logo end-->
    <div class="header-area py-3">
      <div id="sticky-header" class="main-header-area">
        <div class="container-fluid">
          <div class="header_bottom_border">
            <div class="row align-items-center">
              <div class="col-xl-2 col-lg-2">
                <div class="logo">
                  <a href="/main">
                    <img width="150" height="60" src="../image/logo/서브로고.png" alt="" />
                  </a>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6">
                <div class="main-menu d-lg-block mt-3">
                  <nav>
                    <ul id="navigation">
                      <li><a class="active" href="/main">home</a></li>
                      <li><a href="/noticeList">공지사항</a></li>

                      <li>
                        <a href="#">축제<i class="ti-angle-down"></i></a>
                        <ul class="submenu">
                          <li><a href="/festivalList">축제</a></li>
                          <li><a href="festivalCalender">축제 달력</a></li>
                        </ul>
                      </li>
                      <li><a href="/userProductList">특산물 상점</a></li>
                      <li><a href="/qnaList">QnA</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 d-none d-lg-block">
                <div class="social_wrap d-flex align-items-center justify-content-end">
                  <div class="text-end">
                    <div v-if="isLoggedIn">
                      <!-- 추후 userName 클릭시 마이페이지 이동 구현(2024-01-02) -->
                      <div class="d-flex align-items-center" v-if="userId == 'admin'">
                        <p
                          class="me-2"
                          style="margin-bottom: 10px; margin-top: 10px; padding-right: 20px; padding-top: 8px"
                        >
                          <b><a href="/adminMain" style="color: inherit; text-decoration: none">관리자</a></b
                          >님!
                        </p>
                        <button type="button" class="btn btn-outline-danger me-2" @click="logout">Logout</button>
                      </div>
                      <div v-else class="d-flex align-items-center">
                        <p
                          class="me-2"
                          style="margin-bottom: 10px; margin-top: 10px; padding-right: 20px; padding-top: 8px"
                        >
                          <b
                            ><a href="/myPage" style="color: #ee2557; text-decoration: none">{{ userId }}</a></b
                          >님!
                        </p>
                        <a href="/cart">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            fill="#F08080"
                            class="bi bi-cart2"
                            viewBox="0 0 16 16"
                            style="margin-right: 30px"
                          >
                            <path
                              d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                            />
                          </svg>
                        </a>

                        <button type="button" class="btn btn-outline-danger me-2" @click="logout">Logout</button>
                      </div>
                    </div>
                    <div v-else>
                      <button type="button" class="btn btn-outline-danger me-2" @click="goLogin">Login</button>
                      <button type="button" class="btn btn-danger" @click="goSign">Sign-up</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  computed: {
    isLoggedIn() {
      return sessionStorage.getItem('user') !== null;
    },
    userId() {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      console.log('userData:', userData); // 확인용 로그 추가
      return userData ? userData : null;
    },
  },
  methods: {
    goSign() {
      this.$router.push('/emailVerification').catch(() => {});
    },
    goLogin() {
      this.$router.push('/login').catch(() => {});
    },
    async logout() {
      // 로그아웃 시 세션 지우기
      await Swal.fire({
        icon: 'success',
        title: '로그아웃 성공',
        text: '로그인 페이지로 이동합니다.',
        conriemButtonText: '확인',
      });
      sessionStorage.removeItem('user');
      await this.$router.push('/login'); // 로그아웃 후에 메인 페이지 또는 다른 적절한 페이지로 이동하도록 설정
      window.location.reload();
      //await this.$nextTick(); // 상태 업데이트를 기다립니다.
    },
  },
};
</script>

<style>
.logo {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

<style>
.logo {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
