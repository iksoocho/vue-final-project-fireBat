<template>
    <div>
      <div id="map"></div>
    </div>

  </template>
  
  <script>
  import { toRaw } from "vue";
  export default {

    name: "festivalCalender",
    data() {
      return {
        markerPositions1: [
      [35.8690295, 128.5932375],
        ],

        markers: [],
        infowindow: null,
      };
    },
    mounted() {
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
        document.head.appendChild(script);
      }
    },
    methods: {
      initMap() {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(35.8690295, 128.5932375),
          level: 5,
        };
  
        this.map = new kakao.maps.Map(container, options);
      },
      changeSize(size) {
        const container = document.getElementById("map");
        container.style.width = `${size}px`;
        container.style.height = `${size}px`;
        toRaw(this.map).relayout();
      },
    },
  }

  </script>
  
  <style scoped>
  #map {
    width: 400px;
    height: 400px;
  }
  
  .button-group {
    margin: 10px 0px;
  }
  
  button {
    margin: 0 3px;
  }
  </style>
  