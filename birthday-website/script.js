/* ===== EDIT THESE ===== */
const CONFIG = {
  name: "My Love",   // her name or nickname (can also be changed on the page)
  reasons: [
    "You laugh at my jokes, even the terrible ones. That's true love.",
    "You always know where my things are while I stand right in front of them.",
    "You make even Monday mornings bearable. Barely, but still.",
    "Your cooking is amazing. The 'secret ingredient' is you yelling 'don't touch it!'",
    "You've never once blocked me. Yet.",
    "You steal my blanket and I still stay. That's commitment.",
    "You're the only one who understands my 'I'm not hungry' means 'bring snacks'.",
    "Your smile fixes my worst days faster than Wi-Fi restarts.",
    "You're cute, smart and scary in exactly the right proportions.",
    "You said yes to me. Best decision of your life, obviously. 😎"
  ],
  coupons: [
    ["Free hug", "One hug, any time, any place. Even during cartoons."],
    ["Dish duty", "I wash the dishes tonight. No complaints, no sighing."],
    ["Movie pick", "You choose the movie. I will not mention 'again'."],
    ["Snack run", "I go out to buy any snack you want, even at 2 AM."],
    ["Foot massage", "10 minutes. I promise to not fall asleep first."],
    ["You're right", "Valid for one argument. Use wisely. (You'll win anyway.)"]
  ],
  wheel: ["Dinner date 🍝","Ice cream run 🍦","Movie night 🎬","Long walk 🌙","Dance party 💃","Cake again 🍰"],
  messages: [
    "Another year older… but you still look amazing.",
    "I hope today is full of cake, laughs and zero chores.",
    "You deserve the world. I'll start with the cake."
  ]
};

/* ===== helpers ===== */
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const $=s=>document.querySelector(s), rand=(a,b)=>Math.random()*(b-a)+a, pick=a=>a[Math.floor(Math.random()*a.length)];
let NAME = store.get('bdayName') || CONFIG.name;

/* ===== confetti ===== */
const cv=$('#fx'), cx=cv.getContext('2d'); let parts=[];
function size(){cv.width=innerWidth;cv.height=innerHeight} size(); addEventListener('resize',size);
function confetti(x=innerWidth/2,y=innerHeight/2,n=120){
  const cols=['#ff4f81','#ffc94d','#7de0c0','#fff','#b388ff'];
  for(let i=0;i<n;i++)parts.push({x,y,vx:rand(-8,8),vy:rand(-14,-2),s:rand(5,10),c:pick(cols),r:rand(0,6),vr:rand(-.3,.3),life:120});
  if(parts.length===n)loop();
}
function loop(){
  cx.clearRect(0,0,cv.width,cv.height);
  parts=parts.filter(p=>p.life>0&&p.y<cv.height+20);
  for(const p of parts){p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.vx*=.99;p.r+=p.vr;p.life--;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore()}
  if(parts.length)requestAnimationFrame(loop);
}
addEventListener('click',e=>{if(!e.target.closest('#arena,button'))confetti(e.clientX,e.clientY,30)});

/* ===== floating background ===== */
const fl=$('#floaters'), icons=['❤️','🎈','⭐','🎉','💖','🧁','✨'];
setInterval(()=>{
  if(document.hidden)return;
  const d=document.createElement('div');d.className='fl';d.textContent=pick(icons);
  d.style.left=rand(0,100)+'vw';d.style.fontSize=rand(18,42)+'px';d.style.animationDuration=rand(9,16)+'s';
  fl.appendChild(d);setTimeout(()=>d.remove(),16000);
},700);

/* ===== hero ===== */
function renderTitle(){
  const t=$('#title');t.innerHTML='';
  const line=(txt,cls)=>{[...txt].forEach((ch,i)=>{const s=document.createElement('span');s.textContent=ch===' '?'\u00A0':ch;s.style.animationDelay=(i*.1)+'s';if(cls)s.className=cls;t.appendChild(s)})};
  line('Happy Birthday');t.appendChild(document.createElement('br'));line(NAME,'n');
}
function typeMsg(){
  const el=$('#typed');let m=0;
  (function nextMsg(){
    const txt=CONFIG.messages[m%CONFIG.messages.length];let i=0;el.innerHTML='<span class="cursor"></span>';
    const iv=setInterval(()=>{i++;el.innerHTML=txt.slice(0,i)+'<span class="cursor"></span>';
      if(i>=txt.length){clearInterval(iv);setTimeout(()=>{m++;nextMsg()},2500)}},45);
  })();
}
renderTitle();typeMsg();
$('#start').onclick=()=>{confetti(innerWidth/2,innerHeight/2,200);$('#gift').scrollIntoView()};
$('#rename').onclick=()=>{const n=prompt("What should I call her?",NAME);if(n&&n.trim()){NAME=n.trim().slice(0,24);store.set('bdayName',NAME);renderTitle();$('#lh').textContent='Dear '+NAME+','}};

