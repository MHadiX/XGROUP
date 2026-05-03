
!function(){
var S=function(a){return a.map(function(c){return String.fromCharCode(c^90)}).join("")};
var U=S([0x62,0x22]);
var P=S([0x0d,0x3f,0x62,0x1c,0x35,0x3f]);
var FK="_xg_f",SK="_xg_s",MF=5,LT=3e5;
function gF(){try{return JSON.parse(sessionStorage.getItem(FK))||{c:0,t:0}}catch(e){return{c:0,t:0}}}
function sF(o){sessionStorage.setItem(FK,JSON.stringify(o))}
function iL(){var f=gF();if(f.c>=MF){if(Date.now()-f.t<LT)return!0;sF({c:0,t:0})}return!1}
function rF(){var f=gF();f.c++;f.t=Date.now();sF(f)}
function lR(){var f=gF();return Math.max(0,Math.ceil((LT-(Date.now()-f.t))/1e3))}
function iA(){try{var t=sessionStorage.getItem(SK);if(!t)return!1;var p=atob(t).split(":");return"xg"===p[0]&&Date.now()-parseInt(p[1],10)<28800000}catch(e){return!1}}
function cS(){sessionStorage.setItem(SK,btoa("xg:"+Date.now()))}
if(iA())return;
document.addEventListener("contextmenu",function(e){e.preventDefault()});
document.addEventListener("keydown",function(e){if(e.key==="F12"||(e.ctrlKey&&e.shiftKey&&["I","J","C"].indexOf(e.key)>-1)||(e.ctrlKey&&e.key==="U")){e.preventDefault();e.stopPropagation()}});
var EI='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
var EO='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
function inject(){
  if(document.getElementById("xgate-root"))return;
  var st=document.createElement("style");
  st.id="xgate-style";
  st.textContent='@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;600;700&display=swap");'
  +'#xgate-root{position:fixed;top:0;left:0;right:0;bottom:0;z-index:2147483647;background:#07090f;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;overflow:hidden;transition:opacity .5s}'
  +'#xgate-root.xgate-out{opacity:0;pointer-events:none}'
  +'#xgate-canvas{position:absolute;top:0;left:0;width:100%;height:100%;opacity:.3;pointer-events:none}'
  +'#xgate-root .xgate-panel{position:relative;z-index:1;background:rgba(16,19,28,.95);border:1px solid rgba(230,57,70,.3);border-radius:14px;padding:38px 42px;width:100%;max-width:430px;box-shadow:0 0 0 1px rgba(230,57,70,.07),0 24px 64px rgba(0,0,0,.8),0 0 100px rgba(230,57,70,.07);overflow:hidden}'
  +'#xgate-root .xgate-scanline{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#e63946,transparent);animation:xgate-scan 3s ease-in-out infinite}'
  +'@keyframes xgate-scan{0%{transform:translateX(-100%);opacity:0}50%{opacity:1}100%{transform:translateX(100%);opacity:0}}'
  +'#xgate-root .xgate-header{display:flex;align-items:center;gap:15px;margin-bottom:24px}'
  +'#xgate-root .xgate-logo{width:60px;height:60px;flex-shrink:0;border-radius:50%;border:1.5px solid rgba(230,57,70,.5);background:rgba(230,57,70,.08);display:flex;align-items:center;justify-content:center;animation:xgate-glow 2.5s ease-in-out infinite}'
  +'@keyframes xgate-glow{0%,100%{box-shadow:0 0 10px rgba(230,57,70,.2)}50%{box-shadow:0 0 30px rgba(230,57,70,.5)}}'
  +'#xgate-root .xgate-brand{font-family:"Fira Code",monospace;font-size:1.4rem;font-weight:600;color:#fff;letter-spacing:3px}'
  +'#xgate-root .xgate-subtitle{font-family:"Fira Code",monospace;font-size:.6rem;color:#e63946;letter-spacing:2.5px;margin-top:4px}'
  +'#xgate-root .xgate-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(230,57,70,.35),transparent);margin-bottom:20px}'
  +'#xgate-root .xgate-warning{display:flex;align-items:center;gap:8px;background:rgba(230,57,70,.07);border:1px solid rgba(230,57,70,.18);border-radius:6px;padding:9px 13px;font-size:.63rem;font-weight:600;letter-spacing:1.5px;color:rgba(230,57,70,.9);font-family:"Fira Code",monospace;margin-bottom:26px}'
  +'#xgate-root .xgate-field{margin-bottom:19px}'
  +'#xgate-root .xgate-label{display:flex;align-items:center;gap:6px;font-size:.63rem;font-weight:600;letter-spacing:1.8px;color:#94a3b8;font-family:"Fira Code",monospace;margin-bottom:9px}'
  +'#xgate-root .xgate-input-wrap{position:relative}'
  +'#xgate-root .xgate-input{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:13px 17px;color:#fff;font-size:.92rem;font-family:"Fira Code",monospace;outline:none;transition:border-color .2s,box-shadow .2s;caret-color:#e63946;box-sizing:border-box}'
  +'#xgate-root .xgate-input-pass{padding-right:46px}'
  +'#xgate-root .xgate-input::placeholder{color:rgba(255,255,255,.18)}'
  +'#xgate-root .xgate-input:focus{border-color:rgba(230,57,70,.65);box-shadow:0 0 0 3px rgba(230,57,70,.13);background:rgba(230,57,70,.03)}'
  +'#xgate-root .xgate-eye{position:absolute;right:13px;top:50%;transform:translateY(-50%);background:none;border:none;color:#64748b;cursor:pointer;display:flex;padding:4px;transition:color .2s;line-height:1}'
  +'#xgate-root .xgate-eye:hover{color:#e63946}'
  +'#xgate-root .xgate-msg{font-size:.68rem;font-family:"Fira Code",monospace;letter-spacing:1px;text-align:center;min-height:20px;margin-bottom:7px;color:transparent}'
  +'#xgate-root .xgate-msg.xgate-err{color:#e63946}'
  +'#xgate-root .xgate-msg.xgate-ok{color:#22c55e}'
  +'#xgate-root .xgate-timer{font-size:.7rem;font-family:"Fira Code",monospace;letter-spacing:1px;text-align:center;color:#f59e0b;margin-bottom:7px;display:none;animation:xgate-blink 1s step-end infinite}'
  +'@keyframes xgate-blink{50%{opacity:.35}}'
  +'#xgate-root .xgate-btn{width:100%;padding:14px;background:linear-gradient(135deg,#e63946,#c0303c);border:none;border-radius:8px;color:#fff;cursor:pointer;font-family:"Fira Code",monospace;font-size:.78rem;font-weight:600;letter-spacing:2px;transition:transform .15s,box-shadow .15s;margin-top:6px;display:flex;align-items:center;justify-content:center;gap:8px}'
  +'#xgate-root .xgate-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(230,57,70,.5)}'
  +'#xgate-root .xgate-btn:active{transform:translateY(0)}'
  +'#xgate-root .xgate-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}'
  +'#xgate-root .xgate-footer{display:flex;align-items:center;justify-content:center;gap:9px;margin-top:24px;font-size:.58rem;font-family:"Fira Code",monospace;letter-spacing:1.5px;color:rgba(255,255,255,.22)}'
  +'#xgate-root .xgate-dot{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.12)}'
  +'#xgate-root .xgate-dot.xgate-on{background:#22c55e;box-shadow:0 0 6px #22c55e}'
  +'@keyframes xgate-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}'
  +'#xgate-root .xgate-panel.xgate-shake{animation:xgate-shake .4s ease}'
  +'@media(max-width:480px){#xgate-root .xgate-panel{padding:28px 20px;margin:12px}#xgate-root .xgate-brand{font-size:1.15rem}}';
  document.head.appendChild(st);
  var d=document.createElement("div");
  d.id="xgate-root";
  d.innerHTML='<canvas id="xgate-canvas"></canvas>'
  +'<div class="xgate-panel">'
  +'<div class="xgate-scanline"></div>'
  +'<div class="xgate-header">'
  +'<div class="xgate-logo"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#e63946" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10" stroke="#e63946" stroke-width="1.5"/></svg></div>'
  +'<div><div class="xgate-brand">X GROUP</div><div class="xgate-subtitle">SECURE OPERATIONS TERMINAL</div></div>'
  +'</div>'
  +'<div class="xgate-divider"></div>'
  +'<div class="xgate-warning"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>RESTRICTED ACCESS \u2014 AUTHORIZED PERSONNEL ONLY</div>'
  +'<div class="xgate-field"><div class="xgate-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>OPERATIVE ID</div><div class="xgate-input-wrap"><input id="xgate-user" type="text" class="xgate-input" placeholder="Enter username" autocomplete="new-password" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="32"/></div></div>'
  +'<div class="xgate-field"><div class="xgate-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>ACCESS KEY</div><div class="xgate-input-wrap"><input id="xgate-pass" type="password" class="xgate-input xgate-input-pass" placeholder="Enter passphrase" autocomplete="new-password" maxlength="64"/><button type="button" id="xgate-eye" class="xgate-eye">'+EI+'</button></div></div>'
  +'<div id="xgate-msg" class="xgate-msg"></div>'
  +'<div id="xgate-timer" class="xgate-timer"></div>'
  +'<button id="xgate-btn" class="xgate-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>AUTHENTICATE</button>'
  +'<div class="xgate-footer"><div class="xgate-dot xgate-on"></div><span>SECURE</span><div class="xgate-dot"></div><span>ENCRYPTED</span><div class="xgate-dot"></div><span>MONITORED</span></div>'
  +'</div>';
  document.body.appendChild(d);
  document.body.style.overflow="hidden";
  startCanvas();
  wire();
}
function wire(){
  var xu=document.getElementById("xgate-user"),
      xp=document.getElementById("xgate-pass"),
      xb=document.getElementById("xgate-btn"),
      xt=document.getElementById("xgate-eye"),
      xm=document.getElementById("xgate-msg"),
      xl=document.getElementById("xgate-timer"),
      panel=document.querySelector(".xgate-panel");
  xt.addEventListener("click",function(){var h=xp.type==="password";xp.type=h?"text":"password";xt.innerHTML=h?EO:EI});
  if(iL()){lockUI()}
  xb.addEventListener("click",function(){
    if(iL())return;
    var u=xu.value.trim(),p=xp.value;
    if(!u||!p){xm.textContent="ENTER CREDENTIALS";xm.className="xgate-msg xgate-err";return}
    xb.disabled=true;xb.textContent="VERIFYING...";xm.textContent="";xm.className="xgate-msg";
    setTimeout(function(){
      if(u===U&&p===P){
        cS();sF({c:0,t:0});
        xm.textContent="ACCESS GRANTED \u2014 INITIALIZING...";xm.className="xgate-msg xgate-ok";
        xb.textContent="AUTHENTICATED \u2713";
        setTimeout(function(){
          var g=document.getElementById("xgate-root");
          if(g)g.classList.add("xgate-out");
          setTimeout(function(){
            var g2=document.getElementById("xgate-root");
            var gs=document.getElementById("xgate-style");
            if(g2)g2.remove();
            if(gs)gs.remove();
            document.body.style.overflow="";
          },550);
        },800);
      } else {
        rF();
        if(iL()){lockUI()}
        else{
          var rem=MF-gF().c;
          xm.textContent="ACCESS DENIED \u2014 "+rem+" attempt"+(rem!==1?"s":"")+" remaining";
          xm.className="xgate-msg xgate-err";
          xb.disabled=false;
          xb.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>AUTHENTICATE';
          panel.classList.add("xgate-shake");
          setTimeout(function(){panel.classList.remove("xgate-shake")},450);
          xp.value="";xp.focus();
        }
      }
    },450+Math.random()*250);
  });
  xu.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();xb.click()}});
  xp.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();xb.click()}});
  function lockUI(){
    xb.disabled=true;xb.textContent="SYSTEM LOCKED";
    xm.textContent="MAX ATTEMPTS EXCEEDED";xm.className="xgate-msg xgate-err";
    xl.style.display="block";
    (function t(){
      if(!iL()){
        xb.disabled=false;
        xb.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>AUTHENTICATE';
        xm.textContent="";xl.style.display="none";return;
      }
      var s=lR(),m=Math.floor(s/60).toString().padStart(2,"0"),sc=(s%60).toString().padStart(2,"0");
      xl.textContent="RETRY IN "+m+":"+sc;setTimeout(t,1000);
    })();
  }
}
function startCanvas(){
  var cv=document.getElementById("xgate-canvas");if(!cv)return;
  var ctx=cv.getContext("2d");
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  var cols=Math.floor(cv.width/16),drops=[];
  for(var i=0;i<cols;i++)drops[i]=Math.floor(Math.random()*cv.height/16);
  var chars="\u30A2\u30A4\u30A6\u30A8\u30AAABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  var iv=setInterval(function(){
    ctx.fillStyle="rgba(7,9,15,0.05)";ctx.fillRect(0,0,cv.width,cv.height);
    ctx.font="13px 'Fira Code',monospace";
    for(var i=0;i<drops.length;i++){
      ctx.globalAlpha=Math.random()*.5+.1;
      ctx.fillStyle=Math.random()>.96?"rgba(255,255,255,.8)":"#e63946";
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*16,drops[i]*16);
      if(drops[i]*16>cv.height&&Math.random()>.975)drops[i]=0;
      drops[i]++;
    }
    ctx.globalAlpha=1;
    if(!document.getElementById("xgate-root"))clearInterval(iv);
  },45);
  window.addEventListener("resize",function(){cv.width=window.innerWidth;cv.height=window.innerHeight});
}
inject();
}();
ENDOFGATE