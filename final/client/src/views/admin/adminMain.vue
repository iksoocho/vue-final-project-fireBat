<template>
  <div id="container" class="flex-container">
    <div class="table-header mt-2">통계 차트</div>
    <div class="chart-container">
      <div id="piechart" class="chart w-50"></div>
      <div id="BarChart" class="chart w-50"></div>
    </div>

    <div class="app">
      <div class="table-header">판매상품 순위 내역</div>
      <div class="my-1 mx-3 d-flex flex-row-reverse"></div>
      <table>
        <thead>
          <tr>
            <th>상품번호</th>
            <th>상품이름</th>
            <th>상품가격</th>
            <th>상품지역</th>
            <th>상품분류</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="i" v-for="(prod, i) in productList">
            <td>{{ prod.prod_code }}</td>
            <td>{{ prod.prod_name }}</td>
            <td>{{ prod.prod_price }}</td>
            <td>{{ prod.prod_loc }}</td>
            <td>{{ prod.prod_cate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      productChart: [],
      productList: [],
    };
  },
  created() {
    const snedObject = {
      period: 2,
      minPrice: 0,
      maxPrice: 0,
    };
    this.getProductChart(snedObject);
    this.getProductList();
  },
  methods: {
    async getProductList() {
      this.productList = (
        await axios
          .get(`/api/product/adminList`)
          .catch((err) => console.log(err))
      ).data;
    },
    async getProductChart(obj) {
      console.log(obj);
      let result = "";
      const prodNo = 1;

      try {
        result = await axios.get(
          `/api/product/chart/${prodNo}/${obj.period}/${obj.minPrice}/${obj.maxPrice}`
        );
        console.log(result);
      } catch (e) {
        console.log(e);
      }
      this.productChart = result.data;

      google.charts.load("current", {
        packages: ["corechart"],
      });
      google.charts.setOnLoadCallback(drawChart);

      const myThis = this;

      function drawChart() {
        let table = [];
        table.push(["상품", "판매량"]);

        for (let i = 0; i < myThis.productChart.length; ++i) {
          let row = [];

          row.push(myThis.productChart[i].prod_name);
          row.push(myThis.productChart[i].prod_sell_count);

          table.push(row);
        }
        var data = google.visualization.arrayToDataTable(table);
        var options = {
          title: "상품 판매량",
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(
          document.getElementById("piechart")
        );
        chart.draw(data, options);
      }
      google.charts.load("current", {
        packages: ["corechart"],
      });
      google.charts.setOnLoadCallback(drawChart1);

      function drawChart1() {
        let table = [];
        table.push(["상품", "판매액"]);
        console.log("test" + myThis.productChart);

        for (let i = 0; i < myThis.productChart.length; ++i) {
          let row = [];
          row.push(myThis.productChart[i].prod_name);
          row.push(myThis.productChart[i].prod_price);

          table.push(row);
        }

        var data = google.visualization.arrayToDataTable(table);

        var options = {
          title: "상품 판매량액",
          colors: ["#5b83b5", ""],
        };

        var chart = new google.visualization.BarChart(
          document.getElementById("BarChart")
        );
        chart.draw(data, options);
      }
    },
  },
};
</script>

<style scoped>
.table-header {
  background-color: #ffa5a5;
  color: rgb(255, 255, 255);
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 5px;
  margin-left: 5px;
  font-weight: bold;
  font-size: 18px;
  text-shadow: -1px 0px rgb(0, 0, 0), 0px 1px rgb(0, 0, 0), 1px 0px rgb(0, 0, 0),
    0px -1px rgb(0, 0, 0);
}

table {
  border-collapse: collapse;
  width: 100%;
  border: 2px solid #000000;
  text-align: center;
  margin-left: 10px;
}

th,
td {
  border-collapse: collapse;
  padding: 8px;
  text-align: center;
  border: 2px solid #000000;
}

th {
  border: 2px solid #000000;
  background-color: #f2f2f2;
}

.flex-container {
  display: flex;
  flex-direction: column;
}

.chart-container {
  display: flex;
  justify-content: space-between;
}

.chart {
  width: 48%;
  /* 차트 너비 조절 */
  height: 500px;
}

.select {
  width: 30px;
  display: block;
  margin-left: 20px;
}
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
}
.app {
  width: 100vw;
  height: 500vh;
  background: hsl(200, 50%, 90%);
}
.navbar {
  height: 60px;
  width: 100vw;
  background: hsl(200, 50%, 50%);
  position: fixed;
  box-shadow: 0 2px 15px rgba(71, 120, 120, 0.5);
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
}
.navbar.navbar--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}
</style>
