import index from './pages/index/index.vue';
import repairApply from './pages/repairApply/repairApply.vue';
import applySuccess from './pages/applySuccess/applySuccess.vue';
import repairDetail from './pages/repairDetail/repairDetail.vue';
import repairEvaluation from './pages/repairEvaluation/repairEvaluation.vue';
import evaluationDetail from './pages/evaluationDetail/evaluationDetail.vue';
import evaluationSuccess from './pages/evaluationSuccess/evaluationSuccess.vue';

export default {
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/repairApply',
            component: repairApply
        },
        {
            path: '/applySuccess',
            component: applySuccess
        },
        {
            path: '/repairDetail',
            component: repairDetail
        },
        {
            path: '/repairEvaluation',
            component: repairEvaluation
        },
        {
            path: '/evaluationDetail',
            component: evaluationDetail
        },
        {
            path: '/evaluationSuccess',
            component: evaluationSuccess
        }
    ]
};