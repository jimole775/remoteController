/**
 * Created by Andy on 2017/11/6.
 */

let storage = {};
class Register {
    static getStorage() {
        return storage;
    }

    static setStorage(val) {
        return storage = val;
    }

    static getAg(){
        return storage;
    }
}

export default Register;