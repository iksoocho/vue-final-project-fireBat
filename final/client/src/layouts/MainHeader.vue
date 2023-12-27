<template>
  
  <header>
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-auto d-flex align-items-center">
                <img width="40" height="40" src="../image/logo/철조망빠따.jpg" style="margin-right: 10px;">
                <h2 class="logo">불빠따</h2>
            </div>
        </div>
    </div>
    <div class="header-area py-3">
        <div id="sticky-header" class="main-header-area">
            <div class="container-fluid">
                <div class="header_bottom_border">
                    <div class="row align-items-center">
                        <div class="col-xl-2 col-lg-2">
                            <div class="logo">
                                <a href="index.html">
                                    <img src="img/logo.png" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6">
                            <div class="main-menu d-none d-lg-block mt-3">
                                <nav>
                                    <ul id="navigation">
                                        <li><a class="active" href="index.html">home</a></li>
                                        <li><a href="about.html">About</a></li>
                                        <li><a class="" href="travel_destination.html">Destination</a></li>
                                        <li><a href="#">pages <i class="ti-angle-down"></i></a>
                                            <ul class="submenu">
                                                    <li><a href="destination_details.html">Destinations details</a></li>
                                                    <li><a href="elements.html">elements</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">blog <i class="ti-angle-down"></i></a>
                                            <ul class="submenu">
                                                <li><a href="blog.html">blog</a></li>
                                                <li><a href="single-blog.html">single-blog</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="contact.html">Contact</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 d-none d-lg-block">
                            <div class="social_wrap d-flex align-items-center justify-content-end">
                              <div class="text-end">
                                <button type="button" class="btn btn-outline-danger me-2">Login</button>
                                <button type="button" class="btn btn-primary" @click="goSign">Sign-up</button>
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