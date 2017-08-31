<template>
    <div>
        <div class="content">
            <div class="item-div">
                <b>*</b>
                <span>手机号</span>
                <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="phone"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <b>*</b>
                <span>报修类型</span>
                <input type="text" placeholder="请选择" v-model="type" readOnly="true" @click="showTypePicker"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <b>*</b>
                <span>报修区域</span>
                <input type="text" placeholder="" v-model="area" readOnly="true"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <b>*</b>
                <span>报修地址</span>
                <input type="text" placeholder="请输入地址" v-model="address" maxlength="100"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <b class="at-top">*</b>
                <span class="at-top">描述</span>
                <textarea class="model-inst-input" placeholder="请输入内容" v-model="describe" maxlength="200"></textarea>
            </div>
            <div class="count-div">
                <span class="count-text">{{ count }}</span>
                <span class="count-max">/200</span>
            </div>
            <div class="img-prv-div">
                <div class="img-div" v-for="imgUrl in imgs">
                    <img class="img-prv" :src="imgUrl" @click="toPreview(imgUrl)">
                    <i class="iconfont delete" @click="toDelete(imgUrl)">&#xe67a;</i>
                </div>
                <div class="img-add-btn" @click="choseUpload">
                    <i class="iconfont">&#xe854;</i>
                    <span>{{ imgs.length }}/1</span>
                </div>
            </div>
        </div>

        <mt-button class="submit-btn" @click="submit">提交</mt-button>

        <div class="cover"></div>
        <div id="type_picker" class="m-picker">
            <div class="picker-title-div">
                <span class="picker-btn ok" @click="pickerOK">确定</span>
                <span class="picker-btn cancel" @click="pickerCancel">取消</span>
            </div>
            <mt-picker :slots="types" @change="onTValuesChange"></mt-picker>
        </div>

        <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<style scoped>
    .cover {
        display: none;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .content {
        padding-left: 10PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .item-div {
        position: relative;
        padding: 10PX 10PX 10PX 0;
    }

    .item-div b {
        font-size: 16PX;
        color: #ff571a;
    }

    .item-div span {
        display: inline-block;
        width: 30%;
        font-size: 16PX;
    }

    .item-div input {
        border: 0;
        width: 60%;
        outline: none;
        font-size: 16PX;
    }

    .at-top {
        vertical-align: top;
    }

    .model-inst-input {
        display: inline-block;
        height: 150PX;
        resize: none;
        outline: none;
        border: 0;
        font-size: 16PX;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin: 25PX 10PX 10PX 10PX;
    }

    .m-picker {
        display: none;
        width: 100%;
        position: fixed;
        bottom: 0;
        background-color: white;
    }

    .picker-title-div {
        padding-top: 10PX;
        padding-bottom: 10PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .picker-btn {
        color: #06c1ae;
        font-size: 15PX;
    }

    .picker-btn.ok {
        position: absolute;
        right: 10PX;
    }

    .picker-btn.cancel {
        margin-left: 10PX;
    }

    .count-div {
        width: 100%;
        padding-right: 10PX;
        text-align: right;
    }

    .count-text {
        display: inline-block;
        right: 36PX;
        color: #92969c;
        font-size: 10PX;
    }

    .count-max {
        display: inline-block;
        right: 10PX;
        color: #92969c;
        font-size: 10PX;
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

    .delete {
        font-size: 20PX;
        position: absolute;
        top: -5PX;
        right: 0;
    }

    .img-add-btn {
        position: relative;
        display: inline-block;
        border: solid 1PX #e8e8e8;
        border-radius: 4PX;
        width: 60PX;
        height: 60PX;
        margin-left: 5PX;
        vertical-align: top;
        margin-top: 5PX;
    }

    .img-add-btn i {
        color: #92969c;
        font-size: 30PX;
        position: absolute;
        top: 10PX;
        left: 14PX;
    }

    .img-add-btn span {
        color: #92969c;
        font-size: 14PX;
        position: absolute;
        top: 35PX;
        left: 17PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import {Indicator, Picker, Button, Actionsheet} from 'mint-ui';
    export default {
        data() {
            return {
                phone: '',
                type: '',
                area: '',
                address: '',
                describe: '',
                count: 0,
                typesValue: [],
                typesMap: [],
                types: [
                    {
                        flex: 1,
                        values: [],
                        className: 'types',
                        textAlign: 'center',
                    }
                ],
                typeKey: '',
                imgs: [],
                imgTokens: '',
                actions: [{name: '拍照', method: this.takePhoto},
                    {name: '从相册中选择', method: this.selectPhoto}],
                sheetVisible: false
            }
        },
        components: {
            [Indicator.name]: Indicator,
            [Picker.name]: Picker,
            [Button.name]: Button,
            [Actionsheet.name]: Actionsheet
        },
        methods: {
            onTValuesChange(picker, values) {
                this.type = picker.getValues();
                this.getTypeKey(this.type);
            },
            showTypePicker: function () {
                $('.cover').show();
                $('#type_picker').slideDown('fast');
            },
            getTypeKey: function (value) {
                for (let i = 0; i < this.typesMap.length; i++) {
                    if (this.typesMap[i].DISPLAY == value) {
                        this.area = this.typesMap[i].QYMC;
                        this.typeKey = this.typesMap[i].VALUE;
                    }
                }
            },
            pickerOK: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
            },
            pickerCancel: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
            },
            submit: function () {
                if (this.phone.length <=0) {
                    Utils.methods.showTip('请输入手机号码');
                } else if (this.typeKey.length <=0) {
                    Utils.methods.showTip('请选择报修类型');
                } else if (this.address.length <=0) {
                    Utils.methods.showTip('请输入报修地址');
                } else if (this.describe.length <= 0) {
                    Utils.methods.showTip('请输入描述');
                } else {
                    Indicator.open();
                    let params = {SJH: this.phone, GZMS: this.describe, GZDD: this.address, XMDM: this.typeKey, GZTP: this.imgTokens};
                    this.$http.post(Api.SAVE_FIX_APPLY, params)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            Indicator.close();
                            if (res.status === '200') {
                                this.$router.push('/applySuccess');
                            } else {
                                Utils.methods.showTip(res.msg);
                            }
                        });
                }
            },
            choseUpload: function () {
                this.sheetVisible = true;
            },
            selectPhoto: function () {
                SDK.takePhoto((ret) => {
                    let retData;
                    if (ret instanceof Array) {
                        retData = ret[0];
                    } else {
                        retData = ret;
                    }
                    this.upLoadPhoto(retData.url);
                }, 1/*(3 - this.imgs.length)*/);
            },
            takePhoto: function () {
                SDK.takeCamera(false, (ret) => {
                    let retData;
                    if (ret instanceof Array) {
                        retData = ret[0];
                    } else {
                        retData = ret;
                    }
                    this.upLoadPhoto(retData.url);
                }, 1/*(3 - this.imgs.length)*/);
            },
            upLoadPhoto: function (url) {
                Indicator.open();
                SDK.uploadImgsToEmap({host: WEBPACK_CONIFG_HOST, urls: [url]})
                    .then(resp => {
                        if (resp.status == 200 || resp.success == true) {
                            this.imgTokens = resp.token;
                            this.imgs.push(Utils.methods.getFileByToken(resp.token));
                            Utils.methods.showTip('图片上传成功');
                        } else {
                            Utils.methods.showTip(resp.msg || '图片上传失败');
                        }
                        Indicator.close();
                    }, error => {
                        Utils.methods.showTip(resp.msg || '图片上传失败');
                        Indicator.close();
                    });
            },
            toDelete: function (value) {
                Utils.methods.removeByValue(this.imgs, value);
            },
            toPreview: function (url) {
                SDK.preViewImages([{
                    url: url,
                    desc: ''
                }], 0);
            }
        },
        created() {
            SDK.setTitleText('申请报修');
            Indicator.open();
            this.$http.get(Api.GET_FIX_STATE_DIC)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    this.typesMap = res.datas;
                    for (let i = 0; i < this.typesMap.length; i++) {
                        this.typesValue.push(this.typesMap[i].DISPLAY);
                    }
                    this.types[0].values = this.typesValue;
                });

            Indicator.open();
            this.$http.get(Api.GET_BASE_INFO)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    if (res.datas) {
                        this.phone = res.datas.SJH;
                        this.address = res.datas.ZSDZ;
                    }
                    Indicator.close();
                });
        },
        watch: {
            describe: function () {
                this.count = this.describe.length;
            },
            imgs: function () {
                if (this.imgs.length === 1) {
                    $('.img-add-btn').hide();
                } else {
                    $('.img-add-btn').show();
                }
            }
        }
    }
</script>