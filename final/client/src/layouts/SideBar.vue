<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" style="border-radius: 5px">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-5 d-none d-sm-inline">마이페이지</span>
          </a>
          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
              <a href="/main" class="nav-link align-middle px-0">
                <i class="fs-4 bi-house"></i>
                <span class="ms-1 d-none d-sm-inline" style="font-weight: bold">메인메뉴</span>
              </a>
            </li>
            <li>
              <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                <i class="fs-4 bi-bootstrap"></i>
                <span class="ms-1 d-none d-sm-inline" style="font-weight: bold">나의 정보</span></a
              >
              <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                <li class="w-100">
                  <a href="/userCheck" class="nav-link px-0">
                    <span class="d-none d-sm-inline" style="font-weight: bold">회원 정보</span></a
                  >
                </li>
                <li>
                  <a href="/userQuit" class="nav-link px-0">
                    <span class="d-none d-sm-inline" style="font-weight: bold">회원 탈퇴</span></a
                  >
                </li>
              </ul>
            </li>
            <li>
              <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">주문 내역</span>
              </a>
              <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                <li class="w-100">
                  <a href="/orderList" class="nav-link px-0">
                    <span class="d-none d-sm-inline" style="font-weight: bold">주문 내역 확인</span></a
                  >
                </li>
              </ul>
            </li>
          </ul>
          <hr />
        </div>
      </div>
      <div class="col py-3" style="text-align: center">
        <img src="../../public/img/dddd.jpg" style="margin-top: 100px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
};
</script>
