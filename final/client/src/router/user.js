import main from "../views/Main.vue";
import festivalList from "../views/festival/festivalList.vue"
import payment from "../components/order/orderForm.vue";
import paySuccess from "../components/order/orderSuccess.vue";
import UserInsert from '../views/member/userInsert.vue';
import userMain from '../views/Usermain.vue'

export default {
    path: "/",
    name: "main",
    component: main,
  
    children: [
      {
        path: 'main',
        name: 'userMain',
        component: userMain,
      },
      {
        path: 'userInsert',
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
        name: "FestivalList",
        component: festivalList
      }
    ],
  }
    

  
