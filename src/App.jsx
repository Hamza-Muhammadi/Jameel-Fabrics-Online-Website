import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Config ────────────────────────────────────────────────────
const SUPA_URL = process.env.REACT_APP_SUPABASE_URL || "";
const SUPA_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const supabase = SUPA_URL && SUPA_KEY ? createClient(SUPA_URL, SUPA_KEY) : null;
const WA = "923228722232";
const BRAND = "JAMEEL FABRICS";
const SUB = "KUNJAH";
const TAGLINE = "Exclusive. Elegant. Pakistani.";
const PHONE = "03228722232";
const ADDRESS = "Circular Road Kunjah, Distt Gujrat, Punjab";
const ADMIN_PASS_DEFAULT = "jameel@admin2026";
const CATS = ["All","Men's Unstitched","Women Unstitched","Women Stitched","Kids"];
const pkr = n=>`Rs. ${Number(n||0).toLocaleString()}`;
const gid = ()=>Date.now()+Math.floor(Math.random()*9999);
const LS = {
  get:(k,d)=>{try{const v=localStorage.getItem("jf3d_"+k);return v!==null?JSON.parse(v):d;}catch{return d;}},
  set:(k,v)=>{try{localStorage.setItem("jf3d_"+k,JSON.stringify(v));}catch{}}
};
const tryParse=(v,d)=>{try{return v?JSON.parse(v):d;}catch{return d;}};

// ── Category Icon Components ──────────────────────────────────
const CatIcon = ({type, size=24, color="#b8922a"}) => {
  const icons = {
    all: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    men: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M8 3h8l2 5H6L8 3z"/><path d="M6 8v13h12V8"/><path d="M10 8v13M14 8v13"/><path d="M8 3L6 8M16 3l2 5"/></svg>,
    womenU: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M8 2h8l2 4-3 2v11H9V8L6 6l2-4z"/><path d="M9 8v11M15 8v11"/><path d="M9 13h6"/></svg>,
    womenS: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M12 2c-2 0-3 1-3 3v1L5 9v11h14V9l-4-3V5c0-2-1-3-3-3z"/><path d="M9 9h6M9 13h6"/></svg>,
    kids: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="5" r="2.5"/><path d="M9 9h6l1 5-2 1v5h-2v-4h-2v4H8v-5l-2-1z"/><path d="M7 11l-2 3M17 11l2 3"/></svg>,
  };
  const map = {all:"all", "Men's Unstitched":"men", "Women Unstitched":"womenU", "Women Stitched":"womenS", "Kids":"kids"};
  return icons[map[type]||type]||icons.all;
};

// ── SVG Icons ─────────────────────────────────────────────────
const ICONS = {
  search: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  heart: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  heartFill: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  bag: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  user: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  menu: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  wa: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  location: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  phone: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.4 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17l.19-.08z"/></svg>,
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  star: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  starEmpty: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  truck: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  eye: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  tiktok: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.19a8.19 8.19 0 0 0 4.79 1.53V6.27a4.85 4.85 0 0 1-1.02-.57z"/></svg>,
  instagram: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  // Category icons — fabric/clothing themed SVGs
  catAll: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  catMen: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M8 2h8l1 4-3 1v11H8V7L5 6z"/><path d="M10 7v11M14 7v11"/></svg>,
  catWomenU: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M7 2h10l2 5-4 1v10H9V8L5 7z"/><path d="M9 8v10M15 8v10"/></svg>,
  catWomenS: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 2c-2 0-4 2-4 4v1l-4 3v10h16V10l-4-3V6c0-2-2-4-4-4z"/></svg>,
  catKids: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="5" r="2"/><path d="M9 8h6l1 4-2 1v7h-2v-4h-2v4H8v-7l-2-1z"/></svg>,
};

// Default cat icons map (can be overridden by settings)
const DEFAULT_CAT_ICONS = {
  "All": "catAll",
  "Men's Unstitched": "catMen",
  "Women Unstitched": "catWomenU",
  "Women Stitched": "catWomenS",
  "Kids": "catKids",
};

// Available icon options for admin
const ICON_OPTIONS = [
  {key:"catAll", label:"Grid (All)"},
  {key:"catMen", label:"Kameez (Men)"},
  {key:"catWomenU", label:"Kurti (Women)"},
  {key:"catWomenS", label:"Dress (Stitched)"},
  {key:"catKids", label:"Kids"},
  {key:"star", label:"Star"},
  {key:"heart", label:"Heart"},
  {key:"location", label:"Location"},
];

