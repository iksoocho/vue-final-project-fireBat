<template>
 <div id="delivery" class="container">
    <h3>배송정보</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>주문번호</th>
                <th>이름</th>
                <th>송장번호</th>
                <th>배송시작일</th>
                <th>배송종료일</th>
                <th>배송메세지</th>
                <th>수령인주소</th>
                <th>배송상태</th>
            </tr>
        </thead>
        <tbody>
            <tr :key="i" v-for="(del, i) in deliveryInformationList">
              <th>{{del.order_no}}</th>
              <th>{{del.user_name}}</th>
              <th>{{}}</th>
              <th>{{}}</th>
              <th>{{}}</th>
              <th>{{}}</th>
              <th>{{}}</th>
              <th>{{}}</th>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container{
  padding : 30px;
  
}
</style>