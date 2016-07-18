window.onload=function(){
   waterfall('main','box');
   var dataInt={"data":[{"src":'2.jpg'},{"src":'15.jpg'},{"src":'11.jpg'},{"src":'1.jpg'}]};
   window.onscroll=function(){
   //	checkScrollSlide();
   	 if(checkScrollSlide){
   	 	var oParent=document.getElementById('main');

        for(var i=0;i<dataInt.data.length;i++)
        {
        	var oBox=document.createElement('div');
        	oBox.className='box';
        	oParent.appendChild(oBox);
        	var oPic=document.createElement('div');
        	oPic.className='pic';
        	oBox.appendChild(oPic);
        	var oImg=document.createElement('img');
        	oImg.src="images/"+ dataInt.data[i].src;

        	oPic.appendChild(oImg);

        } 
         waterfall('main','box');
   	  }

    }

}
function waterfall(parent,box){
	//将main下为box 的元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//console.log(oBoxs);
	//计算整个页面显示的列数
	var oBoxW=oBoxs[0].offsetWidth;
	//console.log(oBoxW);
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	//console.log(cols);
	//设置main的宽度
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';

    var hArr=[];
    for(var i=0;i<oBoxs.length;i++)
    {
    	if(i<cols)
    	{
    		hArr.push(oBoxs[i].offsetHeight);
    	}else{
    		var minH=Math.min.apply(null,hArr);//求数组最小值
    	    var index=getMinIndex(hArr,minH);
    	    oBoxs[i].style.position='absolute';
    	    oBoxs[i].style.top=minH+'px';
    	    oBoxs[i].style.left=oBoxW*index+'px';
            hArr[index]+=oBoxs[i].offsetHeight;
    	}
    }

  //console.log(hArr);

}
function getByClass(oParent,clsName){
	var boxArr=new Array();//用来存储所有未box的元素
        var oElements=oParent.getElementsByTagName('*');
         for(var i=0;i<oElements.length;i++)
         {
         	if(oElements[i].className==clsName)
         	{
         		boxArr.push(oElements[i]);
         	}
         }
         return boxArr;
}
function getMinIndex(arr,val){
    for(var i in arr)
    {
    	if(arr[i]==val)
    	{
    		return i;
    	}
    	//console.log(arr[i]);
          
    }
    
}
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	//console.log(scrollTop);
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	//console.log('-------');
	//console.log(height);
	return (lastBoxH<scrollTop+height)?true:false;
}