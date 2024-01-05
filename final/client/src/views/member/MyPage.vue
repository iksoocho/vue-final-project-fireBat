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
        <!-- 사용자에게는 'YYYY년 MM월 DD일' 형식으로 표시 -->
        <input type="text" :value="formattedUserBirth" readonly/>
        <!-- 실제로 서버에 전송되는 값은 날짜만 포함된 'YYYY-MM-DD' 형식 -->
        <input type="hidden" v-model="user.user_birth" />
      </div>
      
      <!-- AddressSearch 컴포넌트를 포함합니다 -->
      
        <AddressSearch :user="user" @address-updated="handleAddressUpdated"/>

      <div>
        <label>전화번호</label><br>
        <input type="text" v-model="user.user_tel" readonly/>
      </div>

      <div>
        <label>이메일</label><br>
        <input type="text" v-model="user.user_email" readonly/>
      </div>



      <!-- 다른 필요한 정보를 포함합니다 -->

      <button type="submit">정보 수정</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import AddressSearch from '../../components/AddressSearch.vue';
import moment from 'moment';

export default {
  components: {
    AddressSearch
  },
  data() {
    return {
      user: {
        user_id: '',
        user_name: '',
        user_gender: '', // default 값 설정
        user_birth: null,
        user_zip: '',
        user_addr: '',
        user_detail_addr: '',
        user_tel:'',
        user_email: '',
      },
    };
  },
  computed: {
  getGenderLabel() {
    return this.user.user_gender === 0 ? '남' : (this.user.user_gender === 1 ? '여' : '기타');
  },
  formattedUserBirth() {
      // user_birth를 'YYYY-MM-DD' 형식으로 변환
      return moment(this.user.user_birth).format('YYYY년 MM월 DD일');
    },
},
  methods: {
    async loadUserData() {
      try {
        // 서버에서 사용자 정보를 불러오는 API 호출
        console.log('사용자 정보를 불러오는 중...');
        const response = await axios.get(`/api/user/myPage`);
        // 불러온 사용자 정보를 컴포넌트 데이터에 저장
        console.log('서버 응답완료:', response.data);
        this.user = response.data;
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
          user_birth: moment(this.user.user_birth).format('YYYY-MM-DD'),
          user_tel: this.user.user_tel,
          user_email: this.user.user_email,
          // 다른 필요한 정보를 추가합니다
        };

        // 회원정보 수정 API 호출
        let result = await axios.put(`/api/user/myPage`, data);
        console.log(result.data.affectedRows === 1)
        if (result.data.success) {
          // 수정 성공 시 처리
          console.log('회원 정보 수정이 완료되었습니다.');
          // 수정 후 마이 페이지로 이동
          this.$router.push('/myPage');
        } else {
          // 오류 시 처리
          console.error('수정에러',result.data);
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