<template>
   <div class="container">
      <div class="row">
         <div class="col-sm-8" >
            <form>
               <div class="form-group row" >
                  <label for="deli_addr" class="col-sm-3 col-form-label">배송지 선택</label>
                  <div class="col-sm-9">
                     <select class="form-select" id="deli_addr_select" required>
                        <option value="">기본</option>
                        <option>자취방</option>
                     </select>
                     <!-- <input type="text" class="form-control" id="inputPassword" placeholder="배송지를 선택해주세요"> -->
                  </div>
               </div>
               <div class="form-group row">
                  <label for="name" class="col-sm-3 col-form-label">받는 사람</label>
                  <div class="col-sm-9">
                     <input type="text" class="form-control" id="name" placeholder="받는사람" v-model="user.user_name">
                  </div>
               </div>
               <div class="form-group row">
                  <label for="phone" class="col-sm-3 col-form-label">휴대폰 번호</label>
                  <div class="col-sm-9">
                     <div class="row">
                        <div class="col">
                           <select class="form-select" id="phonePrefix" required v-model="f_tel">
                              <option value="010">010</option>
                              <option value="011">011</option>
                           </select>
                        </div>
                        <div class="col">
                           <input type="text" class="form-control" id="middlePhoneNumber" v-model="m_tel">
                        </div>  
                        <div class="col">
                           <input type="text" class="form-control" id="lastPhoneNumber" v-model="l_tel">
                        </div>    
                     </div>
                  </div>
               </div>
               <div class="form-group row">
                  <label for="name" class="col-sm-3 col-form-label">배송지 주소</label>
                  <div class="col-sm-9">
                     <div class="row">
                        <div class="col">
                           <input type="text" class="form-control" id="zip" v-model="user.user_zip" readonly>
                        </div>
                        <div class="col" style="text-align: center;">
                           <button type="button" class="btn btn-secondary btn-sm" @click="showApi" style="width:60px; height:18px; font-size:x-small; display: flex; align-items:center;">주소검색</button>
                        </div>
                     </div>
                     <input type="text" class="form-control" id="addr1" v-model="user.user_addr" readonly>
                     <input type="text" class="form-control" id="addr2" placeholder="상세주소" v-model="user.user_detail_addr">
                  </div>
               </div>
               <div class="form-group row">
                  <label for="deliRequire" class="col-sm-3 col-form-label">배송 요청사항</label>
                  <div class="col-sm-9">
                     <select class="form-select" id="deliRequire" required>
                        <option value="1" selected>배송 전 연락바랍니다</option>
                        <option>부재시 문 앞에 두고 연락주세요</option>
                     </select>
                  </div>
               </div>

               
            </form>
         </div>
         <div class="col-sm-4">
            <ul class="list-group mb-3">
               <li class="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                  <h6 class="my-0">총 상품금액</h6>
                  </div>
                  <span class="text-body-secondary" >{{ prodPrice }}원</span>
               </li>
               <li class="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                  <h6 class="my-0">마일리지</h6>
                  <small class="text-body-secondary">??마일리지 사용가능</small>
                  </div>
                  <span class="text-body-secondary"><input type="number" class="form-control" id="point"></span>
               </li>
               <!-- <li class="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                  <h6 class="my-0">총 할인금액</h6>
                  </div>
                  <span class="text-body-secondary">할인금액</span>
               </li> -->
               <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                  <div class="text-success">
                     <h6 class="my-0">배송비</h6>
                     <small>얼마이상무료?</small>
                  </div>
                  <span class="text-success">2,500원</span>
               </li>
               <li class="list-group-item d-flex justify-content-between">
                  <span>결제예정금액</span>
                  <strong>{{ totalPrice }}원</strong>
               </li>
               <li class="list-group-item d-flex justify-content-between">
                  <span>결제방식</span>
                  <div class="btn-group-vertical">
                  <button :class="{ active: selectedPaymentMethod === 'kakaopay' }" @click="selectPaymentMethod('kakaopay')"><img src='../../image/logo/payment_icon_yellow_small.png' alt="카카오페이" width="100px"></button>
                  <button :class="{ active: selectedPaymentMethod === 'toss' }" @click="selectPaymentMethod('toss')"><img src='../../image/logo/Toss_Logo_Primary.png' alt="토스페이" width="100px" height="47px"></button>
                  <button :class="{ active: selectedPaymentMethod === 'kg' }" @click="selectPaymentMethod('kg')"><img src='../../image/logo/cheque-guarantee-card-2103506_640.png' alt="신용카드" width="40px" height="40px">신용카드</button>
                  </div>
               </li>
               <li>
                  <div class="d-grid gap-2 col-6 mx-auto">
                     <button type="button" class="btn btn-success" @click="openPaymentWindow" :disabled="!selectedPaymentMethod">결제하기</button>
                     <p v-if="paymentUrl">결제창 URL: {{ paymentUrl }}</p>
                     <p v-if="errorMessage">에러 메시지: {{ errorMessage }}</p>
                  </div>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
