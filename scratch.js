import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const _l=document.createElement('link');_l.rel='stylesheet';_l.href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap';document.head.appendChild(_l);
const _s=document.createElement('style');_s.textContent="\n:root{\n  --red:#054f30; --red-dk:#022a19; --sun:#00a84f; --cream:#ffffff; --ink:#0f2a1d; --leaf:#00a84f; --line:#cfe3d7;\n  --font:'Poppins',system-ui,-apple-system,'Segoe UI',sans-serif; color-scheme:light;\n}\n*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}\n[hidden]{display:none!important}\nhtml,body{min-height:100%}\nbody{font-family:var(--font);color:var(--ink);background:radial-gradient(120% 60% at 50% 0%,#0a6b42 0%,#054f30 55%,#033a23 100%) fixed;\n  display:flex;flex-direction:column;align-items:center;\n  padding:calc(24px + env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) calc(24px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px))}\n.wrap{width:100%;max-width:380px;display:flex;flex-direction:column;align-items:center;gap:18px}\n.logo{width:170px;max-width:60%;height:auto;display:block}\nh1{font-weight:800;color:#fff;font-size:2.3rem;line-height:1.05;text-align:center;text-wrap:balance}\n.sub{text-align:center;font-size:.95rem;max-width:30ch;color:#e6f4ec}\n.panel .sub{color:var(--ink)}\n.panel{width:100%;background:var(--cream);border-radius:20px;padding:22px 20px;box-shadow:0 14px 30px rgba(0,0,0,.3);display:flex;flex-direction:column;gap:14px}\nlabel{font-weight:600;font-size:.85rem;display:flex;flex-direction:column;gap:6px}\n.ph{display:flex;align-items:stretch;border:2px solid var(--line);border-radius:12px;overflow:hidden;background:#fff}\n.ph:focus-within{border-color:var(--red)}\n.ph span{display:flex;align-items:center;padding:0 12px;background:#eaf5ef;color:var(--red);font-weight:800;font-size:1rem;border-right:2px solid var(--line)}\n.ph input{border:0;border-radius:0;letter-spacing:.12em}\ninput{font:inherit;font-size:1rem;padding:13px 14px;border:2px solid var(--line);border-radius:12px;background:#fff;color:var(--ink);width:100%}\ninput:focus{outline:none;border-color:var(--red)}\n.btn{font:inherit;font-weight:800;font-size:1.05rem;border:0;border-radius:999px;padding:15px;background:var(--red);color:#fff;cursor:pointer;box-shadow:0 4px 0 var(--red-dk)}\n.btn:active{transform:translateY(2px);box-shadow:0 2px 0 var(--red-dk)}\n.btn:disabled{opacity:.6}\n.btn:focus-visible{outline:3px solid var(--ink);outline-offset:2px}\n.note{font-size:.72rem;opacity:.75;text-align:center}\n.err{color:#c62828;font-weight:600;font-size:.85rem;min-height:1.2em;text-align:center}\n.card{position:relative;width:100%;max-width:320px;aspect-ratio:1/1;border-radius:22px;background:#fff;overflow:hidden;\n  box-shadow:0 18px 36px rgba(0,0,0,.4),0 0 0 6px var(--sun);user-select:none}\n.prize{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:18px;gap:6px}\n.pack{height:58%;aspect-ratio:987/1246;max-width:80%;background:url(\"Viber%20Posting%20template%20-%202026-11-18T124156.317.png\") 48.67% 53.18%/202.6% auto no-repeat}\n.prize .t{font-weight:800;color:var(--leaf);font-size:1.1rem}\n.prize .big{font-weight:800;color:var(--red);font-size:3.6rem;line-height:1}\n.prize .p{font-weight:800;color:var(--red);font-size:1.25rem;line-height:1.2}\n.prize.lose .p{color:var(--ink);font-size:1.4rem}\ncanvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:grab;transition:opacity .6s}\n.msg{text-align:center;font-size:.95rem;max-width:32ch;color:#fff}\n.tag{display:inline-block;margin-top:8px;background:var(--sun);color:#fff;font-weight:800;padding:6px 14px;border-radius:999px;letter-spacing:.1em;font-size:.85rem}\n.cf{position:fixed;top:-12px;width:9px;height:14px;pointer-events:none;animation:fall linear forwards;z-index:5}\n@keyframes fall{to{transform:translateY(110vh) rotate(720deg)}}\n@media (prefers-reduced-motion:reduce){.cf{display:none}canvas{transition:none}}\n";document.head.appendChild(_s);
document.body.insertAdjacentHTML('afterbegin',"<main class=\"wrap\">\n  <img class=\"logo\" src=\"LOGO%20HD.png\" alt=\"Equics\" width=\"170\" height=\"65\">\n  <h1>Scratch &amp; Win</h1>\n\n  <section id=\"step1\" class=\"panel\" aria-labelledby=\"f-title\">\n    <p id=\"f-title\" class=\"sub\" style=\"max-width:none\">Enter your details to unlock your scratch card</p>\n    <form id=\"form\" novalidate>\n      <div style=\"display:flex;flex-direction:column;gap:14px\">\n        <label for=\"name\">Your name\n          <input id=\"name\" name=\"name\" autocomplete=\"name\" maxlength=\"60\" required placeholder=\"Your full name\">\n        </label>\n        <label for=\"phone\">Mobile number\n          <div class=\"ph\"><span>+960</span><input id=\"phone\" name=\"phone\" type=\"tel\" inputmode=\"numeric\" pattern=\"[0-9]{7}\" maxlength=\"7\" autocomplete=\"tel-national\" required placeholder=\"7XXXXXX\"></div>\n        </label>\n        <div id=\"err\" class=\"err\" role=\"alert\"></div>\n        <button id=\"go\" class=\"btn\" type=\"submit\">Unlock my card</button>\n        <p class=\"note\">One card per mobile number. We use your details only to contact you about this promotion.</p>\n      </div>\n    </form>\n  </section>\n\n  <section id=\"step2\" hidden style=\"width:100%;display:flex;flex-direction:column;align-items:center;gap:16px\">\n    <p class=\"sub\" id=\"hello\">Scratch the silver box to reveal your prize</p>\n    <div class=\"card\" id=\"card\">\n      <div class=\"prize\" id=\"prize\"></div>\n      <canvas id=\"c\" aria-label=\"Scratch area\"></canvas>\n    </div>\n    <div class=\"msg\" id=\"msg\"></div>\n  </section>\n</main>");
const firebaseConfig = {apiKey:"AIzaSyB2skTBAMM56K31bzHHbeNxnbxyEwTw2oo",authDomain:"equics-centro.firebaseapp.com",projectId:"equics-centro",storageBucket:"equics-centro.firebasestorage.app",messagingSenderId:"250174556072",appId:"1:250174556072:web:e3bf346d0a334f5506ff9d"};

