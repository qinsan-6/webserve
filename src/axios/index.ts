import axios from "axios";

export const service = axios.create({
  baseURL:
    "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
  timeout: 60000,
  headers: {
    "content-type": "application/json", // 默认值
    Authorization: "Bearer sk-61fb95a519f3411f84b00940bae17689", // 自定义请求头
  },
});
// 'Authorization': 'Bearer sk-61fb95a519f3411f84b00940bae17689' // 自定义请求头
