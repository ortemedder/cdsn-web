// app.js - CDSN BGS (la pagina index.html solo tiene la estructura)
const VERSION="v1.5";
const NOVEDADES=[
 ["v1.5","16/11/2026",["Más protección: la app solo carga cosas de su propia web y de los datos de CDSN","El escucha descarta datos falsos de EDDN y avisa por Discord"]],
 ["v1.4","16/11/2026",["Radar: un toque marca el sistema; dos toques abren su ficha completa con botón Volver","Dos toques en vacío centran el radar"]],
 ["v1.3","16/11/2026",["Pestaña Radar, como el de la pantalla del ESP32: barrido, alertas que laten, zoom y ficha al tocar un sistema","Versión y novedades en el pie de página"]],
 ["v1.2","16/11/2026",["Pantalla de arranque con el logo y la firma"]],
 ["v1.1","16/11/2026",["Se puede instalar como app en Android e iPhone"]],
 ["v1.0","12/11/2026",["Primera versión: tabla de sistemas, alertas, tick y Powerplay"]]];
function novedades(){const n=document.getElementById("nov");if(!n.hidden){n.hidden=true;return}
  n.innerHTML="<b>Novedades</b>"+NOVEDADES.map(([v,f,c])=>`<div style="margin-top:8px"><b style="color:#ff8c00">${v}</b> <span class="sub">${f}</span><ul style="margin:2px 0 0 18px;padding:0">${c.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");n.hidden=false;n.scrollIntoView({behavior:"smooth"})}
const FAC="Caballeros de Sion";
const DATOS="https://raw.githubusercontent.com/ortemedder/cdsn-datos/main/faccion.json";   // los sube el escucha de la Orange Pi
const ES={Expansion:"Expansión",Retreat:"Retirada",War:"Guerra",CivilWar:"Guerra civil",Election:"Elecciones",Boom:"Auge",Bust:"Crisis",
CivilUnrest:"Disturbios",CivilLiberty:"Libertad civil",Famine:"Hambruna",Outbreak:"Epidemia",Lockdown:"Confinamiento",PirateAttack:"Ataque pirata",
InfrastructureFailure:"Fallo infraestr.",NaturalDisaster:"Desastre",PublicHoliday:"Festivo",Investment:"Inversión",Drought:"Sequía",Blight:"Plaga",
TerroristAttack:"Atentado",None:"—"};
const SEG={"$SYSTEM_SECURITY_high;":"Alta","$SYSTEM_SECURITY_medium;":"Media","$SYSTEM_SECURITY_low;":"Baja","$GAlAXY_MAP_INFO_state_anarchy;":"Anarquía","$GALAXY_MAP_INFO_state_lawless;":"Sin ley"};
const limpia=x=>x==null?"—":String(x).replace(/^\$(economy|government|SYSTEM_SECURITY|GALAXY_MAP_INFO_state)_/i,"").replace(/;$/,"").replace(/_/g," ");
const pob=n=>n==null?"—":n>=1e9?(n/1e9).toFixed(1).replace(".",",")+" mil mill.":n>=1e6?(n/1e6).toFixed(1).replace(".",",")+" mill.":n.toLocaleString("es-ES");
const pct=v=>v==null?"—":(v*100).toFixed(1).replace(".",",")+" %";
const ZC={Low:"baja",Med:"media",High:"alta"};
const TIPO={war:"Guerra",civilwar:"Guerra civil",election:"Elecciones"};
let D=null,E=null,orden="inf",asc=false,abiertos=new Set();
const es=x=>ES[x]||x, c1=v=>v==null||isNaN(v)?"—":v.toFixed(1).replace(".",","), now=()=>Date.now()/1000;
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function hace(t){if(!t)return"—";let m=Math.round((now()-t)/60);if(m<1)return"ahora";if(m<120)return m+" min";if(m<2880)return Math.round(m/60)+" h";return Math.round(m/1440)+" d"}
function hora(t){return t?new Date(t*1000).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}):"—"}
function hoyUTC(){return new Date().toISOString().slice(0,10)}
function proxTick(s){let p=s.tick_prox;if(!p)return 0;while(p<now()-1800)p+=86400;return p}
// alertas: mismas reglas que el radar
function alerta(s){
  for(const c of s.conflictos||[]){const t=TIPO[(c.tipo||"").toLowerCase()]||"Conflicto";
    if(c.estado=="active")return[2,t.toUpperCase(),`contra ${c.contra} (${c.ganados||0}-${c.perdidos||0})`];
    if(c.estado=="pending")return[2,t.toUpperCase()+" PEND.",`contra ${c.contra}`];}
  if((s.activos||[]).includes("Retreat")||(s.pendientes||[]).includes("Retreat"))return[2,"RETIRADA",`influencia ${c1(s.inf)} %`];
  const vent=s.inf-(s.segunda_inf||0);
  if(s.ctrl&&vent<5)return[2,"VENTAJA BAJA",`solo ${c1(vent)} sobre ${s.segunda}`];
  if(s.prev!=null&&s.prev-s.inf>=3)return[1,"BAJADA",`${c1(s.inf-s.prev)} desde ayer`];
  if((s.pendientes||[]).includes("Expansion"))return[1,"EXPANSIÓN PEND.",""];
  return[0,"",""];
}
const COLS=[["sys","Sistema"],["inf","Infl."],["d","Ayer"],["vent","Ventaja"],["est","Estados"],["conf","Conflicto / alerta"],["traf","Visitas hoy"],["pob","Población"],["pp","Powerplay"],["t","Dato"],["tick","Próx. tick"]];
function filas(){
  const hoy=hoyUTC();
  return Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null).map(s=>{
    const a=alerta(s);
    return{s,a,sys:s.sys,inf:s.inf,d:s.prev!=null?s.inf-s.prev:null,vent:s.inf-(s.segunda_inf||0),
      est:[...(s.activos||[]).map(es),...(s.pendientes||[]).map(x=>es(x)+" (pend.)")].join(", "),
      conf:a[0]?a[1]:"",pob:(s.sis||{}).pob||0,pp:(s.pp||{}).pot||"",traf:(s.trafico||{})[hoy]||0,t:s.t||0,tick:proxTick(s),niv:a[0]};
  });
}
function pinta(){
  if(!D)return;
  let F=filas();const q=document.getElementById("q").value.toLowerCase();
  const tot=F.length,ctrl=F.filter(f=>f.s.ctrl).length,al=F.filter(f=>f.niv).length,traf=F.reduce((a,f)=>a+f.traf,0);
  let tg=0;for(const f of F)if(f.tick&&f.s.tick_disp!=null&&f.s.tick_disp<=180&&(!tg||f.tick<tg))tg=f.tick;
  if(!tg&&D.tick_global){tg=D.tick_global+86400;while(tg<now()-1800)tg+=86400}
  document.getElementById("cards").innerHTML=[["Sistemas",tot],["Controlados",ctrl],["Alertas",al],["Tráfico hoy",traf],["Próx. tick",tg?"~"+hora(tg):"aprendiendo"]]
    .map(([a,b])=>`<div class="card"><span>${a}</span><b>${b}</b></div>`).join("");
  if(q)F=F.filter(f=>f.sys.toLowerCase().includes(q));
  if(document.getElementById("fc").checked)F=F.filter(f=>f.s.ctrl);
  if(document.getElementById("fa").checked)F=F.filter(f=>f.niv);
  F.sort((x,y)=>{let a=x[orden],b=y[orden];if(orden=="conf"){a=x.niv;b=y.niv}
    if(a==null)a=-1e9;if(b==null)b=-1e9;const r=typeof a=="string"?a.localeCompare(b):a-b;return asc?r:-r});
  document.getElementById("cnt").textContent=`${F.length} de ${tot}`;
  document.getElementById("cab").innerHTML=COLS.map(([k,n])=>`<th data-k="${k}" class="${k==orden?"o"+(asc?" as":""):""}">${n}</th>`).join("");
  let h="";
  for(const f of F){const s=f.s;
    h+=`<tr class="s g${f.niv}" data-s="${esc(s.sys)}"><td><span class="${s.ctrl?"ctrl":""}">${s.ctrl?"■ ":"· "}${esc(s.sys)}</span></td>
    <td class="num">${c1(s.inf)} %</td><td class="num ${f.d>0?"up":f.d<0?"dn":""}">${f.d==null?"—":(f.d>0?"+":"")+c1(f.d)}</td>
    <td class="num ${f.vent<5?"dn":f.vent<15?"":"up"}">${c1(f.vent)}</td><td class="sub">${esc(f.est)||"—"}</td>
    <td>${f.niv?`<span class="tag t${f.niv}">${esc(f.a[1])}</span> <span class="sub">${esc(f.a[2])}</span>`:""}</td>
    <td class="num az">${f.traf||"—"}</td><td class="num sub">${pob(f.pob||null)}</td><td class="sub">${esc(f.pp)||"—"}</td><td class="num sub">${hace(f.t)}</td><td class="num pk">${f.tick?"~"+hora(f.tick):"—"}</td></tr>`;
    if(abiertos.has(s.sys))h+=`<tr class="det"><td colspan="11">${detalle(s)}</td></tr>`;}
  document.getElementById("tb").innerHTML=h;
  radarDatos();
  document.getElementById("zona").innerHTML=zona();
}
function grafica(h){
  if(!h||h.length<2)return'<span class="sub">histórico: aprendiendo...</span>';
  const W=320,H=90,t0=h[0][0],t1=Math.max(h[h.length-1][0]+3600,now());
  let mn=Math.min(...h.map(p=>p[1])),mx=Math.max(...h.map(p=>p[1]));if(mx-mn<2){const m=(mx+mn)/2;mn=m-1;mx=m+1}mn-=.5;mx+=.5;
  const X=t=>30+(t-t0)/(t1-t0)*(W-36),Y=v=>6+(1-(v-mn)/(mx-mn))*(H-20);
  let d="";h.forEach((p,i)=>{const x=X(p[0]),y=Y(p[1]),xn=i+1<h.length?X(h[i+1][0]):W-6;d+=(i?"L":"M")+x+","+y+"L"+xn+","+y});
  const f=t=>new Date(t*1000).toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit"});
  return`<svg width="${W}" height="${H}"><path d="${d}" fill="none" stroke="#ff8c00" stroke-width="2"/>
  <text x="2" y="12" fill="#b06a10" font-size="10">${c1(mx)}</text><text x="2" y="${H-14}" fill="#b06a10" font-size="10">${c1(mn)}</text>
  <text x="30" y="${H-2}" fill="#b06a10" font-size="10">${f(t0)}</text><text x="${W-40}" y="${H-2}" fill="#b06a10" font-size="10">${f(t1)}</text></svg>`;
}
function detalle(s){
  const fac=(s.todas||[]).map(x=>{const m=x.n==FAC;
    return`<span class="${m?"ctrl":""}">${esc(x.n)}${x.jug?" <span class='sub'>(jugadores)</span>":""}<br><span class="sub">${esc(x.gov)} · ${esc(x.alg)}${(x.act||[]).length?" · "+x.act.map(es).join(", "):""}${(x.pend||[]).length?" · pend.: "+x.pend.map(es).join(", "):""}</span></span>
    <div class="bar"><i class="${m?"m":""}" style="width:${Math.min(100,x.inf)}%"></i></div><span class="num">${c1(x.inf)} %</span>`}).join("");
  const con=(s.conflictos||[]).map(c=>`${TIPO[(c.tipo||"").toLowerCase()]||c.tipo} (${c.estado=="active"?"activo":c.estado=="pending"?"pendiente":c.estado}) contra <b>${esc(c.contra)}</b>: ${"<span class=up>■</span>".repeat(c.ganados||0)}${"<span class=dn>■</span>".repeat(c.perdidos||0)} ${c.ganados||0}-${c.perdidos||0}`).join("<br>")||"ninguno";
  const tr=Object.entries(s.trafico||{}).sort().slice(-8).map(([d,n])=>`${d.slice(8)}/${d.slice(5,7)}: <b class=az>${n}</b>`).join(" · ")||"—";
  const k=s.tk||{},vent=(k.vent||[]).map(v=>`${new Date(v[0]*1000).toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit"})} ${hora(v[0])}–${hora(v[1])}`).join("<br>");
  const tk=`último: ${s.tick_ult?hora(s.tick_ult)+(s.tick_marg!=null?" (±"+s.tick_marg+" min)":""):"aún no visto"}<br>
    próximo: <span class=pk>${proxTick(s)?"~"+hora(proxTick(s))+(s.tick_disp!=null?" (±"+s.tick_disp+" min)":""):"—"}</span><br>
    aprendidos: ${s.tick_n||0} bien acotados · ${(k.vent||[]).length} ventanas${vent?"<br><span class=sub>"+vent+"</span>":""}`;
  const si=s.sis||{},pp=s.pp||{};
  const sis=`población: ${pob(si.pob)}<br>economía: ${limpia(si.eco)}${si.eco2&&si.eco2!="$economy_None;"?" / "+limpia(si.eco2):""}<br>
    seguridad: ${SEG[si.seg]||limpia(si.seg)} · gobierno: ${limpia(si.gov)} · alianza: ${esc(si.alg||"—")}<br>
    coordenadas: ${(s.pos||[]).map(v=>v==null?"?":(+v).toFixed(1)).join(" / ")||"—"}${s.ctrl_n?"<br>controla: "+esc(s.ctrl_n):""}`;
  const pw=pp.pot||(pp.pots||[]).length?`potencia: <b>${esc(pp.pot||"ninguna")}</b>${pp.est?" ("+esc(pp.est)+")":""}<br>
    progreso: ${pct(pp.prog)} · refuerzo: ${pp.ref??"—"} · socavamiento: ${pp.soc??"—"}${(pp.pots||[]).length?"<br><span class=sub>presentes: "+pp.pots.map(esc).join(", ")+"</span>":""}`:"sin Powerplay";
  const zc=(s.zc||[]).map(z=>`${ZC[z.i]||z.i} <span class=sub>(${hace(z.t)})</span>`).join(" · ")||"no vistas en 24 h";
  const pn=Object.entries(s.pn||{}).map(([c,v])=>`<b>${esc(c)}</b> ${esc(v.n||"")} <span class=sub>(${hace(v.t)})</span>`).join("<br>")||"no vistos en 7 días";
  const ay=s.prev!=null?`${c1(s.prev)} % → ${c1(s.inf)} % (${(s.inf-s.prev>0?"+":"")+c1(s.inf-s.prev)}) · cambio visto hace ${hace(s.t)}${s.prev_t?" · dato anterior hace "+hace(s.prev_t):""}`:"—";
  const B=(t,c)=>`<h3 style="margin-top:10px">${t}</h3>${c}`;
  return`<div class="dg"><div><h3>Facciones</h3><div class="fac">${fac}</div>${B("Sistema",sis)}${B("Powerplay",pw)}</div>
  <div><h3>Influencia</h3>${grafica(s.hinf)}${B("Desde ayer",ay)}${B("Conflictos",con)}
  ${B("Estados de CDSN","activos: "+((s.activos||[]).map(es).join(", ")||"—")+"<br>pendientes: "+((s.pendientes||[]).map(es).join(", ")||"—")+"<br>recuperando: "+((s.recuperando||[]).map(es).join(", ")||"—"))}</div>
  <div>${B("Tick",tk)}${B("Visitas (pilotos distintos por día)",tr)}${B("Zonas de conflicto",zc)}${B("Portanaves vistos",pn)}
  ${B("Dato","fuente "+esc(s.src||"")+" · hace "+hace(s.t))}</div></div>`;
}
function zona(){
  const Z=Object.entries(D.zona||{});if(!Z.length)return"";
  Z.sort((a,b)=>(a[1].pot||"~").localeCompare(b[1].pot||"~")||a[0].localeCompare(b[0]));
  return`<h3 style="padding:0 16px">Powerplay alrededor (a menos de 20 ly de tus sistemas)</h3><div class="tw"><table style="min-width:600px"><tr><th>Sistema</th><th>Potencia</th><th>Estado</th><th class=num>Progreso</th><th>Presentes</th><th class=num>Dato</th></tr>`+
   Z.map(([n,z])=>`<tr><td>${esc(n)}</td><td>${esc(z.pot||"—")}</td><td>${esc(z.est||"—")}</td><td class=num>${pct(z.prog)}</td><td class=sub>${(z.pots||[]).map(esc).join(", ")}</td><td class="num sub">${hace(z.t)}</td></tr>`).join("")+"</table></div>";
}
async function carga(){
  try{
    D=await fetch(DATOS+"?"+Date.now()).then(r=>r.json());
    const e=null;
    const sub=D.t?hace(D.t):"—", viejo=D.t&&now()-D.t>3600;
    document.getElementById("est").innerHTML=`<span style="color:${viejo?"#ff4632":"#ff6ec8"}">datos de hace ${sub}${viejo?" (el escucha no ha subido datos en más de 1 h)":""}</span>`+
      (e?` · EDDN ${e.conectado?"conectado":"DESCONECTADO"} · ${e.msgmin} msg/min`:"");
    document.getElementById("pie").textContent=`Escucha EDDN de CDSN · ${Object.keys(D.sistemas||{}).length} sistemas · página actualizada ${new Date().toLocaleTimeString("es-ES")} (se refresca sola cada 5 min)`;
    pinta();
  }catch(x){document.getElementById("est").textContent="no se pudieron leer los datos: "+x}
}
document.getElementById("cab").onclick=e=>{const k=e.target.dataset.k;if(!k)return;if(k==orden)asc=!asc;else{orden=k;asc=k=="sys"}pinta()};
document.getElementById("tb").onclick=e=>{const tr=e.target.closest("tr.s");if(!tr)return;const n=tr.dataset.s;abiertos.has(n)?abiertos.delete(n):abiertos.add(n);pinta()};
for(const id of["q","fc","fa"])document.getElementById(id).oninput=pinta;
const t0=Date.now();
function quitaArranque(){const a=document.getElementById("arranque");if(!a)return;setTimeout(()=>{a.style.opacity=0;setTimeout(()=>a.remove(),700)},Math.max(0,1500-(Date.now()-t0)))}
carga().finally(quitaArranque);setTimeout(quitaArranque,6000);setInterval(carga,300000);

// ---------- RADAR (igual que el de la pantalla del ESP32) ----------
const R_={cv:document.getElementById("rad"),S:[],cx:0,cz:0,k:1,def:null,ang:0,pausa:false,sel:null,t0:0,on:false,pt:new Map(),mov:0};
const COL={fondo:"#120b02",rej:"#4a2c08",verde:"#5adc78",amar:"#ffd228",nar:"#ff8c00",rojo:"#ff4632",blanco:"#fff",nmed:"#aa5f0a",ilum:"#ffebb4"};
const med=v=>{v=[...v].sort((a,b)=>a-b);return v.length?v[v.length>>1]:0};
function radarDatos(){
  const ant=R_.S.length;
  R_.S=Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null&&s.pos).map(s=>{const a=alerta(s);return{s,x:s.pos[0],z:s.pos[2],niv:a[0],al:a,luz:0}});
  if(!ant||!R_.def)vistaDef();
  pintaAlertas();
  if(R_.sel){const n=R_.S.find(o=>o.s.sys==R_.sel);if(n)ficha(n)}
}
function vistaDef(){
  const C=R_.S.filter(o=>o.s.ctrl),B=C.length?C:R_.S;
  const cx=med(B.map(o=>o.x)),cz=med(B.map(o=>o.z));
  const ds=R_.S.map(o=>Math.hypot(o.x-cx,o.z-cz)).sort((a,b)=>a-b);
  const d80=ds.length?ds[Math.floor(ds.length*.8)]:50;
  R_.def={cx,cz,d80:Math.max(d80,1)};R_.cx=cx;R_.cz=cz;R_.k=0;   // k se calcula al conocer el tamaño
}
function tam(){
  const cv=R_.cv,w=cv.clientWidth,h=Math.min(w,Math.round(innerHeight*.72)),dpr=devicePixelRatio||1;
  if(cv.width!=Math.round(w*dpr)||cv.height!=Math.round(h*dpr)){cv.style.height=h+"px";cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr)}
  return{w,h,dpr,R:Math.min(w,h)/2-6};
}
function aPantalla(o,T){const dx=(o.x-R_.cx)*R_.k,dz=(o.z-R_.cz)*R_.k;return[T.w/2+dx,T.h/2-dz,dx,dz]}
function dibuja(t){
  if(!R_.on)return;requestAnimationFrame(dibuja);
  const T=tam(),g=R_.cv.getContext("2d"),{w,h,R}=T,cx=w/2,cy=h/2;
  if(!R_.k&&R_.def)R_.k=.9*R/R_.def.d80;
  const dt=R_.t0?Math.min(100,t-R_.t0):16;R_.t0=t;
  const antes=R_.ang;if(!R_.pausa)R_.ang=(R_.ang+dt*360/4000)%360;     // una vuelta cada 4 s
  g.setTransform(T.dpr,0,0,T.dpr,0,0);g.fillStyle=COL.fondo;g.fillRect(0,0,w,h);
  // estela del barrido
  const A=a=>(a-90)*Math.PI/180;
  for(let i=28;i>=0;i--){const a1=R_.ang-(i+1)*2,a2=R_.ang-i*2+.5;
    g.fillStyle=`rgba(200,110,0,${(.42*(1-i/29)**1.6).toFixed(3)})`;g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,R,A(a1),A(a2));g.closePath();g.fill()}
  // rejilla
  g.strokeStyle=COL.rej;g.lineWidth=1;g.beginPath();
  for(let i=1;i<=3;i++){g.moveTo(cx+R*i/3,cy);g.arc(cx,cy,R*i/3,0,2*Math.PI)}
  g.moveTo(cx-R,cy);g.lineTo(cx+R,cy);g.moveTo(cx,cy-R);g.lineTo(cx,cy+R);g.stroke();
  g.strokeStyle="rgba(255,200,90,.9)";g.lineWidth=2;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+R*Math.cos(A(R_.ang)),cy+R*Math.sin(A(R_.ang)));g.stroke();
  // sistemas
  const pulso=(Math.sin(t/160)+1)/2,lab=[];
  const pasa=a=>{let d=(R_.ang-a+360)%360,b=(R_.ang-antes+360)%360;return d<=b+.01};
  const L=R_.S.map(o=>{const[x,y,dx,dz]=aPantalla(o,T);o.sx=x;o.sy=y;
    let a=Math.atan2(dx,dz)*180/Math.PI;if(a<0)a+=360;
    if(Math.hypot(dx,dz)<=R&&!R_.pausa&&pasa(a))o.luz=1;else o.luz=Math.max(0,o.luz-dt/900);
    return o});
  const color=o=>o.s.inf>50?COL.verde:o.s.inf>20?COL.amar:COL.nar;
  for(const o of L){const{sx:x,sy:y}=o;if(x<-30||y<-30||x>w+30||y>h+30)continue;
    if(o.niv==2){const r=9+pulso*5;g.strokeStyle=COL.rojo;g.lineWidth=2.5;g.beginPath();g.arc(x,y,r,0,7);g.stroke();
      if(o.luz>0){g.fillStyle=`rgba(255,70,50,${(o.luz*.35).toFixed(2)})`;g.beginPath();g.arc(x,y,r+8*o.luz,0,7);g.fill()}}
    else if(o.niv==1){g.strokeStyle=COL.amar;g.lineWidth=2;g.beginPath();g.arc(x,y,10,0,7);g.stroke()}
    g.fillStyle=o.luz>.05?mezcla(color(o),COL.ilum,o.luz):color(o);
    if(o.s.ctrl)g.fillRect(x-4,y-4,8,8);else{g.beginPath();g.arc(x,y,3,0,7);g.fill()}
    if(R_.sel==o.s.sys){g.strokeStyle="#fff";g.lineWidth=1.5;g.strokeRect(x-8,y-8,16,16)}}
  // nombres: primero alertas, luego controlados, luego el resto (sin solaparse)
  g.font="12px system-ui,sans-serif";g.textBaseline="middle";const kz=R_.def?R_.k*R_.def.d80/(.9*R):1;
  for(const pas of[0,1,2]){if(pas==1&&kz<1.4)break;if(pas==2&&kz<3)break;
    for(const o of L){const ok=pas==0?o.niv>0:pas==1?o.s.ctrl&&!o.niv:!o.s.ctrl&&!o.niv;if(!ok&&!(pas==0&&R_.sel==o.s.sys))continue;
      const x=o.sx+(o.niv?17:9),y=o.sy,n=o.s.sys,wd=g.measureText(n).width;
      if(x>w||y<0||y>h||x+wd<0)continue;
      if(lab.some(r=>x<r[0]+r[2]+4&&r[0]<x+wd+4&&Math.abs(y-r[1])<13))continue;
      lab.push([x,y,wd]);g.fillStyle=o.niv==2?COL.rojo:o.niv==1?COL.amar:o.s.ctrl?COL.blanco:COL.nmed;g.fillText(n,x,y)}}
  g.fillStyle=COL.rej;g.font="11px system-ui,sans-serif";g.textBaseline="alphabetic";g.textAlign="right";
  g.fillText(`anillo ${Math.round(R/3/R_.k)} ly`,w-6,h-6);g.textAlign="left";
}
function mezcla(a,b,f){const p=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16)),A=p(a),B=p(b);return`rgb(${A.map((v,i)=>Math.round(v+(B[i]-v)*f)).join(",")})`}
function tocaEn(x,y){
  let m=null,dm=28*28;for(const o of R_.S){if(!o.niv)continue;const d=(o.sx-x)**2+(o.sy-y)**2;if(d<dm){dm=d;m=o}}
  if(m)return m;dm=22*22;for(const o of R_.S){const d=(o.sx-x)**2+(o.sy-y)**2;if(d<dm){dm=d;m=o}}return m;
}
function fichaHTML(o){const s=o.s,v=s.inf-(s.segunda_inf||0);
  return`<b style="font-size:17px;color:${s.ctrl?"#fff":"#ff8c00"}">${esc(s.sys)}</b> ${s.ctrl?"<span class='sub'>(controlado)</span>":""}
   ${o.niv?`<div style="margin:4px 0"><span class="tag t${o.niv}">${esc(o.al[1])}</span> <span class="sub">${esc(o.al[2])}</span></div>`:""}
   <div class="sub" style="margin:4px 0">Influencia ${c1(s.inf)} % · ventaja ${c1(v)} · ${s.prev!=null?"ayer "+(s.inf-s.prev>0?"+":"")+c1(s.inf-s.prev)+" · ":""}dato de hace ${hace(s.t)}</div>`}