const D = JSON.parse(decodeURIComponent(escape(atob(document.body.dataset.c))));
const KEY = "emma_scratch_v1";
const $ = id => document.getElementById(id);
const db = getFirestore(initializeApp(firebaseConfig));

function store(v){ try{ localStorage.setItem(KEY, JSON.stringify(v)) }catch(e){} }
function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||"null") }catch(e){ return null } }

function prizeHTML(){
  if (D.kind==="emma") return '<div class="t">YOU WON!</div><div class="pack" role="img" aria-label="Emma Coconut Milk Powder 150g"></div><div class="p">Emma Coconut Milk Powder</div>';
  if (D.kind==="off") return '<div class="t">YOU WON!</div><div class="big">'+D.pct+'%</div><div class="p">OFF</div>';
  return '<div style="font-size:3rem">🍀</div><div class="p">Better luck next time</div><div>Thank you!</div>';
}
function msgHTML(name){
  if (!D.win) return 'Thank you for playing, '+esc(name)+'!';
  return 'Congratulations '+esc(name)+'! '+D.how+'<br><span class="tag">'+esc(D.label.toUpperCase())+'</span>';
}
function esc(s){ return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])) }

// ---------- Step 1: form ----------
$("phone").addEventListener("input", e => { const v = e.target.value.replace(/[^0-9]/g,"").slice(0,7); if (v !== e.target.value) e.target.value = v; });
$("form").addEventListener("submit", async e => {
  e.preventDefault();
  const name = $("name").value.trim().replace(/\s+/g," ");
  const local = $("phone").value.replace(/[^0-9]/g,"");
  const phone = "960" + local;
  if (name.length < 2) return $("err").textContent = "Please enter your name.";
  if (local.length !== 7) return $("err").textContent = "Please enter your 7-digit mobile number after +960.";
  $("err").textContent = ""; $("go").disabled = true; $("go").textContent = "Please wait…";
  try {
    await setDoc(doc(db, "scratch_entries", phone), {
      name, phone, prize: D.label, card: D.card, createdAt: serverTimestamp(), device: navigator.userAgent.slice(0,200)
    });
    store({ name, phone, card: D.card });
    showCard(name, false);
  } catch (err) {
    console.error(err);
    $("err").textContent = err && err.code === "permission-denied"
      ? "This mobile number has already been used for this promotion."
      : "Could not connect. Check your internet and try again.";
    $("go").disabled = false; $("go").textContent = "Unlock my card";
  }
});

