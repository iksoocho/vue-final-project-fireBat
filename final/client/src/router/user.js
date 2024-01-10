import main from "../views/Main.vue";
import festivalList from "../views/festival/festivalList.vue"
import Cart from "../views/order/cartForm.vue"
import payment from "../views/order/orderForm.vue";
import paySuccess from "../views/order/orderSuccess.vue";
import Login from "../views/member/Login.vue";
import UserInsert from '../views/member/userInsert.vue';
import SignUpComplete from '../views/member/SignUpComplete.vue'
import userMain from '../views/Usermain.vue'
import festivalInfo from '../views/festival/festivalInfo.vue';
import festivalCalender from '../views/festival/festivalCalender.vue';
import userProductList from '../views/product/userProductList.vue';
import userProductInfo from '../views/product/userProductInfo.vue';
import qnaList from '../views/qna/qnaList.vue'
import qnaProductInsert from '../views/qna/qnaProductInsert.vue'
import qnaInsert from '../views/qna/qnaInsert.vue'
import qnaInfo from '../views/qna/qnaInfo.vue';
import qnaUpdate from '../views/qna/qnaUpdate.vue';
import noticeList from '../views/notice/noticeList.vue';
import noticeInfo from '../views/notice/noticeInfo.vue';
import noticeInsert from '../views/notice/noticeInsert.vue';
import noticeUpdate from '../views/notice/noticeUpdate.vue';
import UserUpdate from '../views/member/UserUpdate.vue'; // 회원정보수정
import MyPage from '../views/member/MyPage.vue'; // 마이페이지
import UserCheck from '../views/member/UserCheck.vue'; // 회원정보 수정 전 비밀번호 확인
import orderList from '../views/member/orderPage.vue';
import EmailVerification from '../views/member/EmailVerification.vue'; // 이메일 인증 
import UserQuit from '../views/member/UserQuit.vue';
import PwFind from '../views/member/PwFind';
import ReviewInsert from '../views/review/reviewInsert.vue'
import EmailCheck from '../views/member/EmailCheck.vue'




export default {
    path: "/",
    name: "main",
    component: main,
  
    children: [
      {
        path: '/main',
        name: 'usermMain',
        component: userMain,
      },
      {
        path: '/emailVerification',
        name: 'emailVerification',
        component: EmailVerification
      },
      // 회원가입
      {
        path: '/userInsert',
        name: 'userInsert',
        component: UserInsert,
      },
      // 회원가입 완료
      {
        path: '/signUpComplete',
        name: 'signUpComplete',
        component: SignUpComplete,
      },
      // 로그인
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      // 회원정보수정
      {
        path: '/userUpdate',
        name: 'userUpdate',
        component: UserUpdate,
      },
      // 회원정보 수정 버튼 클릭시 비밀번호 확인
      {
        path: '/userCheck',
        name: 'userCheck',
        component: UserCheck,
      },
      // 마이페이지
      {
        path: '/myPage',
        name: 'myPage',
        component: MyPage,
      },
      // 회원탈퇴
      {
        path: '/userQuit',
        name: 'userQuit',
        component: UserQuit
      },
      // 비밀번호 찾기
      {
        path: '/pwFind',
        name: '/pwFind',
        component: PwFind
      },
      // 이메일 인증
      {
        path: '/emailCheck',
        name: 'emailCheck',
        component: EmailCheck,
      },
      {
        path: '/cart',
        name: 'cart',
        component: Cart,
      },
      {
        path: "/payment",
        name: "payment",
        component: payment,
      },
      {
        path: "/paySuccess",
        name: "paySuccess",
        component: paySuccess,
      },
      {
        path: "/festivalList",
        name: "festivalList",
        component: festivalList
      },
      {
        path: "/festivalInfo",
        name: "festivalInfo",
        component: festivalInfo
      },
      {
        path: "/festivalCalender",
        name: "festivalCalender",
        component: festivalCalender
      },
      {
        path: '/userProductList',
        name: 'userProductList',
        component: userProductList
      },
      {
        path: '/userProductInfo',
        name: 'userProductInfo',
        component: userProductInfo
      },
      {
        path: '/qnaList',
        name: 'qnaList',
        component: qnaList
      },
      {
        path: '/qnaProductInsert',
        name: 'qnaProductInsert',
        component: qnaProductInsert
      },
      {
        path: '/qnaInsert',
        name: 'qnaInsert',
        component: qnaInsert
      },
      {
        path: '/qnaInfo',
        name: 'qnaInfo',
        component: qnaInfo
      },
      {
        path: '/qnaUpdate',
        name: 'qnaUpdate',
        component: qnaUpdate
      },
      {
        path: '/noticeList',
        name: 'noticeList',
        component:  noticeList
      },
      {
        path: '/noticeInfo',
        name: 'noticeInfo',
        component: noticeInfo
      },
      {
        path: '/noticeInsert',
        name: 'noticeInsert',
        component: noticeInsert
      },
      {
        path: '/noticeUpdate',
        name: 'noticeUpdate',
        component: noticeUpdate
      },
      {
        path: '/orderList',
        name: 'orderList',
        component: orderList
      },
      {
        path: '/ReviewInsert',
        name: 'ReviewInsert',
        component: ReviewInsert
      }
    ],
  }
    

  
