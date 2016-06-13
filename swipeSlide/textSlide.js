/**
 * 文字上下轮播
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
;(function($){
	$.fn.textSlide = function(opt){
		var $ele = this;
		var defaults = {
			scrollNum:1,
			time:4000,
			effect:"up"
		}

		var options = $.extend({},defaults,opt);
		var itemLen = Number($ele.find("li").length),
		    itemHeight = $ele.find("li").height();
		for(var i = 0; i < options.scrollNum; i++){
	            $ele.find("ul").append($ele.find("li").eq(i).clone());
	        };
		var curIndex = 0;
		var timer = null;
		timer = setInterval(function() {
		    curIndex++;
		    if (curIndex < (itemLen + 1)) {
		        if (curIndex == itemLen) {
		            $ele.find("ul").animate({
		                "top": -curIndex * itemHeight + "px"
		            }, 400);
		            setTimeout(function() {
		                $ele.find("ul").css({
		                    "top": "0"
		                });
		            }, 500);
		        } else {
		            $ele.find("ul").animate({
		                "top": -curIndex * itemHeight + "px"
		            }, 400);
		        }
		    } else {
		        curIndex = 1;
		        $ele.find("ul").animate({
		            "top": -curIndex * itemHeight + "px"
		        }, 400);
		    }
		}, options.time);
	}
})(Zepto);
