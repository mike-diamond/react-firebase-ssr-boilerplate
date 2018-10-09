const scrollTo = (o,n) => {window.requestAnimFrame = (() => {
  return window.requestAnimationFrame  ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function (callback) {
      setTimeout(callback, 1000 / 60)
    }
})();function a(){t+=1/60;var n=t/c,l=i(n);1>n?(requestAnimFrame(a),window.scrollTo(0,r+(o-r)*l)):window.scrollTo(0,o)}var r=window.scrollY,o=o||0,n=n||2e3,t=0,c=Math.max(.1,Math.min(Math.abs(r-o)/n,.8)),i=function(o){return-.5*(Math.cos(Math.PI*o)-1)};a()}


export default scrollTo