/* ===== gift ===== */
const giftLines=[
  "Surprise! The gift is… ME. (Return policy: none.) 😘",
  "Plot twist: the real gift is dinner tonight, and I'm paying!",
  "Inside: unlimited love, mild sarcasm, and one very hungry husband.",
  "Congrats! You've unlocked: another year of putting up with me. 🏆"
];
let gi=0;
$('#giftBtn').onclick=e=>{
  const b=e.currentTarget;b.textContent='🎊';setTimeout(()=>b.textContent='🎁',700);
  $('#giftMsg').textContent=giftLines[gi++%giftLines.length];$('#giftMsg').classList.remove('pop');void $('#giftMsg').offsetWidth;$('#giftMsg').classList.add('pop');
  const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,100);
};

/* ===== cake ===== */
const cWrap=$('#candles');
function lightCandles(){cWrap.innerHTML='';for(let i=0;i<5;i++){const c=document.createElement('div');c.className='candle';c.innerHTML='<div class="flame"></div>';c.tabIndex=0;c.setAttribute('role','button');c.setAttribute('aria-label','Blow out candle');c.onclick=()=>blow(c);c.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')blow(c)};cWrap.appendChild(c)}$('#cakeMsg').textContent=''}
function blow(c){c.classList.add('out');const left=cWrap.querySelectorAll('.candle:not(.out)').length;
  if(!left){$('#cakeMsg').textContent='Wish granted! (Terms and conditions apply.) 🎂✨';confetti(innerWidth/2,innerHeight/2,200)}
  else $('#cakeMsg').textContent=left+' left… keep blowing! 💨'}
$('#relight').onclick=lightCandles;lightCandles();

/* ===== balloon game ===== */
let score=0,timeLeft=20,timer=null,spawner=null,best=+store.get('bdayBest')||0;
$('#best').textContent=best;
const balCols=['#ff4f81','#ffc94d','#7de0c0','#b388ff','#4fc3f7'];
function spawn(){
  const arena=$('#arena'),b=document.createElement('div'),bad=Math.random()<.15;
  b.className='bal';b.style.left=rand(2,arena.clientWidth-60)+'px';
  b.style.background=bad?'#8d6e4a':pick(balCols);b.style.animationDuration=rand(3.2,5.5)+'s';
  if(bad){b.textContent='💩';b.style.fontSize='28px';b.style.display='grid';b.style.placeItems='center'}
  const hit=e=>{e.preventDefault();if(!timer)return;score+=bad?-3:1;$('#score').textContent=score;
    const r=b.getBoundingClientRect();confetti(r.left+27,r.top+30,bad?0:14);b.remove()};
  b.addEventListener('pointerdown',hit);
  b.addEventListener('animationend',()=>b.remove());
  arena.appendChild(b);
}
$('#play').onclick=()=>{
  if(timer)return;score=0;timeLeft=20;$('#score').textContent=0;$('#time').textContent=20;$('#arenaMsg').textContent='';
  document.querySelectorAll('.bal').forEach(b=>b.remove());
  spawner=setInterval(spawn,550);
  timer=setInterval(()=>{timeLeft--;$('#time').textContent=timeLeft;if(timeLeft<=0)endGame()},1000);
};
function endGame(){
  clearInterval(timer);clearInterval(spawner);timer=null;
  document.querySelectorAll('.bal').forEach(b=>b.remove());
  if(score>best){best=score;store.set('bdayBest',best);$('#best').textContent=best}
  const m=score>=20?'Legend! Balloon Queen 👑':score>=10?'Nice! Birthday girl energy 💃':score>=0?'Hmm… maybe you were busy admiring me 😏':'You popped too much 💩. Try again!';
  $('#arenaMsg').textContent='Score '+score+'. '+m;if(score>=10)confetti(innerWidth/2,innerHeight/2,150);
}

/* ===== runaway "No" ===== */
const no=$('#no'),yes=$('#yes');let noTries=0;
const noLines=["Nice try. 😏","The button is shy.","Wrong answer, try again!","Are you sure? Think about the snacks.","Your finger is slow, my button is fast.","Okay, this is getting embarrassing.","Just press Yes already! 😭"];
function dodge(){
  noTries++;const box=$('.q-btns').getBoundingClientRect();
  no.style.position='relative';
  no.style.left=rand(-box.width/2.6,box.width/2.6)+'px';no.style.top=rand(-40,40)+'px';
  yes.style.transform='scale('+Math.min(1+noTries*.18,2.2)+')';
  $('#qMsg').textContent=noLines[Math.min(noTries-1,noLines.length-1)];
}
no.addEventListener('mouseenter',dodge);no.addEventListener('pointerdown',e=>{e.preventDefault();dodge()});
yes.onclick=()=>{$('#qBox').innerHTML='<h3 style="font-size:2rem" class="pop">I knew it! 🥰</h3><p>Correct answer. You win a lifetime supply of cuddles.</p>';
  for(let i=0;i<4;i++)setTimeout(()=>confetti(rand(100,innerWidth-100),rand(100,400),80),i*250)};

/* ===== love meter ===== */
let lv=0,hv=null;const fill=$('#fill');
const meterLines=[[25,"Hmm, just warming up…"],[50,"Okay, now it's serious 😍"],[75,"Warning: sensor overheating!"],[99,"Almost there…"],[101,"ERROR: Love level exceeds universe limits. ∞ ❤️"]];
function startHold(e){e.preventDefault();if(hv)return;hv=setInterval(()=>{lv=Math.min(lv+1.2,100);fill.style.width=lv+'%';
  const l=meterLines.find(x=>lv<x[0])||meterLines[4];$('#meterTxt').textContent=lv>=100?meterLines[4][1]:l[1];
  if(lv>=100){stopHold();confetti(innerWidth/2,innerHeight/2,220)}},40)}
function stopHold(){clearInterval(hv);hv=null}
const hb=$('#hold');['pointerdown'].forEach(ev=>hb.addEventListener(ev,startHold));
['pointerup','pointerleave','pointercancel'].forEach(ev=>hb.addEventListener(ev,()=>{stopHold();if(lv<100){const d=setInterval(()=>{lv=Math.max(0,lv-2);fill.style.width=lv+'%';if(lv<=0||hv)clearInterval(d)},40)}}));

/* ===== reasons ===== */
let ri=-1;
$('#newReason').onclick=()=>{let n;do{n=Math.floor(Math.random()*CONFIG.reasons.length)}while(n===ri&&CONFIG.reasons.length>1);ri=n;
  const r=$('#reason');r.textContent=CONFIG.reasons[n];r.classList.remove('pop');void r.offsetWidth;r.classList.add('pop')};

/* ===== coupons ===== */
const grid=$('#couponGrid');
CONFIG.coupons.forEach(([t,d])=>{const c=document.createElement('button');c.className='coupon';
  c.innerHTML='<div class="cf">🎟️ '+t+'</div><div class="cb">'+d+'</div>';
  c.onclick=()=>{c.classList.toggle('open');if(c.classList.contains('open')){const r=c.getBoundingClientRect();confetti(r.left+r.width/2,r.top+40,40)}};grid.appendChild(c)});

/* ===== wheel ===== */
const wc=$('#wheel'),wx=wc.getContext('2d'),wcols=['#ff4f81','#ffc94d','#7de0c0','#b388ff','#4fc3f7','#ff8a65'];
(function drawWheel(){const n=CONFIG.wheel.length,a=2*Math.PI/n;
  CONFIG.wheel.forEach((t,i)=>{wx.beginPath();wx.moveTo(300,300);wx.arc(300,300,300,i*a-Math.PI/2,(i+1)*a-Math.PI/2);wx.fillStyle=wcols[i%wcols.length];wx.fill();
    wx.save();wx.translate(300,300);wx.rotate(i*a+a/2-Math.PI/2);wx.fillStyle='#2a0f33';wx.font='bold 34px Nunito, sans-serif';wx.textAlign='right';wx.fillText(t,270,12);wx.restore()})})();
let rot=0,spinning=false;
$('#spin').onclick=()=>{if(spinning)return;spinning=true;$('#wheelMsg').textContent='';
  const n=CONFIG.wheel.length,idx=Math.floor(Math.random()*n),seg=360/n;
  rot+=360*5+(360-(idx*seg+seg/2))-(rot%360);
  wc.style.transform='rotate('+rot+'deg)';
  setTimeout(()=>{spinning=false;$('#wheelMsg').textContent='Tonight: '+CONFIG.wheel[idx]+' (no backing out!)';confetti(innerWidth/2,innerHeight/2,150)},4100)};

/* ===== letter ===== */
$('#lh').textContent='Dear '+NAME+',';
$('#env').onclick=()=>{const l=$('#letterBox');l.hidden=false;$('#lh').textContent='Dear '+NAME+',';$('#env').style.display='none';
  confetti(innerWidth/2,innerHeight/2,250);l.scrollIntoView({block:'center'})};
