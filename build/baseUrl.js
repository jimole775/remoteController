
let host = "127.0.0.1";
let port = 1110;

if(proccess.env === "local"){
    host = "127.0.0.1";
}

if(proccess.env === "produce"){
    host = "lester.ink";
}

export default {
    host,port
}