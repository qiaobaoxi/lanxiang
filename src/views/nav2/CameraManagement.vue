<template>
  <section>
    <div class="add"><el-button type="primary" @click="add">添加</el-button></div>
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
				prop="serialNumber"
				label="序列号"
				width="180">
			</el-table-column>
			<el-table-column
				prop="link"
				label="link"
				>
			</el-table-column>
			<el-table-column
				prop="ip"
				label="ip"
				>
			</el-table-column>
			</el-table>
		</template>
		<el-dialog
			title="添加视频"
			:visible.sync="dialogVisible"
			width="40%"
			>
			<camera-management @closeAdd="closeAdd"></camera-management>
		</el-dialog>
  </section>
</template>

<script>
	import { getListCamera } from '../../api/api';
	import CameraManagement from '../../components/CameraManagement'
  export default {
    data() {
			return {
				tableData: [],
				dialogVisible: false,
			}
		},
		mounted() {
			this.init()
		},
    methods: {
			init(){
        getListCamera().then((response)=>{
					const res = response.data;
					if(res.code){
            this.tableData=res.result      
					}
          
				}) 
			},
      add(){
        this.dialogVisible = true;
			},
			closeAdd(){
        this.dialogVisible = false;
			}
		},
		components:{
			CameraManagement
		}
  }

</script>
<style scoped>
  .add{
		margin: 10px 0;
	}
</style>
