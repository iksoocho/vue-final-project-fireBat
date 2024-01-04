<template>
  <div>
    <h3>회원 정보 수정</h3>
    <form @submit.prevent="submitForm">
      <div>
        <label>아이디</label><br>
        <input type="text" v-model="user.user_id" readonly />
      </div>

      <div>
        <label>이름</label><br>
        <input type="text" v-model="user.user_name"/>
      </div>
      
      <div>
        <label>성별</label><br>
        <input type="text" :value="getGenderLabel" readonly/>
      </div>

      <div>
        <label>생년월일</label><br>
        <input type="text" :value="formattedBirth" readonly/>
      </div>
      
      <!-- AddressSearch 컴포넌트를 포함합니다 -->
      <AddressSearch :user="user"/>

      <!-- 다른 필요한 정보를 포함합니다 -->

      <button type="submit">정보 수정</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import AddressSearch from '../../components/AddressSearch.vue';

export default {
  components: {
    AddressSearch
  },
  data() {
    return {
      user: {
        user_id: '',
        user_name: '',
        user_gender: 0, // default 값 설정
        user_birth: null,
        user_zip: '',
        user_addr: '',
        user_detail_addr: '',
      },
    };
  },
  computed: {
    getGenderLabel() {
      return this.user.user_gender === 0 ? '남' : '여';
    },
    formattedBirth() {
      if (this.user.user_birth) {
        // MySQL의 Date 타입을 JavaScript Date 객체로 변환
        const parsedDate = parseISO(this.user.user_birth);
        return format(parsedDate, 'yyyy-MM-dd');
      } else {
        return '';
      }
    },
  },
  methods: {
    async loadUserData() {
      try {
        // 서버에서 사용자 정보를 불러오는 API 호출
        console.log('사용자 정보를 불러오는 중...');
        const response = await axios.get(`/api/user/myPage`);
        // 불러온 사용자 정보를 컴포넌트 데이터에 저장
        console.log('서버 응답:', response.data);
        this.user = response.data;

        if (this.user.user_birth) {
          // MySQL의 Date 타입을 JavaScript Date 객체로 변환
          this.user.user_birth = parseISO(this.user.user_birth);

          if (isNaN(this.user.user_birth)) {
            console.error('서버에서 받은 날짜 값이 유효하지 않습니다.');
          } else {
            console.log('유효한 날짜 값 확인:', this.user.user_birth);
          }
        }
      } catch (error) {
        console.error('사용자 정보를 불러오는 데 실패했습니다.', error);
      }
    },
    async submitForm() {
      try {
        let data = {
          user_name: this.user.user_name,
          user_zip: this.user.user_zip,
          user_addr: this.user.user_addr,
          user_detail_addr: this.user.user_detail_addr,
          // 다른 필요한 정보를 추가합니다
        };

        // 회원정보 수정 API 호출
        let result = await axios.put(`/api/user/myPage`, data);

        if (result.data.success) {
          // 수정 성공 시 처리
          console.log('회원 정보 수정이 완료되었습니다.');
          // 수정 후 마이 페이지로 이동
          this.$router.push('/myPage');
        } else {
          // 오류 시 처리
          console.error(result.data.error);
          // 사용자에게 오류 메시지 표시
          // 예: this.errorMessage = result.data.error;
        }
      } catch (error) {
        console.error(error);
        // 오류 처리
      }
    },
    handleAddressUpdated(updatedAddress) {
      // AddressSearch 컴포넌트에서 주소가 업데이트되면 사용자의 주소를 업데이트합니다
      this.user.user_zip = updatedAddress.user_zip;
      this.user.user_addr = updatedAddress.user_addr;
      this.user.user_detail_addr = ''; // 수정 시 상세주소 초기화
    },
  },
  created() {
    // 사용자 정보를 서버에서 가져오는 로직을 created 훅에서 실행
    this.loadUserData();
  }
}
</script>