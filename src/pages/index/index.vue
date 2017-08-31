<template>
    <div>
        <v-no-repair v-if="tab === 0"></v-no-repair>
        <v-repair-history v-if="tab === 1"></v-repair-history>
    </div>
</template>

<style scoped>
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import noRepair from '../noRepair/noRepair.vue';
    import repairHistory from '../repairHistory/repairHistory.vue';
    import {Indicator} from 'mint-ui';

    export default {
        data() {
            return {
                tab: -1
            }
        },
        components: {
            [Indicator.name]: Indicator,
            'v-no-repair': noRepair,
            'v-repair-history': repairHistory
        },
        created() {
            SDK.setTitleText('宿舍报修');
            Indicator.open();
            this.$http.get(Api.SET_DEFAULT_ROLE)
                .then(res => {
                    return res.json();
                }).then(res => {
                    Indicator.close();
                    if (res.status === '200') {
                        this.$http.get(Api.GET_DORM_APPLY_FIX_INFO)
                            .then(res => {
                                return res.json();
                            }).then(res => {
                            if (res.datas) {
                                if (res.datas.length === 0) {
                                    this.tab = 0;
                                } else {
                                    this.tab = 1;
                                }
                            } else {
                                this.tab = 0;
                            }
                            Indicator.close();
                        });
                    } else {
                        Utils.methods.showTip('设置默认用户失败');
                    }
                });
        }
    }
</script>