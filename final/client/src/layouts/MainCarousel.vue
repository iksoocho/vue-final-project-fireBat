<template>
 <!-- slider_area_start -->
 <div class="slider_area">
        <div class="slider_active owl-carousel">
            <div class="single_slider  d-flex align-items-center slider_bg_1 overlay">
                
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-xl-12 col-md-12">
                            <div class="slider_text text-center" >
                                <h3 style="color: black;">Daegu</h3>
                                <p>Pixel perfect design with awesome contents</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single_slider  d-flex align-items-center slider_bg_2 overlay">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-xl-12 col-md-12">
                            <div class="slider_text text-center">
                                <h3>Seoul</h3>
                                <p>Pixel perfect design with awesome contents</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single_slider  d-flex align-items-center slider_bg_3 overlay">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-xl-12 col-md-12">
                            <div class="slider_text text-center">
                                <h3>Busan</h3>
                                <p>Pixel perfect design with awesome contents</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- slider_area_end -->
   
</template>

<script>
 export default {
    name: 'Carousel',
    created() {
        this.refreshBackgroundImages();
    },
    methods: {
        refreshBackgroundImages() {
            const images = document.querySelectorAll('.slider_area .single_slider');
            images.forEach((image, index) => {
                const currentStyle = window.getComputedStyle(image);
                const currentBackgroundImage = currentStyle.getPropertyValue('background-image');
                const timestamp = new Date().getTime(); // 무작위한 타임스탬프 생성
                const newBackgroundImage = currentBackgroundImage.replace(/\?.*$/, '') + `?timestamp=${timestamp}`;
                image.style.backgroundImage = newBackgroundImage;
            });
        }
    }
}
</script>

<style>
/* line 1, ../../Arafath/CL/December/231. Travel-02/HTML/scss/_slider.scss */
.slider_bg_1 {
  background-image: url(../image/banner/banner.png);
}

/* line 4, ../../Arafath/CL/December/231. Travel-02/HTML/scss/_slider.scss */
.slider_bg_2 {
  background-image: url(../image/banner/banner2.png);
}

/* line 7, ../../Arafath/CL/December/231. Travel-02/HTML/scss/_slider.scss */
.slider_bg_3 {
  background-image: url(../image/banner/banner3.png);
}
</style>