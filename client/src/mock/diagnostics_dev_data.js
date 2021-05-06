/**
 * Created by tapes on 2015/7/7.
 */

(function () {
    var win = window;
    win.external = win.external ? win.external : {};
    win.external.SendJsDataToDev = function (sendDataStr) {
            var preStr = sendDataStr.substr(0, 6);
            var devData;

            switch (preStr) {
                case 'C09B':
                    devData = "510401";
                    break;
                case '310902':
                    devData = "710902";
                    break;
                case '310903':
                    devData = "71090300040000020300000600000000070000000800";
                    break;
                case '310904':
                    devData = "7109040403313233034e2f6002313103323232";
                    break;
                case '31090A':
                    devData = "71090A020000210100002102";
                    break;
                case '31090B':
                    devData = "71090B00040201ff0302ff00000000000700000001";
                    break;
                case '31090C':
                    devData = "71090C0203313233034e2f6002313103323232";
                    break;
                case '31091A':
                    devData = "71091A00040201ff000302ff000000000700000008";
                    break;
                case '31091B':

                    devData = "71091B00083132334e2f6031310001000200040007";

                    break;
                case '310917':
                    devData = "71091700050000001200000013000000220000002300000024";
                    break;
                case '310918':
                    devData = "71091800080000000100000002000000030000000400000005000000060000000700000008";
                    break;
                case '310919':
                    switch (sendDataStr.substr(14, 8)) {
                        case '00000001':
                        case '00000002':
                        case '00000003':
                        case '00000004':
                            devData = "710919000202";
                            break;
                        case '00000005':
                        case '00000006':
                        case '00000007':
                        case '00000008':
                            devData = "7109190006020103";
                            break;
                    }
                    break;
                case '31091D':
                    //if (a) {
                    //    devData = "71099D03000000010000000200000003010203010204";
                    //} else {
                    //    a++;
                        devData = "71091D03000000010000000200000003010203010204";
                    //}
                    //devData = "71091D03000000010000000200000003010203010204";

                    break;
                case '310920':
                    if (a) {
                        devData = "7109A003000000010000000200000003010203010204";
                    } else {
                        a++;
                        devData = "71092003000000010000000200000003010203010204";
                    }

                    break;
                case '310923':
                    devData = "710923";
                    break;
                case '310905':
                    var temp = {"01":"7109050400000203000002040000020500000206","02":"710985"};
                    //devData = "7109050400000203000002040000020500000206";
                    devData = temp[tool.roundNumb01or02()];
                    break;
                case '310906':
                    //devData = "7109060400000203000002040000020500000206";
                    devData = "710986";
                    break;
                case '310914':
                    //devData = "7109140400000203000002040000020500000206";
                    devData = "710994";
                    break;
                case '310907':
                    devData = "7109070400000203000002040000020500000206";
                    break;
                case '310901':
                    devData = "71090100000023030407140A0805060414121C0C191D200F000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
                    //devData = "710901000F00000409071422290000000000000000000000000000000000000000000000000000303146363030303274";
                    break;
                case '310971':
                    devData = "71097100000023030407140A0805060414121C0C191D2061620000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

                    break;
                case '310970':
                    devData = "710970020000000200020001";
                    break;
                case '310908':
                    devData = '71090800040000470000004c000000560000005701';
                    break;

                case '310912':
                    devData = '71091200040000470000004c000000560000005701';
                    break;
                case '310909':
                    devData = '71090901020909';
                    break;
                case '31091C':
                    devData = '71091C0003000401020304';
                    break;
                case '310913':
                    devData = '7109130213139999';
                    break;
                case '31090F':
                    devData = '71090F00040201ff0302ff00000000000700000008';
                    break;
                case '310929':
                    devData = '7109290008040201ff0302ff00';
                    break;
                case '31092A':
                    devData = '71092A00083232333435';
                    break;
                case '310916':
                    devData = '7109160008040201ff0302ff00';
                    break;
                case '310910':
                    devData = '7109100008040201ff0302ff00';
                    break;
                case '310922':
                    devData = '710922';
                    break;
                case '3109FF':
                    devData = '7109FF';
                    break;
                case '310950':
                case '310951':
                case '310952':
                case '310953':
                case '310961':
                case '310962':
                case '310960':
                {
                    /**    71 09 51  [A]  [B]  [C]  [D]  [E]    【A】--指令流程号，操作一次加一；
                     *                                          【B】--弹出框类型，01-提示框 02-输入框 03-菜单 04-带读值的菜单；
                     *                                          【C】--后缀指令长度4位；
                     *                                          【D】--如果弹框类型是“提示框,输入框”,接下来的4位字符是需要显示的内容的索引号（发送给服务器计算），
                     *                                                 【【特别说明】】菜单指令样例：
                     *                                                 [71 09 51] [A] [B] [C] [01] [02] [00 00 00 01]
                     * [00 00 00 02] 00
                     *                                                “菜单”C位后面的指令- 第1字节：   01：按索引ID代表逐条指明显示内容
                     *                                                                              02：代表指明显示内容索引ID的区域
                     *                                                                              03:
                     * 代表显示一个分组内的所有数据到菜单。
                     第2字节：   在前1字节为01时有意义，代表显示菜单的条数
                     后续字节：   01：每4字节代表一个菜单条目的索引
                     02：前4字节代表菜单条目的起始，后4字节代表菜单条目的结束索引
                     03: 4字节代表分组号，如00000001代表取GROUP字段为 00000001 的所有分组显示出来。
                     *                                          【E】--“01提示框,02输入框”-有多少个按钮，紧跟后每4字节为按钮本文的supid；
                     * */
                    //提示框类型指令
                    //CCDP: 710950 00 01 000D 00000003 02 0000000100000002 // 指令流程号为0，CCDP主机告知当前窗口为 2 个按钮的提示框，提示内容文字ID
                    // 00000003，第1个按钮文字ID 为 00000001，第2个按钮文字ID 为 00000002 输入框类型指令 CCDP: 710950 00 02 000D 00000008 02
                    // 0000000100000002 // 指令流程号为0，CCDP主机告知当前窗口为 2 个按钮的输入框，提示内容文字ID 00000008，第1个按钮文字ID 为
                    // 00000001，第2个按钮文字ID 为 00000002

                    //菜单类型指令 以下三种指令代表三种不同的提取SUPID的模板
                    //CCDP: 710950 00 03 000A 01 02 000000010000000200000003        //
                    // 指令流程号为0，CCDP主机告知当前窗口为菜单，菜单有2个选项，第1个ID为 00000001，第2个ID 为 00000002，第3个ID 为 00000003 CCDP: 710950
                    // 01 03 000A 02 000000000100000005                 // 指令流程号为1，CCDP主机告知当前窗口为菜单，提示内容文字ID 从 00000001
                    // 一直到 00000005 CCDP: 710950 02 03 0006 03 000000000F                         //
                    // 指令流程号为2，CCDP主机告知当前窗口为菜单，提示内容文字ID 从分组为 0000000F 内取

                    //带读值菜单类型指令 以下三种指令代表三种不同的提取SUPID的模板
                    //CCDP: 710950 00 03 0010 01 02 0000000100000002 353500323200         //
                    // 指令流程号为0，CCDP主机告知当前窗口为菜单，菜单有2个选项，第1个ID为 00000001，第2个ID 为 00000002，菜单提示值依次为 55, 22 CCDP: 710950 01
                    // 03 0014 02 000000000100000005 35350032320030003100  // 指令流程号为1，CCDP主机告知当前窗口为菜单，提示内容文字ID 从
                    // 00000001 一直到 00000005，菜单提示值依次为 55, 22, 0, 1 CCDP: 710950 02 03 0010 03 000000000F
                    // 35350032320030003100          // 指令流程号为2，CCDP主机告知当前窗口为菜单，提示内容文字ID 从分组为 0000000F 内取，菜单提示值依次为 55,
                    // 22, 0, 1


                    var preCmdExceptNo1 = sendDataStr.substr(1, 5);
                    countStep = sendDataStr.substr(6, 2);

                    var supidForContentMap = ["00000001", "00000002", "00000003", "00000004", "00000005"];
                    var supidForButtonMap = ["00000011", "00000022", "00000033"];
                    var groupForMenuMap = ["00000001", "00000002", "00000003"];
                    var supidForMenuMap = ["00000001", "00000002", "00000003", "00000004", "00000005", "00000006", "00000007", "00000008", "00000009", "0000000a"];

                    var bombBoxType = window.prompt("输入弹出框类型：退出业务--00；提示框--01；输入框--02；菜单--03；读值菜单--04");
                    var cmdLen = "0000";
                    var lastCompletionCmd;
                    var supidForContent;    //正文内容supid
                    var buttonSupid_str;    //输入框类型至少有一个按钮,提示框可以没有按钮
                    var buttonCount_hex;    //按钮数量，1字节长度
                    switch (bombBoxType) {
                        case "01":  //构造提示框的指令串
                        {
                            supidForContent = tool.randomSingleMap(supidForContentMap); //正文的supid随机获取一个就可以
                            buttonSupid_str = tool.randomUnlimitMap(supidForButtonMap); //提示框类型有可能没有按钮

                            buttonCount_hex = tool.toHex(buttonSupid_str.length / 8, 2);   //计算supid字节串的长度，并且转换成16进制
                            lastCompletionCmd = supidForContent + buttonCount_hex + buttonSupid_str;

                        }
                            break;
                        case "02": //构造输入框的指令串
                        {
                            supidForContent = tool.randomSingleMap(supidForContentMap);     //正文的supid随机获取一个就可以
                            buttonSupid_str = tool.randomUnlimitMap(supidForButtonMap, 1);   //输入框类型至少有一个按钮

                            buttonCount_hex = tool.toHex(buttonSupid_str.length / 8, 2);       //计算supid字节串的长度，并且转换成16进制
                            lastCompletionCmd = supidForContent + buttonCount_hex + buttonSupid_str;
                        }
                            break;
                        case "03":
                        case "04":  //构造菜单类型的指令串
                        {
                            var menuSupidType = window.prompt("输入菜单的supid读取类型,罗列所有--01；计算区间--02；组信息--03");
                            var menuSupid_Str = "";
                            var menu04LastCmdArea = "";
                            var menuItemCount = 0;  //当弹出框类型为"04"时,需要计算SUPID个数
                            switch (menuSupidType) {

                                case "01"://指令类型为01的时候,列出所有的supid
                                    menuSupid_Str = tool.randomUnlimitMap(supidForMenuMap);
                                    menuItemCount = menuSupid_Str.length / 8;
                                    break;

                                case "02"://给出2个值,让PC端计算两个值的区间
                                    var firstSupid = supidForMenuMap[0];
                                    var lastSupid = supidForMenuMap[Math.floor(Math.random() * 9) + 1];

                                    menuSupid_Str = firstSupid + lastSupid;
                                    menuItemCount = parseInt(lastSupid) - parseInt(firstSupid) + 1;
                                    break;

                                case "03"://只给一个组ID;根据下面的组内容的长度来构造读值长度

                                    menuSupid_Str = tool.randomSingleMap(groupForMenuMap);

                                    //组信息长度
                                    var groupContext = { //这个数据格式只是为了和服务器数据匹配,实际数据无意义,只获取长度和服务器的组数据长度一致就行
                                        "00000001": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                                        "00000002": [0, 1, 2, 3, 4, 5, 6, 7],
                                        "00000003": [0, 1, 2, 3, 4]
                                    };
                                    menuItemCount = groupContext[menuSupid_Str].length;

                                    break;
                            }

                            //如果是读值菜单类型，随机构造位数为3的数字，并转换成16进制的asc码，可以保证2位的asc码代表一位数字
                            if (bombBoxType === "04") {

                                while (menuItemCount--) {

                                    menu04LastCmdArea += tool.toAsc(tool.randomDecByLimitBit(3), 16) + "00";  //输出16进制的asc码,最后以"00"结尾

                                }
                            }

                            var supidSum_hex = tool.toHex(menuSupid_Str.length / 8, 2);//supid总数,转成2位长度的16进制格式;
                            lastCompletionCmd = menuSupidType + supidSum_hex + menuSupid_Str + menu04LastCmdArea;
                        }
                            break;
                        default :
                            lastCompletionCmd = "0000";
                            break;
                    }

                    //cmdLen表示长度单位为"字节",所以要除以2,并转成4位长度的16进制格式;
                    cmdLen = tool.toHex(lastCompletionCmd.length / 2, 4);
                    devData = "7" + preCmdExceptNo1 +
                    countStep +                    //计步器
                    bombBoxType +                  //弹框类型
                    cmdLen +                       //后缀指令长度
                    lastCompletionCmd +            //后缀指令
                    (bombBoxType === "04" ? "" : "00");//最后以00结尾(本身第四种弹框类型就是以"00"结尾)

                }
                    break;
                default :
                    console.log("未模拟的设备指令:" + sendDataStr);
                    return;
            }

            setTimeout(function () {
                win.jsRecvDeviceData('1', devData);
            }, 200);
        };

    win.external.JSInitReady = function(){

        //empty.htm#ID=A0B4&INDEX=1&PROCEDURE='标致调用控制单元功能'&TLMAX=5&CARCODE=01&ServerType=-1&CarSeries=peugeot&DiagnoseType=2&FunctionID=CCDP_Web\zh-cn\Business\ProfessionalDiagnostics.html
        var ProDiagURL = "5a57317764486b756148527449306c4550554577516a516d53553545525667394d535a51556b394452555256556b55394a2b6167682b6948744f6977672b6555714f614f702b57497475574e6c655746672b574b6e2b69447653636d5645784e515667394e535a4451564a4454305246505441784a6c4e6c636e5a6c636c5235634755394c54456d5132467956486c775a5431775a58566e5a5739304a6b52705957647562334e6c56486c775a5430794a6b5a31626d4e30615739755355513951304e45554639585a574a366143316a626b4a3163326c755a584e7a55484a765a6d567a63326c76626d467352476c685a3235766333527059334d756148527462413d3d";

        //empty.htm#ID=A0B4&INDEX=1&PROCEDURE='标致全车故障检测'&TLMAX=5&CARCODE=01&ServerType=-1&CarSeries=peugeot&FunctionID=CCDP_Web\zh-cn\Business\SimpleDiagnostics.html
        var SimpDiagURL = "5a57317764486b756148527449306c4550554577516a516d53553545525667394d535a51556b394452555256556b55394a2b6167682b6948744f5746714f69397075615668656d616e4f616a674f61316979636d5645784e515667394e535a4451564a4454305246505441784a6c4e6c636e5a6c636c5235634755394c54456d5132467956486c775a5431775a58566e5a5739304a6b5a31626d4e30615739755355513951304e45554639585a574a366143316a626b4a3163326c755a584e7a55326c746347786c52476c685a3235766333527059334d756148527462413d3d";

        //empty.htm#ID=A200&INDEX=1&PROCEDURE='保养灯归零'&TLMAX=5&CARCODE=0C&CarSeries=MaintenanceReset&ServerType=-1&FunctionID=CCDP_Web\zh-cn\Business\A200.html
        var MaintainURL = "5a57317764486b756148527449306c45505545794d44416d53553545525667394d535a51556b394452555256556b55394a2b532f6e655746752b6542722b57396b756d627469636d5645784e515667394e535a4451564a4454305246505442444a6b4e68636c52356347553954574670626e526c626d4675593256535a584e6c64435a545a584a325a584a556558426c505330784a6b5a31626d4e30615739755355513951304e45554639585a574a366143316a626b4a3163326c755a584e7a515449774d43356f64473173";

        //empty.htm#ID=A302&INDEX=1&PROCEDURE='特殊功能'&TLMAX=5&CARCODE=0C&ServerType=-1&CarSeries=peugeot&FunctionID=CCDP_Web\zh-cn\Business\A302.html#大众(VW)#特殊功能|大众(VW)
        var SpecialURL = "5a57317764486b756148527449306c455055457a4d44496d53553545525667394d535a51556b394452555256556b55394a2b654a756561756975574b6e2b69447653636d5645784e515667394e535a4451564a4454305246505442444a6c4e6c636e5a6c636c5235634755394c54456d5132467956486c775a5431775a58566e5a5739304a6b5a31626d4e30615739755355513951304e45554639585a574a366143316a626b4a3163326c755a584e7a51544d774d69356f64473173492b576b702b53386c79685756796b6a35346d353571364b3559716636494f39664f576b702b53386c79685756796b3d";

        var browserURL = win.location.href.split("/");
        //APP End
        if(/Professional/.test(browserURL[browserURL.length - 1])){
            //jsRecvAppData(1003,ProDiagURL,"");
        }else{
            //jsRecvAppData(1003,SimpDiagURL,"");
        }

        //css End
        //jsRecvAppData(7777,"9,16","");

        //DEV End
        //jsRecvAppData(1005,"","");

    };

    /*clearInterval(autoRun);
    var autoRun = setInterval(function () {
        if (typeof win.moduleEntry.carListEnter === "function") {
            win.moduleEntry.carListEnter();
            clearInterval(autoRun);
        }
    }, 500)*/
})();



//元素加载完毕，立刻开始进入业务入口
// document.body.onload = function(){
// window.jsRecvDeviceData('1', "510401");
// };