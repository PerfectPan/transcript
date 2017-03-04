 //控制自适应
!(function(doc, win) {
    var docEle = doc.documentElement,//获取html元素
        event = "onorientationchange" in window ? "orientationchange" : "resize",//判断是屏幕旋转还是resize;
        fn = function() {
            var width = docEle.clientWidth;
            width && (docEle.style.fontSize = 100 * (width / 1125) + "px");//设置html的fontSize，随着event的改变而改变。
        };
     
    win.addEventListener(event, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);
 
}(document, window));
$('body').prepend('<div class="spinner">\
  		<div class="bounce1"></div>\
  		<div class="bounce2"></div>\
  		<div class="bounce3"></div>\
	</div>');
$(function () {
	$.ajax({
		type:"GET",
		url:"http://report.hduhelp.com/index.php/ReportCard/getinfo",
		dataType:"json",
		success:function(data){
			if (data.err==0){
				var length=5.9-(data.data.name.length-2)*0.65;
				$('.page-2-name').css("margin-left",length+"rem");
				$('.page-2-name').text(data.data.name);
				$('.page-2-year').text(2017-data.data.years);
				$('.page-3-curr').text(data.data.years*2-1);
				$('.page-3-credit').text(data.data.credit_total);
				if (data.data.credit_total<100)  $('.page-3-credit').css("left","4.2rem");
				$('.page-3-course').text(data.data.course_total);
				$('.page-5-best').html('<p>'+data.data.best_course+'</p>');
				$('.page-5-worst').html('<p>'+data.data.worst_course+'</p>');
				if (data.data.num_90>=1){
					$('.page-6-best').text(data.data.num_90);
					$('.page-6-level').text("90");
				} else{
					$('.page-6-best').text(data.data.num_80);
					$('.page-6-level').text("80");
				}
				$('.page-6-fail').text(data.data.num_fail);
				$('.page-9-GPA').text(data.data["gpa.16.1"]);
				$('.page-9-per').text(data.data.percentage);
				var per=data.data.percentage;
				if (per>=90) $('.page-9-sign-1').css("display","block");
				else if (per>=70 && per<90) $('.page-9-sign-2').css("display","block");
				else if (per>=50 && per <70) $('.page-9-sign-3').css("display","block");
				else $('.page-9-sign-4').css("display","block");
				var dataChart=[];
 				dataChart.push(data.data["gpa.14.1"]);
				dataChart.push(data.data["gpa.14.2"]);
				dataChart.push(data.data["gpa.15.1"]);
				dataChart.push(data.data["gpa.15.2"]);
				dataChart.push(data.data["gpa.16.1"]);
 				$('#container').highcharts({
    				title: {
            			text:"",
        			},
        			chart: {
        				backgroundColor: 'rgba(0,0,0,0)',
            			animation: {
                			duration: 1500,
                			easing: 'easeOutBounce'
            			}
        			},
        			yAxis: {
        				title: {
            				text: ''
        				},
        				tickPositions: [0, 1, 2, 3,4,5] 
    				},
        			xAxis: {
        				title: {
            				text: ''
        				},
            			categories: ['14-1', '14-2', '15-1', '15-2', '16-1']
        			},
        			series: [{
        				name:'GPA',
            			data:dataChart
        			}]
    			});
				$('.page-7-GPA').text(data.data.gpa_ave);
				// $('.page-7-per').text(data.data.gpa_ave);
			}
			else if (data.err==1){
				alert("请先绑定教务系统，再来查看你的成绩单~");
				window.location.href= "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx053a994c0608a2ff&redirect_uri=http%3A%2F%2Fwx.hduhelp.com%2Fwx_api%2Findex.php%3Fc%3Dauth%26m%3Dsnsapi_base&response_type=code&scope=snsapi_base&state=bindstuno"; 
			}
		},
		error:function(){
			alert("请求超时，请重试！");
		},
		complete:function(){
			$('.spinner').remove();
		}
	});
	//Page配置
	var Page = (function() {
		var config = {
			$bookBlock : $( '#bb-bookblock' ),
			$navNext : $( '#bb-nav-next' ),
			$navPrev : $( '#bb-nav-prev' ),
			$navFirst : $( '#bb-nav-first' ),
			$navLast : $( '#bb-nav-last' )
		},
		init = function() {
			config.$bookBlock.bookblock( {
					speed : 500,
					shadowSides : 0.8,
					shadowFlip : 0.7
				} );
				initEvents();
			},
		initEvents = function() {
				
			var $slides = config.$bookBlock.children();

				// add navigation events
				config.$navNext.on( 'click touchstart', function() {
					config.$bookBlock.bookblock( 'next' );
					i++;
					var cur=".circle-"+i;
					var before=".circle-"+(i-1);
					if (i<=8){
						$(before).css("background-color","#dad7d5");
						$(cur).css("background-color","#eccbb2");
					}
					else {
						i=8;
					}
					// $('.circle').delay(6000).hide(0);
					return false;
				} );

				config.$navPrev.on( 'click touchstart', function() {
					config.$bookBlock.bookblock( 'prev' );
					i--;
					var cur=".circle-"+i;
					var after=".circle-"+(i+1);
					if (i>=1){
						$(after).css("background-color","#dad7d5");
						$(cur).css("background-color","#eccbb2");
					}
					else {
						i=1;
					}			
					return false;
				} );

				config.$navFirst.on( 'click touchstart', function() {
					config.$bookBlock.bookblock( 'first' );
					$(".circle-8").css("background-color","#dad7d5");
					$(".circle-1").css("background-color","#eccbb2");
					i=1;
					return false;
				} );

				config.$navLast.on( 'click touchstart', function() {
					config.$bookBlock.bookblock( 'last' );
					return false;
				} );
						
				// add swipe events
				$slides.on( {
					'swipeleft' : function( event ) {
									config.$bookBlock.bookblock( 'next' );
									return false;
								},
					'swiperight' : function( event ) {
									config.$bookBlock.bookblock( 'prev' );
									return false;
					}
				} );		

				// add keyboard events
				$( document ).keydown( function(e) {
					var keyCode = e.keyCode || e.which,
					arrow = {
						left : 37,
						up : 38,
						right : 39,
						down : 40
				};

				switch (keyCode) {
					case arrow.left:
							config.$bookBlock.bookblock( 'prev' );
							break;
					case arrow.right:
							config.$bookBlock.bookblock( 'next' );
							break;
					}
				} );
			};

			return { init : init };
	})();
	Page.init();
	i=1;
});
