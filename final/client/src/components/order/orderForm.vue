<template>
   <div class="container">
      <div class="row">
         <div class="col" >
            <form>
               <div class="form-group row" >
                  <label for="inputPassword" class="col-sm-2 col-form-label">배송지 선택</label>
                  <div class="col-sm-10">
                     <select class="form-select" id="deli_addr" required>
                        <option value="">기본</option>
                        <option>자취방</option>
                     </select>
                     <!-- <input type="text" class="form-control" id="inputPassword" placeholder="배송지를 선택해주세요"> -->
                  </div>
               </div>
               <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">받는 사람</label>
                  <div class="col-sm-10">
                     <input type="text" class="form-control" id="name" placeholder="받는사람">
                  </div>
               </div>
               <div class="form-group row">
                  <label for="state" class="col-sm-2 col-form-label">휴대폰 번호</label>
                  <div class="col-sm-10">
                     <div class="row">
                        <div class="col">
                           <select class="form-select" id="phone" required>
                              <option value="">010</option>
                              <option>California</option>
                           </select>
                        </div>
                        <div class="col">
                           <input type="text" class="form-control" id="m_phone">
                        </div>  
                        <div class="col">
                           <input type="text" class="form-control" id="l_phone" placeholder="받는사람">
                        </div>    
                     </div>
                     <button @click="showApi">주소API 호출</button>

                  </div>
               </div>

               <h3>결제정보</h3>
               <button :class="{ active: selectedPaymentMethod === 'kakaopay' }" @click="selectPaymentMethod('kakaopay')" :style="{ backgroundColor: selectedPaymentMethod === 'kakaopay' ? 'yellow' : 'gray' }">카카오페이</button>
               <button :class="{ active: selectedPaymentMethod === 'toss' }" @click="selectPaymentMethod('toss')" :style="{ backgroundColor: selectedPaymentMethod === 'toss' ? 'blue' : 'gray' }">토스페이</button>
               <button :class="{ active: selectedPaymentMethod === 'kg' }" @click="selectPaymentMethod('kg')" :style="{ backgroundColor: selectedPaymentMethod === 'kg' ? 'purple' : 'gray' }">신용카드</button>
               <button @click="openPaymentWindow" :disabled="!selectedPaymentMethod" style="background-color: green;">결제창 열기</button>
               <p v-if="paymentUrl">결제창 URL: {{ paymentUrl }}</p>
               <p v-if="errorMessage">에러 메시지: {{ errorMessage }}</p>
            </form>
         </div>
         <div class="col">
            <ul class="list-group mb-3">
               <li class="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                  <h6 class="my-0">총 상품금액</h6>
                  </div>
                  <span class="text-body-secondary">$12</span>
               </li>
               <li class="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                  <h6 class="my-0">마일리지</h6>
                  <small class="text-body-secondary">??마일리지 사용가능</small>
                  </div>
                  <span class="text-body-secondary"><input type="number" class="form-control" id="point"></span>
               </li>
               <li class="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                  <h6 class="my-0">총 할인금액</h6>
                  </div>
                  <span class="text-body-secondary">할인금액</span>
               </li>
               <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                  <div class="text-success">
                     <h6 class="my-0">배송비</h6>
                     <small>얼마이상무료?</small>
                  </div>
                  <span class="text-success">배송비</span>
               </li>
               <li class="list-group-item d-flex justify-content-between">
                  <span>결제예정금액</span>
                  <strong>결제예정금액</strong>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>

<script>
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
   };
},
methods: {
   selectPaymentMethod(paymentMethod) {
      this.selectedPaymentMethod = paymentMethod;
   },
   openPaymentWindow() {
      const iamport = window.IMP;
      iamport.init('imp12332078'); // 아임포트에서 발급받은 가맹점 식별코드 입력

      const paymentInfo = {
         pg: '',
         pay_method: '',
         name: '테스트 상품', // 상품 이름 입력
         merchant_uid: '111112', // 가맹점에서 생성한 고유 주문번호 입력
         amount: 1000, // 결제 금액 입력
         buyer_name: 'test', // 구매자 이름 입력
         buyer_tel: '010-1111-1111', // 구매자 전화번호 입력
         buyer_email: 'test@email.com', // 구매자 이메일 입력
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

      iamport.request_pay(paymentInfo, (response) => {
         // 결제 완료 후 처리할 로직 작성
         console.log(rsp);
         if (rsp.success) {
            var msg = '결제가 완료되었습니다.';
            alert(msg);
            location.href = "결제 완료 후 이동할 페이지 url"
         } else {
            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
            alert(msg);
         }
      });
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
         }
      }).open()
   }
}
};
</script>

<style>
button {
background-color: gray;
color: white;
padding: 10px;
margin-right: 10px;
}

button.active {
background-color: blue;
}

button:disabled {
background-color: lightgray;
}

.col{
   box-sizing : border-box;
}
</style>