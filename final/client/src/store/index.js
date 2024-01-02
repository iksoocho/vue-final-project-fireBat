// import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    isLoggedIn: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(user));
    },
    CLEAR_USER(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
  },
  actions: {
    loginUser({ commit }, user) {
      commit('SET_USER', user);
    },
    logoutUser({ commit }) {
      commit('CLEAR_USER');
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    userName: (state) => (state.user ? state.user.user_id : ''),
  },
});

// 초기 로드 시 로그인 상태 확인
if (localStorage.getItem('user')) {
  store.commit('SET_USER', JSON.parse(localStorage.getItem('user')));
}

export default store;