import { run } from "./app"; 
import config from "./app/config";

run(config.server.post)
console.log("app running on http://127.0.0.1:"+config.server.post)