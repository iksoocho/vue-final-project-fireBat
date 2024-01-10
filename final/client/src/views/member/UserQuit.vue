<template>
  <div class="container">
    <h1
      style="
        height: 100px;
        line-height: 100px;
        font-family: 'Noto Sans KR';
        font-size: 24px;
        color: #333;
        font-weight: 700;
      "
    >
      회원탈퇴
    </h1>
    <div class="containerOne">
      <div class="containerTwo">
        <h3
          style="
            display: block;
            margin: 0;
            padding: 0;
            position: relative;
            padding-bottom: 44px;
            min-height: 36px;
            text-align: left;
            line-height: 36px;
            font-weight: bold;
          "
        >
          아래 내용을 꼭 확인해 주세요.
        </h3>
        <div class="containerThree">
          <dt>회원정보 및 계좌내역 삭제</dt>
          <p
            style="
              padding: 2px 0 1px 0;
              line-height: 18px;
              color: #ff6666;
              font-size: 12px;
            "
          >
            회원탈퇴 즉시 회원정보는 모두 삭제되며, 재가입시에도 복원되지
            않습니다
          </p>
          <li>
            삭제되는 정보 : 구매하신 eBook, 개인정보, 계좌내역(YES포인트,
            YES머니, 예치금 등), YES블로그 계정, 예스24 중고샵 판매관리 계정
          </li>
          <li>
            회원탈퇴 시 중고샵 판매계정 및 판매자회원 자격이 자동으로
            상실됩니다.(주문/정산 중에는 탈퇴불가)
          </li>
          <li>회원탈퇴 시 중고매장에서 회원으로 서비스 이용이 불가합니다.</li>
          <li>
            회원탈퇴 시 구매하신 eBook도 모두 삭제됩니다. 회원탈퇴 후 타 ID로
            사용 권한을 양도하실 수 없습니다.
          </li>
          <li>
            탈퇴 후 블로그 및 블로그와 연결된 이용기록(ex.상품리뷰)은 모두
            삭제되며, 삭제된 데이터는 복구되지 않습니다
          </li>
          <li>게시판형 서비스에 등록한 게시물은 삭제되지 않고 유지됩니다.</li>
          <hr />
          <dt>1개월간 회원 재가입 제한</dt>
          <p
            style="
              padding: 2px 0 1px 0;
              line-height: 18px;
              color: #666;
              font-size: 12px;
            "
          >
            회원탈퇴 후, 1개월간은 회원 재가입이 불가능합니다.
          </p>
          <hr />
          <dt>탈퇴 후 정보보관</dt>
          <p
            style="
              padding: 2px 0 1px 0;
              line-height: 18px;
              color: #666;
              font-size: 12px;
            "
          >
            전자상거래 등에서의 소비자보호에 관한 법률 제6조에 의거 성명, 주소
            등 거래의 주체를 식별할 수 있는 정보에 한하여 서비스 이용에 관한
            동의를 철회한 경우에도 이를 보존할 수 있으며, 동법 시행령 제6조에
            의거 다음과 같이 거래 기록을 보관합니다.
          </p>
          <li>표시, 광고에 관한 기록 : 6개월</li>
          <li>계약 또는 청약철회 등에 관한 기록 : 5년</li>
          <li>대금결제 및 재화등의 공급에 관한 기록 : 5년</li>
          <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</li>
        </div>
        <div class="containerFour">
          <p
            style="
              padding-bottom: 18px;
              line-height: 1.3em;
              color: #333;
              font-weight: bold;
              font-size: 16px;
              letter-spacing: -1px;
            "
          >
            정확한 본인확인을 위해 비밀번호를 입력해 주세요.
          </p>
          <div class="containerFive">
            <div class="containerSix">
              <input type="text" /><br />
              <input type="password" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style scoped>
.container {
  margin: 0 auto;
  text-align: center;
}
.containerOne {
  padding-top: 50px;
  width: 960px;
  height: 1000px;
  border: solid 1px #d8d8d8;
  text-align: center;
  margin: 0 auto;
  background-color: #fff;
}
.containerTwo {
  margin: 0 auto;
  position: relative;
  width: 760px;
  text-align: left;
}
.containerThree {
  position: relative;
  padding: 20px 20px;
  border: solid 1px #ebebeb;
  background-color: #f8f8f8;
}
.containerFour {
  padding: 37px 0 0;
  text-align: center;
  border-top: solid 1px #ebebeb;
}
.containerFive {
  position: relative;
  padding: 20px 0;
  border: solid 1px #ebebeb;
  background-color: #f8f8f8;
  width: 500px;
  height: 132px;
  margin: 0 auto;
}
.containerSix {
  margin: 0 20px;
}
li {
  padding: 2px 0 1px 7px !important;
  line-height: 18px !important;
  text-indent: -7px !important;
  color: #666;
  font-size: 12px;
  border: none !important;
  text-align: left;
}
dt {
  padding-bottom: 2px;
  line-height: 1.6em;
  font-size: 13px;
  color: #333;
  font-weight: bold;
  padding-bottom: 10px;
  font-size: 16px;
}
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
input {
  padding: 4px 11px 6px;
  width: 458px;
  height: 40px;
  line-height: 28px;
  box-sizing: border-box;
  position: relative;
  border: solid 1px #ebebeb;
  border-top-color: #d8d8d8;
  border-left-color: #d8d8d8;
  border-radius: 3px;
  background-color: #fff;
}
</style>