function ficha(o){   // un toque: linea corta bajo el radar
  R_.sel=o.s.sys;document.getElementById("rficha").innerHTML=fichaHTML(o)+`<div class="sub">Toca dos veces el sistema para ver la ficha completa</div>`;
  if(!document.getElementById("rfull").hidden)fichaEntera(o,true);
}
function fichaEntera(o,solo){   // dos toques: ficha a pantalla completa
  R_.sel=o.s.sys;const f=document.getElementById("rfull");
  document.getElementById("rfullc").innerHTML=fichaHTML(o)+detalle(o.s);
  if(solo)return;
  if(f.hidden){f.hidden=false;f.scrollTop=0;document.body.style.overflow="hidden";history.pushState({ficha:1},"")}
}
function cierraFicha(){const f=document.getElementById("rfull");if(f.hidden)return;f.hidden=true;document.body.style.overflow=""}
document.getElementById("rvolver").onclick=()=>history.back();
addEventListener("popstate",cierraFicha);
function pintaAlertas(){
  const A=R_.S.filter(o=>o.niv).sort((a,b)=>b.niv-a.niv||a.s.inf-b.s.inf);
  document.getElementById("ral").innerHTML=A.map(o=>`<button data-s="${esc(o.s.sys)}"><span class="tag t${o.niv}">${esc(o.al[1])}</span> ${esc(o.s.sys)}</button>`).join("");
  document.getElementById("rInfo").textContent=`${R_.S.length} sistemas · ${A.length} alertas`;
}
document.getElementById("ral").onclick=e=>{const b=e.target.closest("button");if(!b)return;const o=R_.S.find(o=>o.s.sys==b.dataset.s);if(!o)return;
  R_.cx=o.x;R_.cz=o.z;ficha(o);document.getElementById("rficha").scrollIntoView({behavior:"smooth",block:"nearest"})};
