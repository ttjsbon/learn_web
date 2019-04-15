var big=[1,2,3,4,5,6,7,8,9];
var big_new=[1,2,3,4,5,6,7,8,9];
var times=0;
var seconds=0;
var time_display;
var time_dd=document.getElementsByTagName("span")[0];
var butt1=document.getElementsByTagName("button")[0];
var bu_st=0;	//暂停按钮状态位
var time1;
var best_time=0;
var divBest=document.getElementsByClassName("hes")[0];
function move(n,tar){
	var ind_n=big.indexOf(n);
	if(n!=9){
		console.log(n,tar);
		var divn=document.getElementById('d'+n);
		divn.style.top=Math.floor((tar-1)/3)*100+'px';
		divn.style.left=((tar-1)%3)*100+'px';		
	}
	big[ind_n]=9;
	big[tar-1]=n;
	console.log(big);
	if(big.toString()==big_new.toString()){
		clearInterval(time1);
		best_time=sessionStorage.getItem(1);
		if(best_time===null){
			divBest.innerText='最佳用时：'+seconds+'秒';
		}
		else if(best_time!==null&&seconds<best_time){
			divBest.innerText='最佳用时：'+seconds+'秒';
		}
		alert("恭喜通关！");
		return;
	}
}
function ismove(n){
	var m=big.indexOf(n);
	var z=big.indexOf(9);
	var ind=Math.abs(m-z);
	console.log(n,m,z,ind);
	if(ind!=3&ind!=1){
		alert("当前方块不能移动！");
		return;
	}
	else{
		move(n,big.indexOf(9)+1);
	}
}
function randomSort(a,b){
	return Math.random()>0.5?-1:1;
}
function sta(){
	big.sort(randomSort);
	console.log(big,big_new);
	for(var i=0;i<big.length;i++){
		move(i+1,big.indexOf(i+1)+1);
	}
	sti();
}
function sti(){
	times=0;
	minutes=0;
	hours=0;
	seconds=0;
	clearInterval(time1);
	time1=setInterval(time_f,1000);
}
time_f=function(){
	times++;
	seconds++;
	if(times===60){
		times=0;
		minutes++;
	}
	if(minutes===60){
		minutes=0;
		hours++;
	}
	time_dd.innerText="总用时： "+hours+"时"+minutes+"分"+times+"秒"; 
}
function stop(){
	if(bu_st===0){
		clearInterval(time1);
		butt1.innerText="开始";	
		bu_st=1;
	}
	else{
		time1=setInterval(time_f,1000);
		butt1.innerText="暂停";	
		bu_st=0;
	}
}
function addLoadEvent(lo){
	var oldonload=window.onload;
	if(typeof window.onload!=='function'){
		window.onload=lo;
	}
	else{
		window.onload=function(){
			oldonload();
			lo();
		}
	}
}
function bd(){
	butt1.onclick=stop;
}
addLoadEvent(bd);