export default {
name: 'OrderPayment',
data() {
   return {
      selectedPaymentMethod: null,
      paymentUrl: '',
      errorMessage: '',
      zip: '',
      addr1: '',
      addr2: '',
      payData: [],
      payInfo: {
         user_no : '',
         MER_UID : '',
      },
      user: {
         user_no : '',
         user_name: '',
         user_zip: '',
         user_addr: '',
         user_detail_addr: '',
         user_tel:'',
      },
      f_tel : '',
      m_tel : '',
      l_tel : '',
      totalPrice : '',
      prodPrice : '',
      mer_uid : '',
   };
},
methods: {
   selectPaymentMethod(paymentMethod) {
      this.selectedPaymentMethod = paymentMethod;
   },
   async loadUserData() {
      try {
         // 서버에서 사용자 정보를 불러오는 API 호출
         console.log('사용자 정보를 불러오는 중...');
         const response = await axios.get(`/api/user/userUpdate`);
         // 불러온 사용자 정보를 컴포넌트 데이터에 저장
         console.log('서버 응답완료:', response.data);
         this.user = response.data;
         this.f_tel = response.data.user_tel.substr(0,3);
         this.m_tel = response.data.user_tel.substr(3,4);
         this.l_tel = response.data.user_tel.substr(7,4);
         } catch (error) {
         console.error('사용자 정보를 불러오는 데 실패했습니다.', error);
      }
   },
   openPaymentWindow() {
      const iamport = window.IMP;
      iamport.init('imp12332078'); // 아임포트에서 발급받은 가맹점 식별코드 입력

      const paymentInfo = {
         pg: '',
         pay_method: '',
         name: '테스트 상품', // 상품 이름 입력
         merchant_uid: this.mer_uid, // 가맹점에서 생성한 고유 주문번호 입력
         amount: this.totalPrice, // 결제 금액 입력
         buyer_name: this.user.user_name, // 구매자 이름 입력
         buyer_tel: this.user.user_tel, // 구매자 전화번호 입력
         buyer_email: this.user.user_email, // 구매자 이메일 입력
         buyer_postcode: '',
         buyer_addr: this.user.user_zip + this.user.user_addr + this.user.user_detail_addr,
         // 기타 필요한 결제 정보 입력
      };

      if (this.selectedPaymentMethod === 'kakaopay') {
         // 카카오페이 결제창 열기
         paymentInfo.pg = 'kakaopay';
         paymentInfo.pay_method = 'card';
      } else if (this.selectedPaymentMethod === 'toss') {
         // 토스페이 결제창 열기
         paymentInfo.pg = 'tosspay';
         paymentInfo.pay_method = 'card';
      } else if (this.selectedPaymentMethod === 'kg') {
         // 이니시스 결제창 열기
         paymentInfo.pg = 'html5_inicis';
         paymentInfo.pay_method = 'card';
      }

      iamport.request_pay(paymentInfo, (resp) => {
         // 결제 완료 후 처리할 로직 작성
         console.log(resp);
         if (resp.success) {
            payData = resp;
            let msg = '결제가 완료되었습니다.';
            alert(msg);

            // console.log('paydata');
            console.log(payData);

            // location.href = "/paySuccess"
         } else {
            let msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + resp.error_msg;
            alert(msg);
         }
      });
   },
   paymentInfoInsert() {
      
   },
   showApi() {
      new window.daum.Postcode({
         oncomplete: (data) => {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            let extraRoadAddr = ''; // 도로명 조합형 주소 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
               extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
               extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            if(fullRoadAddr !== ''){
               fullRoadAddr += extraRoadAddr;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            this.zip = data.zonecode; //5자리 새우편번호 사용
            this.addr1 = fullRoadAddr;
            console.log(this.zip, this.addr1);
         }
      }).open()
   }
},
created() {
   // 사용자 정보를 서버에서 가져오는 로직을 created 훅에서 실행
   this.loadUserData();
   this.prodPrice = parseInt(this.$route.query.totalPrice);
   this.totalPrice = this.prodPrice + 2500;
   this.mer_uid = new Date().valueOf();
   console.log('mer_uid : ', this.mer_uid);
}
};
</script>

<style scoped>
button {
border : none;

}

button.active {
background-color: rgb(185, 185, 241);
}

button:disabled {
background-color: rgb(174, 114, 230);
}

</style>