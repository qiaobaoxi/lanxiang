<template>
	<section>
		<div class="amap-wrapper">
			<el-amap class="amap-box" :center="center" :vid="'amap-vue'"></el-amap>
		</div>
		<el-row>
			<el-col :span="12">
				<div class="grid-content bg-purple-dark">
					<span>问题类型：</span>
					<el-select v-model="questionTypeId" placeholder="请选择">
					<el-option
					v-for="item in questionTypes"
					:key="item.id"
					:label="item.type"
					:value="item.id">
					</el-option>
                   </el-select>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple-dark">
					<span>紧急程度：</span>
					<el-select v-model="questionLevelId" placeholder="请选择">
					<el-option
					v-for="item in questionLevels"
					:key="item.id"
					:label="item.type"
					:value="item.id">
					</el-option>
                   </el-select>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<div class="grid-content bg-purple-dark">
					<span>问题描述：</span>
					<el-input
					type="textarea"
					:rows="2"
					placeholder="请输入内容"
					v-model="questionDescribe">
					</el-input>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple-dark">
					<span>联系方式：</span>
					<el-input v-model="tel" maxlength=12 placeholder="请输入内容"></el-input>
				</div>
			</el-col>
		</el-row>
		<el-row class="btnWrap">
			<el-button type="primary" size='medium' @click="submit">提交</el-button>
		</el-row>
	</section>
</template>
<script>
import { getQuestionType, getQuestionLevel, addQuestion,equipmentDetail} from '../../api/api';
	export default {
		data() {
			return {
				questionTypeId: '',
				questionLevelId: '',
				questionTypes: [],
				questionLevels: [],
				tel: '',
				questionDescribe: '',
				center: [121.59996, 31.197646],
				oEquipment:JSON.parse(sessionStorage.getItem('oEquipment'))
			}
		},
		mounted() {
			this.init()
		},
		methods: {
            init(){
			    getQuestionType().then((response)=>{
					const res = response.data;
					if(res.code){
						this.questionTypes = res.result
					}else{
                        console.log('问题类型出错',res);
					}
			    })
			    getQuestionLevel().then((response)=>{
				   const res = response.data;
				    if(res.code){
						this.questionLevels = res.result
					}else{
                       console.log('问题等级出错',res);
					}
				})
				const params={equipmentId: this.oEquipment.id}
				equipmentDetail(params).then((response) => {
					const res = response.data;
					if(res.code){
						console.log(res.result.addressX)
						this.center=[res.result.addressY,res.result.addressX]
					}else{
                       console.log('获取设备信息失败',res);
					}
				})
			},
			submit(){
				if(!this.questionTypeId){
                    return  this.$message(({
							  message: '请选择问题类型',
							  type: 'warning'
						    }))
				}
				if(!this.questionLevelId){
                    return  this.$message(({
							  message: '请选择紧急程度',
							  type: 'warning'
						    }))
				}
				if(!this.questionDescribe){
                    return  this.$message(({
							  message: '请输入问题描述',
							  type: 'warning'
						    }));
				}
				if(!this.checkMobile(this.tel)){
				    return this.$message(({
							message: '请输入正确的电话号码',
							type: 'warning'
						   }));
				   
				}
				const params={equipmentId: this.oEquipment.id, questionTypeId: this.questionTypeId, questionLevelId: this.questionLevelId, questionDescribe: this.questionDescribe, tel: this.tel}
				addQuestion(params).then((res)=>{
					if(res.code){
						this.$message(({
							message: '提交成功',
							type: 'success'
						}));
					}
				})
			},
			checkMobile(sMobile){ 
				if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){ 
				  return false; 
				}else{
				  return true; 
				} 
			} 
		},
	}

</script>

<style scoped lang='less'>
    .el-row{
		margin-top: 20px;
	}
    .grid-content.bg-purple-dark{
	   margin-left: 10%;
	    .el-input{
		   width: 200px;
		}
		.el-textarea{
			width: 500px;
			vertical-align: middle;
		}
	}
	.amap-wrapper {
		margin-top: 20px;
		width: 100%;
		height: 500px;
	}
	.btnWrap{
		text-align: center;
	}
</style>