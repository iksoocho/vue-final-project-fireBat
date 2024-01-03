<template>
     <div id="container" class="flex-container">
        
        
        

        <div class="table-header mt-2">통계 차트</div>
        <div class="chart-container">
            <div id="piechart" class="chart w-50"></div>
            <div id="chart_div" class="chart w-50"></div>
        </div>
        <div class="table-header">판매상품 순위 내역</div>
        <div class="my-1 mx-3 d-flex flex-row-reverse">
           
        </div>
        
      <table>
            <thead>
                <tr>
                    <th>테스트</th>
                    <th>테스트</th>
                    <th>테스트</th>
                    <th>테스트</th>
                    <th>테스트</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(product, i) in ProductList">
                    <td>{{i+1}}</td>
                    <td>{{product.product_no}}</td>
                    <td>{{product.product_name}}</td>
                    <td>{{product.product_price}}</td>
                    <td>{{product.product_stock}}</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            productList:[]
        };
    },
    created(){
        const snedObject = {
            period : 2,
            minPrice : 0,
            maxPrice : 0
        }
        this.getProductList(snedObject);
    },
    methods: {
        async getProductList(obj){

            let result = '';
            const prodNo = 1;
            
            try {
                result = await axios.get(`/api/product`);
            } catch (e){
                console.log(e);
            }
            this.ProductList = result.data;
            
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: '방문자 성 비율'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);

      
      
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2020',  1000,      400],
          ['2021',  1170,      460],
          ['2022',  660,       1120],
          ['2023',  1030,      540]
        ]);

        var options = {
          title: '상품 판매량',
          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
      }
    }
  }
    
}
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
        text-shadow: -1px 0px rgb(0, 0, 0), 0px 1px rgb(0, 0, 0), 1px 0px rgb(0, 0, 0), 0px -1px rgb(0, 0, 0);

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
</style>