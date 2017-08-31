<template>
    <div class="content">
        <div class="rating-div">
            <i id="0" class="iconfont icon-wujiaoxing1 star-off" @click="toRating(1)"></i>
            <i id="1" class="iconfont icon-wujiaoxing1 star-off" @click="toRating(2)"></i>
            <i id="2" class="iconfont icon-wujiaoxing1 star-off" @click="toRating(3)"></i>
            <i id="3" class="iconfont icon-wujiaoxing1 star-off" @click="toRating(4)"></i>
            <i id="4" class="iconfont icon-wujiaoxing1 star-off" @click="toRating(5)"></i>
        </div>
        <div class="line"></div>
        <textarea class="model-inst-input" placeholder="填写你对此次维修服务的感受..." maxlength="100"
                  v-model="evaluation"></textarea>
        <div class="count-div">
            <span class="count-text">{{ count }}</span>
            <span class="count-max">/100</span>
        </div>
        <mt-button class="submit-btn" :disabled="disable" @click="submit">提交评价</mt-button>
    </div>
</template>

<style scoped>
    .rating-div {
        text-align: center;
        padding-top: 10PX;
        padding-bottom: 10PX;
    }

    .rating-star {
        display: inline-block;
        width: 25PX;
        height: 25PX;
    }

    .line {
        background-color: #e8e8e8;
        width: 100%;
        height: 1PX;
    }

    .model-inst-input {
        width: 100%;
        height: 200PX;
        resize: none;
        outline: none;
        border: 0;
        padding: 10PX;
        font-size: 15PX;
    }

    .count-div {
        width: 100%;
        position: relative;
    }

    .count-text {
        display: inline-block;
        position: absolute;
        right: 36PX;
        color: #92969c;
        font-size: 10PX;
    }

    .count-max {
        display: inline-block;
        position: absolute;
        right: 10PX;
        color: #92969c;
        font-size: 10PX;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin: 40PX 10PX 10PX 10PX;
    }

    .star-on {
        font-size: 24PX;
        color: #ffb200;
    }

    .star-off {
        font-size: 24PX;
        color: #d7d8da;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import $ from 'jquery';
    import Utils from '../../utils';
    import {Indicator, Button} from 'mint-ui';

    export default {
        components: {
            [Indicator.name]: Indicator,
            [Button.name]: Button
        },
        data() {
            return {
                BXBM: this.$route.query.BXBM,
                rating: 0,
                evaluation: '',
                count: 0,
                disable: true
            }
        },
        methods: {
            toRating: function (num) {
                this.rating = num;
                $(".rating-div").children().addClass('star-off');
                for (var i = 0; i < num; i++) {
                    $(".rating-div").children('#' + i).removeClass('star-off');
                    $(".rating-div").children('#' + i).addClass('star-on');
                }
            },
            submit: function () {
                if (this.rating === 0) {
                    Utils.methods.showTip('请选择评分');
                } else {
                    Indicator.open();
                    var params = {BXBM: this.BXBM, PF: this.rating, PJNR: this.evaluation};
                    this.$http.post(Api.SAVE_CRITICISM, params)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            Indicator.close();
                            if (res.status === '200') {
                                this.$router.push('/evaluationSuccess');
                            } else {
                                Utils.methods.showTip(res.msg);
                            }
                        });


                }
            }
        },
        watch: {
            evaluation: function () {
                this.count = this.evaluation.length;
                if (this.count > 0) {
                    this.disable = false;
                } else {
                    this.disable = true;
                }
            }
        },
        created() {
            SDK.setTitleText('评价');
        }
    }
</script>