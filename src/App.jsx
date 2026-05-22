import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPA_URL = process.env.REACT_APP_SUPABASE_URL || "";
const SUPA_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const supabase = SUPA_URL && SUPA_KEY ? createClient(SUPA_URL, SUPA_KEY) : null;
const WA = "923228722232";
const ADMIN_PASS = "jameel@admin2026";
const BRAND = "JAMEEL FABRICS KUNJAH";
const TAGLINE = "Exclusive. Elegant. Pakistani.";
const ADDRESS = "Circular Road Kunjah, Distt Gujrat";
const PHONE = "03228722232";
const TIKTOK = "@jameelfabrics";
const INSTA = "@jameelfabrics";

// ── Themes ────────────────────────────────────────────────────
const THEMES = {
  "Black Gold": {
    bg:"#070707", surface:"#111", card:"#161616", border:"#2a2a2a",
    accent:"#c9a84c", accent2:"#e8c97a", text:"#f5f0e8", muted:"#666",
    overlay:"rgba(0,0,0,0.85)", badge:"#c9a84c22",
    gradient:"linear-gradient(135deg,#c9a84c,#e8c97a,#c9a84c)",
  },
  "White Gold": {
    bg:"#fafaf8", surface:"#f0ede6", card:"#fff", border:"#e0d8c8",
    accent:"#b8922a", accent2:"#d4a843", text:"#1a1208", muted:"#8a7a5a",
    overlay:"rgba(255,255,255,0.9)", badge:"#b8922a22",
    gradient:"linear-gradient(135deg,#b8922a,#d4a843,#b8922a)",
  },
  "Deep Blue": {
    bg:"#020812", surface:"#071020", card:"#0a1628", border:"#152240",
    accent:"#4a90e2", accent2:"#7ab3f0", text:"#e8f0f8", muted:"#5a7a9a",
    overlay:"rgba(2,8,18,0.9)", badge:"#4a90e222",
    gradient:"linear-gradient(135deg,#4a90e2,#7ab3f0,#c9a84c)",
  },
};

// ── Demo Products ─────────────────────────────────────────────
const DEMO_PRODUCTS = [
  {id:1,name:"Khaddar Premium Winter Suit",brand:"Gul Ahmed",color:"Midnight Blue",fabric:"Khaddar",category:"Men's Unstitched",rack:"A1",stock:1,salePrice:3500,costPrice:2200,qtyType:"piece",barcode:"JF001",bonus:50,description:"Premium quality khaddar suit with intricate embroidery. Perfect for winter weddings and formal occasions. Soft texture, warm feel.",fabric_type:"Khaddar",washing_instructions:"Dry clean only",size_guide:"Standard XL fit",is_new_arrival:true,is_pre_order:false,views:124,is_active:true,available_pieces:1,photo_url:"",photo_url2:"",photo_url3:"",photo_url4:"",photo_url5:""},
  {id:2,name:"Lawn 3-Piece Embroidered",brand:"Sana Safinaz",color:"Rose Gold",fabric:"Lawn",category:"Women Unstitched 3P",rack:"B2",stock:1,salePrice:5200,costPrice:3400,qtyType:"piece",barcode:"JF002",bonus:100,description:"Exquisite lawn 3-piece with zari embroidery on shirt. Includes printed dupatta and trouser. Limited edition summer collection.",fabric_type:"Super Net Lawn",washing_instructions:"Hand wash cold",size_guide:"3.5m shirt, 2.5m trouser",is_new_arrival:true,is_pre_order:false,views:89,is_active:true,available_pieces:1,photo_url:"",photo_url2:"",photo_url3:"",photo_url4:"",photo_url5:""},
  {id:3,name:"Silk Stitched Gharara Set",brand:"Maria B",color:"Emerald Green",fabric:"Silk",category:"Women Stitched 2P+3P",rack:"C3",stock:1,salePrice:8500,costPrice:5500,qtyType:"piece",barcode:"JF003",bonus:200,description:"Luxurious silk gharara set with hand-done dabka work. Statement piece for weddings and formal events.",fabric_type:"Pure Silk",washing_instructions:"Dry clean only",size_guide:"M/L (customizable)",is_new_arrival:false,is_pre_order:false,views:203,is_active:true,available_pieces:1,photo_url:"",photo_url2:"",photo_url3:"",photo_url4:"",photo_url5:""},
  {id:4,name:"Cotton Shalwar Kameez Set",brand:"Alkaram",color:"Sky Blue",fabric:"Cotton",category:"Men's Unstitched",rack:"A3",stock:0,salePrice:2800,costPrice:1800,qtyType:"piece",barcode:"JF004",bonus:50,description:"Classic cotton suit for daily wear. Breathable fabric, premium stitching quality.",fabric_type:"Premium Cotton",washing_instructions:"Machine wash gentle",size_guide:"Standard sizes",is_new_arrival:false,is_pre_order:false,views:67,is_active:true,available_pieces:0,photo_url:"",photo_url2:"",photo_url3:"",photo_url4:"",photo_url5:""},
];

