
/**
 * Created by Andy on 2017/1/12.
 */
var win = window;
win.external = win.external ? win.external : {};
win.devLoaded = false;
win.external.SendToApp = function (action, msg) {
	switch(action){
		//case 1021:
		//	if(!devLoaded){
		//		devLoaded = true;
		//		win.jsRecvAppData(1003,"","");
		//	}else{
		//		win.jsRecvAppData(1021,"","");
		//	}
		//
		//	break;
		case 3027:
			//if(!devLoaded){
			//	devLoaded = true;
				win.jsRecvAppData(1005,"","");
			//}else{
			//	win.jsRecvAppData(1021,"","");
			//}
			break;
		case 1000:
			win.jsRecvAppData(1000,{screenInfo:{screenSize:5.5,headHeight:60,footHeight:60},serverHost:"http://112.124.26.243:8090",businessRole:0},"");
			break;
		}

};



win.external.RequestDataFromServer = function (action, pack, abandonParam){
	//offline mock,don't need to handles badRequest status!
	win.server.ajaxHandle(pack, function(){}, [function(){},null]);
};