// ── Global Styles ─────────────────────────────────────────────
const G = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,900;1,400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --gold:#b8922a;
  --gold2:#d4a843;
  --gold3:#f0c866;
  --cream:#faf8f3;
  --cream2:#f2ede3;
  --cream3:#e8dfc8;
  --dark:#1a1208;
  --dark2:#2a1f0a;
  --text:#1a1208;
  --text2:#4a3a18;
  --muted:#8a7a5a;
  --border:#d4a84333;
  --white:#ffffff;
  --shadow:0 24px 80px rgba(180,140,40,0.12);
  --shadow2:0 8px 32px rgba(180,140,40,0.15);
}
html{scroll-behavior:smooth;}
body{background:var(--cream);color:var(--text);font-family:'Jost',sans-serif;overflow-x:hidden;}
::selection{background:var(--gold)22;color:var(--gold);}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:var(--cream);}
::-webkit-scrollbar-thumb{background:var(--gold)44;border-radius:4px;}
a{text-decoration:none;color:inherit;}
button{font-family:'Jost',sans-serif;cursor:pointer;}
input,textarea,select{font-family:'Jost',sans-serif;}

/* Animations */
@keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideRight{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideLeft{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
@keyframes float{0%,100%{transform:translateY(0) rotateX(0deg)}50%{transform:translateY(-14px) rotateX(2deg)}}
@keyframes shimmer{0%,100%{opacity:0.7}50%{opacity:1}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes pulse3d{0%,100%{transform:scale3d(1,1,1)}50%{transform:scale3d(1.03,1.03,1.03)}}
@keyframes goldGlow{0%,100%{box-shadow:0 0 20px rgba(180,140,40,0.15)}50%{box-shadow:0 0 50px rgba(180,140,40,0.35)}}
@keyframes lineExpand{from{width:0}to{width:100%}}
@keyframes particleFloat{0%{transform:translateY(0px) translateX(0px) rotate(0deg);opacity:0}10%{opacity:0.8}90%{opacity:0.3}100%{transform:translateY(-100vh) translateX(30px) rotate(360deg);opacity:0}}
@keyframes cameraZoom{0%{transform:perspective(1000px) translateZ(0px) translateY(0px)}100%{transform:perspective(1000px) translateZ(400px) translateY(-80px)}}
@keyframes tilt3d{0%,100%{transform:perspective(800px) rotateX(0deg) rotateY(0deg)}25%{transform:perspective(800px) rotateX(2deg) rotateY(-3deg)}75%{transform:perspective(800px) rotateX(-2deg) rotateY(3deg)}}
@keyframes curtainReveal{0%{clip-path:inset(0 100% 0 0)}100%{clip-path:inset(0 0% 0 0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
@keyframes spotlightSweep{0%,100%{transform:translateX(-30%) rotate(-15deg);opacity:0.3}50%{transform:translateX(30%) rotate(15deg);opacity:0.6}}
@keyframes flicker{0%,90%,100%{opacity:1}92%,96%{opacity:0.8}94%,98%{opacity:0.95}}

.reveal{opacity:0;transform:translateY(30px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal-left{opacity:0;transform:translateX(-40px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
.reveal-left.visible{opacity:1;transform:translateX(0);}
.reveal-right{opacity:0;transform:translateX(40px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
.reveal-right.visible{opacity:1;transform:translateX(0);}

/* 3D Card hover */
.card-3d{transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),box-shadow 0.4s ease;transform-style:preserve-3d;will-change:transform;}
.card-3d:hover{box-shadow:0 40px 100px rgba(180,140,40,0.18)!important;}

/* Mobile */
@media(max-width:768px){
  .hide-mob{display:none!important}
  .full-mob{width:100%!important}
  .col-mob{flex-direction:column!important}
  .grid-2-mob{grid-template-columns:1fr 1fr!important}
  .grid-1-mob{grid-template-columns:1fr!important}
  .p-mob{padding:14px!important}
}
`;

// ── Intersection Observer ─────────────────────────────────────
function useReveal(){
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");}});
    },{threshold:0.12});
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  });
}

// ── 3D Tilt Card ──────────────────────────────────────────────
function TiltCard({children,style,className=""}){
  const ref=useRef(null);
  const onMove=e=>{
    const el=ref.current;if(!el)return;
    const r=el.getBoundingClientRect();
    const x=e.clientX-r.left,y=e.clientY-r.top;
    const cx=r.width/2,cy=r.height/2;
    const rx=(y-cy)/cy*-8,ry=(x-cx)/cx*8;
    el.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
  };
  const onLeave=()=>{if(ref.current)ref.current.style.transform="perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";};
  return <div ref={ref} className={`card-3d ${className}`} style={{transition:"transform 0.5s cubic-bezier(0.16,1,0.3,1)",...style}} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>;
}

// ── THREE.JS 3D SHOWROOM ──────────────────────────────────────
function Showroom3D({onEnter,settings={}}){
  const [step,setStep]=useState(0);
  const timers=useRef([]);

  useEffect(()=>{
    timers.current.push(setTimeout(()=>setStep(1),300));
    timers.current.push(setTimeout(()=>setStep(2),900));
    timers.current.push(setTimeout(()=>setStep(3),1500));
    timers.current.push(setTimeout(()=>setStep(4),2200));
    return()=>timers.current.forEach(clearTimeout);
  },[]);

  const b1  = settings.intro_brand1    || "JAMEEL";
  const b2  = settings.intro_brand2    || "FABRICS";
  const sub = settings.intro_sub       || "KUNJAH";
  const btn = settings.intro_enter_btn || "Enter the Store";
  const tag = settings.intro_tagline   || TAGLINE;
  const showSkip = settings.intro_skip    !== false;
  const showJF   = settings.intro_show_jf !== false;

  const css=`
    @keyframes jfSpinIn{from{opacity:0;transform:scale(.4) rotate(-18deg)}to{opacity:1;transform:scale(1) rotate(0)}}
    @keyframes jfFadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
    @keyframes jfGlow{0%,100%{text-shadow:0 0 18px rgba(212,168,67,.45)}50%{text-shadow:0 0 50px rgba(212,168,67,1),0 0 90px rgba(212,168,67,.25)}}
    @keyframes jfLine{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes jfDust{0%{opacity:0;transform:translateY(0)}20%{opacity:.55}80%{opacity:.12}100%{opacity:0;transform:translateY(-75px)}}
    @keyframes jfPulse{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0)}50%{box-shadow:0 0 22px 6px rgba(201,168,76,.22)}}
  `;

  const corner=(t,l)=>({
    position:"absolute",
    [t]:"-1px",[l]:"-1px",
    width:"13px",height:"13px",
    [t==="top"?"borderTop":"borderBottom"]:"2px solid rgba(201,168,76,.82)",
    [l==="left"?"borderLeft":"borderRight"]:"2px solid rgba(201,168,76,.82)",
  });

  return(
    <div style={{position:"fixed",inset:0,zIndex:99999,
      background:"linear-gradient(135deg,#0a0806 0%,#0f0d09 50%,#080604 100%)",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      overflow:"hidden",fontFamily:"'Jost',sans-serif"}}>
      <style>{css}</style>

      {/* Gold dust */}
      {[...Array(18)].map((_,i)=>(
        <div key={i} style={{
          position:"absolute",borderRadius:"50%",background:"rgba(201,168,76,.55)",
          width:`${(i%3)+1}px`,height:`${(i%3)+1}px`,
          left:`${5+i*5.2}%`,bottom:`${8+(Math.sin(i)*18+18)}%`,
          animation:`jfDust ${3+i*.12}s ease ${i*.28}s infinite`,
          pointerEvents:"none"}}/>
      ))}

      {/* JF Monogram */}
      {step>=1&&showJF&&(
        <div style={{marginBottom:"clamp(14px,2.5vw,22px)",animation:"jfSpinIn .7s cubic-bezier(.16,1,.3,1) both"}}>
          <svg width="clamp(54px,7vw,74px)" height="clamp(54px,7vw,74px)" viewBox="0 0 74 74" fill="none">
            <circle cx="37" cy="37" r="34" stroke="#c9a84c" strokeWidth="1.4" opacity=".82"/>
            <circle cx="37" cy="37" r="27" stroke="#c9a84c" strokeWidth=".6" opacity=".32"/>
            <path d="M37 4 L39.5 10 L37 16 L34.5 10 Z" fill="#c9a84c" opacity=".82"/>
            <path d="M37 70 L39.5 64 L37 58 L34.5 64 Z" fill="#c9a84c" opacity=".82"/>
            <path d="M4 37 L10 34.5 L16 37 L10 39.5 Z" fill="#c9a84c" opacity=".82"/>
            <path d="M70 37 L64 34.5 L58 37 L64 39.5 Z" fill="#c9a84c" opacity=".82"/>
            <text x="15" y="51" fontFamily="Playfair Display,serif" fontSize="27" fontWeight="900" fill="#c9a84c" opacity=".96">JF</text>
          </svg>
        </div>
      )}

      {/* Board */}
      {step>=2&&(
        <div style={{position:"relative",
          background:"linear-gradient(135deg,rgba(10,8,4,.97),rgba(22,16,6,.98))",
          border:"1.5px solid rgba(201,168,76,.65)",
          padding:"clamp(14px,2.5vw,24px) clamp(32px,6vw,70px)",
          textAlign:"center",
          animation:"jfFadeUp .7s cubic-bezier(.16,1,.3,1) both",
          boxShadow:"0 0 60px rgba(201,168,76,.22),0 0 140px rgba(201,168,76,.08),inset 0 0 50px rgba(201,168,76,.03)"}}>
          <div style={corner("top","left")}/><div style={corner("top","right")}/>
          <div style={corner("bottom","left")}/><div style={corner("bottom","right")}/>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,4.5vw,58px)",
            fontWeight:900,letterSpacing:"clamp(6px,1.2vw,13px)",color:"#fdfaf4",lineHeight:1,
            animation:"jfGlow 3s ease-in-out infinite"}}>{b1}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,4.5vw,58px)",
            fontWeight:900,letterSpacing:"clamp(6px,1.2vw,13px)",color:"#fdfaf4",lineHeight:.92,
            marginBottom:"clamp(8px,1.2vw,14px)",animation:"jfGlow 3s ease-in-out .2s infinite"}}>{b2}</div>
          <div style={{display:"flex",alignItems:
