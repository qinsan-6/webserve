import { run } from "./src/app"; 
import config from "./src/config";
// import video from './src/model/video'
// import {getfromreq}from'./src/until/index'

run(config.server.post)


console.log("app running on http://127.0.0.1:"+config.server.post)