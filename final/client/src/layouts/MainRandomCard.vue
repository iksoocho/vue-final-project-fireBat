<template>
  <div class="popular_destination_area">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="section_title text-center mb_70">
            <h3>
              <img
                width="280"
                height="47"
                src="../image/logo/이런축제어때요.png"
              />
            </h3>
            <p>
              Suffered alteration in some form, by injected humour or good day
              randomised booth anim 8-bit hella wolf moon beard words.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          v-for="(fes, i) in fesRandomList"
          :key="i"
          class="col-lg-4 col-md-6"
          @click="goFesInfo(fes.f_code)"
        >
          <div class="single_destination">
            <div class="thumb">
              <img
                :src="`/api/festival/public/uploads/${fes.fesImg}`"
                alt=""
                width="356px"
                height="365px"
              />
            </div>
            <div class="content">
              <p class="d-flex align-items-center">
                {{ fes.f_name }}
                <a
                  >{{ getDateFormat(fes.f_firstday) }} ~
                  </a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="more_place_btn text-center">
            <a class="boxed-btn4" href="/festivalList">More Festival</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fesRandomList: [],
    };
  },
  created() {
    this.getFesRandomList();
  },

  methods: {
    async getFesRandomList() {
      this.fesRandomList = (
        await axios.get(`/api/festival/random`).catch((err) => console.log(err))
      ).data;
    },
    goFesInfo(f_code) {
      this.$router.push({ path: "/festivalInfo", query: { f_code: f_code } });
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
  },
};
</script>
