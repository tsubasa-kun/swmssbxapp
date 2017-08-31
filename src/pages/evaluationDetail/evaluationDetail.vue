<template>
    <div class="content">
        <div class="info-div">
            <div class="sub-div">
                <span class="sub-label">我的评分</span>
                <div class="holder"></div>
                <i class="iconfont icon-wujiaoxing1 star-on" v-for="n in rating"></i>
                <i class="iconfont icon-wujiaoxing1 star-off" v-for="n in (5 - rating)"></i>
                <span class="sub-text">{{ rating }}分</span>
            </div>
            <div class="sub-div">
                <span class="sub-label align-top">评价内容</span>
                <div class="sub-text-area">{{ content }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        height: 100%;
        background-color: white;
    }

    .info-div {
        padding: 10PX 0PX 10PX 10PX;
    }

    .sub-div {
        margin-top: 5PX;
    }

    .sub-div img {
        width: 20PX;
        height: 20PX;
        vertical-align: top;
    }

    .sub-label {
        display: inline-block;
        font-size: 15PX;
        color: #92969c;
    }

    .holder {
        margin-left: 10PX;
        display: inline-block;
    }

    .sub-text {
        display: inline-block;
        font-size: 15PX;
        color: #000;
        margin-left: 5PX;
    }

    .align-top {
        vertical-align: top;
    }

    .sub-text-area {
        display: inline-block;
        width: 75%;
        font-size: 15PX;
        color: #000;
        margin-left: 10PX;
    }

    .star-on {
        font-size: 18PX;
        color: #ffb200;
    }

    .star-off {
        font-size: 18PX;
        color: #d7d8da;
    }
</style>

<script type="text/javascript">
    export default {
        data() {
            return {
                rating: this.$route.query.PF,
                content: this.$route.query.PJNR
            }
        },
        created() {
            SDK.setTitleText('查看评价');
        }
    }
</script>