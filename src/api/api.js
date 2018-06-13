import axios from 'axios';

let base = '';
let base1 = '/api';
export const requestLogin = params => { return axios.post(`${base1}/user/login`, params).then(res =>  res.data); };

export const getUserList = params => { return axios.get(`${base1}/user/list`, { params: params }); };

//设备报修
export const getQuestionType = params => { return axios.get(`${base1}/questionType/getQuestionType`, { params: params }); };

export const getQuestionLevel = params => { return axios.get(`${base1}/questionLevel/getQuestionLevel`, { params: params }); };

export const addQuestion = params => { return axios.post(`${base1}/equipmentMaintenance/addQuestion`, params).then(res =>  res.data); };

export const equipmentList = params => { return axios.get(`${base1}/equipment/list`, { params: params }); };
//设备信息
export const equipmentDetail = params => { return axios.get(`${base1}/equipment/getById`, { params: params }); };