function zoomEn(f,px,py){const T=tam();px??=T.w/2;py??=T.h/2;
  const nk=Math.min(60,Math.max(.02,R_.k*f));const wx=R_.cx+(px-T.w/2)/R_.k,wz=R_.cz-(py-T.h/2)/R_.k;
  R_.k=nk;R_.cx=wx-(px-T.w/2)/nk;R_.cz=wz+(py-T.h/2)/nk}
document.getElementById("rMas").onclick=()=>zoomEn(1.5);document.getElementById("rMenos").onclick=()=>zoomEn(1/1.5);
document.getElementById("rCen").onclick=()=>{if(R_.def){R_.cx=R_.def.cx;R_.cz=R_.def.cz;R_.k=0}};
document.getElementById("rPausa").onclick=e=>{R_.pausa=!R_.pausa;e.target.textContent=R_.pausa?"▶":"❚❚"};
const cv=R_.cv,pos=e=>{const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]};
cv.addEventListener("pointerdown",e=>{cv.setPointerCapture(e.pointerId);R_.pt.set(e.pointerId,pos(e));R_.mov=0});
cv.addEventListener("pointermove",e=>{if(!R_.pt.has(e.pointerId))return;const p=pos(e),q=R_.pt.get(e.pointerId);
  if(R_.pt.size==1){R_.cx-=(p[0]-q[0])/R_.k;R_.cz+=(p[1]-q[1])/R_.k;R_.mov+=Math.abs(p[0]-q[0])+Math.abs(p[1]-q[1])}
  else if(R_.pt.size==2){const o=[...R_.pt.entries()].find(([id])=>id!=e.pointerId)[1];
    const d0=Math.hypot(q[0]-o[0],q[1]-o[1]),d1=Math.hypot(p[0]-o[0],p[1]-o[1]);if(d0>0)zoomEn(d1/d0,(p[0]+o[0])/2,(p[1]+o[1])/2);R_.mov+=99}
  R_.pt.set(e.pointerId,p)});
