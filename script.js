const $=s=>document.querySelector(s),modal=$('#modal'),slot=$('#slot');let active=null,holder=null;
addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('hide'),950));
function openCard(c){if(active)return;active=c;holder=document.createComment('home');c.parentNode.insertBefore(holder,c);slot.appendChild(c);modal.className='open '+c.dataset.scene;modal.setAttribute('aria-hidden','false')}
document.querySelectorAll('.card').forEach(c=>{c.addEventListener('click',()=>openCard(c));c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openCard(c)}})});
function closeCard(){if(!active)return;holder.parentNode.insertBefore(active,holder);holder.remove();active=null;modal.className='';modal.setAttribute('aria-hidden','true')}
$('#x').addEventListener('click',e=>{e.stopPropagation();closeCard()});
modal.addEventListener('click',e=>{if(e.target===modal||e.target.classList.contains('scene'))closeCard()});
addEventListener('keydown',e=>{if(e.key==='Escape')closeCard()});
$('#save').onclick=()=>{const v=`BEGIN:VCARD\nVERSION:3.0\nFN:Naveen R.\nORG:SHUN Tours & Travels\nTITLE:Tour Coordinator\nTEL:+919876543210\nEMAIL:hello@shuntours.in\nNOTE:Tour Packages, Group Trips, Airport Transfers and Custom Tours\nEND:VCARD`;const u=URL.createObjectURL(new Blob([v],{type:'text/vcard'})),a=document.createElement('a');a.href=u;a.download='SHUN-Tours-Contact.vcf';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)};
$('#download').onclick=async()=>{
 const btn=$('#download'),stage=$('#exportStage'),old=btn.textContent;
 btn.disabled=true;btn.textContent='Preparing front & back…';
 try{
  if(typeof html2canvas!=='function')throw new Error('Image renderer not loaded');
  const sources=[['front',document.querySelector('.card.front')],['back',document.querySelector('.card.back')]];
  const outputs=[];
  for(const [side,source] of sources){
   if(!source)throw new Error(side+' card missing');
   const clone=source.cloneNode(true);
   clone.classList.add('exportCard');
   clone.style.transform='none';clone.style.animation='none';
   stage.replaceChildren(clone);
   // Wait for sticker/logo image assets and layout before capture.
   await Promise.all([...clone.querySelectorAll('img')].map(img=>img.complete?Promise.resolve():new Promise(r=>{img.onload=img.onerror=r})));
   if(document.fonts&&document.fonts.ready)await document.fonts.ready;
   await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
   const canvas=await html2canvas(clone,{
    backgroundColor:null,width:1400,height:800,windowWidth:1400,windowHeight:800,
    scale:1,useCORS:true,allowTaint:false,logging:false,imageTimeout:10000
   });
   const blob=await new Promise((ok,no)=>canvas.toBlob(b=>b?ok(b):no(new Error('PNG creation failed')),'image/png',1));
   outputs.push([blob,`SHUN-business-card-${side}.png`]);
  }
  stage.replaceChildren();
  // A user click authorizes browser downloads; browsers may still show their normal download prompt.
  for(const [blob,name] of outputs){
   const url=URL.createObjectURL(blob),a=document.createElement('a');
   a.href=url;a.download=name;a.style.display='none';document.body.appendChild(a);a.click();a.remove();
   setTimeout(()=>URL.revokeObjectURL(url),4000);
   await new Promise(r=>setTimeout(r,350));
  }
 }catch(err){
  console.error(err);
  alert('Unable to create the card images. Please make sure you are online and try again.');
 }finally{
  stage.replaceChildren();btn.disabled=false;btn.textContent=old;
 }
};

if(matchMedia('(pointer:fine)').matches){const deck=$('.deck');deck.addEventListener('mousemove',e=>{if(active)return;const r=deck.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;deck.style.transform=`rotateY(${x*2.5}deg) rotateX(${-y*2.5}deg)`});deck.addEventListener('mouseleave',()=>deck.style.transform='')}
