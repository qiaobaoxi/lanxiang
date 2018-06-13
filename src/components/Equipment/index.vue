<template>
	<section>
        <el-form :model="form" ref="form" label-width="200px" class="ruleForm">
            <el-form-item
                label="设备号："
                prop="grade"
            >
                <span>11111111</span>
            </el-form-item>
            <el-form-item
                label="观看用户："
                prop="watchers"
                :rules="[
                { required: true, message: '描述不能为空'},
                ]"
            >
               <el-select
                    v-model="form.watchers"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择用户">
                    <el-option
                    v-for="item in users"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button  @click="cacel('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </el-form-item>
        </el-form>
	</section>
</template>
<script>
import { getUserList,addEquipmentsWatchers,getListByEquipmentId} from '../../api/api';
	export default {
        props:["equipmentId"],
		data() {
			return {
                users:[],
                form: {
                    equipmentId: this.equipmentId,
                    watchers: []
                }	
			}
        },
        mounted() {
			this.init();
		},
		methods: {
            init(){
                getUserList().then((response)=>{
                    let res = response.data;
                    if(res.code){
                        this.users=res.result;
                    }else{
                        this.$message(res.msg)
                    }
                })
                getListByEquipmentId({equipmentId:this.equipmentId}).then((response)=>{
                    let res = response.data;
                    if(res.code){
                        for(let item of res.result){
                           this.form.watchers.push(item.userId)
                        }
                    }else{
                        this.$message(res.msg)
                    }
                }) 
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addEquipmentsWatchers(this.form).then((res)=>{
                            console.log(res);
                            if (res.code) {
                                this.cacel(formName)
                            }else{
                                this.$message(res.msg)
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cacel(formName) {
                this.$refs[formName].resetFields();
                this.$emit('closeEdit')
            }
        },
        watch:{
            equipmentId(newDate,oldDate){
                if(newDate){
                  this.init();
                }
            }
        }
	}
</script>

<style scoped lang='less'>
    .ruleForm{
        width: 800px;
        .input{
            width: 200px;
        }
        .textarea{
            width: 400px;
        }
    }
</style>