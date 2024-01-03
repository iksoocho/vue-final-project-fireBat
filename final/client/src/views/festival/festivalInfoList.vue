<template>
    <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>축제코드</th>
                    <th>카테고리</th>
                    <th>지역</th>
                    <th>축제이름</th>
                    <th>전화번호</th>
                    <th>축제일정</th>
                    <th>금액</th>
                    <th>홈페이지</th>
                    <th>상세주소</th>
                </tr>
            </thead>
            <tbody>
            <tr :key="i" v-for="(fes, i) in festivalList" @click="goToUpdate(fes.f_code)">
                <td>{{ fes.f_code }}</td>
                <td>{{ fes.f_category }}</td>
                <td>{{ fes.f_reg }}</td>
                <td>{{ fes.f_name}}</td>
                <td>{{ fes.f_number}}</td>
                <td>{{ getDateFormat(fes.f_firstday) }} ~ {{ getDateFormat(fes.f_lastday) }}</td>
                <td>{{ fes.f_price}}</td>
                <td>{{ fes.f_url}}</td>
                <div class="row">
                    <!-- <button class="btn btn-info" v-on:click="goToUpdate(fes.f_code)">수정</button> -->
                    <button class="btn btn-warning" @click="fesDelete(fes.f_code)">X</button>
                </div>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            festivalList : [],
        }
    },
    created(){
        this.getFestivalList(); 
    },
    methods : {
        async getFestivalList(){
            this.festivalList = (await axios.get('/api/festival')
                                .catch(err => console.log(err))).data; 
        },
        getDateFormat(date){
            return this.$dateFormat(date);   // 날짜 변환
        },
        goToUpdate(f_code) {
            this.$router.push({path : '/festivalUpdate', query:{f_code : f_code}})
        },
        goFesInfo(f_code){
            this.$router.push({path : '/festivalInfo', query:{f_code : f_code}})
        },
        goFesInfoList(f_code){
            this.$router.push({path : '/festivalInfoList', query:{f_code : f_code}})
        },
        async fesDelete(f_code){
            let result = await axios.delete(`/api/festival/delete/${f_code}`)
                                    .catch(err=>console.log(err));
            console.log(result.data);
            let count = result.data.affectedRows;   
            if(count == 0){
                alert('정상적으로 삭제되지 않았습니다.')
            }else{
                alert('정상적으로 삭제 되었습니다.')
                this.$router.push({name : 'festivalList'});
            }
        },

    }
}
</script>