const suelta=e=>{if(!R_.pt.has(e.pointerId))return;const p=pos(e);R_.pt.delete(e.pointerId);
  if(e.type=="pointerup"&&R_.mov<8&&!R_.pt.size){const o=tocaEn(p[0],p[1]),t=performance.now(),u=R_.ult;
    const doble=u&&t-u.t<400&&Math.hypot(p[0]-u.x,p[1]-u.y)<30;R_.ult=doble?null:{t,x:p[0],y:p[1]};
    if(doble){if(o)fichaEntera(o);else document.getElementById("rCen").click();return}
    if(o)ficha(o);else{R_.sel=null;document.getElementById("rficha").innerHTML=""}}};
cv.addEventListener("pointerup",suelta);cv.addEventListener("pointercancel",suelta);
cv.addEventListener("wheel",e=>{e.preventDefault();const p=pos(e);zoomEn(e.deltaY<0?1.2:1/1.2,p[0],p[1])},{passive:false});
cv.addEventListener("dblclick",e=>e.preventDefault());
function vista(v){
  try{localStorage.setItem("cdsn_vista",v)}catch(e){}
  const r=v=="radar";document.getElementById("vRadar").hidden=!r;document.getElementById("vTabla").hidden=r;
  document.getElementById("tRadar").classList.toggle("on",r);document.getElementById("tTabla").classList.toggle("on",!r);
  if(r&&!R_.on){R_.on=true;R_.t0=0;requestAnimationFrame(dibuja)}if(!r)R_.on=false;
}
document.getElementById("tTabla").onclick=()=>vista("tabla");document.getElementById("tRadar").onclick=()=>vista("radar");
try{if(localStorage.getItem("cdsn_vista")=="radar")vista("radar")}catch(e){}
const vl=document.getElementById("verl");vl.textContent=VERSION+" · novedades";vl.onclick=e=>{e.preventDefault();novedades()};
document.getElementById("verA").textContent=VERSION;
// --- app instalable (PWA) ---
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
let aviso=null;const bi=document.getElementById("instalar");
addEventListener("beforeinstallprompt",e=>{e.preventDefault();aviso=e;bi.style.display="inline-block"});
bi.onclick=async()=>{if(!aviso)return;aviso.prompt();await aviso.userChoice;aviso=null;bi.style.display="none"};
addEventListener("appinstalled",()=>{bi.style.display="none"});
document.addEventListener("visibilitychange",()=>{if(!document.hidden)carga()});   // al volver a la app, datos nuevos
