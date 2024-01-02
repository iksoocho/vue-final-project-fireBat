import main from "../views/Main.vue";
import festivalList from "../views/festival/festivalList.vue"
import payment from "../views/order/orderForm.vue";
import paySuccess from "../views/order/orderSuccess.vue";
import UserInsert from '../views/member/userInsert.vue'; // 회원가입
import SignUpComplete from '../views/member/SignUpComplete.vue'; // 회원가입 완료
import Login from '../views/member/Login.vue';
import festivalUpdate from '../views/festival/festivalUpdate.vue';
import festivalInsert from "../views/festival/festivalInsert.vue";
import userMain from '../views/Usermain.vue'
import festivalInfo from '../views/festival/festivalInfo.vue';
import festivalCalender from '../views/festival/festivalCalender.vue';
import userProductList from '../views/product/userProductList.vue';
import userProductInfo from '../views/product/userProductInfo.vue';


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
        path: "festivalInsert",
        name: "festivalInsert",
        component: festivalInsert
      },
      {
        path: "festivalUpdate",
        name: "festivalUpdate",
        component: festivalUpdate
      },
      {
        path: "festivalInfo",
        name: "festivalInfo",
        component: festivalInfo
      },
      {
        path: "festivalCalender",
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
    ],
  }
    

  
