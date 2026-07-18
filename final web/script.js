const $=s=>document.querySelector(s);addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('hide'),1250));
const items=[['Front View','assets/bus-1.jpg'],['Side Profile','assets/bus-2.jpg'],['Rear View','assets/bus-3.jpg'],['Interior & Seating','assets/bus-4.jpg'],['Night Presence','assets/bus-5.jpg'],['Coach Details','assets/bus-6.jpg']];
let active=0,lightIndex=0;const car=$('#carousel');
items.forEach((it,i)=>{let d=document.createElement('article');d.className='galleryCard';d.dataset.i=i;let img=new Image();img.src=it[1];img.alt=it[0];img.onload=()=>{d.innerHTML='';d.appendChild(img)};img.onerror=()=>d.innerHTML=`<div class="ph">${it[0]}<small>Add ${it[1]}</small></div>`;d.appendChild(img);d.onclick=()=>openLight(i);car.appendChild(d)});
function render(){let cards=[...document.querySelectorAll('.galleryCard')],n=cards.length;cards.forEach((c,i)=>{let delta=(i-active+n)%n;if(delta>n/2)delta-=n;let abs=Math.abs(delta);c.style.transform=`translate(-50%,-50%) translateX(${delta*46}%) translateZ(${-abs*180}px) rotateY(${-delta*15}deg) scale(${1-abs*.12})`;c.style.opacity=abs>2?0:.95-abs*.2;c.style.filter=`brightness(${1-abs*.18})`;c.style.zIndex=10-abs});$('#current').textContent=String(active+1).padStart(2,'0');$('#total').textContent=String(n).padStart(2,'0')}
function move(d){active=(active+d+items.length)%items.length;render()}$('.prev').onclick=()=>move(-1);$('.next').onclick=()=>move(1);render();
let sx=0;car.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});car.addEventListener('touchend',e=>{let dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)move(dx<0?1:-1)},{passive:true});
$('#startExplore').onclick=()=>$('#gallery').scrollIntoView({behavior:'smooth'});
const lb=$('#lightbox'),lc=$('#lightContent');
function openLight(i){lightIndex=i;drawLight();lb.classList.add('open')}
function drawLight(){let [name,src]=items[lightIndex],img=new Image();lc.innerHTML='';img.src=src;img.alt=name;img.onload=()=>lc.replaceChildren(img);img.onerror=()=>lc.innerHTML=`<div class="ph">${name}<small>Add ${src}</small></div>`;lc.appendChild(img);$('#lbCaption').textContent=`${String(lightIndex+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')} — ${name.toUpperCase()}`}
$('#close').onclick=()=>lb.classList.remove('open');$('#lbPrev').onclick=()=>{lightIndex=(lightIndex-1+items.length)%items.length;drawLight()};$('#lbNext').onclick=()=>{lightIndex=(lightIndex+1)%items.length;drawLight()};lb.onclick=e=>{if(e.target===lb)lb.classList.remove('open')};addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open');if(lb.classList.contains('open')&&e.key==='ArrowRight')$('#lbNext').click();if(lb.classList.contains('open')&&e.key==='ArrowLeft')$('#lbPrev').click()});
if(matchMedia('(pointer:fine)').matches){$('.visual').addEventListener('mousemove',e=>{let r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;$('.heroCard').style.transform=`rotateY(${-13+x*7}deg) rotateX(${4-y*6}deg) rotateZ(2deg) translate(${x*8}px,${y*8}px)`});$('.visual').addEventListener('mouseleave',()=>$('.heroCard').style.transform='')}

// Contact + booking configuration. Fill window.SHUN_CONTACT in index.html only.
(()=>{
 const c=window.SHUN_CONTACT||{}, set=(id,text)=>{const e=document.getElementById(id);if(e)e.textContent=text||e.textContent};
 set('phoneText',c.phone);set('whatsappText',c.whatsapp);set('instagramText',c.instagram);set('emailText',c.email);set('locationText',c.location);
 const phone=document.getElementById('phoneLink'),wa=document.getElementById('whatsappLink'),ig=document.getElementById('instagramLink'),mail=document.getElementById('emailLink');
 if(c.phone)phone.href='tel:'+c.phone.replace(/[^\d+]/g,'');
 if(c.whatsapp){const n=c.whatsapp.replace(/\D/g,''),msg=encodeURIComponent('Hello SHUN Tours & Travels, I would like to enquire about booking the 21-Seater Coach Bus.');wa.href='https://wa.me/'+n+'?text='+msg;document.querySelectorAll('[data-booking-link]').forEach(a=>a.href=wa.href)}
 if(c.instagram)ig.href=c.instagram;
 if(c.email)mail.href='mailto:'+c.email+'?subject='+encodeURIComponent('21-Seater Coach Bus Booking Enquiry');
 document.querySelectorAll('[data-booking-link]').forEach(a=>a.addEventListener('click',e=>{if(!c.whatsapp){e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}}));
})();
