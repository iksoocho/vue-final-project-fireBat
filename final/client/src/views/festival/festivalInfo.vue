<template>
    <div class="container">
        <div class="row">
            <table class="table">
                <tr>
                    <th class="text-right table-primary">축제코드</th>
                    <td class="text-center">{{ fesInfo.f_code }}</td>
                </tr>
                 <tr>
                    <th class="text-right table-primary">축제카테고리</th>
                    <td class="text-center">{{fesInfo.f_category}}</td>
                </tr>
                 <tr>
                    <th class="text-right table-primary">축제지역</th>
                    <td class="text-center">{{ fesInfo.f_reg }}</td>
                </tr>
                 <tr>
                    <th class="text-right table-primary">축제명</th>
                    <td class="text-center">{{ fesInfo.f_name }}</td>
                </tr>
                 <tr>
                    <th class="text-right table-primary">연락처</th>
                    <td class="text-center">{{ fesInfo.f_number }}</td>
                </tr>
                 <tr>
                    <th class="text-right table-primary">축제장소</th>
                    <td class="text-center">{{ fesInfo.f_loc }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">축제시작일</th>
                    <td class="text-center">{{ fesInfo.f_firstday }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">축제종료일</th>
                    <td class="text-center">{{ fesInfo.f_lastday }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">축제내용</th>
                    <td class="text-center">{{ fesInfo.f_content }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">금액</th>
                    <td class="text-center">{{ fesInfo.f_price }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">공식홈페이지</th>
                    <td class="text-center">{{ fesInfo.f_url }}</td>
                </tr>
             
            </table>
        </div>
        <div class="row">
             <button class="btn btn-info" v-on:click="goFesUpdate(fesInfo.f_code)">수정</button>
            <router-link to="/festivalList" class="btn btn-success">목록</router-link>
            <button class="btn btn-warning" @click="fesDelete(fesInfo.f_code)">삭제</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchNo : '',
            fesInfo: {

            }
        }
    },

    created() {
    this.searchNo = this.$route.query.f_code;   // 페이지요청은 router  페이지가 열릴때는 route
    this.getFesInfo();
   },
    methods : {
        async getFesInfo() {
            let result = await axios.get(`/api/festival/${this.searchNo}`) 
                                .catch(err => console.log(err));
            this.fesInfo = result.data;    // .data 데이터가 보내준 값을 받음
        },
        goFesUpdate(f_code){
                this.$router.push({path : '/festivalUpdate', query:{f_code : f_code}})
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
            }
    }
}

</script>