Vue.component("nav_left",{
	template:"<nav><ul><li><router-link to='/main'>客户资料</router-link></li><li><router-link to='/main/xs'>报价信息</router-link></li></ul></nav>"
})
Vue.component("table_kh",{
	template:"<table><thead><th>客户名称</th><th>客户经理</th><th>备注</th></thead><tbody><tr v-for='customer in customers'><td>{{customer.khmc}}</td><td>{{customer.khjl}}</td><td>{{customer.bz}}</td></tr></tbody></table>",
	data:function(){
		return{
			customers:[]
		}
	},
	created:function(){
		this.$http.get('https://e6rx.cn/fp').then((data)=>{
			console.log(data)
			this.customers=data.body[0];
			//console.log(customers);
		});
	}
})
Vue.component("table_xs",{
	template:"<div><div id='select'><label>客户名称:<label><select v-model='selected'><option v-for='kh in khs' v-bind:value='kh'>{{kh}}</option></select><label>月份:<label><select v-model='selected_month'><option v-for='mon in mons' v-bind:value='mon'>{{mon}}</option></select></div><table><thead><th>客户名称</th><th>月份</th><th>价格</th><th>数量</th><th>领导审批价格</th><th>需求</th><th>备注</th></thead><tbody><tr v-for='xs in filterxss'><td>{{xs.khmc}}</td><td>{{xs.MONTH}}</td><td>{{xs.price}}</td><td>{{xs.num}}</td><td>{{xs.price_ld}}</td><td>{{xs.xq}}</td><td>{{xs.bz}}</td></tr></tbody></table></div>",
	data:function(){
		return{
			xss:[],
			khs:[],
			mons:[],
			selected:"全选",
			selected_month:"全选"
		}
	},
	created:function(){
		this.$http.get('https://e6rx.cn/xsall').then((data)=>{
			//console.log(data)
			this.xss=data.body;
			this.khs=Array.of(...new Set(this.xss.map((val,index)=>{return val.khmc})));
			this.mons=Array.of(...new Set(this.xss.map((val,index)=>{return val.MONTH})));
			this.khs.push("全选");
			this.mons.push("全选");
			//console.log(this.khs);
		});
	},
	computed:{
		filterxss:function(){
			return this.xss.filter((val,index)=>{
				if(this.selected==="全选"&&this.selected_month==="全选"){
					return true;
				}
				else if(this.selected_month==="全选"){
					return val.khmc===this.selected;					
				}
				else if(this.selected==="全选"){
					return val.MONTH===this.selected_month;					
				}
				else{
					return val.khmc===this.selected&&val.MONTH===this.selected_month;
				}
			})
		}	
	}
})
const table_khh={
	template:"<table_kh></table_kh>"
};
const table_xss={
	template:"<table_xs></table_xs>"
};
const Routes=[{path:"/main",component:table_khh},
              {path:"/main/xs",component:table_xss}];
const router=new VueRouter({
	mode: 'history',
	routes:Routes
});
var box=new Vue({
	el:"#box",
	router:router
})
