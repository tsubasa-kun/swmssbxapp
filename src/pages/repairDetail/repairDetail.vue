<template>
    <div class="content">
        <div v-if="repair.BXZT === '4'" @click="toEvaluation">
            <div class="holder"></div>
            <div class="to-evaluation-div">
                <i class="iconfont">&#xe69d;</i>
                <span>已完成维修，马上去评价</span>
                <i class="iconfont">&#xe79e;</i>
            </div>
            <div class="holder"></div>
        </div>

        <div class="info-div">
            <span class="main-label">报修详情</span>
            <div class="sub-div">
                <span class="sub-label">报修时间</span>
                <span class="sub-text">{{ formatDateTime(repair.BXSJ) }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label">报修类型</span>
                <span class="sub-text">{{ repair.XMDM_DISPLAY }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label">报修区域</span>
                <span class="sub-text">{{ repair.QYDM_DISPLAY }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label">报修地点</span>
                <span class="sub-text">{{ repair.GZDD }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label align-top">报修描述</span>
                <div class="sub-text-area">{{ repair.GZMS }}</div>
            </div>
            <div class="img-prv-div" v-if="imageUrl">
                <div class="img-div">
                    <img class="img-prv" :src="imageUrl" @click="toPreview()">
                </div>
            </div>
        </div>
        <div v-if="repair.WXSM">
            <div class="holder"></div>
            <div class="info-div">
                <span class="main-label">说明</span>
                <div class="sub-div">
                    <span class="sub-label">维修说明</span>
                    <div class="sub-text-area">{{ repair.WXSM }}</div>
                </div>
            </div>
        </div>
        <div class="holder"></div>
        <div class="info-div">
            <span class="main-label">报修进度</span>
            <div class="check-steps-div">
                <div class="step-item-div">
                    <div class="status-item-left">
                        <div class="step-time-text">{{ formatCheckDateTime(repair.BXSJ) }}</div>

                        <i class="iconfont status-icon-pass"
                           v-if="repair.BXZT === '1' || repair.BXZT > '1'">&#xe68c;</i>
                    </div>
                    <div class="status-item-right">
                        <span class="step-text">发起报修</span>
                    </div>
                </div>
                <div class="step-item-div">
                    <div class="status-item-left">
                        <div class="step-time-text" v-if="repair.BXZT === '2' || repair.BXZT > '3'">{{
                            formatCheckDateTime(repair.SLSJ) }}
                        </div>
                        <div class="step-time-text" v-else-if="repair.BXZT === '3'">{{ formatCheckDateTime(repair.BSLSJ)
                            }}
                        </div>
                        <div class="step-time-text" v-else></div>

                        <img src="../../assets/waiting.png" v-if="repair.BXZT === '1'">
                        <i class="iconfont status-icon-pass" v-else-if="repair.BXZT === '2' || repair.BXZT > '3'">&#xe68c;</i>
                        <i class="iconfont status-icon-refused" v-else-if="repair.BXZT === '3'">&#xe67a;</i>
                        <i class="iconfont status-icon-dot" v-else>&#xe706;</i>
                    </div>
                    <div class="status-item-right">
                        <span class="step-text" v-if="repair.BXZT === '2' || repair.BXZT > '3'">已派工</span>
                        <div class="step-reason-text" v-if="repair.BXZT === '2' || repair.BXZT > '3'">{{ repair.SLRXM
                            }}指派任务给{{ repair.SFXM }}
                        </div>
                        <span class="step-text" v-else-if="repair.BXZT === '3'">不受理</span>
                        <span class="step-text" v-else>受理</span>
                        <div class="step-reason-text" v-if="repair.BXZT === '3'">受理人：{{ repair.SLRXM }}</div>
                        <div class="step-reason-text" v-if="repair.BXZT === '3'">不受理原因：{{ repair.BSLYY }}</div>
                    </div>
                </div>
                <div class="step-item-div">
                    <div class="status-item-left">
                        <div class="step-time-text" v-if="repair.BXZT === '4' || repair.BXZT > '5'">{{
                            formatCheckDateTime(repair.WCSJ) }}
                        </div>
                        <div class="step-time-text" v-else-if="repair.BXZT === '5'">{{ formatCheckDateTime(repair.ZZSJ)
                            }}
                        </div>
                        <div class="step-time-text" v-else></div>

                        <img src="../../assets/waiting.png" v-if="repair.BXZT === '2'">
                        <i class="iconfont status-icon-pass" v-else-if="repair.BXZT === '4' || repair.BXZT > '5'">&#xe68c;</i>
                        <i class="iconfont status-icon-refused" v-else-if="repair.BXZT === '5'">&#xe67a;</i>
                        <i class="iconfont status-icon-dot" v-else>&#xe706;</i>
                    </div>
                    <div class="status-item-right">
                        <span class="step-text" v-if="repair.BXZT === '4' || repair.BXZT > '5'">已完成</span>
                        <div class="step-reason-text" v-if="repair.BXZT === '4' || repair.BXZT > '5'">{{ repair.SFXM
                            }}完成维修
                        </div>
                        <span class="step-text" v-else-if="repair.BXZT === '5'">已终止</span>
                        <span class="step-text" v-else>维修</span>
                        <div class="step-reason-text" v-if="repair.BXZT === '5'">受理人：{{ repair.SLRXM }}</div>
                        <div class="step-reason-text" v-if="repair.BXZT === '5'">终止原因：{{ repair.ZZYY }}</div>
                    </div>
                </div>
                <div class="step-item-div">
                    <div class="status-item-left-end">
                        <div class="step-time-text">{{ formatCheckDateTime(repair.PJSJ) }}</div>

                        <img src="../../assets/waiting.png" v-if="repair.BXZT === '4'">
                        <i class="iconfont status-icon-pass" v-else-if="repair.BXZT === '6'">&#xe68c;</i>
                        <i class="iconfont status-icon-dot" v-else>&#xe706;</i>
                    </div>
                    <div class="status-item-right">
                        <span class="step-text" v-if="repair.BXZT === '6'">已评价</span>
                        <span class="step-text" v-else>评价</span>

                        <mt-button class="evaluation" v-if="repair.BXZT === '6'" @click="toEvaluationDetail">查看评分
                        </mt-button>
                        <div class="rating-div" v-if="repair.BXZT === '6'">
                            <span>我的评分</span>
                            <i class="iconfont icon-wujiaoxing1 star-on" v-for="n in rating"></i>
                            <i class="iconfont icon-wujiaoxing1 star-off" v-for="n in (5 - rating)"></i>
                        </div>
                    </div>
                </div>
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

    .holder {
        width: 100%;
        height: 20PX;
    }

    .to-evaluation-div {
        padding: 10PX 0PX 8PX 15PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
        vertical-align: top;
    }

    .to-evaluation-div i {
        font-size: 22PX;
        color: #06c1ae;
        background-color: white;
    }

    .to-evaluation-div span {
        display: inline-block;
        width: 80%;
        font-size: 14PX;
        color: #06c1ae;
        vertical-align: top;
    }

    .info-div {
        padding: 10PX 0PX 10PX 10PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .main-label {
        display: block;
        height: 35PX;
        font-size: 18PX;
        color: #000;
        margin-bottom: 15PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .sub-div {
        margin-top: 5PX;
    }

    .sub-label {
        display: inline-block;
        font-size: 15PX;
        color: #92969c;
    }

    .sub-text {
        display: inline-block;
        font-size: 15PX;
        color: #000;
        margin-left: 10PX;
    }

    .align-top {
        vertical-align: top;
    }

    .sub-text-area {
        display: inline-block;
        font-size: 15PX;
        color: #000;
        margin-left: 10PX;
        width: 75%;
        white-space: normal;
        word-break: break-all;
    }

    .check-steps-div {
        width: 100%;
        background-color: white;
    }

    .step-item-div {
        width: 100%;
        height: auto;
        min-height: 70PX;
        text-align: left;
    }

    .status-item-left {
        display: inline-block;
        height: 100%;
        padding-right: 15PX;
        position: relative;
    }

    .status-item-left i {
        position: absolute;
        right: -10PX;
        top: 0PX;
    }

    .status-item-left img {
        width: 20PX;
        height: 20PX;
        position: absolute;
        right: -10PX;
        top: 0PX;
    }

    .step-time-text {
        width: 70PX;
        min-width: 70PX;
        height: 40PX;
        text-align: right;
        font-size: 12PX;
        color: #92969c;
    }

    .status-item-right {
        display: inline-block;
        margin-left: -4PX;
        padding-left: 16PX;
        vertical-align: top;
        max-width: 70%;
        height: auto;
        min-height: 70PX;
        border-left: solid 1PX #e8e8e8;
    }

    .step-text {
        display: inline-block;
        text-align: left;
        font-size: 15PX;
    }

    .step-reason-text {
        font-size: 12PX;
        color: #92969c;
        white-space: normal;
        word-break: break-all;
    }

    .status-icon-pass {
        font-size: 20PX;
        color: #06c1ae;
        background-color: white;
    }

    .status-icon-refused {
        font-size: 20PX;
        color: #ff571a;
        background-color: white;
    }

    .status-icon-dot {
        font-size: 20PX;
        color: #e8e8e8;
        /*background-color: white;*/
    }

    .status-item-left-end {
        display: inline-block;
        height: 100%;
        padding-right: 15PX;
        position: relative;
    }

    .status-item-left-end i {
        position: absolute;
        right: -10PX;
        top: 0PX;
    }

    .status-item-left-end img {
        width: 20PX;
        height: 20PX;
        position: absolute;
        right: -10PX;
        top: 0PX;
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
        margin-left: 10PX;
        display: inline-block;
    }

    .rating-div img {
        width: 15PX;
        height: 15PX;
        vertical-align: middle;
    }

    .rating-div span {
        font-size: 12PX;
        vertical-align: middle;
    }

    .img-prv-div {
        width: 100%;
        padding-top: 10PX;
        padding-bottom: 10PX;
    }

    .img-div {
        display: inline-block;
        margin-left: 5PX;
        margin-top: 10PX;
        position: relative;
        width: 60PX;
        height: 60PX;
    }

    .img-prv {
        width: 50PX;
        height: 50PX;
        position: absolute;
        top: 0;
        left: 0;
    }

    .star-on {
        font-size: 15PX;
        color: #ffb200;
        vertical-align: middle;
    }

    .star-off {
        font-size: 15PX;
        color: #d7d8da;
        vertical-align: middle;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator, Button} from 'mint-ui';
    export default {
        data() {
            return {
                BXBM: this.$route.query.BXBM,
                repair: {},
                condition: [],
                disabled: true,
                rating: 0,
                imageUrl: ''
            }
        },
        created() {
            SDK.setTitleText('报修详情');
            Indicator.open();
            var params = '?BXBM=' + this.BXBM;
            this.$http.get(Api.QUERY_APPLY_CONTENT + params)
                .then(res => {
                    return res.json();
                }).then(res => {
                this.repair = res.datas[0];
                this.rating = parseInt(this.repair.PF);
                if (res.datas[0].GZTP) {
                    this.imageUrl = Utils.methods.getFileByToken(res.datas[0].GZTP);
                }
                Indicator.close();
            });
        },
        components: {
            [Indicator.name]: Indicator,
            [Button.name]: Button
        },
        methods: {
            toEvaluation: function () {
                this.$router.push({path: '/repairEvaluation', query: {'BXBM': this.repair.BXBM}});
            },
            toEvaluationDetail: function () {
                this.$router.push({path: '/evaluationDetail', query: {'PF': this.rating, 'PJNR': this.repair.PJNR}});
            },
            toPreview: function (url) {
                SDK.preViewImages([{
                    url: this.imageUrl,
                    desc: ''
                }], 0);
            },
            formatDateTime(str) {
                if (!str) {
                    return;
                }
                let date = str.replace(/-/g, '.');
                date = date.split(' ');
                return date[0] + ' ' + date[1].substr(0, 5);
            },
            formatCheckDateTime(str) {
                if (!str) {
                    return;
                }
                let date = str.replace(/-/g, '.');
                date = date.split(' ');
                return date[1].substr(0, 5) + ' ' + date[0];
            },
        }
    }
</script>