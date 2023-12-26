<template>
     <div class="where_togo_area">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-3">
                    <div class="form_area">
                        <h3>어데로 갈랍니까?</h3>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="search_wrap">
                        <form class="search_form" action="#">
                            <div class="input_field">
                                <select>
                                    <option data-display="시기">시기</option>
                                    <option value="1">1월</option>
                                    <option value="2">2월</option>
                                </select>
                            </div>
                            <div class="input_field">
                                <select>
                                    <option data-display="지역">지역</option>
                                    <option value="1">서울</option>
                                    <option value="2">대구</option>
                                </select>
                            </div>
                            <div class="input_field">
                                <select>
                                    <option data-display="카테고리">카테고리</option>
                                    <option value="1">친구와 함께</option>
                                    <option value="2">전시</option>
                                </select>
                            </div>
                            <div class="search_btn">
                                <button class="boxed-btn4 " type="submit" >Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
    name : 'Where'
}
</script>