import adminForm from '../views/Admin.vue';
import adminMain from '../views/admin/adminMain.vue';
import adminUserList from '../views/admin/adminUserList.vue';
import productInsert from '../views/admin/productInsert.vue';
import productList from '../views/admin/productList.vue';
import productInfo from '../views/admin/productInfo.vue';
import prodUpdate from '../views/admin/productUpdate.vue';
import deliveryInformation from '../views/admin/deliveryInformation.vue';
import deliveryList from '../views/admin/deliveryList.vue';
import festivalInfoList from '../views/festival/festivalInfoList.vue';
import festivalInsert from '../views/festival/festivalInsert.vue';
import festivalUpdate from '../views/festival/festivalUpdate.vue';


export default {
    path: '/adminForm',
    name: 'adminForm',
    component: adminForm,
    children: [
      {
        path: '/adminMain',
        name: 'adminMain',
        component : adminMain
      },
      {
        path: '/adminUserList',
        name: 'adminUserList',
        component: adminUserList
      },
      {
        path: '/productInsert',
        name: 'productInsert',
        component: productInsert
      },
      {
        path: '/productList',
        name: 'productList',
        component: productList
      },
      {
        path: '/productInfo',
        name: 'productInfo',
        component: productInfo
      },
      {
        path: '/productUpdate',
        name: 'productUpdate',
        component: prodUpdate
      },
      {
        path: '/deliveryInformation',
        name: 'deliveryInformation',
        component: deliveryInformation
      },
      {
        path: '/deliveryList',
        name: 'deliveryList',
        component: deliveryList
      },
      {
        path: '/festivalInfoList',
        name: 'festivalInfoList',
        component: festivalInfoList
      },
      {
        path: "/festivalInsert",
        name: "festivalInsert",
        component: festivalInsert
      },
      {
        path: "/festivalUpdate",
        name: "festivalUpdate",
        component: festivalUpdate
      },
    ],
  }