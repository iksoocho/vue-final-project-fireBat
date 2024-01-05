<template>
  <div>
    <h3>회원 정보 수정</h3>
    <form @submit.prevent="submitForm">
      <div>
        <h5>아이디</h5>
        <span>{{ user.user_id }}</span>
      </div>

      <div>
        <label>이름</label><br>
        <input
          v-if="isEditingName"
          type="text"
          v-model="user.user_name"
        />
        <span v-else>{{ user.user_name }}</span>
        <button type="button" @click="toggleEditMode('name')">
          {{ isEditingName ? '수정완료' : '수정' }}
        </button>
      </div>
      
      <div>
        <label>성별</label><br>
        <span>{{ getGenderLabel }}</span>
      </div>

      <div>
        <label>생년월일</label><br>
        <!-- 사용자에게는 'YYYY년 MM월 DD일' 형식으로 표시 -->
        <span>{{ formattedUserBirth }}</span>
        <!-- 실제로 서버에 전송되는 값은 날짜만 포함된 'YYYY-MM-DD' 형식 -->
        <input type="hidden" v-model="user.user_birth" />
      </div>
      
      
      <!-- AddressSearch 컴포넌트를 포함합니다 -->
      
        <AddressSearch :user="user" @address-updated="handleAddressUpdated"/>

      <!-- 추후 컴포넌트화.(2024,01,05) -->
    <div>
    <label>전화번호</label><br>
    <div :class="{ isEditingTel: isEditingTel }" v-if="isEditingTel">
      <select v-model="user.user_tel_first" class="dropdown" id="telSelect">
          <option value="02">02</option>
          <option value="031">031</option>
          <option value="032">032</option>
          <option value="033">033</option>
          <option value="041">041</option>
          <option value="043">043</option>
          <option value="044">044</option>
          <option value="051">051</option>
          <option value="052">052</option>
          <option value="053">053</option>
          <option value="054">054</option>
          <option value="055">055</option>
          <option value="061">061</option>
          <option value="062">062</option>
          <option value="063">063</option>
          <option value="064">064</option>
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="018">018</option>
          <option value="019">019</option>
        </select>-
      <input type="text" v-model="user.user_tel_second" maxlength="4" @input="validateNumericInput('user_tel_second')" />-
      <input type="text" v-model="user.user_tel_third" maxlength="4" @input="validateNumericInput('user_tel_third')"/>
    </div>
    <span v-else>{{ formatPhoneNumber(user.user_tel) }}</span>
    <div>
    <button class="telButton" type="button" @click="toggleEditMode('tel')">
      {{ isEditingTel ? '수정완료' : '수정' }}
    </button>
    </div>
    </div>

    <div>
  <label>이메일</label><br>
  <span>{{ user.user_email }}</span>
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
    AddressSearch,
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
        user_tel_first: '', // 전화번호 첫 번째 부분을 저장하는 추가 속성
        user_tel_second: '', // 전화번호 두 번째 부분을 저장하는 추가 속성
        user_tel_third: '',
      },
      isEditingName: false,
      isEditingTel: false,
      initialTelData: {},
      
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
    formatPhoneNumber(phoneNumber) {
      // 전화번호에 '-' 추가
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    },
    validateNumericInput(field) {
      // 입력값이 숫자가 아니면 초기값으로 되돌립니다.
      if (!/^\d+$/.test(this.user[field])) {
        this.user[field] = this.initialTelData[field];
      }
    },
    resetInputStyles() {
      // Reset the styles of the input fields when exiting edit mode
      const inputFields = document.querySelectorAll('input[type="text"]');
      inputFields.forEach((input) => {
        input.style.backgroundColor = ''; // Reset background color
        input.style.border = ''; // Reset border
      });
    },
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
        if (result.data.affectedRows === 1) {
          // 수정 성공 시 처리
          console.log('회원 정보 수정이 완료되었습니다.');
          alert('회원 정보 수정이 완료되었습니다.')
          // 수정 후 마이 페이지로 이동
          this.$router.push('/main');
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
    
    toggleEditMode(section) {
  if (section === 'name') {
    this.isEditingName = !this.isEditingName;
  } else if (section === 'tel') {
    this.isEditingTel = !this.isEditingTel;
    if (this.isEditingTel) {
      const telWithoutDash = this.user.user_tel.replace(/-/g, '');
      this.user.user_tel_first = telWithoutDash.substring(0, 3);
      this.user.user_tel_second = telWithoutDash.substring(3, 7);
      this.user.user_tel_third = telWithoutDash.substring(7, 11);
      // 추가: 초기 전화번호 데이터 저장
      this.initialTelData = {
        user_tel_first: this.user.user_tel_first,
      };
    } else {
      this.user.user_tel = `${this.user.user_tel_first}${this.user.user_tel_second}${this.user.user_tel_third}`;
    }
  } 
},
  },
  created() {
    this.loadUserData();
    // 추가: 전화번호 수정 모드에서 초기 데이터가 있으면 select 초기값 설정
    if (this.isEditingTel && this.initialTelData.user_tel_first) {
      this.user.user_tel_first = this.initialTelData.user_tel_first;
    }
  }
}
</script>
<style scoped>
.isEditingTel{
  width: 250px;
}
.isEditingTel input{
  width: 50px;
}
</style>