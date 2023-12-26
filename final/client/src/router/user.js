import main from "../views/Main.vue";
import payment from "../components/order/orderForm.vue";
import paySuccess from "../components/order/orderSuccess.vue";
import UserInsert from '../views/member/userInsert.vue';
export default {
    path: "/",
    name: "main",
    component: main,
    children: [
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
      }
    ],
    

  }
