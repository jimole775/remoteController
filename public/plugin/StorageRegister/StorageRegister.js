/**
 * Created by Andy on 2017/11/9.
 */

export default class StorageRegister {

    constructor(inject) {
        this.storage = inject;
    }

    getStorage(name) {
        return this.storage[name];
    }

    setStorage(name, prop, val) {
        if (this.storage[name] instanceof Array) {
            val = prop;
            this.storage[name].push(val);
        }
        else {
            this.storage[name][prop] = val;
        }
    }

    delStorage(name, val) {
        if (this.storage[name] instanceof Array) {
            let index = val;
            this.storage[name].slice(index, 1);
        }
        else {
            delete this.storage[name][val];
        }
        return this.storage;
    }

    static version(){
        console.log("v1.0");
    }

    static author(){
        console.log("Œ“≤ªtell you~");
    }
}