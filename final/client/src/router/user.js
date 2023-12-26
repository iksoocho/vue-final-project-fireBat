import main from '../views/Main.vue';
import UserInsert from '../views/member/userInsert.vue';
export default {
  path: '/',
  name: 'main',
  component: main,
  children: [
    {
      path: 'userInsert',
      name: 'userInsert',
      component: UserInsert,
    },
  ],
};
