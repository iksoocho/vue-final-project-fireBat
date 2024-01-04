<template>
  <div>
    <!-- 우편번호 -->
    <div style="margin-bottom: 8px;">
      <input class="black-placeholder" ref="user_zip" type="text" placeholder="우편번호" v-model="user.user_zip" readonly style="width: 300px; height: 40px; ">
      <!-- 주소 찾기 버튼 -->
      <button @click="postOpen" class="btn btn-danger" type="button" style="margin-left: 20px; margin-bottom: 5px;">주소검색</button>
    </div>

    <!-- 도로명주소 -->
    <div style="margin-bottom: 8px;">
      <input class="black-placeholder" ref="user_addr" type="text" placeholder="도로명주소" v-model="user.user_addr" :readonly="!isAddressEditable" style="width: 511.94px; height: 40px; ">
    </div>

    <!-- 상세주소 -->
    <div style="margin-bottom: 20px;">
      <input ref="user_detail_addr" type="text" placeholder="상세주소" v-model="user.user_detail_addr" style="width: 511.94px; height: 40px;">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      isAddressEditable: false, // 수정 불가능한 상태로 초기화
    };
  },
  methods: {
    postOpen() {
      const self = this;

      new daum.Postcode({
        oncomplete: function (data) {
          // 확정된 주소 데이터를 사용자 정보에 반영
          self.user.user_zip = data.zonecode;
          self.user.user_addr = data.address;

          // 수정 가능한 상태로 변경
          self.isAddressEditable = true;

          // 사용자가 입력할 상세주소에 포커스
          self.$refs.user_detail_addr.focus();

          // 부모 컴포넌트로 이벤트 발생
          self.$emit('address-updated', {
            user_zip: self.user.user_zip,
            user_addr: self.user.user_addr,
          });
        },
      }).open();
    },
  },
};
</script>

<style scoped>
input {
  padding: 10px;
}
</style>