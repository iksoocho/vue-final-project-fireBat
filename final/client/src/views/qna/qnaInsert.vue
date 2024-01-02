<template>
  <div id="show">
    <div class="page-title">
        
            <h3 class="text-center">QnA</h3>
        
    </div>
	<form >
		<table id="writetable" border="1">
			
				<tr><td class="title"><p>작성자</p></td><td><span>${id}</span></td></tr>
				<tr><td class="title"><p>카테고리</p></td><td><select id="select" name="category">
						<c:if test="${id =='admin'}">
							<option>공지사항</option>
						</c:if>
							<option>자유주제</option>
							<option>Q&A</option>
							<option>이벤트</option>
							<option>기타</option>
						</select></td></tr>
				<tr><td class="title"><p>제목</p></td><td><input type="text" id="title" name="title" required></td></tr>
				<tr><td class="title"><p>첨부</p></td><td><input type="file" id="avatar" name="file"></td></tr>
				<tr><td colspan="2" id="textarea"><textarea id="textarea2" cols="130" rows="15" name="content"></textarea></td></tr>
			
				<input class="witerbtn" type="submit" value="확인" id="okbutton">
		</table>
	</form>
		
		<form action="board.do">
			<input class="witerbtn" type="submit" value="취소" id="notbutton">
		</form>
	</div>
</template>

<script>
export default {

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
	border-left: 0;
	border-right: 0;
	}
	.title{
	background-color: #dc3545;
	opacity: 0.89;
    width:100px;
	
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
		width : 785px
	}
	#avatar{
		margin:10px;
	}
	span{
		margin-left: 10px;
	}
	#okbutton{
		position: relative;
		top: 795px;
		left: -30px;
	}
	#notbutton{
		position: relative;
		top: 51px;
		left:35px;
	}
	.witerbtn{
		border: 1px solid #82ae46;
		outline: none;
		background-color: #fff;
		color: #82ae46;
		cursor: pointer;
		padding: 10px;
	}
	.witerbtn:hover{
		background-color: #82ae46;
		color: #fff;
	}
    .page-title {
  margin-bottom: 60px;
}
</style>