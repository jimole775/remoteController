/**
 * Created by Andy on 2017/11/9.
 */

export default class StorageRegister {

    constructor(inject = {}) {
        this.storage = inject;
    }

    getStorage(name) {
        return this.storage[name];
    }

    setStorage(itemName, innerProp, val) {
       /* if (this.storage[itemName] instanceof Array) {
            val = prop;
            this.storage[itemName].push(val);
        }
        else */if(val === undefined){
            val = innerProp;
            this.storage[itemName] = val;
        }else{
            this.storage[itemName][innerProp] = val;
        }

        return this;
    }

    addStorage(itemName, val){
        if (this.storage[itemName] instanceof Array) {
            this.storage[itemName].push(val);
        }else{
            throw new Error("this storage isn't a Array!");
        }
        return this;
    }
    delStorage(name, val) {
        if (this.storage[name] instanceof Array) {
            let index = val;
            this.storage[name].splice(index, 1);
        }
        else {
            delete this.storage[name][val];
        }
        return this;
    }

    static version(){
        console.log("v1.0");
    }

    static author(){
        console.log("我不tell you~");
    }
}