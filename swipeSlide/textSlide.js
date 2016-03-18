/**
 * 文字上下轮播
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
;(function($){
	$.fn.textSlide = function(opt){
		var $ele = this;
		var defaults = {
			time:4000,
			effect:"up"
		}

		var options = $.extend({},defaults,opt);
		var first = $ele.find("li").eq(0).clone();
		$ele.find("ul").append(first);
		var itemLen = Number($ele.find("li").length),
		    itemHeight = $ele.find("li").height();
		var curIndex = 0;
		var timer = null;
		timer = setInterval(function() {
		    curIndex++;
		    if (curIndex < itemLen) {
		        if (curIndex == (itemLen - 1)) {
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