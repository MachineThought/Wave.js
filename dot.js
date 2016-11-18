/**
 * [ 特效处理对象 ]
 */
var Wave = (function(){
    /**
     * [ 波纹核心代码 传入json对象，可设置对象、持续时间、定位和持续时间 ]
     * @param  {[json]} params [json对象，包含所需的参数]
     */
    var doWave = function(params){
        // 设置默认值
        var mark = params.mark || "body";
        var cycle = params.cycle || 1000;
        var left = params.left == undefined ? parseInt(Math.random()*100+1)+"%" : params.left+"px";
        var top = params.top == undefined ? parseInt(Math.random()*100+1)+"%" : params.top+"px";
        var startTime = params.startTime || 0;

        // 波纹核心代码
        // 添加波纹特效点 单次执行 可以设置生效时间
        setTimeout(function(){
            $(mark).append('<div class="dot" style="top:'+top+';left:'+left+';"></div>');
            // 移除波纹特效点
            setTimeout(function () {
                $(mark+' .dot:first').remove();
            },cycle);
        },startTime);
    }
    /**
     * [seriesWave 持续的波纹]
     * @param  {[string]} mark      [指定对象的标记，适用于jQuery选择器]
     * @param  {[number]} cycle     [设置波纹持续时间]
     * @param  {[number]} left      [绝对定位 left]
     * @param  {[number]} top       [绝对定位 top]
     * @param  {[number]} startTime [设置生效时间]
     */
    var seriesWave = function(mark, cycle, left, top, startTime){
        doWave({"mark":mark,"cycle":cycle,"left":left,"top":top,"startTime":startTime});
        setTimeout(function(){
            seriesWave(mark,cycle, left, top,startTime);
        },cycle);
    }
    /**
     * 给指定的对象绑定波纹点击事件，波纹事件中心点为鼠标点击处
     * @param  {[string]} mark  [指定对象的标记，适用于jQuery选择器]
     * @param  {[number]} cycle [设置波纹持续时间]
     */
    var clickWave = function(mark, cycle){
        $(mark).on("click",function(e){
            var left = e.pageX - 8;
            var top = e.pageY -8;
            doWave({"mark":mark,"cycle":cycle,"left":left,"top":top});
        })
    }

    return {
        "positionWave":function(mark, cycle, left, top,startTime){
            seriesWave(mark, cycle, left, top,startTime);
        },
        "clickWave":function(mark,cycle){
            clickWave(mark,cycle);
        }
    }
})();

$(window).ready(function () {
    Wave.positionWave(".container",800);
    Wave.positionWave(".container",800,undefined,undefined,500);
    Wave.positionWave(".container",800,undefined,undefined,1000);
    Wave.clickWave(".container",2000);
});
  