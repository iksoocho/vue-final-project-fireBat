<template>
   <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
      <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
          <div class="nav">
            <div class="sb-sidenav-menu-heading">Festival</div>
            <router-link to="/admin/home">
              <a
              class="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div class="sb-nav-link-icon"></div>
              회원관리
              <div class="sb-sidenav-collapse-arrow">
                <i class="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              class="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav class="sb-sidenav-menu-nested nav">
                 <router-link class="nav-link" to="/adminUserList">
                      회원관리
                    </router-link>
                <router-link class="nav-link" to="/">
                      QnA관리
                    </router-link>
              </nav>
            </div>
              
            </router-link>
            <div class="sb-sidenav-menu-heading">Interface</div>
            <a
              class="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div class="sb-nav-link-icon"></div>
              축제관리
              <div class="sb-sidenav-collapse-arrow">
                <i class="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              class="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav class="sb-sidenav-menu-nested nav">
               <router-link class="nav-link" to="/festivalInsert">
                      축제등록
                    </router-link>
               <router-link class="nav-link" to="/festivalInfoList">
                      축제목록
                    </router-link>
              </nav>
            </div>
            <a
              class="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div class="sb-nav-link-icon"></div>
              상품관리
              <div class="sb-sidenav-collapse-arrow">
                <i class="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              class="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav class="sb-sidenav-menu-nested nav">
                 <router-link class="nav-link" to="/productInsert">
                      상품등록
                    </router-link>
                <router-link class="nav-link" to="/productList">
                      상품목록
                    </router-link>
              </nav>
            </div>
            
            
            
            <a
              class="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div class="sb-nav-link-icon"></div>
              재고관리
              <div class="sb-sidenav-collapse-arrow">
                <i class="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              class="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav class="sb-sidenav-menu-nested nav">
               <router-link class="nav-link" to="/productInventory">
                      재고목록
                    </router-link>
              </nav>
            </div>
            <a
              class="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div class="sb-nav-link-icon"></div>
              배송관리
              <div class="sb-sidenav-collapse-arrow">
                <i class="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              class="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav class="sb-sidenav-menu-nested nav">
               <router-link class="nav-link" to="/deliveryInformation">
                      배송정보
                    </router-link>
               <router-link class="nav-link" to="/deliveryList">
                      주문정보
                    </router-link>
              </nav>
            </div>
            <!-- <router-link to="/admin/table">
              <a class="nav-link" href="#">
                <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                Tables
              </a>
            </router-link> -->
          </div>
        </div>
        <!-- <div class="sb-sidenav-footer">
					<div class="small">Logged in as:</div>
					관리자
				</div> -->
      </nav>
    </div>
    <div id="layoutSidenav_content">
      <main>
        <router-view />
      </main>
    </div>
  </div>

</template>

<script>
export default {
    name : 'AdminSideBar'
}
</script>

<style>
body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}

main {
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}

.dropdown-toggle { outline: 0; }

.btn-toggle {
  padding: .25rem .5rem;
  font-weight: 600;
  color: var(--bs-emphasis-color);
  background-color: transparent;
}
.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(var(--bs-emphasis-color-rgb), .85);
  background-color: var(--bs-tertiary-bg);
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform .35s ease;
  transform-origin: .5em 50%;
}

[data-bs-theme="dark"] .btn-toggle::before {
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%28255,255,255,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
}

.btn-toggle[aria-expanded="true"] {
  color: rgba(var(--bs-emphasis-color-rgb), .85);
}
.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: var(--bs-tertiary-bg);
}

.scrollarea {
  overflow-y: auto;
}
</style>