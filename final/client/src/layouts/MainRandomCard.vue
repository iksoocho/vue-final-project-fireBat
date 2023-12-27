<template>
    <div class="popular_destination_area">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="section_title text-center mb_70">
                        <h3>Popular Destination</h3>
                        <p>Suffered alteration in some form, by injected humour or good day randomised booth anim 8-bit hella wolf moon beard words.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-for="(fes, i) in fesRandomList" :key="i" class="col-lg-4 col-md-6">
                    <div class="single_destination">
                        <div class="thumb">
                            <img src="img/destination/1.png" alt="">
                        </div>
                        <div class="content">
                            <p class="d-flex align-items-center">{{fes.f_name}} <a href="travel_destination.html">{{fes.f_firstday}}</a> </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default{
        data(){
            return{
                fesRandomList:[]
            }
        },
        created(){
        this.getFesRandomList(); 
        },
    methods : {
        async getFesRandomList(){
            this.fesRandomList = (await axios.get('/api/festival/random')
                                .catch(err => console.log(err))).data; 
         }
        }
    }
</script>