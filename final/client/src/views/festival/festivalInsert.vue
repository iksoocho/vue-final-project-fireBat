<template>
    <div class="row mt-5">
    <div class="col-12">
        <table class="table table-light">
            <thead class="thead-light">
                <tr>
                    <th space="col">축제코드</th>
                    <th space="col">축제명</th>
                    <th space="col">축제카테고리</th>
                    <th space="col">축제지역</th>
                    <th space="col">축제이름</th>
                    <th space="col">축제연락처</th>
                    <th space="col">축제장소</th>
                    <th space="col">축제시작일</th>
                    <th space="col">축제종료일</th>
                    <th space="col">축제설명</th>
                    <th space="col">축제금액</th>
                    <th space="col">축제공식페이지</th>
                    <th space="col">이미지</th>
                </tr>
            </thead>
        </table>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return{
            festivalInsert : [],
        }
    },
    created() {
        this.getFestivalInsert();
    },
    methods : {
        async getFestivalInsert() {
            this.festivalInsert = (await axios.get('/api/festival')
                                .catch(err => console.log(err))).data;
        }
    } 
}
</script>

<style>

</style>