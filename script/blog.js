Vue.component("sing",{
	template:"<div id='single'><input type='text' v-model='search' placeholder='请输入你要搜索的内容'><div class='single-blog' v-for='blog in blogs_filter'><h2>{{blog.title}}</h2><artical>{{blog.blog}}</artical></div></div>",
	data:function(){
		return{
			blogs:[],
			search:''
		}
	},
	created:function(){
		this.$http.get('https://e6rx.cn/blogget').then((data)=>{
			this.blogs=data.body;
		})
	},
	computed:{
		blogs_filter:function(){
			return this.blogs.filter((val,index)=>{
				return val.title.includes(this.search);
			})
		}
	}
})
Vue.component("write",{
	template:"<div id='write'><label>标题：</label><input type='text' v-model='title'><textarea v-model='blog'></textarea><button v-on:click='submit'>提交</button></div>",
	data:function(){
		return{
			blog:'',
			title:''
		}
	},
	methods:{
		submit:function(){
			this.$http.post('https://e6rx.cn/blogs',{
				title:this.title,
				blog:this.blog
			}).then((function(){
					//console.log(this.title,this.blog);
					alert("提交成功");			
				})()
			);
		}
	}
})
const see={
	template:"<sing></sing>"
}
const wri={
	template:"<write></write>"
}
const Routes=[{path:"/blog",component:see},
              {path:"/blog/wri",component:wri}];
const router=new VueRouter({
	mode: 'history',
	routes:Routes
});
new Vue({
	el:"#con",
	router:router
})