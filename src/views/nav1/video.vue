<template>
	<section>
		<div class="addVideo"><el-button type="primary" @click="addVideo">添加视频</el-button></div>
		<template>
			<el-table
			:data="tableData"
			border
			style="width: 100%">
			<el-table-column
				prop="id"
				label="id"
				width="180">
			</el-table-column>
			<el-table-column
				prop="equipment.equipmentName"
				label="设备号"
				width="180">
			</el-table-column>
			<el-table-column
				prop="where"
				label="视频地址（0是井内，1是井外）"
				width="260">
			</el-table-column>
			<el-table-column
				prop="link"
				label="link"
				>
			</el-table-column>
			</el-table>
		</template>
		<el-dialog
			title="添加视频"
			:visible.sync="dialogVisible"
			width="40%"
			>
			<i-video @closeAdd="closeAdd"></i-video>
		</el-dialog>
	</section>
</template>
<script>
import { getUserList,videoList } from '../../api/api';
import iVideo from '../../components/Video';
	export default {
		data() {
			return {
				tableData: [],
				dialogVisible: false,
			}
		},
		methods: {
            init(){
			    videoList().then((response)=>{
				    let res = response.data 
				    if (res.code) {
					  let list = res.result;
					  this.tableData = list
				    }else{
					  this.$message('数据出错')	
					}
			    })
			},
			addVideo(){
                this.dialogVisible = true; 
			},
			closeAdd(){
				this.dialogVisible = false; 
				this.init();
			}
		},
		mounted() {
			this.init()
		},
		components:{
			iVideo
		}
	}

</script>

<style scoped lang='less'>
    .addVideo{
	    margin: 10px 0;
	}
</style>