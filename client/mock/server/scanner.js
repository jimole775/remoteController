/**
 * Created by Andy on 2017/12/1.
 */
var data1 = {
    "from": "xml",
    "key": "component_name",
    "level": "1.2",
    "parents": [],
    "itemcount": 8,
    "items": [{
        "name": "CPU",
        "index": 0,
        "N": {"nodeaddress": "0000.0000.0003.0001", "dbfilename": "0", "publicfilename": "PUB.txt"}
    }, {
        "name": "主板",
        "index": 1,
        "N": {"nodeaddress": "0000.0000.0003.0002", "dbfilename": "0", "publicfilename": "PUB.txt"}
    }, {
        "name": "内存",
        "index": 2,
        "N": {"nodeaddress": "0000.0000.0003.0003", "dbfilename": "0", "publicfilename": "PUB.txt"}
    }, {
        "name": "风扇",
        "index": 3,
        "N": {"nodeaddress": "0000.0000.0003.0004", "dbfilename": "0", "publicfilename": "PUB.txt"}
    }, {
        "name": "硬盘",
        "index": 4,
        "N": {"nodeaddress": "0000.0000.0003.0005", "dbfilename": "0", "publicfilename": "PUB.txt"}
    }, {
        "name": "显卡",
        "index": 5,
        "N": {"nodeaddress": "0000.0000.0003.0006", "dbfilename": "0", "publicfilename": "PUB.txt"}
    }, {
        "name": "声卡",
        "index": 6,
        "N": {"nodeaddress": "0000.0000.0003.0007", "dbfilename": "0", "publicfilename": "PUB.txt"}
    }, {
        "name": "网卡",
        "index": 7,
        "N": {"nodeaddress": "0000.0000.0003.0008", "dbfilename": "0", "publicfilename": "PUB.txt"}
    }]
};

var data2 = {
    "from": "xml",
    "key": "err_descriptor",
    "level": "1.2",
    "parents": [],
    "itemcount": 8,
    "items": [{
        "name": "CPU",
        "index": 0,
        "N": {"nodeaddress": "0000.0000.0003.0001", "dbfilename": "0", "publicfilename": "PUB.txt"},
        "content": {
            "err": true,
            "text": [{
                "index": 0,
                "code": "0x001",
                "descriptor": "温度过高"
            }, {
                "index": 1,
                "code": "0x002",
                "descriptor": "fan error （风扇停转）"
            }, {
                "index": 2,
                "code": "0x003",
                "descriptor": "主频过低，可能针脚接触有问题"
            }]
        }
    }, {
        "name": "主板",
        "index": 1,
        "N": {"nodeaddress": "0000.0000.0003.0002", "dbfilename": "0", "publicfilename": "PUB.txt"},
        "content": {
            "err": true,
            "text": [{
                "index": 0,
                "code": "0x001",
                "descriptor": "电容鼓包"
            }, {
                "index": 1,
                "code": "0x002",
                "descriptor": "南桥芯片烧毁"
            }, {
                "index": 2,
                "code": "0x003",
                "descriptor": "北桥电压过低"
            }]
        }
    }, {
        "name": "内存",
        "index": 2,
        "N": {"nodeaddress": "0000.0000.0003.0003", "dbfilename": "0", "publicfilename": "PUB.txt"},
        "content": {
            "err": true,
            "text": [{
                "index": 0,
                "code": "0x001",
                "descriptor": "主频不兼容"
            }, {
                "index": 1,
                "code": "0x002",
                "descriptor": "存储单元出现未知错误"
            }, {
                "index": 2,
                "code": "0x003",
                "descriptor": "检测不到内存"
            }]
        }
    }, {
        "name": "风扇",
        "index": 3,
        "N": {"nodeaddress": "0000.0000.0003.0004", "dbfilename": "0", "publicfilename": "PUB.txt"},
        "content": {
            "err": true,
            "text": [{
                "index": 0,
                "code": "0x001",
                "descriptor": "电压过低"
            }, {
                "index": 1,
                "code": "0x002",
                "descriptor": "检测不到风扇"
            }, {
                "index": 2,
                "code": "0x003",
                "descriptor": "温度过高"
            }]
        }
    }, {
        "name": "硬盘",
        "index": 4,
        "N": {"nodeaddress": "0000.0000.0003.0005", "dbfilename": "0", "publicfilename": "PUB.txt"},
        "content": {
            "err": true,
            "text": [{
                "index": 0,
                "code": "0x001",
                "descriptor": "针头转速异常"
            }, {
                "index": 1,
                "code": "0x002",
                "descriptor": "磁盘坏道"
            }, {
                "index": 2,
                "code": "0x003",
                "descriptor": "供电不足"
            }]
        }
    }, {
        "name": "显卡",
        "index": 5,
        "N": {"nodeaddress": "0000.0000.0003.0006", "dbfilename": "0", "publicfilename": "PUB.txt"},
        "content": {
            "err": true,
            "text": [{
                "index": 0,
                "code": "0x001",
                "descriptor": "无版本型号"
            }, {
                "index": 1,
                "code": "0x002",
                "descriptor": "fan error (风扇异常)"
            }, {
                "index": 2,
                "code": "0x003",
                "descriptor": "显存不足"
            }]
        }
    }, {
        "name": "声卡",
        "index": 6,
        "N": {"nodeaddress": "0000.0000.0003.0007", "dbfilename": "0", "publicfilename": "PUB.txt"},
        "content": {
            "err": true,
            "text": [{
                "index": 0,
                "code": "0x001",
                "descriptor": "与DirectX版本不兼容"
            }, {
                "index": 1,
                "code": "0x002",
                "descriptor": "主声道反螺旋振音场景无信号"
            }, {
                "index": 2,
                "code": "0x003",
                "descriptor": "到扬声器通路异常"
            }]
        }
    }, {
        "name": "网卡",
        "index": 7,
        "N": {"nodeaddress": "0000.0000.0003.0008", "dbfilename": "0", "publicfilename": "PUB.txt"},
        "content": {
            "err": true,
            "text": [{
                "index": 0,
                "code": "0x001",
                "descriptor": "无信号"
            }, {
                "index": 1,
                "code": "0x002",
                "descriptor": "DNS服务器出现解析错误"
            }, {
                "index": 2,
                "code": "0x003",
                "descriptor": "信号增幅器无响应"
            }]
        }
    }]
};