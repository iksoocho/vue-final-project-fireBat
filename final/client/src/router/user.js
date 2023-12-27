import main from "../views/Main.vue";
import festivalList from "../views/festival/festivalList.vue"
import payment from "../components/order/orderForm.vue";
import paySuccess from "../components/order/orderSuccess.vue";
import UserInsert from '../views/member/userInsert.vue';

import festivalInfo from '../views/festival/FestivalInfo.vue';

import festivalInsert from "../views/festival/festivalInsert.vue";
import userMain from '../views/Usermain.vue'


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
        path: '/userInsert',
        name: 'userInsert',
        component: UserInsert,
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
        name: "FestivalInfo",
        component: festivalInfo
      },
      {
        path: "festivalInsert",
        name: "festivalInsert",
        component: festivalInsert
      }
    ],
  }
    

  
