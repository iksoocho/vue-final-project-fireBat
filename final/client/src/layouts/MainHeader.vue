<template>
  
  <header>
    <!--logo start-->
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-auto d-flex align-items-center">
                <a href="/main">
                    <img width="238" height="120" src="../image/logo/메인로고2.png" >
                </a>
                
            </div>
        </div>
    </div>
    <!--logo end-->
    <div class="header-area py-3" >
        <div id="sticky-header" class="main-header-area" >
            <div class="container-fluid">
                <div class="header_bottom_border">
                    <div class="row align-items-center">
                        <div class="col-xl-2 col-lg-2">
                            <div class="logo">
                                <a href="/main">
                                    <img width="160" height="60" src="../image/logo/서브로고.png" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6">
                            <div class="main-menu  d-lg-block mt-3">
                                <nav>
                                    <ul id="navigation">
                                        <li><a class="active" href="/main">home</a></li>
                                        <li><a href="about.html">공지사항</a></li>
                                        
                                        <li><a href="#">축제<i class="ti-angle-down"></i></a>
                                            <ul class="submenu">
                                                    <li><a href="destination_details.html">축제</a></li>
                                                    <li><a href="festivalCalender">축제 달력</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="about.html">특산물 상점</a></li>
                                        <li><a href="about.html">QnA</a></li>
                                        
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 d-none d-lg-block">
                            <div class="social_wrap d-flex align-items-center justify-content-end">
                              <div class="text-end">
                                <button type="button" class="btn btn-outline-danger me-2">Login</button>
                                <button type="button" class="btn btn-danger" @click="goSign">Sign-up</button>
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
export default {
	
	methods: {
		goSign() {
			this.$router.push('/userInsert').catch(() => {});
		},
	},
}
</script>


<style>
.logo {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>