// ── Splash Screen ─────────────────────────────────────────────
function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    const t4 = setTimeout(() => onDone(), 3200);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);

  return (
    <div style={{position:"fixed",inset:0,background:"#070707",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,overflow:"hidden",fontFamily:"'Playfair Display',Georgia,serif"}}>
      {/* Animated background */}
      <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
        {[...Array(20)].map((_,i)=>(
          <div key={i} style={{position:"absolute",width:`${Math.random()*3+1}px`,height:`${Math.random()*100+50}px`,background:`linear-gradient(to bottom,transparent,#c9a84c${Math.floor(Math.random()*50+10).toString(16)},transparent)`,left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,transform:`rotate(${Math.random()*360}deg)`,animation:`fall ${Math.random()*3+2}s linear ${Math.random()*2}s infinite`,opacity:0.3}}/>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
        @keyframes fall { 0%{transform:translateY(-100px) rotate(45deg);opacity:0} 50%{opacity:0.4} 100%{transform:translateY(100vh) rotate(45deg);opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%,100%{opacity:0.7} 50%{opacity:1} }
        @keyframes expandLine { from{width:0} to{width:100%} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
        @keyframes fadeOut { from{opacity:1} to{opacity:0} }
      `}</style>

      <div style={{textAlign:"center",position:"relative",zIndex:1}}>
        {/* Logo mark */}
        <div style={{
          width:"80px",height:"80px",borderRadius:"50%",
          border:"2px solid #c9a84c",
          display:"flex",alignItems:"center",justifyContent:"center",
          margin:"0 auto 24px",
          animation:phase>=1?"pulse 2s ease infinite":"none",
          opacity:phase>=1?1:0,
          transition:"opacity 0.5s ease",
          background:"radial-gradient(circle,#c9a84c11,transparent)",
        }}>
          <span style={{fontSize:"32px",filter:"drop-shadow(0 0 10px #c9a84c)"}}>🧵</span>
        </div>

        {/* Brand name */}
        <div style={{
          fontSize:"clamp(28px,5vw,48px)",fontWeight:"900",letterSpacing:"6px",
          background:"linear-gradient(135deg,#c9a84c,#e8c97a,#c9a84c)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
          opacity:phase>=1?1:0,transform:phase>=1?"translateY(0)":"translateY(20px)",
          transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)",
          marginBottom:"8px",
          animation:phase>=2?"shimmer 2s ease infinite":"none",
        }}>JAMEEL FABRICS</div>

        <div style={{
          fontSize:"clamp(14px,2vw,18px)",fontWeight:"300",letterSpacing:"10px",
          color:"#c9a84c99",
          opacity:phase>=1?1:0,
          transition:"opacity 0.8s ease 0.3s",
          marginBottom:"24px",
        }}>KUNJAH</div>

        {/* Animated line */}
        <div style={{
          height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)",
          margin:"0 auto 20px",
          width:phase>=2?"200px":"0",
          transition:"width 0.8s ease",
        }}/>

        {/* Tagline */}
        <div style={{
          fontSize:"clamp(11px,1.5vw,14px)",letterSpacing:"4px",
          color:"#c9a84c88",fontStyle:"italic",
          fontFamily:"'Cormorant Garamond',Georgia,serif",
          opacity:phase>=2?1:0,
          transition:"opacity 0.8s ease 0.5s",
        }}>Exclusive. Elegant. Pakistani.</div>

        {/* Loading dots */}
        <div style={{display:"flex",gap:"6px",justifyContent:"center",marginTop:"32px",opacity:phase>=2?1:0,transition:"opacity 0.5s ease 0.8s"}}>
          {[0,1,2].map(i=>(
            <div key={i} style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c9a84c",animation:`pulse 1s ease ${i*0.2}s infinite`}}/>
          ))}
        </div>
      </div>

      {/* Fade out overlay */}
      <div style={{position:"absolute",inset:0,background:"#070707",opacity:phase>=3?1:0,transition:"opacity 0.5s ease",pointerEvents:"none"}}/>
    </div>
  );
}

// ── Star Rating ───────────────────────────────────────────────
function Stars({ rating, size=14 }) {
  return (
    <div style={{display:"flex",gap:"2px"}}>
      {[1,2,3,4,5].map(i=>(
        <span key={i} style={{fontSize:`${size}px`,color:i<=rating?"#c9a84c":"#333"}}>★</span>
      ))}
    </div>
  );
}

// ── Image Gallery ─────────────────────────────────────────────
function ImageGallery({ product, T }) {
  const [active, setActive] = useState(0);
  const photos = [product.photo_url,product.photo_url2,product.photo_url3,product.photo_url4,product.photo_url5].filter(Boolean);
  const fallback = `https://placehold.co/600x700/${T.accent.replace('#','')}/${T.bg.replace('#','')}?text=${encodeURIComponent(product.name.slice(0,15))}`;
  const imgs = photos.length ? photos : [fallback];

  return (
    <div>
      <div style={{position:"relative",borderRadius:"12px",overflow:"hidden",background:T.surface,aspectRatio:"3/4"}}>
        <img src={imgs[active]} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"opacity 0.3s"}} onError={e=>e.target.src=fallback}/>
        {product.is_new_arrival&&<div style={{position:"absolute",top:"12px",left:"12px",background:T.gradient,color:"#000",padding:"4px 12px",borderRadius:"20px",fontSize:"11px",fontWeight:"800",letterSpacing:"1px"}}>NEW</div>}
        {product.stock<=0&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:"20px",fontWeight:"900",letterSpacing:"3px"}}>SOLD OUT</span></div>}
        {product.stock===1&&product.stock>0&&<div style={{position:"absolute",top:"12px",right:"12px",background:"#e05252",color:"#fff",padding:"4px 10px",borderRadius:"20px",fontSize:"10px",fontWeight:"800"}}>LAST 1!</div>}
      </div>
      {imgs.length>1&&(
        <div style={{display:"flex",gap:"6px",marginTop:"8px"}}>
          {imgs.map((img,i)=>(
            <div key={i} onClick={()=>setActive(i)} style={{width:"60px",height:"70px",borderRadius:"8px",overflow:"hidden",cursor:"pointer",border:`2px solid ${active===i?T.accent:T.border}`,transition:"border 0.2s",flexShrink:0}}>
              <img src={img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.src=fallback}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────
function ProductCard({ product, T, onClick, wishlist, toggleWish }) {
  const [hovered, setHovered] = useState(false);
  const photos = [product.photo_url,product.photo_url2].filter(Boolean);
  const fallback = `https://placehold.co/400x500/1a1a1a/c9a84c?text=${encodeURIComponent(product.name.slice(0,10))}`;
  const img = photos[0] || fallback;
  const img2 = photos[1] || img;
  const wished = wishlist.includes(product.id);

  return (
    <div onClick={onClick} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{background:T.card,border:`1px solid ${hovered?T.accent:T.border}`,borderRadius:"16px",overflow:"hidden",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",transform:hovered?"translateY(-6px)":"translateY(0)",boxShadow:hovered?`0 20px 60px ${T.accent}22`:"none",position:"relative"}}>

      {/* Image */}
      <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:T.surface}}>
        <img src={hovered&&img2!==img?img2:img} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"all 0.5s ease",transform:hovered?"scale(1.05)":"scale(1)"}} onError={e=>e.target.src=fallback}/>

        {/* Badges */}
        {product.is_new_arrival&&<div style={{position:"absolute",top:"10px",left:"10px",background:T.gradient,color:"#000",padding:"3px 10px",borderRadius:"20px",fontSize:"10px",fontWeight:"800",letterSpacing:"1px"}}>✨ NEW</div>}
        {product.stock<=0&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.65)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:"16px",fontWeight:"900",letterSpacing:"3px",border:"2px solid #fff",padding:"6px 16px",borderRadius:"4px"}}>SOLD OUT</span></div>}
        {product.stock===1&&product.stock>0&&<div style={{position:"absolute",top:"10px",right:"10px",background:"#e05252",color:"#fff",padding:"3px 8px",borderRadius:"20px",fontSize:"9px",fontWeight:"800"}}>LAST 1!</div>}

        {/* Wishlist */}
        <button onClick={e=>{e.stopPropagation();toggleWish(product.id);}} style={{position:"absolute",bottom:"10px",right:"10px",background:wished?T.accent:"rgba(0,0,0,0.5)",border:"none",borderRadius:"50%",width:"34px",height:"34px",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",backdropFilter:"blur(4px)"}}>
          {wished?"❤️":"🤍"}
        </button>

        {/* Views */}
        <div style={{position:"absolute",bottom:"10px",left:"10px",background:"rgba(0,0,0,0.6)",color:"#fff",padding:"2px 8px",borderRadius:"20px",fontSize:"10px",backdropFilter:"blur(4px)"}}>
          👁 {product.views||0}
        </div>
      </div>

      {/* Info */}
      <div style={{padding:"14px"}}>
        <div style={{fontSize:"10px",color:T.muted,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"4px"}}>{product.category}</div>
        <div style={{fontWeight:"700",fontSize:"14px",color:T.text,marginBottom:"2px",lineHeight:"1.3",fontFamily:"'Playfair Display',Georgia,serif"}}>{product.name}</div>
        <div style={{fontSize:"11px",color:T.muted,marginBottom:"8px"}}>{product.color} · {product.fabric_type||product.fabric}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <span style={{fontSize:"18px",fontWeight:"900",color:T.accent}}>Rs. {Number(product.salePrice).toLocaleString()}</span>
            <div style={{fontSize:"10px",color:T.muted}}>per {product.qtyType}</div>
          </div>
          {product.stock>0&&<div style={{background:T.accent+"22",color:T.accent,padding:"4px 10px",borderRadius:"20px",fontSize:"10px",fontWeight:"700",border:`1px solid ${T.accent}44`}}>Available</div>}
        </div>
      </div>
    </div>
  );
}

// ── Product Modal ─────────────────────────────────────────────
function ProductModal({ product, T, onClose, wishlist, toggleWish, reviews, onAddReview }) {
  const [tab, setTab] = useState("details");
  const [rv, setRv] = useState({name:"",rating:5,comment:""});
  const [showBook, setShowBook] = useState(false);
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookMsg, setBookMsg] = useState("");
  const wished = wishlist.includes(product.id);
  const prodReviews = reviews.filter(r=>r.product_id===product.id);
  const avgRating = prodReviews.length ? Math.round(prodReviews.reduce((a,r)=>a+r.rating,0)/prodReviews.length) : 5;

  const waText = `Assalam o Alaikum! 👋\n\nI'm interested in:\n*${product.name}*\n💰 Price: Rs. ${Number(product.salePrice).toLocaleString()}\n🎨 Color: ${product.color}\n🧵 Fabric: ${product.fabric_type||product.fabric}\n\nIs it still available? Please confirm.`;

  const bookText = `Assalam o Alaikum! 👋\n\nI want to BOOK this item:\n*${product.name}*\n💰 Price: Rs. ${Number(product.salePrice).toLocaleString()}\n\n👤 Name: ${bookName}\n📞 Phone: ${bookPhone}\n📝 Message: ${bookMsg||"Please reserve for me"}\n\nKindly confirm my booking. Thank you!`;

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(8px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.card,borderRadius:"20px",width:"100%",maxWidth:"900px",maxHeight:"90vh",overflow:"auto",border:`1px solid ${T.border}`,boxShadow:`0 40px 120px ${T.accent}22`}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0"}}>
          {/* Left — Images */}
          <div style={{padding:"24px",borderRight:`1px solid ${T.border}`}}>
            <ImageGallery product={product} T={T}/>
          </div>

          {/* Right — Details */}
          <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:"12px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:"10px",color:T.muted,letterSpacing:"3px",textTransform:"uppercase"}}>{product.category}</div>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"22px",fontWeight:"700",color:T.text,lineHeight:"1.2",marginTop:"4px"}}>{product.name}</div>
              </div>
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={()=>toggleWish(product.id)} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:"50%",width:"36px",height:"36px",cursor:"pointer",fontSize:"18px"}}>
                  {wished?"❤️":"🤍"}
                </button>
                <button onClick={onClose} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:"50%",width:"36px",height:"36px",cursor:"pointer",color:T.muted,fontSize:"18px"}}>✕</button>
              </div>
            </div>

            {/* Rating */}
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <Stars rating={avgRating}/>
              <span style={{fontSize:"12px",color:T.muted}}>({prodReviews.length} reviews)</span>
            </div>

            {/* Price */}
            <div style={{background:T.surface,borderRadius:"12px",padding:"14px"}}>
              <div style={{fontSize:"28px",fontWeight:"900",color:T.accent}}>Rs. {Number(product.salePrice).toLocaleString()}</div>
              <div style={{fontSize:"12px",color:T.muted}}>per {product.qtyType} · {product.stock>0?`✅ Available (${product.stock} left)`:"❌ Sold Out"}</div>
            </div>

            {/* Tabs */}
            <div style={{display:"flex",gap:"4px",background:T.surface,padding:"4px",borderRadius:"10px"}}>
              {["details","specs","reviews"].map(t=>(
                <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"6px",borderRadius:"8px",border:"none",cursor:"pointer",background:tab===t?T.accent:"transparent",color:tab===t?"#000":T.muted,fontWeight:"700",fontSize:"11px",textTransform:"capitalize"}}>
                  {t==="reviews"?`Reviews (${prodReviews.length})`:t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{fontSize:"13px",color:T.text,lineHeight:"1.7",minHeight:"80px"}}>
              {tab==="details"&&<div>{product.description||"Premium quality fabric from Jameel Fabrics Kunjah. Exclusive design, limited availability."}</div>}
              {tab==="specs"&&<div style={{display:"grid",gap:"6px"}}>
                {[["Brand",product.brand],["Color",product.color],["Fabric",product.fabric_type||product.fabric],["Category",product.category],["Rack",product.rack],["Washing",product.washing_instructions||"Dry clean recommended"],["Size Guide",product.size_guide||"Standard sizes available"]].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${T.border}`}}>
                    <span style={{color:T.muted,fontWeight:"600"}}>{k}</span>
                    <span style={{color:T.text,fontWeight:"500",textAlign:"right"}}>{v||"—"}</span>
                  </div>
                ))}
              </div>}
              {tab==="reviews"&&<div>
                {prodReviews.map(r=>(
                  <div key={r.id} style={{background:T.surface,borderRadius:"10px",padding:"10px",marginBottom:"8px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                      <div style={{fontWeight:"700",fontSize:"12px"}}>{r.customer_name} {r.verified&&<span style={{color:T.accent,fontSize:"10px"}}>✓ Verified</span>}</div>
                      <Stars rating={r.rating} size={12}/>
                    </div>
                    <div style={{fontSize:"12px",color:T.muted}}>{r.comment}</div>
                  </div>
                ))}
                {!prodReviews.length&&<div style={{color:T.muted,textAlign:"center",padding:"20px"}}>No reviews yet — be the first!</div>}
                {/* Add review */}
                <div style={{background:T.surface,borderRadius:"10px",padding:"12px",marginTop:"8px"}}>
                  <div style={{fontWeight:"700",fontSize:"12px",marginBottom:"8px",color:T.accent}}>Write a Review</div>
                  <input value={rv.name} onChange={e=>setRv({...rv,name:e.target.value})} placeholder="Your name" style={{width:"100%",background:T.card,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"6px 10px",color:T.text,fontSize:"12px",marginBottom:"6px",boxSizing:"border-box"}}/>
                  <div style={{display:"flex",gap:"4px",marginBottom:"6px"}}>
                    {[1,2,3,4,5].map(i=><span key={i} onClick={()=>setRv({...rv,rating:i})} style={{fontSize:"20px",cursor:"pointer",color:i<=rv.rating?"#c9a84c":"#333"}}>★</span>)}
                  </div>
                  <textarea value={rv.comment} onChange={e=>setRv({...rv,comment:e.target.value})} placeholder="Share your experience..." style={{width:"100%",background:T.card,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"6px 10px",color:T.text,fontSize:"12px",height:"60px",resize:"none",boxSizing:"border-box",marginBottom:"6px"}}/>
                  <button onClick={()=>{if(rv.name&&rv.comment){onAddReview({...rv,product_id:product.id,product_name:product.name,id:Date.now(),date:new Date().toLocaleDateString(),verified:false});setRv({name:"",rating:5,comment:""});}}} style={{background:T.accent,color:"#000",border:"none",borderRadius:"8px",padding:"6px 14px",cursor:"pointer",fontWeight:"700",fontSize:"11px"}}>Submit ✓</button>
                </div>
              </div>}
            </div>

            {/* Action Buttons */}
            {product.stock>0&&!showBook&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginTop:"auto"}}>
                <a href={`https://wa.me/${WA}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#25D366",color:"#fff",borderRadius:"12px",padding:"12px",fontWeight:"700",fontSize:"13px",textDecoration:"none",transition:"all 0.2s"}}>
                  📱 Enquire
                </a>
                <button onClick={()=>setShowBook(true)} style={{background:T.gradient,color:"#000",border:"none",borderRadius:"12px",padding:"12px",fontWeight:"700",fontSize:"13px",cursor:"pointer"}}>
                  📋 Book Now
                </button>
              </div>
            )}

            {/* Booking Form */}
            {showBook&&product.stock>0&&(
              <div style={{background:T.surface,borderRadius:"12px",padding:"14px"}}>
                <div style={{fontWeight:"700",color:T.accent,marginBottom:"10px",fontSize:"14px"}}>📋 Book This Item</div>
                {[["Your Name",bookName,setBookName,"text"],["Your Phone",bookPhone,setBookPhone,"tel"]].map(([l,v,s,t])=>(
                  <div key={l} style={{marginBottom:"8px"}}>
                    <div style={{fontSize:"11px",color:T.muted,marginBottom:"3px"}}>{l}</div>
                    <input type={t} value={v} onChange={e=>s(e.target.value)} placeholder={l} style={{width:"100%",background:T.card,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"8px 12px",color:T.text,fontSize:"12px",boxSizing:"border-box"}}/>
                  </div>
                ))}
                <div style={{marginBottom:"10px"}}>
                  <div style={{fontSize:"11px",color:T.muted,marginBottom:"3px"}}>Message (optional)</div>
                  <textarea value={bookMsg} onChange={e=>setBookMsg(e.target.value)} placeholder="Any special request..." style={{width:"100%",background:T.card,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"8px 12px",color:T.text,fontSize:"12px",height:"50px",resize:"none",boxSizing:"border-box"}}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
                  <button onClick={()=>setShowBook(false)} style={{background:T.surface,color:T.muted,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"10px",cursor:"pointer",fontWeight:"600",fontSize:"12px"}}>Cancel</button>
                  <a href={`https://wa.me/${WA}?text=${encodeURIComponent(bookText)}`} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#25D366",color:"#fff",borderRadius:"10px",padding:"10px",fontWeight:"700",fontSize:"12px",textDecoration:"none"}}>
                    ✅ Confirm on WA
                  </a>
                </div>
              </div>
            )}

            {product.stock<=0&&<div style={{textAlign:"center",padding:"12px",background:T.surface,borderRadius:"12px",color:T.muted,fontSize:"13px"}}>😔 This item is sold out.<br/><a href={`https://wa.me/${WA}?text=${encodeURIComponent(`Assalam! I saw "${product.name}" is sold out. Do you have something similar?`)}`} target="_blank" rel="noreferrer" style={{color:T.accent}}>Ask for similar items →</a></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Admin Panel ───────────────────────────────────────────────
function AdminPanel({ T, products, setProducts, reviews, onClose }) {
  const [tab, setTab] = useState("products");
  const [editProd, setEditProd] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file, field, prod) => {
    if(!supabase||!file)return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${prod.id}/${field}-${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
    if(!error){
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
      setEditProd(p=>({...p,[field]:urlData.publicUrl}));
    }
    setUploading(false);
  };

  const saveProd = async () => {
    if(!editProd)return;
    setProducts(prev=>prev.map(p=>p.id===editProd.id?editProd:p));
    if(supabase){
      await supabase.from("products").upsert({
        id:editProd.id, name:editProd.name, brand:editProd.brand, color:editProd.color,
        fabric:editProd.fabric, category:editProd.category, rack:editProd.rack,
        stock:editProd.stock, sale_price:editProd.salePrice, cost_price:editProd.costPrice,
        qty_type:editProd.qtyType, barcode:editProd.barcode, bonus:editProd.bonus,
        description:editProd.description, fabric_type:editProd.fabric_type,
        washing_instructions:editProd.washing_instructions, size_guide:editProd.size_guide,
        is_new_arrival:editProd.is_new_arrival, is_pre_order:editProd.is_pre_order,
        is_active:editProd.is_active, available_pieces:editProd.stock,
        photo_url:editProd.photo_url, photo_url2:editProd.photo_url2,
        photo_url3:editProd.photo_url3, photo_url4:editProd.photo_url4,
        photo_url5:editProd.photo_url5,
      });
    }
    setEditProd(null);
    alert("✅ Product saved!");
  };

  const inp = (label, field, type="text") => (
    <div key={field}>
      <div style={{fontSize:"11px",color:T.muted,marginBottom:"3px"}}>{label}</div>
      {type==="textarea"
        ?<textarea value={editProd[field]||""} onChange={e=>setEditProd(p=>({...p,[field]:e.target.value}))} style={{width:"100%",background:T.bg,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"8px",color:T.text,fontSize:"12px",height:"70px",resize:"vertical",boxSizing:"border-box"}}/>
        :<input type={type} value={editProd[field]||""} onChange={e=>setEditProd(p=>({...p,[field]:type==="number"?+e.target.value:e.target.value}))} style={{width:"100%",background:T.bg,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"8px",color:T.text,fontSize:"12px",boxSizing:"border-box"}}/>
      }
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:2000,display:"flex",flexDirection:"column",fontFamily:"system-ui,sans-serif"}}>
      <style>{`* { box-sizing: border-box; }`}</style>
      {/* Header */}
      <div style={{background:T.surface,borderBottom:`1px solid ${T.border}`,padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontWeight:"800",fontSize:"16px",color:T.accent}}>⚙️ Admin Panel — {BRAND}</div>
        <div style={{display:"flex",gap:"8px"}}>
          {["products","reviews","stats"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?T.accent:T.card,color:tab===t?"#000":T.text,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"6px 14px",cursor:"pointer",fontWeight:"600",fontSize:"12px",textTransform:"capitalize"}}>{t}</button>
          ))}
          <button onClick={onClose} style={{background:T.danger||"#e05252",color:"#fff",border:"none",borderRadius:"8px",padding:"6px 14px",cursor:"pointer",fontWeight:"700",fontSize:"12px"}}>✕ Close</button>
        </div>
      </div>

      <div style={{flex:1,overflow:"auto",padding:"20px"}}>
        {/* Products Tab */}
        {tab==="products"&&!editProd&&(
          <div>
            <div style={{fontWeight:"700",color:T.text,marginBottom:"12px",fontSize:"15px"}}>📦 Products ({products.length})</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"12px"}}>
              {products.map(p=>(
                <div key={p.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",padding:"14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
                    <div>
                      <div style={{fontWeight:"700",fontSize:"13px",color:T.text}}>{p.name}</div>
                      <div style={{fontSize:"11px",color:T.muted}}>{p.category} · {p.color}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontWeight:"800",color:T.accent,fontSize:"14px"}}>Rs.{Number(p.salePrice).toLocaleString()}</div>
                      <div style={{fontSize:"10px",color:p.stock>0?"#4caf7d":"#e05252",fontWeight:"700"}}>{p.stock>0?`✅ ${p.stock} left`:"❌ Sold Out"}</div>
                    </div>
                  </div>
                  {p.photo_url&&<img src={p.photo_url} alt="" style={{width:"100%",height:"120px",objectFit:"cover",borderRadius:"8px",marginBottom:"8px"}}/>}
                  <div style={{display:"flex",gap:"6px"}}>
                    <button onClick={()=>setEditProd({...p})} style={{flex:1,background:T.accent,color:"#000",border:"none",borderRadius:"8px",padding:"6px",cursor:"pointer",fontWeight:"700",fontSize:"11px"}}>✏️ Edit</button>
                    <button onClick={()=>{if(confirm("Toggle active?"))setProducts(prev=>prev.map(x=>x.id===p.id?{...x,is_active:!x.is_active}:x));}} style={{background:p.is_active?"#4caf7d":"#e05252",color:"#fff",border:"none",borderRadius:"8px",padding:"6px 10px",cursor:"pointer",fontWeight:"700",fontSize:"11px"}}>{p.is_active?"👁":"🙈"}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Product */}
        {tab==="products"&&editProd&&(
          <div style={{maxWidth:"700px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
              <div style={{fontWeight:"700",color:T.accent,fontSize:"16px"}}>✏️ Edit: {editProd.name}</div>
              <button onClick={()=>setEditProd(null)} style={{background:T.surface,color:T.muted,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"6px 12px",cursor:"pointer"}}>← Back</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",background:T.card,borderRadius:"16px",padding:"20px"}}>
              {inp("Product Name","name")}
              {inp("Brand","brand")}
              {inp("Color","color")}
              {inp("Fabric","fabric")}
              {inp("Fabric Type","fabric_type")}
              {inp("Category","category")}
              {inp("Sale Price","salePrice","number")}
              {inp("Cost Price","costPrice","number")}
              {inp("Stock","stock","number")}
              {inp("Rack","rack")}
              {inp("Barcode","barcode")}
              {inp("Salesman Bonus","bonus","number")}
              <div style={{gridColumn:"1/-1"}}>{inp("Description","description","textarea")}</div>
              {inp("Washing Instructions","washing_instructions")}
              {inp("Size Guide","size_guide")}

              {/* Toggles */}
              <div style={{display:"flex",gap:"12px",gridColumn:"1/-1"}}>
                {[["New Arrival","is_new_arrival"],["Pre-Order","is_pre_order"],["Active (Show)","is_active"]].map(([l,k])=>(
                  <label key={k} style={{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"12px",color:T.text}}>
                    <input type="checkbox" checked={!!editProd[k]} onChange={e=>setEditProd(p=>({...p,[k]:e.target.checked}))} style={{accentColor:T.accent}}/>
                    {l}
                  </label>
                ))}
              </div>

              {/* Image uploads */}
              <div style={{gridColumn:"1/-1"}}>
                <div style={{fontWeight:"700",color:T.accent,marginBottom:"10px",fontSize:"13px"}}>📸 Product Images (Max 5)</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"8px"}}>
                  {["photo_url","photo_url2","photo_url3","photo_url4","photo_url5"].map((field,i)=>(
                    <div key={field}>
                      <div style={{fontSize:"10px",color:T.muted,marginBottom:"4px"}}>Photo {i+1}</div>
                      {editProd[field]&&<img src={editProd[field]} alt="" style={{width:"100%",height:"80px",objectFit:"cover",borderRadius:"6px",marginBottom:"4px"}}/>}
                      <input type="file" accept="image/*" onChange={e=>e.target.files[0]&&uploadImage(e.target.files[0],field,editProd)} style={{width:"100%",fontSize:"9px",color:T.muted}}/>
                      {editProd[field]&&<div style={{fontSize:"9px",marginTop:"2px"}}><input value={editProd[field]} onChange={e=>setEditProd(p=>({...p,[field]:e.target.value}))} placeholder="Or paste URL" style={{width:"100%",background:T.bg,border:`1px solid ${T.border}`,borderRadius:"4px",padding:"3px",color:T.text,fontSize:"9px"}}/></div>}
                      {!editProd[field]&&<input value="" onChange={e=>setEditProd(p=>({...p,[field]:e.target.value}))} placeholder="Paste image URL" style={{width:"100%",background:T.bg,border:`1px solid ${T.border}`,borderRadius:"4px",padding:"3px",color:T.text,fontSize:"9px",marginTop:"2px"}}/>}
                    </div>
                  ))}
                </div>
                {uploading&&<div style={{color:T.accent,fontSize:"11px",marginTop:"6px"}}>⏳ Uploading...</div>}
              </div>

              <div style={{gridColumn:"1/-1",display:"flex",gap:"10px",marginTop:"8px"}}>
                <button onClick={saveProd} style={{flex:1,background:T.gradient,color:"#000",border:"none",borderRadius:"10px",padding:"12px",cursor:"pointer",fontWeight:"800",fontSize:"14px"}}>💾 Save Product</button>
                <button onClick={()=>setEditProd(null)} style={{background:T.surface,color:T.muted,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"12px 20px",cursor:"pointer",fontWeight:"600"}}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {tab==="reviews"&&(
          <div>
            <div style={{fontWeight:"700",color:T.text,marginBottom:"12px",fontSize:"15px"}}>⭐ Reviews ({reviews.length})</div>
            <div style={{display:"grid",gap:"8px"}}>
              {reviews.map(r=>(
                <div key={r.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"12px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontWeight:"700",fontSize:"13px",color:T.text}}>{r.customer_name} <span style={{fontSize:"11px",color:T.muted}}>on {r.product_name}</span></div>
                    <Stars rating={r.rating} size={12}/>
                    <div style={{fontSize:"12px",color:T.muted,marginTop:"4px"}}>{r.comment}</div>
                  </div>
                  <div style={{fontSize:"10px",color:T.muted}}>{r.date}</div>
                </div>
              ))}
              {!reviews.length&&<div style={{color:T.muted,textAlign:"center",padding:"40px"}}>No reviews yet</div>}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {tab==="stats"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"12px"}}>
            {[
              {l:"Total Products",v:products.length,i:"📦"},
              {l:"Available",v:products.filter(p=>p.stock>0).length,i:"✅"},
              {l:"Sold Out",v:products.filter(p=>p.stock<=0).length,i:"❌"},
              {l:"Total Views",v:products.reduce((a,p)=>a+p.views,0),i:"👁"},
              {l:"Reviews",v:reviews.length,i:"⭐"},
              {l:"Avg Rating",v:reviews.length?`${(reviews.reduce((a,r)=>a+r.rating,0)/reviews.length).toFixed(1)}★`:"—",i:"🌟"},
            ].map(s=>(
              <div key={s.l} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",padding:"20px",textAlign:"center"}}>
                <div style={{fontSize:"32px",marginBottom:"8px"}}>{s.i}</div>
                <div style={{fontSize:"28px",fontWeight:"900",color:T.accent}}>{s.v}</div>
                <div style={{fontSize:"12px",color:T.muted}}>{s.l}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────
export default function App() {
  const [splash, setSplash] = useState(true);
  const [theme, setTheme] = useState("Black Gold");
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [reviews, setReviews] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [viewingCount] = useState(()=>Math.floor(Math.random()*8)+3);
  const [loaded, setLoaded] = useState(false);

  const T = THEMES[theme];

  // Load from Supabase
  useEffect(()=>{
    if(!supabase)return;
    Promise.all([
      supabase.from("products").select("*").eq("is_active",true),
      supabase.from("reviews").select("*"),
    ]).then(([{data:pr},{data:rv}])=>{
      if(pr?.length) setProducts(pr.map(r=>({...r,salePrice:r.sale_price,costPrice:r.cost_price,qtyType:r.qty_type,maxDiscount:r.max_discount,offerPrice:r.offer_price,offerStart:r.offer_start,offerEnd:r.offer_end,fabric_type:r.fabric_type||r.fabric})));
      if(rv?.length) setReviews(rv);
    });
  },[]);

  useEffect(()=>{ setTimeout(()=>setLoaded(true),100); },[]);

  const CATS = ["All", ...new Set(products.map(p=>p.category))];
  const filtered = products.filter(p=>
    p.is_active!==false &&
    (catFilter==="All"||p.category===catFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase())||p.color.toLowerCase().includes(search.toLowerCase())||p.brand.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleWish = (id) => setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const openProduct = (p) => { setSelected(p); if(supabase) supabase.from("products").update({views:(p.views||0)+1}).eq("id",p.id); };

  const addReview = async (rv) => {
    setReviews(r=>[...r,rv]);
    if(supabase) await supabase.from("reviews").insert({...rv,id:rv.id,product_id:rv.product_id,product_name:rv.product_name,customer_name:rv.name,rating:rv.rating,comment:rv.comment,date:new Date().toLocaleDateString(),verified:false});
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${T.bg}; color: ${T.text}; font-family: 'DM Sans', system-ui, sans-serif; }
    ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${T.bg}; } ::-webkit-scrollbar-thumb { background: ${T.accent}44; border-radius: 4px; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer { 0%,100%{opacity:0.8} 50%{opacity:1} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    .prod-card { animation: fadeUp 0.5s ease both; }
    .prod-card:nth-child(1){animation-delay:0.05s} .prod-card:nth-child(2){animation-delay:0.1s} .prod-card:nth-child(3){animation-delay:0.15s} .prod-card:nth-child(4){animation-delay:0.2s} .prod-card:nth-child(5){animation-delay:0.25s} .prod-card:nth-child(6){animation-delay:0.3s}
    @media(max-width:768px){.modal-grid{grid-template-columns:1fr!important}.hide-mobile{display:none!important}}
  `;

  return (
    <>
      <style>{css}</style>
      {splash&&<SplashScreen onDone={()=>setSplash(false)}/>}

      {/* Navbar */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}ee`,backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.border}`,padding:"0 24px",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <span style={{fontSize:"22px",animation:"float 3s ease infinite"}}>🧵</span>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:"900",fontSize:"clamp(14px,2vw,18px)",background:T.gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"2px"}}>{BRAND}</div>
            <div style={{fontSize:"9px",color:T.muted,letterSpacing:"3px",fontStyle:"italic"}}>{TAGLINE}</div>
          </div>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          {/* Theme switcher */}
          <div style={{display:"flex",gap:"4px"}}>
            {Object.keys(THEMES).map(th=>(
              <button key={th} onClick={()=>setTheme(th)} title={th} style={{width:"18px",height:"18px",borderRadius:"50%",border:`2px solid ${theme===th?"#fff":THEMES[th].border}`,background:THEMES[th].accent,cursor:"pointer",transition:"all 0.2s"}}/>
            ))}
          </div>
          {/* Wishlist */}
          <button onClick={()=>setSelected(null)} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:"20px",padding:"6px 12px",color:T.text,cursor:"pointer",fontSize:"12px",display:"flex",alignItems:"center",gap:"4px"}}>
            ❤️ <span style={{color:T.accent,fontWeight:"700"}}>{wishlist.length}</span>
          </button>
          {/* Admin */}
          <button onClick={()=>setShowAdminLogin(true)} style={{background:T.accent,color:"#000",border:"none",borderRadius:"20px",padding:"6px 14px",cursor:"pointer",fontSize:"11px",fontWeight:"700"}}>Admin</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{position:"relative",background:T.surface,padding:"60px 24px",textAlign:"center",overflow:"hidden",borderBottom:`1px solid ${T.border}`}}>
        {/* Decorative elements */}
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundImage:`radial-gradient(circle at 20% 50%,${T.accent}11 0%,transparent 50%),radial-gradient(circle at 80% 50%,${T.accent}08 0%,transparent 50%)`,pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(11px,1.5vw,13px)",letterSpacing:"6px",color:T.accent,marginBottom:"16px",fontStyle:"italic",animation:"fadeUp 0.6s ease both"}}>✦ Welcome to ✦</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,6vw,72px)",fontWeight:"900",lineHeight:"1.1",marginBottom:"16px",animation:"fadeUp 0.6s ease 0.1s both"}}>
            <span style={{background:T.gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{BRAND}</span>
          </h1>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(16px,2.5vw,22px)",color:T.muted,fontStyle:"italic",marginBottom:"32px",animation:"fadeUp 0.6s ease 0.2s both"}}>
            Where every thread tells a story of elegance
          </p>
          <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap",animation:"fadeUp 0.6s ease 0.3s both"}}>
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Assalam o Alaikum! I'd like to know about your latest collection.")}`} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#25D366",color:"#fff",borderRadius:"30px",padding:"12px 24px",fontWeight:"700",textDecoration:"none",fontSize:"14px"}}>
              📱 WhatsApp Us
            </a>
            <button onClick={()=>document.getElementById("catalogue").scrollIntoView({behavior:"smooth"})} style={{background:"none",border:`1px solid ${T.accent}`,color:T.accent,borderRadius:"30px",padding:"12px 24px",cursor:"pointer",fontWeight:"700",fontSize:"14px"}}>
              View Collection ↓
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{display:"flex",justifyContent:"center",gap:"40px",marginTop:"48px",flexWrap:"wrap",animation:"fadeUp 0.6s ease 0.4s both"}}>
          {[["100%","Exclusive Designs"],["1+1","Each Piece Unique"],["✓","Trusted Quality"],["🚚","Fast Delivery"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:"20px",fontWeight:"900",color:T.accent,fontFamily:"'Playfair Display',serif"}}>{v}</div>
              <div style={{fontSize:"11px",color:T.muted,letterSpacing:"1px"}}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Live viewers bar */}
      <div style={{background:T.accent,color:"#000",padding:"8px 24px",textAlign:"center",fontSize:"12px",fontWeight:"700",letterSpacing:"1px"}}>
        🔴 LIVE — {viewingCount} people browsing right now · New arrivals added daily · WhatsApp: {PHONE}
      </div>

      {/* Catalogue */}
      <section id="catalogue" style={{padding:"40px 24px",maxWidth:"1400px",margin:"0 auto"}}>
        {/* Search & Filter */}
        <div style={{display:"flex",gap:"12px",marginBottom:"32px",flexWrap:"wrap",alignItems:"center"}}>
          <div style={{position:"relative",flex:1,minWidth:"200px"}}>
            <span style={{position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)",color:T.muted,fontSize:"16px"}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, color, brand..." style={{width:"100%",background:T.card,border:`1px solid ${T.border}`,borderRadius:"30px",padding:"12px 16px 12px 42px",color:T.text,fontSize:"13px",outline:"none",transition:"border 0.2s"}} onFocus={e=>e.target.style.border=`1px solid ${T.accent}`} onBlur={e=>e.target.style.border=`1px solid ${T.border}`}/>
          </div>
          <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCatFilter(c)} style={{background:catFilter===c?T.accent:T.card,color:catFilter===c?"#000":T.text,border:`1px solid ${catFilter===c?T.accent:T.border}`,borderRadius:"20px",padding:"8px 16px",cursor:"pointer",fontSize:"12px",fontWeight:"600",transition:"all 0.2s",whiteSpace:"nowrap"}}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div style={{marginBottom:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:"13px",color:T.muted}}>
            Showing <span style={{color:T.accent,fontWeight:"700"}}>{filtered.length}</span> of {products.length} pieces
            {catFilter!=="All"&&<span> in <span style={{color:T.accent}}>{catFilter}</span></span>}
          </div>
          <div style={{fontSize:"12px",color:T.muted,display:"flex",alignItems:"center",gap:"6px"}}>
            <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#4caf7d",animation:"shimmer 1.5s ease infinite"}}/>
            Live inventory
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length===0
          ?<div style={{textAlign:"center",padding:"80px 20px",color:T.muted}}>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>🔍</div>
            <div style={{fontSize:"18px",marginBottom:"8px"}}>No products found</div>
            <div style={{fontSize:"14px"}}>Try a different search or <button onClick={()=>{setSearch("");setCatFilter("All");}} style={{color:T.accent,background:"none",border:"none",cursor:"pointer",fontSize:"14px"}}>clear filters</button></div>
          </div>
          :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"20px"}}>
            {filtered.map(p=>(
              <div key={p.id} className="prod-card">
                <ProductCard product={p} T={T} onClick={()=>openProduct(p)} wishlist={wishlist} toggleWish={toggleWish}/>
              </div>
            ))}
          </div>
        }
      </section>

      {/* Features Section */}
      <section style={{background:T.surface,padding:"60px 24px",borderTop:`1px solid ${T.border}`,marginTop:"40px"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",textAlign:"center"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,4vw,36px)",fontWeight:"700",color:T.text,marginBottom:"40px"}}>
            Why Choose <span style={{background:T.gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{BRAND}?</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"24px"}}>
            {[
              {i:"✨",t:"Exclusive Designs",d:"Every piece is unique — once sold, never repeated"},
              {i:"🧵",t:"Premium Quality",d:"Sourced from trusted mills and brands"},
              {i:"📱",t:"Easy Booking",d:"Book via WhatsApp in seconds"},
              {i:"🚀",t:"Fast Response",d:"We reply within minutes on WhatsApp"},
              {i:"💯",t:"Trusted Store",d:"Serving Kunjah & surrounding areas"},
              {i:"🔄",t:"Easy Exchange",d:"Hassle-free exchange policy"},
            ].map(f=>(
              <div key={f.t} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"16px",padding:"24px",textAlign:"center",transition:"all 0.3s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.accent} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                <div style={{fontSize:"32px",marginBottom:"12px"}}>{f.i}</div>
                <div style={{fontWeight:"700",color:T.text,marginBottom:"6px",fontSize:"14px"}}>{f.t}</div>
                <div style={{fontSize:"12px",color:T.muted,lineHeight:"1.5"}}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background:T.surface,borderTop:`1px solid ${T.border}`,padding:"40px 24px",textAlign:"center"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:"700",background:T.gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"8px"}}>{BRAND}</div>
        <div style={{fontSize:"12px",color:T.muted,marginBottom:"16px",fontStyle:"italic"}}>{TAGLINE}</div>
        <div style={{display:"flex",justifyContent:"center",gap:"16px",marginBottom:"16px",flexWrap:"wrap"}}>
          {[[`📍 ${ADDRESS}`,""],["📞 "+PHONE,`tel:${PHONE}`],["TikTok: "+TIKTOK,""],["IG: "+INSTA,""]].map(([l,h])=>(
            h?<a key={l} href={h} style={{fontSize:"12px",color:T.muted,textDecoration:"none"}}>{l}</a>
            :<span key={l} style={{fontSize:"12px",color:T.muted}}>{l}</span>
          ))}
        </div>
        <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Assalam! I want to see your latest collection.")}`} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#25D366",color:"#fff",borderRadius:"30px",padding:"10px 24px",textDecoration:"none",fontWeight:"700",fontSize:"13px",marginBottom:"20px"}}>
          📱 Chat with us on WhatsApp
        </a>
        <div style={{fontSize:"11px",color:T.muted,borderTop:`1px solid ${T.border}`,paddingTop:"16px"}}>
          © 2026 {BRAND} · All Rights Reserved · Made with ❤️ in Kunjah
        </div>
      </footer>

      {/* Product Modal */}
      {selected&&(
        <div className="modal-grid">
          <ProductModal product={selected} T={T} onClose={()=>setSelected(null)} wishlist={wishlist} toggleWish={toggleWish} reviews={reviews} onAddReview={addReview}/>
        </div>
      )}

      {/* Admin Login */}
      {showAdminLogin&&!showAdmin&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:1500,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"16px",padding:"32px",width:"300px",textAlign:"center"}}>
            <div style={{fontSize:"32px",marginBottom:"12px"}}>🔐</div>
            <div style={{fontWeight:"700",fontSize:"16px",color:T.accent,marginBottom:"4px"}}>Admin Access</div>
            <div style={{fontSize:"12px",color:T.muted,marginBottom:"16px"}}>Enter admin password</div>
            <input type="password" value={adminInput} onChange={e=>setAdminInput(e.target.value)} placeholder="Password..." style={{width:"100%",background:T.bg,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"10px",color:T.text,fontSize:"13px",marginBottom:"10px",boxSizing:"border-box"}} onKeyDown={e=>{ if(e.key==="Enter"){ if(adminInput===ADMIN_PASS){setShowAdmin(true);setShowAdminLogin(false);setAdminInput("");}else alert("Wrong password!"); } }}/>
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={()=>{ if(adminInput===ADMIN_PASS){setShowAdmin(true);setShowAdminLogin(false);setAdminInput("");}else alert("Wrong password!"); }} style={{flex:1,background:T.accent,color:"#000",border:"none",borderRadius:"8px",padding:"10px",cursor:"pointer",fontWeight:"700"}}>Unlock</button>
              <button onClick={()=>{setShowAdminLogin(false);setAdminInput("");}} style={{background:T.surface,color:T.muted,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"10px 16px",cursor:"pointer"}}>✕</button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {showAdmin&&<AdminPanel T={T} products={products} setProducts={setProducts} reviews={reviews} onClose={()=>setShowAdmin(false)}/>}
    </>
  );
}
