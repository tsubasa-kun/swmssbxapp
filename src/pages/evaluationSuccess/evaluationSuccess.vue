<template>
    <div class="content">
        <div class="img-div">
            <img src="../../assets/evaluation.png">
        </div>
        <span class="main-label">感谢您的评价！</span>
        <mt-button class="submit-btn" @click="toMain">回到报修记录</mt-button>
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
        padding-top: 80PX;
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

    .mint-button--default {
        box-shadow: 0 0 2PX #06c1ae;
    }

    .submit-btn {
        width: calc(100% - 40PX);
        color: #06c1ae;
        background-color: white;
    }
</style>

<script type="text/javascript">
    import {Button} from 'mint-ui';
    export default {
        components: {
            [Button.name]: Button
        },
        methods: {
            toMain: function () {
                this.$router.push('/');
            }
        },
        created() {
            SDK.setTitleText('评价');
        }
    }
</script>