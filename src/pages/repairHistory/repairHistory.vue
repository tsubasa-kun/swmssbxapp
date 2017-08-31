<template>
    <div class="content">
        <div class="item-div" v-for="repair in repairs">
            <span class="describe">{{ repair.GZMS }}</span>
            <span class="status">{{ repair.BXZT_DISPLAY }}</span>
            <div>
                <span class="time">报修时间  {{ formatDateTime(repair.BXSJ) }}</span>
            </div>
            <div class="btn-div">
                <mt-button class="evaluation" v-if="repair.BXZT === '4'" @click="toEvaluation(repair.BXBM)">马上评价</mt-button>
                <mt-button class="detail" @click="toRepairDetail(repair.BXBM)">查看详情</mt-button>
            </div>
        </div>

        <div class="add-btn-bg"></div>
        <i class="iconfont icon-tianjia add-btn" @click="toApply"></i>
    </div>
</template>

<style scoped>
    .content {
        padding-left: 15PX;
        padding-right: 15PX;
        padding-top: 15PX;
    }

    .item-div {
        position: relative;
        width: 100%;
        border: solid 1PX #e8e8e8;
        border-radius: 4PX;
        margin-bottom: 15PX;
        padding: 10PX;
    }

    .describe {
        display: inline-block;
        width: 82%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: keep-all;
        color: #000;
        font-size: 15PX;
    }

    .status {
        position: absolute;
        top: 10PX;
        right: 10PX;
        color: #ffb200;
        background-color: #fff7e5;
        border: solid 1PX #fff7e5;
        border-radius: 2PX;
        font-size: 8PX;
        padding-left: 5PX;
        padding-right: 5PX;
    }

    .time {
        font-size: 14PX;
        color: #92969c;
    }

    .btn-div {
        text-align: right;
        margin-top: 5PX;
    }

    .mint-button--default {
        box-shadow: 0 0 2PX #06c1ae;
    }

    .mint-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 20PX;
        border: 0;
        box-sizing: border-box;
        color: inherit;
        font-size: 10PX;
        height: 30px;
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center;
    }

    .evaluation {
        color: #06c1ae;
        background-color: white;
        margin-right: 5PX;
    }

    .detail {
        color: white;
        background-color: #06c1ae;
    }

    .add-btn {
        position: fixed;
        bottom: 20PX;
        right: 20PX;
        color: #06c1ae;
        font-size: 50PX;
    }

    .add-btn-bg {
        display: block;
        position: fixed;
        bottom: 19PX;
        right: 31PX;
        width: 25PX;
        height: 25PX;
        background-color: white;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import {Indicator, Button} from 'mint-ui';
    export default {
        data() {
            return {
                repairs: []
            }
        },
        components: {
            [Indicator.name]: Indicator,
            [Button.name]: Button
        },
        methods: {
            toRepairDetail: function (BXBM) {
                this.$router.push({path: '/repairDetail', query: {'BXBM': BXBM}});
            },
            toApply: function () {
                this.$router.push('/repairApply');
            },
            toEvaluation: function (BXBM) {
                this.$router.push({path: '/repairEvaluation', query: {'BXBM': BXBM}});
            },
            formatDateTime(str) {
                if (!str) {
                    return;
                }
                let date = str.replace(/-/g, '.');
                date = date.split(' ');
                return date[0] + ' ' + date[1].substr(0, 5);
            },
        },
        created() {
            SDK.setTitleText('报修记录');
            Indicator.open();
            this.$http.get(Api.GET_DORM_APPLY_FIX_INFO)
                .then(res => {
                    return res.json();
                }).then(res => {
                    this.repairs = res.datas;
                    Indicator.close();
                });
        }
    }
</script>