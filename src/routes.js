import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import EquipmentLive from './views/nav1/EquipmentLive.vue'
import EquipmentWarranty from './views/nav1/EquipmentWarranty.vue'
import Video from './views/nav1/video.vue'
import Equipment from './views/nav1/Equipment.vue'
import user from './views/nav1/user.vue'
import CameraManagement from './views/nav2/CameraManagement.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航栏',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/EquipmentLive', component: EquipmentLive, name: '设备实况' },
            { path: '/EquipmentWarranty', component: EquipmentWarranty, name: '设备报修' },
            { path: '/video', component: Video, name: '情景模式' },
            { path: '/equipment', component: Equipment, name: '历史数据' },
            // { path: '/equipment', component: Equipment, name: '场景模拟' },
            // { path: '/equipment', component: Equipment, name: '井内监控' },
            // { path: '/equipment', component: Equipment, name: '井外监控' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/CameraManagement', component: CameraManagement, name: '摄像头管理' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;