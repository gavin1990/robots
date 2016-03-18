/**
 * imgSlide
 * 2016/03/17
 * robots
 * for Zepto
 */
;(function($,win){
	'use strict';
	
	win.clientW = document.documentElement.clientWidth;
	var slideFn = function(ele,opt){
		this.$element = ele,
		this.itemLength = this.$element.find("li").size(),
		this.timer = null,
		this.defaults = {
			effect:"fade",  //fade 淡入淡出，leftLoop 左右轮播
			autoplay:true,
			speed:500,
			time:3000
		},
		this.options = $.extend({}, this.defaults, opt)
	};

	slideFn.prototype = {
		init:function(){
			var _self = this;
			_self.isSlideing = true;

			//轮播效果判断  初始化换样式
			if(this.options.effect == "fade"){
				this.$element.find("li").not(".current").css({"opacity":"0"});
			}else if(this.options.effect == "leftLoop"){
				this.$element.find("li").eq(0).removeClass('current');
				this.$element.append(this.$element.find("li").eq(0).clone());
				this.$element.prepend(this.$element.find("li").eq(-2).clone());
				this.$element.find("li").each(function(i){
					var $this = $(this);
					$this.css({
						"-webkit-transform":"translateX("+i * clientW +"px)",
						"transform":"translateX("+(i-1) * clientW +"px)"
					})
				})
			}

			// Touch事件触发  基于Zepto Touch事件
			this.$element.find("li").on("swipeLeft",function(e) {
				e.stopPropagation();
				var _this = $(this),cur = _this.parent().attr("data-li");
				_self.next(_this,cur);
			});
			this.$element.find("li").on("swipeRight",function(e) {
				e.stopPropagation();
				var _this = $(this),cur = _this.parent().attr("data-li");
				_self.prev(_this,cur);
			});

			if(this.options.autoplay) _self.autoPlay(this.$element);
		},
		/**
		 * 下张图片方法
		 * @param  {Object}   item  touch element
		 * @param  {Number}   index 当前索引
		 * @return {Function}       [description]
		 */
		next:function(item,index){
			var _self = this;
			var isTran = true;
			if(_self.isSlideing){		//控制滚动间隔
				_self.isSlideing = false;
				clearInterval(this.timer);		//触发时清除定时器
				index++;
				var cur = index-1;
				if(index <= 0){
					index = Math.abs(index);
				}
				if(index > this.itemLength){
					if(this.options.effect == "leftLoop"){
						item.parent().animate({"-webkit-transform":"translateX(-"+(index - 1) * clientW+"px)","transform":"translateX(-"+(index - 1) * clientW+"px)"},400,"ease-in-out",_self.setSlideing());
					}
					index = 1;
					isTran = false;
					setTimeout(function(){
						item.parent().css({"-webkit-transform":"translateX(0)","transform":"translateX(0)"});
					},500);
				}

				item.parent().attr("data-li",index);
				item.parent().siblings("ol").find("li").eq(index-1).addClass("cur").siblings().removeClass("cur");
				if(this.options.effect == "fade"){
					item.animate({"opacity": 0,"z-index":900},500).parent().find("li").eq(index-1).animate({"opacity": 1,"z-index":910},this.options.speed,"linear",_self.setSlideing());
				}else if(this.options.effect == "leftLoop" && isTran){ //左右轮播是否滚动到最后
					item.parent().animate(
						{"-webkit-transform":"translateX(-"+(index - 1) * clientW+"px)","transform":"translateX(-"+(index - 1) * clientW+"px)"}
						,400,"ease-in-out",_self.setSlideing());
				}

				if(this.options.autoplay)		//重新加载定时器
					_self.autoPlay(this.$element);
				
			}
		},
		/**
		 * 上一张图片方法
		 * @param  {Object} item  [description]
		 * @param  {Number} index [description]
		 * @return {[type]}       [description]
		 */
		prev:function(item,index){
			var _self = this;
			var isTran = true,itemSum = this.itemLength;
			if(_self.isSlideing){		//控制滚动间隔
				_self.isSlideing = false;
				clearInterval(this.timer);		//触发时清除定时器
				index--;
				if(index == 0){
					if(this.options.effect == "leftLoop"){
						item.parent().animate({"-webkit-transform":"translateX("+(index + 1) * clientW+"px)","transform":"translateX("+(index + 1) * clientW+"px)"},400,"ease-in-out",_self.setSlideing());
					}
					index = this.itemLength;
					isTran = false;

					setTimeout(function(){
						item.parent().css({"-webkit-transform":"translateX(-"+(itemSum-1) * clientW+"px)","transform":"translateX(-"+(itemSum-1) * clientW+"px)"});
					},500);
				}else{
					index = Math.abs(index);
				}
				item.parent().attr("data-li",index);
				item.parent().siblings("ol").find("li").eq(index-1).addClass("cur").siblings().removeClass("cur");
				if(this.options.effect == "fade"){
					item.animate({"opacity": 0,"z-index":900},500).parent().find("li").eq(index-1).animate({"opacity": 1,"z-index":910},this.options.speed,"linear",_self.setSlideing());
				}else if(this.options.effect == "leftLoop" && isTran){ //左右轮播是否滚动到最前面一个
					item.parent().animate({"-webkit-transform":"translateX(-"+(index - 1) * clientW+"px)","transform":"translateX(-"+(index - 1) * clientW+"px)"},400,"ease-in-out",_self.setSlideing());
				}

				if(this.options.autoplay) 		//重新加载定时器
					_self.autoPlay(this.$element);
			}
		},
		/**
		 * 自动轮播
		 * @param  {Object} ele  [description]
		 * @return {[type]} [description]
		 */
		autoPlay:function(ele){
			var _self = this;
			this.timer = setInterval(function(){
				var curIndex = ele.attr("data-li"),item = ele.find("li");
				_self.next(item,curIndex);
			},this.options.time)
		},
		setSlideing:function(){
			var _self = this;
			setTimeout(function(){
				return _self.isSlideing = true;		//滚动控制
			}, 300);
		}
	}

	$.fn.imgSlide = function(options){
		var swipeSlide = new slideFn(this,options);
		return swipeSlide.init();
	}
})(Zepto,window);