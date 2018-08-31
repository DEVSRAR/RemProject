// 当屏幕变化时
window.onresize = resizeFont
resizeFont();
// 计算当前根元素的字体大小  =  当前屏幕宽度 * 100（根元素字体大小） / 750 (设计稿尺寸)
function resizeFont() {
  var fontSize =  document.documentElement.clientWidth * 100 / 750 
  if (fontSize > 100) {
    fontSize = 100
  }
  document.documentElement.style.fontSize = fontSize + 'px'
}