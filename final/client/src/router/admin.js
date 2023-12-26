import adminForm from '../views/Admin.vue';
//import adminForm from '../views/admin/adminForm.vue';
import adminUserList from '../views/admin/adminUserList.vue';
import productInsert from '../views/admin/productInsert.vue';
import productList from '../views/admin/productList.vue';

export default {
    path: '/adminForm',
    name: 'adminForm',
    component: adminForm,
    children: [
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
      }
    ],
  }