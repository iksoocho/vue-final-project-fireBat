<template>
  <div id="show">
    <div class="page-title">
        <h3 class="text-center">공지사항</h3>
    </div>
	
		<table id="writetable" >
			
				
				
				<tr><td class="title"><p>제목</p></td><td>{{ noticeInfo.notice_title }}</td></tr>
				<tr><td class="title"><p>첨부</p></td><td><input type="file" id="avatar" name="file"></td></tr>
				<tr><td colspan="2" id="textarea"><textarea id="textarea2" cols="130" rows="15" name="content" v-model="noticeInfo.notice_content" readonly></textarea></td></tr>
				
		</table>
		<div style="text-align: center;">
					<button type="button" class="btn btn-outline-danger me-2 mt-2" @click="goUpdate(noticeInfo.notice_no)">수정</button>
					<button type="reset" class="btn btn-danger mt-2" @click="deleteInfo(noticeInfo.notice_no)">삭제</button>
				</div>
		
		
	</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
    data() {       
        return {
            searchNo : '',
            noticeInfo: {
  
            },
        }
    },
    created() {
    this.searchNo = this.$route.query.notice_no;   
    this.getNoticeInfo();
   },
   methods:{
    async getNoticeInfo(){
        let result = await axios.get(`/api/notice/${this.searchNo}`).catch(err=>console.log(err))
        this.noticeInfo = result.data
    },
   
		goUpdate(notice_no){
			this.$router.push({path : '/noticeUpdate', query:{notice_no : notice_no}})
		},
		async deleteInfo(notice_no){
            let result = await axios.delete(`/api/notice/${notice_no}`)
                                    .catch(err=>console.log(err));
            
            let count = result.data.affectedRows;   
            if(count == 0){
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
                this.$router.push({name : 'noticeList'});
            }
        },
   }
}
</script>

<style scoped>
*{
		font-family: 'Gowun Dodum'; 
	}
	#show{
		
		height: 850px;
		margin-bottom: 80px;
        width: 900px;
        margin: 0 auto;
		
	}
	#writetable{
	width: 900px;
	border: 1px;
	border: 1px solid;
	
	}
	.title{
	background-color: #dc3545;
	opacity: 0.89;
    
	
	}
	#textarea{
		margin-top: 10px;
        
	}
	p{
		text-align: center;
		margin: 15px;
		color: #ffffff;
		font-weight: bolder;
	}
	#select{
		margin:10px;
	}
	#title{
		margin:10px;
		width : 700px
	}
	#avatar{
		margin:10px;
	}
	span{
		margin-left: 10px;
	}
    .page-title {
  margin-bottom: 60px;
}
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px; /* Adjust margin as needed */
}
</style>