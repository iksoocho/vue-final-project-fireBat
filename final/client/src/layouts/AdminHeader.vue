<template>
  <nav
    class="sb-topnav navbar navbar-expand navbar-dark bg-dark"
    style="height: 100px"
  >
    <!-- Navbar Brand-->
    <a class="navbar-brand" @click="$router.push('/adminMain')"
      ><img
        style="width: 225px; height: 100px"
        v-bind:src="require('@/assets/img/logo/메인로고2.png')"
    /></a>
    <!-- Navbar Search-->
    <form
      class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"
    >
      <div class="input-group" style="display: none">
        <input
          class="form-control"
          type="text"
          placeholder="Search for..."
          aria-label="Search for..."
          aria-describedby="btnNavbarSearch"
        />
        <button class="btn btn-primary" id="btnNavbarSearch" type="button">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </form>

    <!-- Navbar-->
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          ><i class="fas fa-user fa-fw"></i
        ></a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <a
              style="text-aline: center"
              class="bi bi-house"
              onclick="location.href='/main'"
              >메인으로가기</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AdminHeader",
};
</script>

<style></style>
