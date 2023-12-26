import main from "../views/Main.vue";
import festivalList from "../views/festival/FestivalList.vue"
export default {
    path: "/",
    name: "main",
    component: main,

    children: [
      {
        path: "/festivalList",
        name: "FestivalList",
        component: festivalList
      }
    ],
  };