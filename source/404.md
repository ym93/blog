---
title: 404
date: 2017-05-14 16:39:34
---

<style>
.post-header {
	display: none;
}
.posts-expand {
	padding-top: 0;
}
.headline {
	font-size: 45px;
	text-align: center;
	color: #555;
}
.tips {
	text-align: center;
}
@media screen and (max-width: 480px) {
	.headline {
		font-size: 80px;
	}
}
</style>

<div class="headline">未找到</div>

<div class="tips">页面离家出走了，<span id="time"></span> 秒后返回首页。</div>

<script>
var seconds = 5;
var element = document.getElementById('time');
function countdown() {
	if (seconds >= 0) {
		element.innerHTML = seconds--;
	} else {
		window.location.href = '/';
	}
	setTimeout(function(){
		countdown();
	}, 1000);
}
countdown();
</script>