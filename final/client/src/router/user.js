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
import MyPage from '../views/member/MyPage.vue'; // 마이페이지 홈




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
      {
        path: '/myPage',
        name: 'myPage',
        component: MyPage,
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
    ],
  }
    

  
