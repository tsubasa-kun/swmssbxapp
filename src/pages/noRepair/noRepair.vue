<template>
    <div class="content">
        <div class="img-div">
            <img src="../../assets/no_data.png">
        </div>
        <span class="main-label">你还没有报修过哦~</span>
        <mt-button class="submit-btn" @click="toApply">我要报修</mt-button>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        text-align: center;
        padding: 15PX;
    }

    .img-div {
        width: 100%;
        text-align: center;
        padding-top: 60PX;
    }

    .img-div img {
        width: 120PX;
        height: 120PX;
    }

    .main-label {
        display: block;
        font-size: 18PX;
        color: #000;
        margin-top: 20PX;
        margin-bottom: 15PX;
    }

    .submit-btn {
        width: calc(100% - 40PX);
        color: white;
        background-color: #06c1ae;
    }
</style>

<script type="text/javascript">
    import {Button} from 'mint-ui';
    export default {
        components: {
            [Button.name]: Button
        },
        methods: {
            toApply: function () {
                this.$router.push('/repairApply')
            }
        },
        created() {
            SDK.setTitleText('报修记录');
        }
    }
</script>