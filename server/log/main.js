
 const fs = require("fs");
        const path = require("path");
export default new class Log{

    consturtor(){

    }

    err(msg){
        msg = Log.queryMsg(msg);
        let timer = Log.getTimer();
        let fileName = Log.createFileName("err");
        let content = `${timer}${msg} \r\n`;        
        this.writeFile(fileName, content);
    }

    user(id,ip){
        id = Log.queryMsg(id);
        ip = Log.queryMsg(ip);
        let timer = Log.getTimer();
        let fileName = Log.createFileName("user");        
        let content = `${timer} 用户名：${id} 地址：${ip} \r\n`
        this.writeFile(fileName, content)
    }

    static queryMsg(msg){
        if(typeof msg === "object"){  
            try {
                msg = JSON.stringify(msg);
            } catch (error) {
                msg = error;
            }                      
        }

        return msg;
    }

    static getTimer(){
      
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let s = new Date().getSeconds();

        return `${h}/${m}/${s}：`;
    }

    static createFileName(type){
        let y = new Date().getFullYear();
        let m = new Date().getMonth();
        let d = new Date().getDay();

        return path.resolve(__dirname, type, `${y}.${m}.${d}.log`);
    }

    writeFile(filePath,content){  
        fs.appendFile(filePath, content, "utf8",function(){
            console.log("writeDone");
        });
    }
       
       
    }