<template>
    <div class="container">
    <form>
        <label for="code">축제코드</label>
        <input type="text" v-model="fesInfo.f_code">
        <br>
        <label for="name">축제명</label>
        <input type="text" v-model="fesInfo.f_name">
        <br>
        <label for="cate">카테고리</label>
        <br>
            <select name="cate" v-model="fesInfo.f_category">
                <option value="문화">문화</option>
                <option value="커플">커플</option>
                <option value="예술">예술</option>
                <option value="관광">관광</option>
                <option value="불빛">불빛</option>
            </select>
        <br>
        <br>
        <label for="reg">축제지역</label>
        <input type="text" v-model="fesInfo.f_reg">
        <br>
        <label for="number">축제연락처</label>
        <input type="text" v-model="fesInfo.f_number">
        <br>
        <label for="loc">축제장소</label>
        <input type="text" v-model="fesInfo.f_loc">
        <br>
        <label for="fday">축제시작일</label>
        <input type="date" v-model="fesInfo.f_firstday">
        <br>
        <label for="lday">축제종료일</label>
        <input type="date" v-model="fesInfo.f_lastday">
        <br>
        <label for="con">축제내용</label>
        <textarea cols="40" v-model="fesInfo.f_content"/>
        <br>
        <label for="price">축제금액</label>
        <input type="text" id="count" v-model="fesInfo.f_price">
        <br>
        <label for="page">공식홈페이지</label>
        <input type="url" v-model="fesInfo.f_url">
        <br>
        <br>
        <button v-on:click="insertInfo">등록</button>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
    return {
    fesInfo: {
        f_code: '',
        f_category: '',
        f_reg: '',
        f_name: '',
        f_number: '',
        f_loc: '',
        f_firstday: '',
        f_lastday: '',
        f_content: '',
        f_price: '',
        f_url: '',
    },
    };
},
methods: {
    async insertInfo() {
    let data = {
        param: this.fesInfo,
    };
    let result = await axios(`/api/festival/insert`, {
        method: 'post',
        headers: {
        'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    }).catch((err) => console.log(err));

    console.log(result.data);
    if(f_code == ''){
        alert('등록을 실패했습니다.')
    } else {
        alert('축제 등록이 되었습니다.')
    }
    },
},
    }
</script>

<style>

</style>