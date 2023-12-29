import main from "../views/Main.vue";
import festivalList from "../views/festival/festivalList.vue"
import payment from "../views/order/orderForm.vue";
import paySuccess from "../views/order/orderSuccess.vue";
import UserInsert from '../views/member/userInsert.vue';
import festivalUpdate from '../views/festival/festivalUpdate.vue';
import festivalInsert from "../views/festival/festivalInsert.vue";
import userMain from '../views/Usermain.vue'
import festivalInfo from '../views/festival/festivalInfo.vue';
import festivalCalender from '../views/festival/festivalCalender.vue';


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
      }
    ],
  }
    

  
