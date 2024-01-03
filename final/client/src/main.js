import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mixins from "./mixins";
import store from "./store";


createApp(App)
.use(router)
.use(store)

.mixin(mixins)
.mount("#app");

window.Kakao.init("b0de269b3f93c479cab8875d0a67caf4"); // 카카오에서 발급받은 키