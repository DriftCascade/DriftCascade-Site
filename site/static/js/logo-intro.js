/* Drift Cascade — animated logo intro. Plays once, then the SVG rests as the static logo.
   Usage: inline drift-cascade-logo.svg, include logo-intro.css + this file. Auto-plays every [data-dc-logo]
   unless it has data-dc-autoplay="false". Manual: DriftCascadeLogo.play(svgEl, {speed:1}). */
(function(){
var NS='http://www.w3.org/2000/svg';
var WARP='cubic-bezier(.3,0,.1,1)', OUT='cubic-bezier(.16,1,.3,1)', SNAP='cubic-bezier(.2,.7,.2,1)';
var TRAILS=[[2,4,7],[3,6,9],[1,5,8]]; // cyan, magenta, amber — near → far
var GHOST_MS=1900, GHOST_GAP=160;
function bb(el){var b=el.getBBox();return {x:b.x,y:b.y,w:b.width,h:b.height,cx:b.x+b.width/2,cy:b.y+b.height/2};}
function rng(seed){return function(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
function jitterKf(rand,amp,ms,step){var kf=[],n=Math.max(2,Math.round(ms/step));kf.push({offset:0,transform:'none',easing:'steps(1,end)'});for(var i=1;i<n;i++){var r=amp*(.45+.55*rand()),t=rand()*Math.PI*2;kf.push({offset:i/n,easing:'steps(1,end)',transform:'translate('+(Math.cos(t)*r).toFixed(2)+'px,'+(Math.sin(t)*r).toFixed(2)+'px)'});}kf.push({offset:1,transform:'none'});return kf;}
function pt(x,y){return {x:x,y:y};}
function quad(A,C,B,t){var u=1-t;return pt(u*u*A.x+2*u*t*C.x+t*t*B.x,u*u*A.y+2*u*t*C.y+t*t*B.y);}
var EP=2.6; function ease(t){return 1-Math.pow(1-t,EP);} function easeInv(f){return 1-Math.pow(1-f,1/EP);}
function fx(svg,S,streaks){
  var old=svg.querySelector('[data-dc-fx]'); if(old) old.remove();
  var g=document.createElementNS(NS,'g'); g.setAttribute('data-dc-fx',''); g.setAttribute('pointer-events','none');
  var R=58,w=3.2,c=S.cx,d=S.cy;
  var star='M'+c+','+(d-R)+'L'+(c+w)+','+(d-w)+'L'+(c+R)+','+d+'L'+(c+w)+','+(d+w)+'L'+c+','+(d+R)+'L'+(c-w)+','+(d+w)+'L'+(c-R)+','+d+'L'+(c-w)+','+(d-w)+'Z';
  g.innerHTML='<defs><radialGradient id="dcFlashGrad"><stop offset="0" stop-color="#fff" stop-opacity="1"></stop><stop offset=".25" stop-color="#cffcff" stop-opacity=".7"></stop><stop offset="1" stop-color="#4cfafd" stop-opacity="0"></stop></radialGradient>'+
   streaks.map(function(s,i){return '<linearGradient id="dcStreakGrad'+i+'" gradientUnits="userSpaceOnUse" x1="'+s.x1+'" y1="'+s.y1+'" x2="'+s.x2+'" y2="'+s.y2+'"><stop offset="0" stop-color="#ffa437" stop-opacity="0"></stop><stop offset=".75" stop-color="#ffa437" stop-opacity=".75"></stop><stop offset="1" stop-color="#fff3dd" stop-opacity="1"></stop></linearGradient>';}).join('')+
   '<filter id="dcTwinkleGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"></feGaussianBlur><feMerge><feMergeNode in="b"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs>'+
   streaks.map(function(s,i){return '<line data-fx="streak" x1="'+s.x1+'" y1="'+s.y1+'" x2="'+s.x2+'" y2="'+s.y2+'" stroke="url(#dcStreakGrad'+i+')" stroke-width="3.2" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" opacity="0"></line>';}).join('')+
   '<circle data-fx="ring" cx="'+streaks.cx+'" cy="'+streaks.cy+'" r="100" fill="none" stroke="#4cfafd" stroke-width="2" opacity="0" style="transform-box:fill-box;transform-origin:center"></circle>'+
   '<circle data-fx="ring" cx="'+streaks.cx+'" cy="'+streaks.cy+'" r="100" fill="none" stroke="#4cfafd" stroke-width="1.2" opacity="0" style="transform-box:fill-box;transform-origin:center"></circle>'+
   '<g data-fx="twinkle" opacity="0" style="transform-box:fill-box;transform-origin:center"><circle cx="'+c+'" cy="'+d+'" r="26" fill="url(#dcFlashGrad)"></circle><path d="'+star+'" fill="#fff" filter="url(#dcTwinkleGlow)"></path></g>'+
   '<circle data-fx="flash" cx="'+c+'" cy="'+d+'" r="130" fill="url(#dcFlashGrad)" opacity="0" style="transform-box:fill-box;transform-origin:center"></circle>';
  svg.appendChild(g); return g;
}
function play(svg,opts){
  opts=opts||{}; var speed=opts.speed||1;
  if(svg.getAnimations) svg.getAnimations({subtree:true}).forEach(function(a){a.cancel();});
  svg.classList.remove('dc-armed');
  if(!opts.force && window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return [];
  var q=function(s){return svg.querySelector(s);}, qa=function(s){return Array.prototype.slice.call(svg.querySelectorAll(s));};
  var list=[];
  function a(el,kf,o){var an=el.animate(kf,{fill:o.fill||'backwards',easing:o.easing||'linear',duration:o.duration/speed,delay:(o.delay||0)/speed});list.push(an);return an;}
  var lead=q('[data-dc=lead]'), thr=q('[data-dc=thrusters]'), ship=lead.parentNode, L=bb(lead), S=bb(ship), T=bb(thr);
  // heading: thruster centre → nose (top-right tip of the hull)
  var nose=pt(L.x+L.w,L.y), hx=nose.x-T.cx, hy=nose.y-T.cy, hl=Math.hypot(hx,hy); hx/=hl; hy/=hl;
  var D=380, eng=Array.prototype.slice.call(thr.children).map(function(p){var b=bb(p);return pt(b.cx,b.cy);});
  var streaks=eng.map(function(e){return {x1:e.x-hx*D,y1:e.y-hy*D,x2:e.x,y2:e.y};}); streaks.cx=L.cx; streaks.cy=L.cy;
  var g=fx(svg,S,streaks), rand=rng(7);
  // 1. Twinkle at the destination, collapses, ship shoots in from a point along its heading
  var tw=g.querySelector('[data-fx=twinkle]');
  a(tw,[{opacity:0,transform:'scale(.1) rotate(-30deg)'},{opacity:1,transform:'scale(1) rotate(0deg)',offset:.45,easing:'ease-in'},{opacity:1,transform:'scale(1.08) rotate(8deg)',offset:.7,easing:'cubic-bezier(.6,0,.9,.4)'},{opacity:0,transform:'scale(0) rotate(45deg)'}],{duration:620,delay:40,easing:'ease-out'});
  var shoot=560, sh=440;
  ship.style.transformBox='fill-box'; ship.style.transformOrigin='center';
  a(ship,[{opacity:0,transform:'translate('+(-hx*D)+'px,'+(-hy*D)+'px) scale(.04)'},{opacity:1,offset:.12},{opacity:1,transform:'none'}],{duration:sh,delay:shoot,easing:WARP});
  g.querySelectorAll('[data-fx=streak]').forEach(function(sk){a(sk,[{opacity:1,strokeDashoffset:1,easing:WARP},{opacity:1,strokeDashoffset:0,offset:.58,easing:'ease-in'},{opacity:0,strokeDashoffset:-1}],{duration:sh/.58,delay:shoot});});
  var arrive=shoot+sh*.55;
  a(g.querySelector('[data-fx=flash]'),[{opacity:0,transform:'scale(.2)'},{opacity:.9,transform:'scale(.55)',offset:.15},{opacity:0,transform:'scale(1.5)'}],{duration:600,delay:arrive,easing:'ease-out'});
  var arc=q('[data-dc=arc]'); arc.style.transformOrigin='center bottom';
  a(arc,[{opacity:0,transform:'scale(.965)'},{opacity:1,transform:'none'}],{duration:1100,delay:arrive+40,easing:OUT});
  // 2. One projection ghost per colour flies a smooth arc off the nose, stamping three copies, then fades out
  var last=0, t0=arrive-30, copies=[];
  TRAILS.forEach(function(trail,ti){
    var els=trail.map(function(n){return q('[data-dc=ship][data-n="'+n+'"]');}), B=els.map(bb), c=B.map(function(b){return pt(b.cx,b.cy);});
    var P0=pt(L.cx,L.cy), Pe=pt(c[2].x+(c[2].x-c[1].x)*.95,c[2].y+(c[2].y-c[1].y)*.95), C=pt(2*c[1].x-(P0.x+Pe.x)/2,2*c[1].y-(P0.y+Pe.y)/2);
    var N=160, P=[], len=[0];
    for(var i=0;i<=N;i++){P.push(quad(P0,C,Pe,i/N)); if(i) len.push(len[i-1]+Math.hypot(P[i].x-P[i-1].x,P[i].y-P[i-1].y));}
    var tot=len[N];
    function at(f){var s=f*tot,i=1;while(i<N&&len[i]<s)i++;var k=(s-len[i-1])/((len[i]-len[i-1])||1);return {p:pt(P[i-1].x+(P[i].x-P[i-1].x)*k,P[i-1].y+(P[i].y-P[i-1].y)*k),tx:P[i].x-P[i-1].x,ty:P[i].y-P[i-1].y};}
    var fk=c.map(function(cc){var bi=0,bd=1e9;P.forEach(function(p,i){var dd=Math.hypot(p.x-cc.x,p.y-cc.y);if(dd<bd){bd=dd;bi=i;}});return len[bi]/tot;});
    var sc=[{f:0,s:Math.min(2,L.h/B[0].h)},{f:fk[0],s:1},{f:fk[1],s:B[1].h/B[0].h},{f:fk[2],s:B[2].h/B[0].h},{f:1,s:B[2].h/B[0].h*.75}];
    function scaleAt(f){for(var i=1;i<sc.length;i++)if(f<=sc[i].f){var k=(f-sc[i-1].f)/((sc[i].f-sc[i-1].f)||1);return sc[i-1].s+(sc[i].s-sc[i-1].s)*k;}return sc[sc.length-1].s;}
    var ghost=els[0].cloneNode(true); ['data-dc','data-n','opacity'].forEach(function(x){ghost.removeAttribute(x);});
    ghost.setAttribute('data-fx','ghost'); ghost.setAttribute('opacity','0'); ghost.style.transformBox='fill-box'; ghost.style.transformOrigin='center'; g.appendChild(ghost);
    var d=t0+ti*90, tFar=easeInv(fk[2]), kf=[];
    for(var s=0;s<=36;s++){var t=s/36,f=ease(t),A=at(f),op=t<.06?t/.06:t<=tFar?1:Math.max(0,1-(t-tFar)/(1-tFar));kf.push({offset:t,opacity:op,transform:'translate('+(A.p.x-c[0].x)+'px,'+(A.p.y-c[0].y)+'px) scale('+scaleAt(f)+')'});}
    a(ghost,kf,{duration:GHOST_MS,delay:d}).finished.then(function(){ghost.remove();},function(){});
    els.forEach(function(el,k){
      var A=at(fk[k]), tl=Math.hypot(A.tx,A.ty)||1, back=12, sx=A.p.x-A.tx/tl*back, sy=A.p.y-A.ty/tl*back;
      var rest=parseFloat(getComputedStyle(el).opacity)||1, when=d+easeInv(fk[k])*GHOST_MS; el.style.transformOrigin='center';
      var tr='translate('+(sx-c[k].x)+'px,'+(sy-c[k].y)+'px)', tot2=when+950, ow=when/tot2;
      a(el,[{opacity:0,transform:tr},{opacity:0,transform:tr,offset:ow},{opacity:1,transform:tr,offset:Math.min(1,ow+.004),easing:OUT},{opacity:rest,transform:'none'}],{duration:tot2,delay:0});
      copies.push({el:el,when:when}); last=Math.max(last,when+950);
    });
  });
  // 3. Ripple: a shockwave rings out from the lead ship; as it passes each copy the tracking jitter locks and the ship surges bright
  var sheenAt=last+80, O=pt(L.cx,L.cy), SPEED=.55; // units per ms
  function arriveAt(b){return sheenAt+Math.hypot(b.cx-O.x,b.cy-O.y)/SPEED;}
  copies.forEach(function(cp){var inner=cp.el.firstElementChild||cp.el,st=cp.when+20,end=arriveAt(bb(cp.el));inner.style.transformBox='fill-box';inner.style.transformOrigin='center';
    if(end>st+80){var sg=rand()<.5?-1:1,rot=sg*(2+rand()*2.5),ang=rand()*Math.PI*2,m=2.5+rand()*2.5,dx0=(Math.cos(ang)*m).toFixed(2),dy0=(Math.sin(ang)*m).toFixed(2);
      a(inner,[{transform:'translate('+dx0+'px,'+dy0+'px) rotate('+rot.toFixed(2)+'deg)'},{transform:'none'}],{duration:end-st,delay:st,easing:'cubic-bezier(.3,.1,.7,.9)'});}});
  g.querySelectorAll('[data-fx=ring]').forEach(function(ring,i){a(ring,[{opacity:0,transform:'scale(.02)',strokeWidth:i?2:5},{opacity:i?.4:.75,offset:.08},{opacity:0,transform:'scale(6.5)',strokeWidth:.5}],{duration:650/SPEED,delay:sheenAt+i*150,easing:'linear'});});
  [lead].concat(qa('[data-dc=ship]')).forEach(function(el){
    var b=bb(el), inner=el.firstElementChild||el, dx=b.cx-O.x, dy=b.cy-O.y, dl=Math.hypot(dx,dy)||1, ux=dx/dl, uy=dy/dl, P=el===lead?3:7;
    inner.style.transformBox='fill-box'; inner.style.transformOrigin='center';
    a(inner,[{transform:'none',filter:'brightness(1)'},{transform:'translate('+ux*P+'px,'+uy*P+'px) scale(1.06)',filter:'brightness(3.2)',offset:.22},{transform:'translate('+(-ux*P*.35)+'px,'+(-uy*P*.35)+'px) scale(.985)',filter:'brightness(1.5)',offset:.5},{transform:'translate('+ux*P*.12+'px,'+uy*P*.12+'px)',filter:'brightness(1.15)',offset:.75},{transform:'none',filter:'brightness(1)'}],{duration:760,delay:el===lead?sheenAt:arriveAt(b),easing:'ease-out',fill:'none'});
  });
  Array.prototype.forEach.call(q('[data-dc=arc]').children,function(ch){a(ch,[{filter:'brightness(1)'},{filter:'brightness(1.9)',offset:.3},{filter:'brightness(1)'}],{duration:900,delay:sheenAt+260/SPEED*.6,easing:'ease-out'});});
  // 4. The same wavefront reveals the text: each glyph surges in as the ring passes it
  function reveal(p,col,lift,dur){var b=bb(p),t=arriveAt(b),dx=b.cx-O.x,dy=b.cy-O.y,dl=Math.hypot(dx,dy)||1;p.style.transformBox='fill-box';p.style.transformOrigin='center';
    a(p,[{opacity:0,transform:'translate('+(-dx/dl*lift)+'px,'+(-dy/dl*lift)+'px) scale(.9)',fill:'#4cfafd',filter:'brightness(2.2)'},{opacity:1,transform:'translate('+(dx/dl*lift*.4)+'px,'+(dy/dl*lift*.4)+'px) scale(1.04)',fill:'#4cfafd',filter:'brightness(1.8)',offset:.3},{opacity:1,transform:'none',fill:col,filter:'brightness(1)'}],{duration:dur,delay:t-60,easing:'ease-out'});}
  qa('[data-dc=title] path').forEach(function(p){reveal(p,'#f4f0e1',8,620);});
  qa('[data-dc=tagline] path').forEach(function(p){reveal(p,'#f4f0e1',5,520);});
  var ul=q('[data-dc=underline]'), ub=bb(ul); ul.style.transformOrigin='center';
  a(ul,[{opacity:0,transform:'scaleX(0)'},{opacity:1,transform:'scaleX(1)'}],{duration:620,delay:arriveAt({cx:ub.cx,cy:ub.y})-80,easing:OUT});
  qa('[data-dc=dot]').forEach(function(d){d.style.transformOrigin='center';a(d,[{opacity:0,transform:'scale(0)'},{opacity:1,transform:'scale(1.8)',offset:.5},{opacity:1,transform:'none'}],{duration:380,delay:arriveAt(bb(d))-40,easing:'ease-out'});});
  return list;
}
function init(){Array.prototype.forEach.call(document.querySelectorAll('[data-dc-logo]'),function(svg){if(svg.getAttribute('data-dc-autoplay')!=='false')play(svg);});}
window.DriftCascadeLogo={play:play,init:init};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
