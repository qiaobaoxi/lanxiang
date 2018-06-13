<template>
	<section>
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
					prop="equipmentName"
					label="设备号"
					>
				</el-table-column>
				<el-table-column
					prop="users"
					label="观看人"
					>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button
						size="small"
						@click="edit(scope.$index, scope.row)">修改观看人数</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<el-dialog
			title="修改观看人数"
			:visible.sync="dialogVisible"
			width="30%"
			>
			<equipment :equipmentId="equipmentId" @closeEdit="closeEdit"></equipment>
		</el-dialog>
	</section>
</template>

<script>
import { getAllEquipment } from '../../api/api';
import Equipment from '../../components/Equipment'
	export default {
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				equipmentId: ''
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init(){
			    getAllEquipment().then((response)=>{
					let res = response.data 
				    if (res.code) {
					  let list = res.result;
					  this.tableData = list
				    }else{
					  this.$message('数据出错')	
					}
			    })
			},
			edit (index,item) {
				this.dialogVisible = true;
				this.equipmentId = item.id;
			},
			closeEdit(){
				this.dialogVisible = false;
				this.equipmentId = 0;
				this.init()
			}
		},
		components:{
			Equipment
		}
	}

</script>