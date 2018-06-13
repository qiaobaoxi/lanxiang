<template>
	<section>
        <el-form :model="form" ref="form" label-width="200px" class="ruleForm">
            <el-form-item
                label="序列号："
                prop="serialNumber"
                :rules="[
                  { required: true, message: '序列号不能为空'},
                ]"
            >
                <el-input type="input" placeholder="请输入内容" class="input" v-model="form.serialNumber" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
                label="link："
                prop="link"
                :rules="[
                { required: true, message: 'link不能为空'},
                ]"
            >
               <el-input  type="textarea"
                    :rows="2"
                    class="textarea"
                    placeholder="请输入内容"
                    v-model="form.link"
                    auto-complete="off"
                    ></el-input>
            </el-form-item>
            <el-form-item
                label="ip"
                prop="ip"
                :rules="[
                { required: true, message: 'ip不能为空'},
                ]"
            >
               <el-input type="input" placeholder="请输入内容" class="input" v-model="form.ip" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  @click="cacel('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </el-form-item>
        </el-form>
	</section>
</template>
<script>
import { addCamera } from '../../api/api';

	export default {
		data() {
			return {
                form: {
                    serialNumber: '',
                    link: '',
                    ip: ''
                }	
			}
        },
        mounted() {
			
		},
		methods: {
            init(){
               
            },
            submitForm(formName) {
                alert(111)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addCamera(this.form).then((res)=>{
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
               this.$emit('closeAdd')
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