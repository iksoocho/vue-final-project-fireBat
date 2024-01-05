<template>
    <div>
        <h2 id="flist">축제목록</h2>
        <br>
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
                    <th>삭제</th>
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
        <div id="fapp">
            <!-- Search input and button -->
            <input type="text" v-model="word" @input="onSearchInput" @keyup.enter="fesSearch" placeholder="축제 이름을 검색하세요">
            <button @click="search">검색</button>
            <br>
            <br>
            <button><a href="festivalList">리스트로</a></button>
        </div>    
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
    data(){
        return {
            festivalList : [],
            word: '',
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
        async getFestivalList() {
            this.festivalList = (await axios.get('/api/festival').catch((err) => console.log(err))).data;
        },
        async fesSearch() {
            if (this.word.trim() === '') {
                // If the search text is empty, reset the festivalList to the original list
                this.getFestivalList();
            } else {
                // Otherwise, perform the search
                this.festivalList = (await axios.get(`/api/festival/search/${this.word.trim()}`)).data;
            }
            console.log(this.festivalList);
        },
        onSearchInput() {
            // Reset the festivalList when the search input is cleared
            if (this.word.trim() === '') {
                this.getFestivalList();
            }
        },
        getDateFormat(date){
            return this.$dateFormat(date);   // 날짜 변환
        },
        async goToUpdate(f_code) {
            let response = await axios.delete(`/api/festival/deleteImg/${f_code}`)
                                .catch(err=>console.log(err));
                                
            this.$router.push({path : '/festivalUpdate', query:{f_code : f_code}})
        },
        goFesInfo(f_code){
            this.$router.push({path : '/festivalInfo', query:{f_code : f_code}})
        },
        goFesInfoList(f_code){
            this.$router.push({path : '/festivalInfoList', query:{f_code : f_code}})
        },
        async fesDelete(f_code){
            let response =await axios.delete(`/api/festival/deleteImg/${f_code}`)
                                .catch(err=>console.log(err));
            let count2 = response.data.affectedRows;


            let result = await axios.delete(`/api/festival/delete/${f_code}`)
                                    .catch(err=>console.log(err));
            console.log(result.data);
            let count = result.data.affectedRows;   

            
            if((count+count2) == 0){
                Swal.fire({
                    icon: 'warning',
                    title: '삭제실패!',
                    confirmButtonText: '확인',
                })
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: '삭제성공!!',
                    confirmButtonText: '확인',
                })
                this.$router.push({name : 'festivalInfoList'});
            }
        },
    }
}
</script>

<style>
#flist{
    text-align: center;
}
#fapp{
    text-align: center;
}
</style>