<template>
    <div id="show">
      <div class="page-title">
        <h3 class="text-center">QnA</h3>
      </div>
  
      <table id="writetable">
        <tr>
          <td class="title"><p>작성자</p></td>
          <td>
            <span>{{ userId }}</span>
          </td>
        </tr>
        <tr>
          <td class="title"><p>별점</p></td>
          <td>
            <select id="select" name="category" v-model="qnaInfo.qna_category">
              <option value="1">배송 문의</option>
              <option value="2">축제 문의</option>
              <option value="3">기타 문의</option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="title"><p>제목</p></td>
          <td>
            <input
              v-model="qnaInfo.qna_title"
              type="text"
              id="title"
              name="title"
              required
            />
          </td>
        </tr>
        <tr>
          <td class="title"><p>첨부</p></td>
          <td>
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              multiple
            />
          </td>
        </tr>
        <tr>
          <td colspan="2" id="textarea">
            <textarea
              id="textarea2"
              cols="130"
              rows="15"
              name="content"
              v-model="qnaInfo.qna_content"
            ></textarea>
          </td>
        </tr>
      </table>
      <div style="text-align: center">
        <button
          type="button"
          class="btn btn-outline-danger me-2 mt-2"
          @click="saveInfo"
        >
          작성
        </button>
        <button type="reset" class="btn btn-danger mt-2">취소</button>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      reviewInfo: {
        review_title: "",
        review_content: "",
        user_no: 0,
        qna_category: 0,
      },
      userNo: "",
      bno: "",
      images: [],
    };
  },
}
</script>