<template>
	
  <div id="show">
    <div class="page-title">
        <h3 class="text-center">QnA</h3>
    </div>
	
		<table id="writetable" >
			
				<tr><td class="title"><p>작성자</p></td><td><span>{{ this.$store.getters.userName }}</span></td></tr>
				<tr><td class="title"><p>카테고리</p></td><td><select id="select" name="category" v-model="qnaInfo.qna_category">
							<option value="1">배송 문의</option>
							<option value="2">축제 문의</option>
							<option value="3">기타 문의</option>
						</select></td></tr>
				<tr><td class="title"><p>제목</p></td><td><input v-model="qnaInfo.qna_title" type="text" id="title" name="title" required 
					></td></tr>
				<tr><td class="title"><p>첨부</p></td><td><input type="file" id="avatar" name="file"></td></tr>
				<tr><td colspan="2" id="textarea"><textarea id="textarea2" cols="130" rows="15" name="content" v-model="qnaInfo.qna_content"></textarea></td></tr>
				
		</table>
		<div style="text-align: center;">
					<button type="button" class="btn btn-outline-danger me-2 mt-2" @click="insertInfo">작성</button>
					<button type="reset" class="btn btn-danger mt-2">취소</button>
				</div>
		
		
	</div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2';

export default {
	data(){
		return {
			qnaInfo:{
				qna_title:'',
				qna_content:'',
				user_no:0,
				qna_category:0,
			},
			userNo:0
		}
	},
	created(){
		
		this.getUserNo();
		
		console.log('user_no : ',this.userNo)
		// this.qnaInfo.user_no = this.userNo;
		
	},
	methods:{
		getToday(){
            let today = new Date();
            let year = today.getFullYear();
            let month = ('0'+(today.getMonth()+1)).slice(-2);
            let day = ('0'+(today.getDate())).slice(-2);
            
            return `${year}-${month}-${day}`
        },
		async insertInfo(){
			let info = this.qnaInfo;  
         	 info.user_no = this.userNo;
            if(!this.validation()) return;       //아예 아래 전체를 감싸도 됨

            let data = {
                param : this.qnaInfo                    //"param" : 형태로 보내야됨
            };
            
            let result = await axios(`/api/qna`,  {              //axios.post(경로,  data)도 가능하지만 초보일땐 왼쪽처럼 하자
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : JSON.stringify(data)
            })
            .catch(err=>console.log(err))    

            console.log(result.data);    
            if(result.data.message == ''){
                Swal.fire(`정상적으로 등록 되었습니다.`)
                this.$router.push({ path: '/qnaList' });
            }else{
                Swal.fire(`등록 실패.`)
                

            }

        },
		validation(){
            if(this.qnaInfo.qna_title == ''){
                alert('사원번호가 입력되지 않았습니다.')
                return false;
            }
            if(this.qnaInfo.qna_content== ''){
                alert('부서가 입력되지 않았습니다.')
                return false;
            }

            return true;
        },
		async getUserNo(){
             this.userNo = ((await axios.get(`/api/qna/userNo/${this.$store.getters.userName}`).catch(err=>console.log(err))).data).user_no
			 console.log(this.userNo)
			return this.userNo;
			
        }
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