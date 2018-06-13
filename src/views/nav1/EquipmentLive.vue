<template>
	<section>
		<el-row :gutter="20" class="row">
			<el-col :span="6"><div class="grid-content bg-purple center"><span>井内水位：{{equipmentData.waterLevelInWell}}</span></div></el-col>
			<el-col :span="6"><div class="grid-content bg-purple center"><span>河道水位：{{equipmentData.riveRaterLevel}}</span></div></el-col>
			<el-col :span="6"><div class="grid-content bg-purple center"><span>水泵1：{{equipmentData.waterPump1}}</span></div></el-col>
			<el-col :span="6"><div class="grid-content bg-purple center"><span>水泵2：{{equipmentData.waterPump2}}</span></div></el-col>
		</el-row>
		<el-row :gutter="20" class="row">
			<el-col :span="12"><div class="grid-content bg-purple center"><div><el-col :span="12"><span>排水闸门开度</span></el-col><el-col :span="12">{{equipmentData.sluiceSwitch}}</el-col></div><el-progress :percentage="equipmentData.sluiceOpeningDegree" ></el-progress></div></el-col>
		    <el-col :span="12"><div class="grid-content bg-purple center"><div><el-col :span="12"><span>截污闸门开度</span></el-col><el-col :span="12">{{equipmentData.sluiceSluiceSwitch}}</el-col></div><el-progress :percentage="equipmentData.sluiceSluiceOpeningDegree" ></el-progress></div></el-col>
		</el-row>
		<el-row :gutter="20" class="row">
			<el-col :span="6"><div class="grid-content bg-purple center"><span>截污管水位：{{equipmentData.waterLevelOfSewagePipe}}</span></div></el-col>
			<el-col :span="6"><div class="grid-content bg-purple center"><span>浮球：{{equipmentData.fuqiu}}</span></div></el-col>
			<el-col :span="6"><div class="grid-content bg-purple center"><span>设备门警报：{{equipmentData.shebmen}}</span></div></el-col>
			<el-col :span="6"><div class="grid-content bg-purple center"><span>水泵电机1：{{equipmentData.shuibeng1}}</span></div></el-col>
		</el-row>
		<el-row :gutter="20" class="row">
			<el-col :span="6"><div class="grid-content bg-purple center"><span>水泵电机2：{{equipmentData.shuibeng2}}</span></div></el-col>
			<el-col :span="6"><div class="grid-content bg-purple center"><span>压力电机：{{equipmentData.yalidianji}}</span></div></el-col>
			<el-col :span="6"><div class="grid-content bg-purple center"><span>是否停电：{{equipmentData.tingdian}}</span></div></el-col>
			<el-col :span="6"><div class="grid-content bg-purple center"><span>液压泵站电机1：{{equipmentData.hydraulicPumpMotor}}</span></div></el-col>
		</el-row>
		<el-row :gutter="20" class="row">
			<el-col :span="6"><div class="grid-content bg-purple center"><span>设备工作状态：{{equipmentData.workstatus}}</span></div></el-col>
			<el-col :span="6"><div class="grid-content bg-purple center"><span>提篮格栅升降：{{equipmentData.liftingGrid}}</span></div></el-col>
			<el-col :span="6"><div class="grid-content bg-purple center"><span>雨量：{{equipmentData.rainfall}}</span></div></el-col>
		</el-row>
		<el-row :gutter="20" class="row">
			<el-col :span="24"><div class="grid-content bg-purple center"><span>水质mg/L</span></div></el-col>
		    <el-col :span="24"><div class="grid-content bg-purple center"><el-col :span="12"><span>SS:{{equipmentData.ss}}</span></el-col><el-col :span="12"><span>COD:{{equipmentData.cod}}</span></el-col></div></el-col>
		</el-row>
		<el-row :gutter="20" class="row">
			<el-col :span="24"><div class="grid-content bg-purple center"><span>管理污水累计流量m3</span></div></el-col>
		    <el-col :span="24"><div class="grid-content bg-purple center"><el-col :span="12"><span>1#:{{equipmentData.totalDischargeOfSewage1}}</span></el-col><el-col :span="12"><span>2#:{{equipmentData.totalDischargeOfSewage2}}</span></el-col></div></el-col>
		</el-row>
		<el-row :gutter="20" class="row">
			<el-col :span="24"><div class="grid-content bg-purple center"><span>管理污水瞬时流量m3</span></div></el-col>
		    <el-col :span="24"><div class="grid-content bg-purple center"><el-col :span="12"><span>1#:{{equipmentData.sewageFlow1}}</span></el-col><el-col :span="12"><span>2#:{{equipmentData.sewageFlow2}}</span></el-col></div></el-col>
		</el-row>
	</section>
</template>
<script>
import { getUserList } from '../../api/api';
	export default {
		data() {
			return {
				equipmentId:'',
				name:'',
				weiyu:{

				},
				equipmentData: {

				},
				socketId:""
			}
		},
		sockets:{
			connect(){
			 console.log(this.$socket.id)
			},
			online(data){
				let oEquipment =JSON.parse(sessionStorage.getItem('oEquipment'));
				if (data.equipmentId === oEquipment.id) {
                   this.getData(data);
				}
			},
		},
		mounted() {
            this.init();
		},
		methods: {
            init(){
				let oEquipment =JSON.parse(sessionStorage.getItem('oEquipment'));
				const params={equipmentId:oEquipment.id}
                this.$socket.emit('index', params);
			},
			getData(data){
                this.equipmentData = data;
				let workstatus;
				let shuibeng2;
				let shuibeng1;
				let yalidianji;
				let tingdian;
				let shebmen;
				let fuqiu;
				if (data.keyboardStatus == 7) {
					workstatus = '自动';
				} else if (data.keyboardStatus == 3){
					workstatus = '手动';
				} else {
					workstatus = '远程';
				}
				this.equipmentData.workstatus = '远程';
				if ((data.callThePolice & 1) == 0) {
					shuibeng2 = '错误';
				} else {
					shuibeng2 = '正常';
				}
				this.equipmentData.shuibeng2 = shuibeng2;
				if ((data.callThePolice & 2) == 0) {
					shuibeng1 = '错误'; 
				} else {
					shuibeng1 = '正常';
				}
				this.equipmentData.shuibeng1 = shuibeng1;
				if ((data.callThePolice & 4) == 0) {
					yalidianji='错误'
				} else {
					yalidianji='正常'
				}
				this.equipmentData.yalidianji = yalidianji;
				if ((data.callThePolice & 128) == 0) {
					tingdian = '停电';
				} else {
					tingdian = '正常';
				}
				this.equipmentData.tingdian = tingdian;
				if ((data.floatingBall & 1) == 0) {
					shebmen='打开';
				} else {
					shebmen='关闭';
				}
				this.equipmentData.shebmen = shebmen;
				if ((data.floatingBall & 2) == 0) {
					fuqiu='下限';
				} else if ((data.floatingBall & 4) == 0){
					fuqiu='上限';
				} else {
					fuqiu='非上下限';
				}
				this.equipmentData.fuqiu = fuqiu; 
			}
		},
		components:{
		}
	}

</script>

<style scoped lang='less'>
    section{
		.row{
			height: 80px;
			line-height: 40px;
			padding: 20px 0;
			border-bottom: 1px solid #ccc;
		}
	    .center{
		//    text-align: center;
			height: 20px;
			line-height: 20px;
		}
		.center span{
			font-weight: bold;
		}	
	}
	
</style>