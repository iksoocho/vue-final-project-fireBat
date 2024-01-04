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
        <input type="text" :value="getFormattedBirth" readonly/>
      </div>
      
      <!-- AddressSearch 컴포넌트를 포함합니다 -->
      <AddressSearch :user="user" @address-updated="handleAddressUpdated" />

      <!-- 다른 필요한 정보를 포함합니다 -->

      <button type="submit">정보 수정</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';
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
        user_birth: new Date(),
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
    getFormattedBirth() {
      return format(this.user.user_birth, 'yyyy년 MM월 dd일');
    },
  },
  methods: {
    async loadUserData() {
      try {
        // 서버에서 사용자 정보를 불러오는 API 호출
        const response = await axios.get(`/api/user/myPage/${this.user.user_id}`);
        // 불러온 사용자 정보를 컴포넌트 데이터에 저장
        this.user = response.data;
      } catch (error) {
        console.error('사용자 정보를 불러오는 데 실패했습니다.', error);
      }
    },
    async submitForm() {
      try {
        let data = {
          user_id: this.user.user_id,
          user_name: this.user.user_name,
          user_gender: this.user.user_gender,
          user_birth: this.user.user_birth,
          user_zip: this.user.user_zip,
          user_addr: this.user.user_addr,
          user_detail_addr: this.user.user_detail_addr,
          // 다른 필요한 정보를 추가합니다
        };

        let result = await axios.put(`/api/user/myPage/${this.user.user_id}`, data);

        console.log(result.data);

        if (result.data.affectedRows === 1) {
          window.alert('회원 정보가 수정되었습니다.');
        } else {
          window.alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error(error);
        window.alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
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
    this.user.user_id = '사용자 아이디';
    this.loadUserData();
  },
};
</script>