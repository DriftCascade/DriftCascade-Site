/* Drift Cascade — nav mini-logo intro (~2.2s) + hover pulse. Same story as the hero, compressed.
   Auto-plays every [data-dc-logo-mini] unless data-dc-autoplay="false". Hover on the svg (or its closest <a>) replays the pulse.
   Manual: DriftCascadeLogoMini.play(svg,{speed}), DriftCascadeLogoMini.pulse(svg).
   Ships drift slowly forever after load. A [data-dc-logo-text] element inside the same <a> gets the ripple too: it carries on past the svg and sweeps the letters. */
(function(){
var NS='http://www.w3.org/2000/svg', OUT='cubic-bezier(.16,1,.3,1)', WARP='cubic-bezier(.3,0,.1,1)';
var GHOST_MS=1050, EP=2.6, SPEED=.42, TEXT_PX_MS=.5;
function bb(el){var b=el.getBBox();return {x:b.x,y:b.y,w:b.width,h:b.height,cx:b.x+b.width/2,cy:b.y+b.height/2};}
function pt(x,y){return {x:x,y:y};}
function quad(A,C,B,t){var u=1-t;return pt(u*u*A.x+2*u*t*C.x+t*t*B.x,u*u*A.y+2*u*t*C.y+t*t*B.y);}
function ease(t){return 1-Math.pow(1-t,EP);} function easeInv(f){return 1-Math.pow(1-f,1/EP);}
function rng(seed){return function(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
function fx(svg,S,streaks,O){
  var old=svg.querySelector('[data-dc-fx]'); if(old) old.remove();
  var g=document.createElementNS(NS,'g'); g.setAttribute('data-dc-fx',''); g.setAttribute('pointer-events','none');
  var R=46,w=4,c=S.cx,d=S.cy;
  var star='M'+c+','+(d-R)+'L'+(c+w)+','+(d-w)+'L'+(c+R)+','+d+'L'+(c+w)+','+(d+w)+'L'+c+','+(d+R)+'L'+(c-w)+','+(d+w)+'L'+(c-R)+','+d+'L'+(c-w)+','+(d-w)+'Z';
  g.innerHTML='<defs><radialGradient id="dcmFlash"><stop offset="0" stop-color="#fff"></stop><stop offset=".25" stop-color="#cffcff" stop-opacity=".7"></stop><stop offset="1" stop-color="#4cfafd" stop-opacity="0"></stop></radialGradient>'+
   streaks.map(function(s,i){return '<linearGradient id="dcmStreak'+i+'" gradientUnits="userSpaceOnUse" x1="'+s.x1+'" y1="'+s.y1+'" x2="'+s.x2+'" y2="'+s.y2+'"><stop offset="0" stop-color="#ffa437" stop-opacity="0"></stop><stop offset=".75" stop-color="#ffa437" stop-opacity=".8"></stop><stop offset="1" stop-color="#fff3dd"></stop></linearGradient>';}).join('')+'</defs>'+
   streaks.map(function(s,i){return '<line data-fx="streak" x1="'+s.x1+'" y1="'+s.y1+'" x2="'+s.x2+'" y2="'+s.y2+'" stroke="url(#dcmStreak'+i+')" stroke-width="6" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" opacity="0"></line>';}).join('')+
   '<g data-fx="twinkle" opacity="0" style="transform-box:fill-box;transform-origin:center"><circle cx="'+c+'" cy="'+d+'" r="24" fill="url(#dcmFlash)"></circle><path d="'+star+'" fill="#fff"></path></g>'+
   '<circle data-fx="flash" cx="'+c+'" cy="'+d+'" r="110" fill="url(#dcmFlash)" opacity="0" style="transform-box:fill-box;transform-origin:center"></circle>';
  svg.appendChild(g); return g;
}
function ringFx(svg,O,list,speed,at){
  var g=svg.querySelector('[data-dc-fx]'); if(!g){g=document.createElementNS(NS,'g');g.setAttribute('data-dc-fx','');g.setAttribute('pointer-events','none');svg.appendChild(g);}
  Array.prototype.forEach.call(g.querySelectorAll('[data-fx=ring]'),function(r){r.remove();});
  [0,1].forEach(function(i){
    var r=document.createElementNS(NS,'circle'); r.setAttribute('data-fx','ring'); r.setAttribute('cx',O.x); r.setAttribute('cy',O.y); r.setAttribute('r','100'); r.setAttribute('fill','none'); r.setAttribute('stroke','#4cfafd'); r.setAttribute('opacity','0'); r.style.transformBox='fill-box'; r.style.transformOrigin='center'; g.appendChild(r);
    list.push(r.animate([{opacity:0,transform:'scale(.02)',strokeWidth:i?4:9},{opacity:i?.45:.85,offset:.08},{opacity:0,transform:'scale(3.2)',strokeWidth:1.5}],{duration:320/SPEED/speed,delay:(at+i*120)/speed,fill:'backwards',easing:'linear'}));
  });
}
function surge(el,O,at,speed,list,isLead){
  var b=bb(el), inner=el.firstElementChild||el, dx=b.cx-O.x, dy=b.cy-O.y, dl=Math.hypot(dx,dy)||1, ux=dx/dl, uy=dy/dl, P=isLead?3:8;
  inner.style.transformBox='fill-box'; inner.style.transformOrigin='center';
  list.push(inner.animate([{transform:'none',filter:'brightness(1)'},{transform:'translate('+ux*P+'px,'+uy*P+'px) scale(1.07)',filter:'brightness(3)',offset:.22},{transform:'translate('+(-ux*P*.35)+'px,'+(-uy*P*.35)+'px) scale(.985)',filter:'brightness(1.5)',offset:.5},{transform:'none',filter:'brightness(1)'}],{duration:620/speed,delay:at/speed,easing:'ease-out',fill:'none'}));
}
function parts(svg){var q=function(s){return svg.querySelector(s);};var lead=q('[data-dc=lead]');return {q:q,lead:lead,ships:Array.prototype.slice.call(svg.querySelectorAll('[data-dc=ship]')),L:bb(lead)};}
function letters(svg){
  var host=svg.closest('a'), t=host&&host.querySelector('[data-dc-logo-text]'); if(!t) return [];
  if(!t.hasAttribute('data-dc-split')){
    var txt=t.textContent; t.textContent=''; t.setAttribute('data-dc-split','');
    txt.split('').forEach(function(ch){var s=document.createElement('span');s.textContent=ch;s.style.display='inline-block';s.style.whiteSpace='pre';t.appendChild(s);});
  }
  return Array.prototype.slice.call(t.children);
}
// ripple reaches the first letter at ring speed, then sweeps the rest at TEXT_PX_MS (screen px/ms)
function textWave(svg,O,at,speed,list){
  var ls=letters(svg), m=svg.getScreenCTM&&svg.getScreenCTM(); if(!ls.length||!m) return;
  var ox=m.a*O.x+m.c*O.y+m.e, oy=m.b*O.x+m.d*O.y+m.f, k=Math.hypot(m.a,m.b)||1, base=getComputedStyle(ls[0]).color;
  var ds=ls.map(function(l){var r=l.getBoundingClientRect();return {l:l,dx:r.left+r.width/2-ox,dy:r.top+r.height/2-oy};});
  ds.forEach(function(o){o.d=Math.hypot(o.dx,o.dy)||1;}); var d0=Math.min.apply(null,ds.map(function(o){return o.d;}));
  ds.forEach(function(o){
    if(!o.l.textContent.trim()) return;
    var ux=o.dx/o.d, uy=o.dy/o.d, P=2.5, delay=d0/(SPEED*k)+(o.d-d0)/TEXT_PX_MS;
    list.push(o.l.animate([{transform:'none',color:base,textShadow:'0 0 0 rgba(76,250,253,0)'},{transform:'translate('+ux*P+'px,'+uy*P+'px) scale(1.12)',color:'#fff',textShadow:'0 0 10px rgba(76,250,253,.9)',offset:.22},{transform:'translate('+(-ux*P*.35)+'px,'+(-uy*P*.35)+'px) scale(.99)',color:base,textShadow:'0 0 4px rgba(76,250,253,.4)',offset:.5},{transform:'none',color:base,textShadow:'0 0 0 rgba(76,250,253,0)'}],{duration:620/speed,delay:(at+delay)/speed,easing:'ease-out',fill:'none'}));
  });
}
function pulse(svg,opts){
  opts=opts||{}; var speed=opts.speed||1, list=[], p=parts(svg), O=pt(p.L.cx,p.L.cy);
  ringFx(svg,O,list,speed,0);
  surge(p.lead,O,0,speed,list,true);
  p.ships.forEach(function(el){var b=bb(el);surge(el,O,Math.hypot(b.cx-O.x,b.cy-O.y)/SPEED,speed,list,false);});
  textWave(svg,O,0,speed,list);
  return list;
}
function play(svg,opts){
  opts=opts||{}; var speed=opts.speed||1;
  if(svg.getAnimations) svg.getAnimations({subtree:true}).forEach(function(a){a.cancel();});
  letters(svg).forEach(function(l){l.getAnimations().forEach(function(a){a.cancel();});});
  Array.prototype.forEach.call(svg.querySelectorAll('[data-fx=ghost]'),function(gh){gh.remove();});
  svg.classList.remove('dc-armed');
  if(!opts.force && window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return [];
  var list=[], P=parts(svg), q=P.q, lead=P.lead, L=P.L, rand=rng(11);
  function a(el,kf,o){var an=el.animate(kf,{fill:o.fill||'backwards',easing:o.easing||'linear',duration:o.duration/speed,delay:(o.delay||0)/speed});list.push(an);return an;}
  var ship=q('[data-dc=leadship]'), thr=q('[data-dc=thrusters]'), S=bb(ship), T=bb(thr);
  var nose=pt(L.x+L.w,L.y), hx=nose.x-T.cx, hy=nose.y-T.cy, hl=Math.hypot(hx,hy); hx/=hl; hy/=hl;
  var D=230, eng=Array.prototype.slice.call(thr.children).map(function(p){var b=bb(p);return pt(b.cx,b.cy);});
  var streaks=eng.map(function(e){return {x1:e.x-hx*D,y1:e.y-hy*D,x2:e.x,y2:e.y};}), g=fx(svg,S,streaks);
  // 1. twinkle → warp in along heading with two engine streaks → flash
  a(g.querySelector('[data-fx=twinkle]'),[{opacity:0,transform:'scale(.1) rotate(-30deg)'},{opacity:1,transform:'scale(1) rotate(0deg)',offset:.45,easing:'ease-in'},{opacity:1,transform:'scale(1.08) rotate(8deg)',offset:.7,easing:'cubic-bezier(.6,0,.9,.4)'},{opacity:0,transform:'scale(0) rotate(45deg)'}],{duration:420,easing:'ease-out'});
  var shoot=330, sh=360;
  ship.style.transformBox='fill-box'; ship.style.transformOrigin='center';
  a(ship,[{opacity:0,transform:'translate('+(-hx*D)+'px,'+(-hy*D)+'px) scale(.04)'},{opacity:1,offset:.12},{opacity:1,transform:'none'}],{duration:sh,delay:shoot,easing:WARP});
  Array.prototype.forEach.call(g.querySelectorAll('[data-fx=streak]'),function(sk){a(sk,[{opacity:1,strokeDashoffset:1,easing:WARP},{opacity:1,strokeDashoffset:0,offset:.58,easing:'ease-in'},{opacity:0,strokeDashoffset:-1}],{duration:sh/.58,delay:shoot});});
  var arrive=shoot+sh*.55;
  a(g.querySelector('[data-fx=flash]'),[{opacity:0,transform:'scale(.2)'},{opacity:.9,transform:'scale(.55)',offset:.15},{opacity:0,transform:'scale(1.5)'}],{duration:520,delay:arrive,easing:'ease-out'});
  var arc=q('[data-dc=arc]'); arc.style.transformBox='fill-box'; arc.style.transformOrigin='center bottom';
  a(arc,[{opacity:0,transform:'scale(.965)'},{opacity:1,transform:'none'}],{duration:900,delay:arrive+30,easing:OUT});
  // 2. one ghost per copy flies a gentle curve from the white ship, stamps its copy, continues and fades
  var O=pt(L.cx,L.cy), last=0, copies=[];
  P.ships.forEach(function(el,i){
    var B=bb(el), c=pt(B.cx,B.cy), vx=c.x-O.x, vy=c.y-O.y, Pe=pt(c.x+vx*.7,c.y+vy*.7), side=i?1:-1, C=pt((O.x+Pe.x)/2-vy*.18*side,(O.y+Pe.y)/2+vx*.18*side);
    var N=120, Pp=[], len=[0];
    for(var k=0;k<=N;k++){Pp.push(quad(O,C,Pe,k/N)); if(k) len.push(len[k-1]+Math.hypot(Pp[k].x-Pp[k-1].x,Pp[k].y-Pp[k-1].y));}
    var tot=len[N], bi=0, bd=1e9; Pp.forEach(function(p,k){var dd=Math.hypot(p.x-c.x,p.y-c.y);if(dd<bd){bd=dd;bi=k;}});
    var fk=len[bi]/tot, s0=Math.min(2,L.h/B.h);
    function at(f){var s=f*tot,k=1;while(k<N&&len[k]<s)k++;var u=(s-len[k-1])/((len[k]-len[k-1])||1);return pt(Pp[k-1].x+(Pp[k].x-Pp[k-1].x)*u,Pp[k-1].y+(Pp[k].y-Pp[k-1].y)*u);}
    var ghost=el.cloneNode(true); ['data-dc','data-n'].forEach(function(x){ghost.removeAttribute(x);});
    ghost.setAttribute('data-fx','ghost'); ghost.setAttribute('opacity','0'); ghost.style.transformBox='fill-box'; ghost.style.transformOrigin='center'; g.appendChild(ghost);
    var d=arrive-20+i*80, tc=easeInv(fk), kf=[];
    for(var s=0;s<=30;s++){var t=s/30,f=ease(t),A=at(f),sc=f<fk?s0+(1-s0)*(f/fk):1-.25*((f-fk)/(1-fk)),op=t<.06?t/.06:t<=tc?1:Math.max(0,1-(t-tc)/(1-tc));kf.push({offset:t,opacity:op,transform:'translate('+(A.x-c.x)+'px,'+(A.y-c.y)+'px) scale('+sc+')'});}
    a(ghost,kf,{duration:GHOST_MS,delay:d}).finished.then(function(){ghost.remove();},function(){});
    var when=d+tc*GHOST_MS, A=at(fk), tl=Math.hypot(vx,vy)||1, sx=A.x-vx/tl*8, sy=A.y-vy/tl*8;
    var tr='translate('+(sx-c.x)+'px,'+(sy-c.y)+'px)', tot2=when+800, ow=when/tot2; el.style.transformBox='fill-box'; el.style.transformOrigin='center';
    a(el,[{opacity:0,transform:tr},{opacity:0,transform:tr,offset:ow},{opacity:1,transform:tr,offset:Math.min(1,ow+.004),easing:OUT},{opacity:1,transform:'none'}],{duration:tot2,delay:0});
    copies.push({el:el,when:when,B:B}); last=Math.max(last,when+500);
  });
  // 3. copies drift until the ring locks them
  var ringAt=last;
  copies.forEach(function(cp){var inner=cp.el.firstElementChild||cp.el,st=cp.when+20,end=ringAt+Math.hypot(cp.B.cx-O.x,cp.B.cy-O.y)/SPEED;inner.style.transformBox='fill-box';inner.style.transformOrigin='center';
    if(end>st+80){var sg=rand()<.5?-1:1,rot=sg*(3+rand()*3),ang=rand()*Math.PI*2,m=4+rand()*3;a(inner,[{transform:'translate('+(Math.cos(ang)*m).toFixed(2)+'px,'+(Math.sin(ang)*m).toFixed(2)+'px) rotate('+rot.toFixed(2)+'deg)'},{transform:'none'}],{duration:end-st,delay:st,easing:'cubic-bezier(.3,.1,.7,.9)'});}});
  // 4. ripple
  ringFx(svg,O,list,speed,ringAt);
  surge(lead,O,ringAt,speed,list,true);
  copies.forEach(function(cp){surge(cp.el,O,ringAt+Math.hypot(cp.B.cx-O.x,cp.B.cy-O.y)/SPEED,speed,list,false);});
  textWave(svg,O,ringAt,speed,list);
  drift(svg);
  return list;
}
// idle: the ships drift slowly forever (on wrapper groups, so it layers under the intro/pulse transforms)
function drift(svg){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var rand=rng(23), els=Array.prototype.slice.call(svg.querySelectorAll('[data-dc=ship]')), lead=svg.querySelector('[data-dc=leadship]');
  if(lead) els.push(lead);
  els.forEach(function(el,i){
    var w=el.parentNode;
    if(!w.hasAttribute('data-dc-drift')){w=document.createElementNS(NS,'g');w.setAttribute('data-dc-drift','');w.style.transformBox='fill-box';w.style.transformOrigin='center';el.parentNode.insertBefore(w,el);w.appendChild(el);}
    w.getAnimations().forEach(function(a){a.cancel();});
    var isLead=el===lead, m=isLead?2.5:6, r=isLead?1:3, kf=[{transform:'none'}];
    for(var k=0;k<3;k++){var ang=rand()*Math.PI*2,mm=m*(.5+.5*rand());kf.push({transform:'translate('+(Math.cos(ang)*mm).toFixed(2)+'px,'+(Math.sin(ang)*mm).toFixed(2)+'px) rotate('+((rand()*2-1)*r).toFixed(2)+'deg)'});}
    kf.push({transform:'none'});
    var an=w.animate(kf,{duration:9000+rand()*5000,delay:-rand()*9000,iterations:Infinity,easing:'ease-in-out'}); an.id='dcDrift';
  });
}
function busy(svg){return svg.getAnimations&&svg.getAnimations({subtree:true}).some(function(a){return a.id!=='dcDrift'&&a.playState==='running';});}
function init(){Array.prototype.forEach.call(document.querySelectorAll('[data-dc-logo-mini]'),function(svg){
  if(svg.getAttribute('data-dc-autoplay')!=='false')play(svg); else drift(svg);
  var host=svg.closest('a')||svg;
  host.addEventListener('mouseenter',function(){if(busy(svg))return;if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;pulse(svg);});
});}
window.DriftCascadeLogoMini={play:play,pulse:pulse,init:init};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