// ---------- Step 2: scratch card ----------
const cv = $("c"), ctx = cv.getContext("2d");
let done=false, down=false, last=null;

function showCard(name, revealed){
  $("step1").hidden = true; $("step2").hidden = false;
  $("prize").className = "prize" + (D.win ? "" : " lose");
  $("prize").innerHTML = prizeHTML();
  $("hello").textContent = "Hi " + name + "! Scratch the silver box to reveal your prize";
  if (revealed){ done = true; cv.hidden = true; $("hello").textContent = "Your prize, " + name; $("msg").innerHTML = msgHTML(name); return; }
  requestAnimationFrame(size);
  if (document.fonts) document.fonts.ready.then(()=>{ if(!done) size() });
  addEventListener("resize", ()=>{ if(!done) size() });
  window._name = name;
}
function size(){
  const r = $("card").getBoundingClientRect(), dpr = devicePixelRatio || 1;
  cv.width = r.width*dpr; cv.height = r.height*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
  const w=r.width,h=r.height, g=ctx.createLinearGradient(0,0,w,h);
  g.addColorStop(0,"#b9c0c8"); g.addColorStop(.5,"#eef1f4"); g.addColorStop(1,"#a7aeb7");
  ctx.globalCompositeOperation="source-over"; ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
  ctx.fillStyle="rgba(255,255,255,.4)"; for(let i=0;i<260;i++) ctx.fillRect(Math.random()*w,Math.random()*h,2,2);
  ctx.fillStyle="#054f30"; ctx.textAlign="center";
  ctx.font="800 26px Poppins,sans-serif"; ctx.fillText("SCRATCH HERE", w/2, h/2-4);
  ctx.font="400 14px Poppins,sans-serif"; ctx.fillText("use your finger", w/2, h/2+22);
}
function pos(e){ const r=cv.getBoundingClientRect(), t=e.touches?e.touches[0]:e; return {x:t.clientX-r.left,y:t.clientY-r.top} }
function scratch(p){ ctx.globalCompositeOperation="destination-out"; ctx.lineWidth=42; ctx.lineCap="round";
  ctx.beginPath(); ctx.moveTo((last||p).x,(last||p).y); ctx.lineTo(p.x+.1,p.y); ctx.stroke(); last=p }
function cleared(){ const d=ctx.getImageData(0,0,cv.width,cv.height).data; let c=0,n=0;
  for(let i=3;i<d.length;i+=64){ n++; if(d[i]===0) c++ } return c/n }
function reveal(){
  if (done) return; done = true; cv.style.opacity = 0; setTimeout(()=>cv.hidden=true, 600);
  const s = load() || {}; s.revealed = true; store(s);
  $("hello").textContent = "Your prize, " + (window._name||""); $("msg").innerHTML = msgHTML(window._name||""); if (D.win) confetti();
}
function confetti(){ const cols=["#00a84f","#ffffff","#7be0a8","#f3b331"];
  for(let i=0;i<80;i++){ const s=document.createElement("div"); s.className="cf"; s.style.left=Math.random()*100+"vw";
    s.style.background=cols[i%4]; s.style.animationDuration=(2+Math.random()*2)+"s"; s.style.animationDelay=Math.random()*.5+"s";
    document.body.appendChild(s); setTimeout(()=>s.remove(),5000) } }
function start(e){ if(done) return; down=true; last=null; scratch(pos(e)); e.preventDefault() }
function move(e){ if(!down||done) return; scratch(pos(e)); e.preventDefault() }
function end(){ if(!down) return; down=false; last=null; if(cleared()>0.5) reveal() }
cv.addEventListener("mousedown",start); cv.addEventListener("mousemove",move); addEventListener("mouseup",end);
cv.addEventListener("touchstart",start,{passive:false}); cv.addEventListener("touchmove",move,{passive:false}); addEventListener("touchend",end);

// Returning visitor on the same phone browser: skip the form
const prev = load();
if (prev && prev.card === D.card) showCard(prev.name, !!prev.revealed);
