var ellaDisk = require("./build/Release/EllaRemoveDisk");
var fs = require("fs");


    // var disk=addon.GetRemoveableDisk();
    // console.log(disk);
    // console.log("开始更新CDROM");
    // var sss=new Date();
    // console.log(sss);
    // var disk1=ellaDisk.WriteToCDROM("F:\\1\\2.iso","H");
    // console.log(disk1);
    // var end=new Date();
    // var dd=end-sss;
    // console.log("更新CDROM成功，花费时间："+ dd+"ms");



    // console.log("开始更新CDROM");
    // var sss=new Date();
    // console.log(sss);
    // var disk1=ellaDisk.WriteDataToHidden("F:\\1\\2.iso","F:\\1\\2.iso","H");
    // console.log(disk1);
    // var end=new Date();
    // var dd=end-sss;
    // console.log("更新CDROM成功，花费时间："+ dd+"ms");


    var disk1=ellaDisk.WriteDirToHidden("F:\\Demo\\","\\qwe\\","I");
    console.log(disk1);


    // var disk1=addon.GetSnNumber('I');
    // console.log(disk1);
    // var disk1=disk.split("");
    //  for (var i = 0; i < disk1.length; i++) {
    //       console.log(disk1[i]);     
    // };
    // console.log("开始设置只读");
    // var sss=new Date();
    // console.log(sss);
    // var isEnable=ellaDisk.EnableReadOnly('I');
    // if(isEnable==1)
    // {
    // 	var end=new Date();
    // 	var dd=end-sss;
    // 	console.log("设置只读成功，花费时间："+ dd+"ms");
    // }else
    // {
    // 	console.log("设置只读失败");
    // }
    // console.log(isEnable);
    // console.log(new Date());


    // console.log("开始设置可写");
    // var sss=new Date();
    // console.log(sss);
    // var isEnable=ellaDisk.DisableReadOnly('I');
    // if(isEnable==1)
    // {
    //  var end=new Date();
    //  var dd=end-sss;
    //  console.log("设置可写成功，花费时间："+ dd+"ms");
    // }else
    // {
    //  console.log("设置可写失败");
    // }
    // console.log(isEnable);
    // console.log(new Date());


    // var dd=ellaDisk.CheckReadOnly('I')
    // console.log(dd);


    // var disk=ellaDisk.GetRemoveableDisk();
    // var jsonstr="";
    // var jsonArr=[];
    // for (var i = 0; i < disk.length; i++) {
    //         console.log(disk[i]);
    //         var sn=ellaDisk.GetSnNumber(disk[i]);
    //         if(sn!="")
    //         {
    //             if (fs.existsSync(disk[i]+ ":/ellabook.exe")) {
    //                 jsonstr={"Disk":disk[i],"SN":sn,"Type":"CDFS"};    
    //             }else
    //             {
    //                 jsonstr={"Disk":disk[i],"SN":sn,"Type":"Plublic"};
    //             }
    //             jsonArr.push(jsonstr);
    //         }
    //     }

    // console.log(JSON.stringify(jsonArr));
  


  //console.log(ellaDisk.GetSnNumber('I'));