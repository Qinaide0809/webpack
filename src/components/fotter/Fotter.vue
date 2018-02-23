<template>
	<footer class="fotter">
		
			<!--<ul class="container footer-nav">
				<li><i class="fa fa-android footi"></i><i class="fa fa-weixin footi"></i><i class="fa fa-html5 footi"></i></li>
				<li>© 2016 鲜橙信息科技有限公司</li>
				<li><i class="fa fa-hospital-o"></i> 万达广场F座812室</li>
				<li><i class="fa fa-phone"></i> 021-3232322</li>
				<li> 沪ICP备15041839号</li>
			</ul>-->
			
	</footer>
</template>

<style>
	.fotter {
		/*position: fixed;
    	bottom: 0px;*/
		z-index: 9;
		display: none;
		width: 100%;
		background: #000000;
		color: #FFFFFF;
		min-height: 68px;
		float: left;
	}
</style>

<script>
	module.exports = {
		data: function() {
			return {
				msg: "我就是尾部",

			};
		},
	};
</script>