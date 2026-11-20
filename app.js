// app.js - CDSN BGS (la pagina index.html solo tiene la estructura)
const VERSION="v1.12";
const NOVEDADES=[
 ["v1.12","20/11/2026",["Radar más limpio: la expansión pendiente (es de toda la facción) ya no pone un aro en cada sistema; sale una franja arriba del mapa y al tocarla se ven u ocultan esos sistemas","Los avisos leves (naranja) llevan un aro fino y discreto y su nombre sale al hacer zoom","Los conflictos en marcha ya no se apagan al parpadear: el aro se atenúa"]],
 ["v1.11","20/11/2026",["Radar: cuadro de Leyenda del mapa debajo, que explica cada símbolo (cuadrado/punto, colores de influencia, aros de aviso y sus colores, ⚔ ✉, ★, recuadro, nombres, barrido y anillos). Se abre y se cierra tocando el título y recuerda cómo lo dejaste"]],
 ["v1.10.1","19/11/2026",["Franja verde arriba de DEFENSA EN CURSO: avisa a los cmdrs de dónde nos estamos defendiendo (y vamos ganando), con el marcador y el día; al tocarla abre Hoy (o la ficha si es uno solo)","Acerca de en el pie de página: quién lo hace, de dónde salen los datos y contacto"]],
 ["v1.10","19/11/2026",["Avisos de conflicto según el marcador y el día (1–7, con el escucha v10): ⚔ guerra / ✉ elecciones · DEFENSA EN CURSO y A UN DÍA DE GANAR (verde parpadeando), VICTORIA SEGURA (verde), DISPUTADO (amarillo), DÍA DECISIVO y SISTEMA EN DERROTA (rojo parpadeando y alerta grande), PENDIENTE (morado)","La alerta grande dice qué se juega hoy y qué hay en juego","Con un conflicto, las visitas ya no dan POSIBLE ATAQUE","ACTIVIDAD A FAVOR (verde): pico de visitas y sube la influencia (gente propia o ayuda externa)","ACTIVIDAD INUSUAL pasa a naranja; POSIBLE ATAQUE y avisos graves en rojo"]],
 ["v1.9.2","18/11/2026",["Botón ⧉ al lado del nombre de cada sistema para copiarlo al portapapeles (y pegarlo en el mapa de la galaxia)"]],
 ["v1.9.1","18/11/2026",["Franja amarilla fija de ACTIVIDAD INUSUAL (pico de visitas sin bajada de influencia) debajo de la de posible ataque; al tocarla abre Visitas"]],
 ["v1.9","18/11/2026",["Alerta de POSIBLE ATAQUE: franja roja arriba mientras dure y tarjeta grande una vez al día (o si empeora), con Ver ficha, Siguiente y Visto","Visitas: periodo de 5 días (igual que el radar del ESP32) y siempre salen los sistemas con pico de visitas","Historial de posibles ataques en Visitas: cuándo fue, cuántos pilotos y si la influencia se recuperó (con el escucha v9)"]],
 ["v1.8.1","17/11/2026",["Pestaña Visitas: sistemas ordenados por los comandantes que pasan por ellos (hoy, ayer, 7 días o 30 días)","Aviso POSIBLE ATAQUE (pico de visitas y baja nuestra influencia) y ACTIVIDAD INUSUAL (solo pico de visitas) en la tabla, el radar y Hoy","Pestañas en dos filas en el móvil"]],
 ["v1.8","17/11/2026",["Pestaña Powerplay: potencias en nuestros sistemas, refuerzo y socavamiento, sistemas en peligro y listos para subir","La tabla de Powerplay alrededor pasa a esta pestaña","Estado de EDDN arriba y pestañas que caben mejor en el móvil"]],
 ["v1.7","17/11/2026",["Enlaces a Inara y Spansh en la ficha de cada sistema (para ver el arquitecto y más)"]],
 ["v1.6","17/11/2026",["Pestaña Hoy: qué sistemas necesitan ayuda y qué hacer en cada uno","Pestaña Evolución: gráficas de la facción","Favoritos ⭐: salen primero en la tabla y resaltados en el radar","Aviso claro cuando no hay conexión"]],
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
let FAV=new Set();try{FAV=new Set(JSON.parse(localStorage.getItem("cdsn_fav")||"[]"))}catch(e){}
function guardaFav(){try{localStorage.setItem("cdsn_fav",JSON.stringify([...FAV]))}catch(e){}}
function cambiaFav(n){FAV.has(n)?FAV.delete(n):FAV.add(n);guardaFav();pinta()}
let D=null,E=null,orden="inf",asc=false,abiertos=new Set();
const es=x=>ES[x]||x, c1=v=>v==null||isNaN(v)?"—":v.toFixed(1).replace(".",","), now=()=>Date.now()/1000;
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function hace(t){if(!t)return"—";let m=Math.round((now()-t)/60);if(m<1)return"ahora";if(m<120)return m+" min";if(m<2880)return Math.round(m/60)+" h";return Math.round(m/1440)+" d"}
function hora(t){return t?new Date(t*1000).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}):"—"}
function hoyUTC(){return new Date().toISOString().slice(0,10)}
function proxTick(s){let p=s.tick_prox;if(!p)return 0;while(p<now()-1800)p+=86400;return p}
// ---------- boton para copiar el nombre del sistema ----------
const CP=n=>`<button class="cp" data-cp="${esc(n)}" title="Copiar nombre" aria-label="Copiar ${esc(n)}">⧉</button>`;
function copia(t){if(navigator.clipboard&&isSecureContext)return navigator.clipboard.writeText(t);
  return new Promise((ok,ko)=>{const a=document.createElement("textarea");a.value=t;a.style.position="fixed";a.style.opacity="0";document.body.appendChild(a);a.select();
    try{document.execCommand("copy")?ok():ko()}catch(e){ko(e)}a.remove()})}
let cpT;function tostada(t){let d=document.getElementById("toast");if(!d){d=document.createElement("div");d.id="toast";document.body.appendChild(d)}
  d.textContent=t;d.classList.add("on");clearTimeout(cpT);cpT=setTimeout(()=>d.classList.remove("on"),1500)}
document.addEventListener("click",e=>{const b=e.target.closest(".cp");if(!b)return;e.stopPropagation();e.preventDefault();
  copia(b.dataset.cp).then(()=>{tostada("Copiado: "+b.dataset.cp);b.textContent="✓";setTimeout(()=>b.textContent="⧉",1200)}).catch(()=>tostada("No se pudo copiar"))},true);
// pico de visitas: hoy o ayer al menos el triple de la media de los 7 dias anteriores (y 5 o mas pilotos)
function pico(s){const t=s.trafico||{},d=n=>{const x=new Date();x.setUTCDate(x.getUTCDate()-n);return t[x.toISOString().slice(0,10)]||0};
  for(const k of[0,1]){const v=d(k);let m=0;for(let i=k+1;i<=k+7;i++)m+=d(i);m/=7;if(v>=5&&v>=3*Math.max(m,1))return{v,m,dia:k?"ayer":"hoy"}}return null}
function ataque(s){const p=pico(s);if(!p)return null;const baja=s.prev!=null&&s.prev-s.inf>=1,sube=s.prev!=null&&s.inf-s.prev>=.5;
  return{...p,baja,sube,txt:`${p.v} pilotos ${p.dia} (media ${c1(p.m)})`+(baja?` y la influencia baja ${c1(s.prev-s.inf)} puntos`:sube?` y la influencia sube ${c1(s.inf-s.prev)} puntos`:"")}}
// color de cada aviso (igual que el radar): gr = grave (rojo), di = disputado (amarillo), av = aviso (naranja),
// fa = a favor (verde), pu = pendiente (morado). Los conflictos en marcha parpadean. TAG pinta la etiqueta con ⚔ (guerra) o ✉ (elecciones).
const TAG=a=>a&&a[0]?`<span class="tag k-${a[3]}${a[5]?" parp":""}">${a[4]?a[4]+" ":""}${esc(a[1])}</span>`:"";
const FILA=a=>`b-${a[3]}${a[5]?" bparp":""}`;   // clase del borde de la fila
// ---------- conflictos: fase segun marcador y dia (mismas reglas que el escucha v10 y el radar) ----------
// 7 dias como mucho; gana quien llegue a 4; si nadie llega, gana quien tenga mas. dia = el que se juega (1..7).
const DIAS_CONF=7;
function faseConf(g,p,dia){const q=DIAS_CONF+1-dia;if(p+q<g)return"victoria";if(g+q<p)return"sin_remedio";
  if(p==3||(dia>=DIAS_CONF&&Math.abs(g-p)<=1))return"decisivo";if(g==3&&p<=1)return"a_un_dia";if(g>p)return"defensa";if(g<p)return"derrota";
  return g==0&&dia<=3?"disputado":"igualado"}
function finalConf(g,p,dia){if(g>=4)return"victoria";if(p>=4)return"derrota";if(dia>=DIAS_CONF)return g>p?"victoria":p>g?"derrota":"empate";return"sigue"}
function juegoConf(g,p,dia){const a=finalConf(g+1,p,dia),b=finalConf(g,p+1,dia);if(a=="sigue"&&b=="sigue")return"";
  return`ganar = ${a} · perder = ${b}`+(dia>=DIAS_CONF?` · sin resultado = ${finalConf(g,p,dia)}`:"")}
// [titulo, tono, parpadea, alarma]
const FASES={victoria:["VICTORIA SEGURA","fa",0,0],a_un_dia:["A UN DÍA DE GANAR","fa",1,0],defensa:["DEFENSA EN CURSO","fa",1,0],
  disputado:["DISPUTADO","di",0,0],igualado:["DISPUTADO","di",1,0],decisivo:["DÍA DECISIVO","gr",1,1],derrota:["SISTEMA EN DERROTA","gr",1,1],sin_remedio:["SISTEMA EN DERROTA","gr",1,1]};
function conflicto(c){const g=c.ganados||0,p=c.perdidos||0,t=(c.tipo||"").toLowerCase();
  let dia=c.dia||0,exacto=!!c.dia_exacto;if(!dia){dia=Math.min(DIAS_CONF,g+p+1);exacto=false}
  const fase=FASES[c.fase]?c.fase:faseConf(g,p,dia),[tit,tono,parp,alarma]=FASES[fase];
  return{g,p,dia,exacto,fase,tit,tono,parp:!!parp,alarma:!!alarma,ico:t=="election"?"✉":"⚔",tipo:TIPO[t]||"Conflicto",juego:juegoConf(g,p,dia),
    diaTxt:`día ${exacto?"":"≥"}${dia}/${DIAS_CONF}`}}
const sinConf=s=>!(s.conflictos||[]).some(c=>c.estado=="active"||c.estado=="pending");
// alertas: mismas reglas que el radar -> [nivel, titulo, texto, tono, icono, parpadea, alarma]
function alerta(s){
  for(const c of s.conflictos||[]){const t=TIPO[(c.tipo||"").toLowerCase()]||"Conflicto",ico=(c.tipo||"").toLowerCase()=="election"?"✉":"⚔";
    if(c.estado=="active"){const k=conflicto(c);
      return[2,k.tit,`${t} contra ${c.contra} · ${k.diaTxt} · ${k.g}-${k.p}${k.fase=="sin_remedio"?" (sin remedio)":""}${k.juego?" · "+k.juego:""}`,k.tono,k.ico,k.parp,k.alarma]}
    if(c.estado=="pending")return[2,t.toUpperCase()+" PEND.",`contra ${c.contra} · empieza en el próximo tick`,"pu",ico,false,false];}
  if((s.activos||[]).includes("Retreat")||(s.pendientes||[]).includes("Retreat"))return[2,"RETIRADA",`influencia ${c1(s.inf)} %`,"gr"];
  const vent=s.inf-(s.segunda_inf||0);
  if(s.ctrl&&vent<5)return[2,"VENTAJA BAJA",`solo ${c1(vent)} sobre ${s.segunda}`,"gr"];
  const at=ataque(s);if(at&&at.baja)return[2,"POSIBLE ATAQUE",at.txt,"gr","",false,true];
  if(s.prev!=null&&s.prev-s.inf>=3)return[1,"BAJADA",`${c1(s.inf-s.prev)} desde ayer`,"av"];
  if(at&&!at.sube)return[1,"ACTIVIDAD INUSUAL",at.txt,"av"];
  if(at)return[1,"ACTIVIDAD A FAVOR",at.txt+" (gente propia o ayuda externa)","fa"];
  if((s.pendientes||[]).includes("Expansion"))return[1,"EXPANSIÓN PEND.","","av"];
  return[0,"","","no"];
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
  if(document.getElementById("ff").checked)F=F.filter(f=>FAV.has(f.sys));
  F.sort((x,y)=>{const fv=FAV.has(y.sys)-FAV.has(x.sys);if(fv)return fv;let a=x[orden],b=y[orden];if(orden=="conf"){a=x.niv;b=y.niv}
    if(a==null)a=-1e9;if(b==null)b=-1e9;const r=typeof a=="string"?a.localeCompare(b):a-b;return asc?r:-r});
  document.getElementById("cnt").textContent=`${F.length} de ${tot}`;
  document.getElementById("cab").innerHTML=COLS.map(([k,n])=>`<th data-k="${k}" class="${k==orden?"o"+(asc?" as":""):""}">${n}</th>`).join("");
  let h="";
  for(const f of F){const s=f.s;
    h+=`<tr class="s ${FILA(f.a)}" data-s="${esc(s.sys)}"><td><span class="fav${FAV.has(s.sys)?" on":""}" data-fav="${esc(s.sys)}">${FAV.has(s.sys)?"★":"☆"}</span><span class="${s.ctrl?"ctrl":""}">${s.ctrl?"■ ":"· "}${esc(s.sys)}</span>${CP(s.sys)}</td>
    <td class="num">${c1(s.inf)} %</td><td class="num ${f.d>0?"up":f.d<0?"dn":""}">${f.d==null?"—":(f.d>0?"+":"")+c1(f.d)}</td>
    <td class="num ${f.vent<5?"dn":f.vent<15?"":"up"}">${c1(f.vent)}</td><td class="sub">${esc(f.est)||"—"}</td>
    <td>${f.niv?`${TAG(f.a)} <span class="sub">${esc(f.a[2])}</span>`:""}</td>
    <td class="num az">${f.traf||"—"}</td><td class="num sub">${pob(f.pob||null)}</td><td class="sub">${esc(f.pp)||"—"}</td><td class="num sub">${hace(f.t)}</td><td class="num pk">${f.tick?"~"+hora(f.tick):"—"}</td></tr>`;
    if(abiertos.has(s.sys))h+=`<tr class="det"><td colspan="11">${detalle(s)}</td></tr>`;}
  document.getElementById("tb").innerHTML=h;
  radarDatos();
  if(!document.getElementById("vHoy").hidden)pintaHoy();if(!document.getElementById("vPP").hidden)pintaPP();if(!document.getElementById("vVis").hidden)pintaVis();if(!document.getElementById("vEvo").hidden)pintaEvo();else guardaDia();
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
    return`<span class="${m?"ctrl":""}">${esc(x.n)}${x.jug?" <span class='sub'>(jugadores)</span>":""}<br><span class="sub">${esc(x.gov)} · ${esc(x.alg)}${(x.act||[]).length?" · "+esc(x.act.map(es).join(", ")):""}${(x.pend||[]).length?" · pend.: "+esc(x.pend.map(es).join(", ")):""}</span></span>
    <div class="bar"><i class="${m?"m":""}" style="width:${Math.min(100,x.inf)}%"></i></div><span class="num">${c1(x.inf)} %</span>`}).join("");
  const con=(s.conflictos||[]).map(c=>`${esc(TIPO[(c.tipo||"").toLowerCase()]||c.tipo)} (${c.estado=="active"?"activo":c.estado=="pending"?"pendiente":esc(c.estado)}) contra <b>${esc(c.contra)}</b>: ${"<span class=up>■</span>".repeat(c.ganados||0)}${"<span class=dn>■</span>".repeat(c.perdidos||0)} ${c.ganados||0}-${c.perdidos||0}`).join("<br>")||"ninguno";
  const tr=Object.entries(s.trafico||{}).sort().slice(-8).map(([d,n])=>`${d.slice(8)}/${d.slice(5,7)}: <b class=az>${n}</b>`).join(" · ")||"—";
  const k=s.tk||{},vent=(k.vent||[]).map(v=>`${new Date(v[0]*1000).toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit"})} ${hora(v[0])}–${hora(v[1])}`).join("<br>");
  const tk=`último: ${s.tick_ult?hora(s.tick_ult)+(s.tick_marg!=null?" (±"+s.tick_marg+" min)":""):"aún no visto"}<br>
    próximo: <span class=pk>${proxTick(s)?"~"+hora(proxTick(s))+(s.tick_disp!=null?" (±"+s.tick_disp+" min)":""):"—"}</span><br>
    aprendidos: ${s.tick_n||0} bien acotados · ${(k.vent||[]).length} ventanas${vent?"<br><span class=sub>"+vent+"</span>":""}`;
  const si=s.sis||{},pp=s.pp||{};
  const sis=`población: ${pob(si.pob)}<br>economía: ${esc(limpia(si.eco))}${si.eco2&&si.eco2!="$economy_None;"?" / "+esc(limpia(si.eco2)):""}<br>
    seguridad: ${esc(SEG[si.seg]||limpia(si.seg))} · gobierno: ${esc(limpia(si.gov))} · alianza: ${esc(si.alg||"—")}<br>
    coordenadas: ${(s.pos||[]).map(v=>v==null?"?":(+v).toFixed(1)).join(" / ")||"—"}${s.ctrl_n?"<br>controla: "+esc(s.ctrl_n):""}`;
  const pw=pp.pot||(pp.pots||[]).length?`potencia: <b>${esc(pp.pot||"ninguna")}</b>${pp.est?" ("+esc(PPE[pp.est]||pp.est)+")":""}<br>
    progreso: ${pct(pp.prog)} · refuerzo: ${pp.ref??"—"} · socavamiento: ${pp.soc??"—"}${(pp.pots||[]).length?"<br><span class=sub>presentes: "+pp.pots.map(esc).join(", ")+"</span>":""}`:"sin Powerplay";
  const zc=(s.zc||[]).map(z=>`${esc(ZC[z.i]||z.i)} <span class=sub>(${hace(z.t)})</span>`).join(" · ")||"no vistas en 24 h";
  const pn=Object.entries(s.pn||{}).map(([c,v])=>`<b>${esc(c)}</b> ${esc(v.n||"")} <span class=sub>(${hace(v.t)})</span>`).join("<br>")||"no vistos en 7 días";
  const ay=s.prev!=null?`${c1(s.prev)} % → ${c1(s.inf)} % (${(s.inf-s.prev>0?"+":"")+c1(s.inf-s.prev)}) · cambio visto hace ${hace(s.t)}${s.prev_t?" · dato anterior hace "+hace(s.prev_t):""}`:"—";
  const B=(t,c)=>`<h3 style="margin-top:10px">${t}</h3>${c}`;
  return`<div class="dg"><div><h3>Facciones</h3><div class="fac">${fac}</div>${B("Sistema",sis)}${B("Powerplay",pw)}</div>
  <div><h3>Influencia</h3>${grafica(s.hinf)}${B("Desde ayer",ay)}${B("Conflictos",con)}
  ${B("Estados de CDSN","activos: "+esc((s.activos||[]).map(es).join(", ")||"—")+"<br>pendientes: "+esc((s.pendientes||[]).map(es).join(", ")||"—")+"<br>recuperando: "+esc((s.recuperando||[]).map(es).join(", ")||"—"))}</div>
  <div>${B("Tick",tk)}${B("Visitas (pilotos distintos por día)",tr)}${B("Zonas de conflicto",zc)}${B("Portanaves vistos",pn)}
  ${B("Dato","fuente "+esc(s.src||"")+" · hace "+hace(s.t))}</div></div>`;
}
function zona(){
  const Z=Object.entries(D.zona||{}).filter(([n,z])=>!PPF||z.pot==PPF||(z.pots||[]).includes(PPF));if(!Z.length)return"";
  Z.sort((a,b)=>(a[1].pot||"~").localeCompare(b[1].pot||"~")||a[0].localeCompare(b[0]));
  return`<details><summary class="pps">Powerplay alrededor: ${Z.length} sistemas a menos de 20 ly de los nuestros (toca para ver)</summary><div class="tw" style="padding:6px 0 20px"><table style="min-width:600px"><tr><th>Sistema</th><th>Potencia</th><th>Estado</th><th class=num>Progreso</th><th>Presentes</th><th class=num>Dato</th></tr>`+
   Z.map(([n,z])=>`<tr><td>${esc(n)}${CP(n)}</td><td>${z.pot?ppNom(z.pot):"—"}</td><td>${esc(PPE[z.est]||z.est||"—")}</td><td class=num>${pct(z.prog)}</td><td class=sub>${(z.pots||[]).map(esc).join(", ")}</td><td class="num sub">${hace(z.t)}</td></tr>`).join("")+"</table></div</details>";
}
async function carga(){
  try{
    D=await fetch(DATOS+"?"+Date.now()).then(r=>r.json());
    const e=D.eddn||null;
    const sub=D.t?hace(D.t):"—", viejo=D.t&&now()-D.t>3600;
    document.getElementById("est").innerHTML=`<span style="color:${viejo?"#ff4632":"#ff6ec8"}">datos de hace ${sub}${viejo?" (el escucha no ha subido datos en más de 1 h)":""}</span>`+
      (e?` · <span style="color:${e.ok&&e.ultimo&&(D.t||now())-e.ultimo<900?"#5adc78":"#ff4632"}">EDDN ${e.ok?"conectado":"DESCONECTADO"}${e.ultimo?" · último mensaje hace "+hace(e.ultimo):""}</span>`:"");
    document.getElementById("pie").textContent=`Escucha EDDN de CDSN · ${Object.keys(D.sistemas||{}).length} sistemas · página actualizada ${new Date().toLocaleTimeString("es-ES")} (se refresca sola cada 5 min)`;
    pinta();sinRed();revisaAtaques();revisaInusual();revisaDefensa();
  }catch(x){if(D){sinRed(true)}else document.getElementById("est").textContent="no se pudieron leer los datos: "+x}
}
document.getElementById("cab").onclick=e=>{const k=e.target.dataset.k;if(!k)return;if(k==orden)asc=!asc;else{orden=k;asc=k=="sys"}pinta()};
document.getElementById("tb").onclick=e=>{if(e.target.dataset.fav!=null){cambiaFav(e.target.dataset.fav);return}const tr=e.target.closest("tr.s");if(!tr)return;const n=tr.dataset.s;abiertos.has(n)?abiertos.delete(n):abiertos.add(n);pinta()};
for(const id of["q","fc","fa","ff"])document.getElementById(id).oninput=pinta;
const t0=Date.now();
function quitaArranque(){const a=document.getElementById("arranque");if(!a)return;setTimeout(()=>{a.style.opacity=0;setTimeout(()=>a.remove(),700)},Math.max(0,1500-(Date.now()-t0)))}
carga().finally(quitaArranque);setTimeout(quitaArranque,6000);setInterval(carga,300000);

// ---------- RADAR (igual que el de la pantalla del ESP32) ----------
// leyenda del radar: abierta la primera vez, luego recuerda si la cerraste
{const l=document.getElementById("rley");let a="1";try{a=localStorage.getItem("cdsn_ley")??"1"}catch(e){}l.open=a=="1";
 l.addEventListener("toggle",()=>{try{localStorage.setItem("cdsn_ley",l.open?"1":"0")}catch(e){}})}
const R_={verExp:false,cv:document.getElementById("rad"),S:[],cx:0,cz:0,k:1,def:null,ang:0,pausa:false,sel:null,t0:0,on:false,pt:new Map(),mov:0};
const COL={fondo:"#120b02",rej:"#4a2c08",verde:"#5adc78",amar:"#ffd228",nar:"#ff8c00",rojo:"#ff4632",blanco:"#fff",nmed:"#aa5f0a",ilum:"#ffebb4",
  gr:"#ff4632",di:"#ffeb00",av:"#ff6400",fa:"#5adc78",pu:"#af5fff"};   // colores de los avisos (tono)
const parp=()=>Math.floor(Date.now()/500)%2==0;   // fase del parpadeo de los conflictos en marcha
const med=v=>{v=[...v].sort((a,b)=>a-b);return v.length?v[v.length>>1]:0};
function radarDatos(){
  const ant=R_.S.length;
  R_.S=Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null&&s.pos).map(s=>{const a=alerta(s);const exp=a[1]=="EXPANSIÓN PEND.";return{s,x:s.pos[0],z:s.pos[2],niv:exp&&!R_.verExp?0:a[0],exp,al:a,luz:0}});
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
    const ca=COL[o.al[3]]||COL.rojo;g.globalAlpha=o.al[5]&&!parp()?.3:1;   // al parpadear se atenua, no se apaga
    if(o.niv==2){const r=9+pulso*5;g.strokeStyle=ca;g.lineWidth=2.5;g.beginPath();g.arc(x,y,r,0,7);g.stroke();
      if(o.luz>0){g.fillStyle=`rgba(255,70,50,${(o.luz*.35).toFixed(2)})`;g.beginPath();g.arc(x,y,r+8*o.luz,0,7);g.fill()}}
    else if(o.niv==1){g.globalAlpha=.5;g.strokeStyle=ca;g.lineWidth=1;g.beginPath();g.arc(x,y,8,0,7);g.stroke()}   // aviso leve: fino y discreto
    g.globalAlpha=1;
    g.fillStyle=o.luz>.05?mezcla(color(o),COL.ilum,o.luz):color(o);
    if(o.s.ctrl)g.fillRect(x-4,y-4,8,8);else{g.beginPath();g.arc(x,y,3,0,7);g.fill()}
    if(FAV.has(o.s.sys)){g.fillStyle="#ffd228";g.font="11px system-ui,sans-serif";g.textBaseline="middle";g.textAlign="center";g.fillText("★",x,y-12);g.textAlign="left"}
    if(R_.sel==o.s.sys){g.strokeStyle="#fff";g.lineWidth=1.5;g.strokeRect(x-8,y-8,16,16)}}
  // nombres: primero alertas, luego controlados, luego el resto (sin solaparse)
  g.font="12px system-ui,sans-serif";g.textBaseline="middle";const kz=R_.def?R_.k*R_.def.d80/(.9*R):1;
  for(const pas of[0,1,2]){if(pas==1&&kz<1.4)break;if(pas==2&&kz<3)break;
    for(const o of L){const ok=pas==0?o.niv>1:pas==1?(o.s.ctrl&&!o.niv)||o.niv==1:!o.s.ctrl&&!o.niv;if(!ok&&!(pas==0&&(R_.sel==o.s.sys||FAV.has(o.s.sys))))continue;
      const x=o.sx+(o.niv?17:9),y=o.sy,n=o.s.sys,wd=g.measureText(n).width;
      if(x>w||y<0||y>h||x+wd<0)continue;
      if(lab.some(r=>x<r[0]+r[2]+4&&r[0]<x+wd+4&&Math.abs(y-r[1])<13))continue;
      lab.push([x,y,wd]);g.fillStyle=o.niv?COL[o.al[3]]||COL.rojo:o.s.ctrl?COL.blanco:COL.nmed;g.fillText(n,x,y)}}
  g.fillStyle=COL.rej;g.font="11px system-ui,sans-serif";g.textBaseline="alphabetic";g.textAlign="right";
  g.fillText(`anillo ${Math.round(R/3/R_.k)} ly`,w-6,h-6);g.textAlign="left";
}
function mezcla(a,b,f){const p=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16)),A=p(a),B=p(b);return`rgb(${A.map((v,i)=>Math.round(v+(B[i]-v)*f)).join(",")})`}
function tocaEn(x,y){
  let m=null,dm=28*28;for(const o of R_.S){if(!o.niv)continue;const d=(o.sx-x)**2+(o.sy-y)**2;if(d<dm){dm=d;m=o}}
  if(m)return m;dm=22*22;for(const o of R_.S){const d=(o.sx-x)**2+(o.sy-y)**2;if(d<dm){dm=d;m=o}}return m;
}
function fichaHTML(o){const s=o.s,v=s.inf-(s.segunda_inf||0);
  return`<b style="font-size:17px;color:${s.ctrl?"#fff":"#ff8c00"}">${esc(s.sys)}</b>${CP(s.sys)} ${s.ctrl?"<span class='sub'>(controlado)</span>":""}
   ${o.niv?`<div style="margin:4px 0">${TAG(o.al)} <span class="sub">${esc(o.al[2])}</span></div>`:""}
   <div class="sub" style="margin:4px 0">Influencia ${c1(s.inf)} % · ventaja ${c1(v)} · ${s.prev!=null?"ayer "+(s.inf-s.prev>0?"+":"")+c1(s.inf-s.prev)+" · ":""}dato de hace ${hace(s.t)}</div>
   <div style="margin:6px 0 4px"><a target="_blank" rel="noopener" style="color:#ff8c00" href="https://inara.cz/elite/starsystem/?search=${encodeURIComponent(s.sys)}">Inara ↗</a> &nbsp; <a target="_blank" rel="noopener" style="color:#ff8c00" href="https://spansh.co.uk/search/${encodeURIComponent(s.sys)}">Spansh ↗</a> <span class="sub">(arquitecto, estaciones…)</span></div>`}
function ficha(o){   // un toque: linea corta bajo el radar
  R_.sel=o.s.sys;document.getElementById("rficha").innerHTML=fichaHTML(o)+`<div class="sub">Toca dos veces el sistema para ver la ficha completa</div>`;
  if(!document.getElementById("rfull").hidden)fichaEntera(o,true);
}
function fichaEntera(o,solo){   // dos toques: ficha a pantalla completa
  R_.sel=o.s.sys;const f=document.getElementById("rfull");
  document.getElementById("rfullc").innerHTML=fichaHTML(o)+detalle(o.s);
  const fb=document.getElementById("rfav");fb.textContent=FAV.has(o.s.sys)?"★ Favorito":"☆ Favorito";fb.onclick=()=>{cambiaFav(o.s.sys);fb.textContent=FAV.has(o.s.sys)?"★ Favorito":"☆ Favorito"};
  if(solo)return;
  if(f.hidden){f.hidden=false;f.scrollTop=0;document.body.style.overflow="hidden";history.pushState({ficha:1},"")}
}
function cierraFicha(){const f=document.getElementById("rfull");if(f.hidden)return;f.hidden=true;document.body.style.overflow=""}
document.getElementById("rvolver").onclick=()=>history.back();
addEventListener("popstate",cierraFicha);
function franjaExp(){   // la expansion es de toda la faccion: una sola franja; al tocarla se ven u ocultan sus aros
  const n=R_.S.filter(o=>o.exp).length,f=document.getElementById("rexp");f.hidden=!n;
  f.innerHTML=`⬆ EXPANSIÓN PENDIENTE · toda la facción <span class="sub">· ${R_.verExp?"toca para ocultar":"toca para ver"} ${n} sistemas</span>`;f.classList.toggle("on",R_.verExp)}
document.getElementById("rexp").onclick=()=>{R_.verExp=!R_.verExp;for(const o of R_.S)if(o.exp)o.niv=R_.verExp?o.al[0]:0;pintaAlertas()};
function pintaAlertas(){franjaExp();
  const A=R_.S.filter(o=>o.niv).sort((a,b)=>b.niv-a.niv||a.s.inf-b.s.inf);
  document.getElementById("ral").innerHTML=A.map(o=>`<button data-s="${esc(o.s.sys)}">${TAG(o.al)} ${esc(o.s.sys)}</button>`).join("");
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
const VISTAS={tabla:"vTabla",radar:"vRadar",hoy:"vHoy",pp:"vPP",vis:"vVis",evo:"vEvo"};
function vista(v){
  if(!VISTAS[v])v="tabla";try{localStorage.setItem("cdsn_vista",v)}catch(e){}
  for(const[k,id]of Object.entries(VISTAS))document.getElementById(id).hidden=k!=v;
  document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b.dataset.v==v));
  if(v=="radar"&&!R_.on){R_.on=true;R_.t0=0;requestAnimationFrame(dibuja)}if(v!="radar")R_.on=false;
  if(v=="hoy")pintaHoy();if(v=="pp")pintaPP();if(v=="vis")pintaVis();if(v=="evo")pintaEvo();
}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>vista(b.dataset.v));
try{vista(localStorage.getItem("cdsn_vista")||"tabla")}catch(e){}
document.getElementById("acerca").onclick=e=>{e.preventDefault();const a=document.getElementById("acd");a.hidden=!a.hidden;if(!a.hidden)a.scrollIntoView({behavior:"smooth"})};
const vl=document.getElementById("verl");vl.textContent=VERSION+" · novedades";vl.onclick=e=>{e.preventDefault();novedades()};
document.getElementById("verA").textContent=VERSION;
// ---------- sin conexion ----------
function sinRed(fallo){const b=document.getElementById("sinred"),off=fallo||!navigator.onLine;b.hidden=!off;
  if(off)b.textContent=`📡 Sin conexión · mostrando los datos guardados${D&&D.t?" de hace "+hace(D.t):""}`}
addEventListener("offline",()=>sinRed());addEventListener("online",()=>{sinRed();carga()});
// ---------- pestaña Hoy: que sistemas necesitan ayuda y que hacer ----------
const ACC={war:"Combate: zonas de conflicto y misiones de combate a favor de CDSN",civilwar:"Combate: zonas de conflicto y misiones de combate a favor de CDSN",
 election:"Sin violencia: misiones, comercio con beneficio y datos de exploración en estaciones de CDSN"};
const SUBIR="Subir influencia: misiones de CDSN, comercio con beneficio, bonos y datos de exploración en sus estaciones";
function tareas(){
  const L=[];
  for(const s of Object.values(D.sistemas||{})){if(s.fuera||s.inf==null)continue;
    const v=s.inf-(s.segunda_inf||0),act=s.activos||[],pen=s.pendientes||[],add=(p,tag,k,por,acc,ico,parp)=>L.push({s,p:p+(FAV.has(s.sys)?5:0),tag,k,por,acc,ico,parp});
    let hecho=false;
    for(const c of s.conflictos||[]){const t=(c.tipo||"").toLowerCase(),nom=TIPO[t]||"Conflicto";
      if(c.estado=="active"){const k=conflicto(c),pr={decisivo:104,sin_remedio:103,derrota:102,igualado:100,disputado:99,defensa:97,a_un_dia:96,victoria:60}[k.fase];
        add(pr,k.tit,k.tono,`${nom} contra ${c.contra} · ${k.diaTxt} · ${k.g}-${k.p} (gana quien llegue a 4)`+(k.juego?` · ${k.juego}`:"")+(c.en_juego?` · en juego: ${c.en_juego}`:""),ACC[t]||SUBIR,k.ico,k.parp);hecho=true}
      else if(c.estado=="pending"){add(90,nom.toUpperCase()+" PEND.","pu",`contra ${c.contra} · empieza en el próximo tick`,"Prepararse: "+(ACC[t]||SUBIR).toLowerCase());hecho=true}}
    if(hecho)continue;
    if(act.includes("Retreat")||pen.includes("Retreat"))add(95,"RETIRADA","gr",`influencia ${c1(s.inf)} %, CDSN puede salir del sistema`,SUBIR);
    else if(s.inf<5)add(85,"RIESGO RETIRADA","gr",`influencia ${c1(s.inf)} %, por debajo del 5 %`,SUBIR);
    else if(ataque(s)?.baja)add(88,"POSIBLE ATAQUE","gr",ataque(s).txt+": puede que alguien esté trabajando contra CDSN",SUBIR);
    else if(s.ctrl&&v<5)add(80,"VENTAJA BAJA","gr",`solo ${c1(v)} puntos sobre ${s.segunda}: puede haber conflicto por el control`,SUBIR);
    else if(s.prev!=null&&s.prev-s.inf>=3)add(60,"BAJADA","av",`${c1(s.inf-s.prev)} puntos desde ayer`,SUBIR);
    else if(ataque(s)?.sube)add(45,"ACTIVIDAD A FAVOR","fa",ataque(s).txt+": alguien trabaja a favor de CDSN (gente propia o ayuda externa)","Seguir así; si no es nuestra gente, averiguar quién nos ayuda");
    else if(ataque(s))add(55,"ACTIVIDAD INUSUAL","av",ataque(s).txt+": vigilar la influencia en el próximo tick","Pasar por el sistema y ver qué misiones se están haciendo; si baja la influencia, "+SUBIR.toLowerCase());
    else if(s.ctrl&&v<10)add(50,"VENTAJA AJUSTADA","av",`${c1(v)} puntos sobre ${s.segunda}`,SUBIR);
    else if(pen.includes("Expansion")||act.includes("Expansion"))add(40,"EXPANSIÓN","av",pen.includes("Expansion")?"expansión pendiente":"expansión en curso","Mantener la influencia alta mientras dura");
    else if(s.ctrl&&s.inf>=70)add(30,"CERCA DE EXPANSIÓN","fa",`${c1(s.inf)} %, la expansión salta al 75 %`,SUBIR);
  }
  return L.sort((a,b)=>b.p-a.p||a.s.inf-b.s.inf);
}
function pintaHoy(){
  if(!D)return;const L=tareas();
  document.getElementById("vHoy").innerHTML=(L.length?`<div class="sub" style="margin-bottom:8px">${L.length} sistemas, de más a menos urgente. Toca uno para ver su ficha.</div>`:"<p>Todo tranquilo: ningún sistema necesita ayuda ahora mismo.</p>")+
   L.slice(0,R_.hoyTodo?999:15).map(t=>`<div class="hoy" data-s="${esc(t.s.sys)}"><b style="color:${t.s.ctrl?"#fff":"#ff8c00"}">${FAV.has(t.s.sys)?"⭐ ":""}${esc(t.s.sys)}</b>${CP(t.s.sys)} <span class="tag k-${t.k}${t.parp?" parp":""}">${t.ico?t.ico+" ":""}${esc(t.tag)}</span>
   <div class="sub">${esc(t.por)}</div><div class="acc">➜ ${esc(t.acc)}</div></div>`).join("")+(L.length>15&&!R_.hoyTodo?`<button id="hoyTodo" class="favb" style="margin:0">Ver los ${L.length-15} restantes</button>`:"");
}
document.getElementById("vHoy").onclick=e=>{if(e.target.id=="hoyTodo"){R_.hoyTodo=true;pintaHoy();return}const d=e.target.closest(".hoy");if(d)abreFicha(d.dataset.s)};
function abreFicha(n){const s=(D.sistemas||{})[n];if(!s)return;const a=alerta(s);fichaEntera(R_.S.find(o=>o.s.sys==n)||{s,niv:a[0],al:a})}
// ---------- pestaña Evolucion ----------
function guardaDia(){   // cada movil apunta un resumen al dia (para ver la evolucion del numero de sistemas)
  try{const F=filas(),H=JSON.parse(localStorage.getItem("cdsn_hist")||"{}");
    H[hoyUTC()]={n:F.length,c:F.filter(f=>f.s.ctrl).length,a:F.filter(f=>f.niv).length};
    const k=Object.keys(H).sort();for(const x of k.slice(0,-120))delete H[x];
    localStorage.setItem("cdsn_hist",JSON.stringify(H));return H}catch(e){return{}}
}
function lineas(series,titulo,unidad){   // series: [{n,color,p:[[t,v]...]}]
  const P=series.flatMap(x=>x.p);if(P.length<2)return`<h3>${titulo}</h3><p class="sub">Aún no hay bastantes días guardados.</p>`;
  const W=360,H=170,t0=Math.min(...P.map(p=>p[0])),t1=Math.max(...P.map(p=>p[0]),t0+86400);
  let mn=Math.min(...P.map(p=>p[1])),mx=Math.max(...P.map(p=>p[1]));const m=(mx-mn)*.15||1;mn=Math.max(0,mn-m);mx+=m;
  const X=t=>34+(t-t0)/(t1-t0)*(W-44),Y=v=>10+(1-(v-mn)/(mx-mn))*(H-34),f=t=>new Date(t*1000).toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit"});
  const fm=v=>unidad=="%"?c1(v):Math.round(v);
  return`<h3>${titulo}</h3><div class="evo"><svg viewBox="0 0 ${W} ${H}">`+
   [0,.5,1].map(k=>{const v=mn+(mx-mn)*k;return`<line x1="34" x2="${W-6}" y1="${Y(v)}" y2="${Y(v)}" stroke="#2a1a06"/><text x="2" y="${Y(v)+4}" fill="#b06a10" font-size="10">${fm(v)}</text>`}).join("")+
   series.map(x=>`<polyline points="${x.p.map(p=>X(p[0])+","+Y(p[1])).join(" ")}" fill="none" stroke="${x.color}" stroke-width="2.2"/>`+x.p.map(p=>`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="2.5" fill="${x.color}"/>`).join("")).join("")+
   `<text x="34" y="${H-6}" fill="#b06a10" font-size="10">${f(t0)}</text><text x="${W-6}" y="${H-6}" fill="#b06a10" font-size="10" text-anchor="end">${f(t1)}</text></svg></div>
   <div class="sub" style="margin:4px 0 14px">${series.map(x=>`<span style="color:${x.color}">━</span> ${x.n}`).join(" &nbsp; ")}</div>`;
}
function pintaEvo(){
  if(!D)return;const S=Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null);
  // influencia media por dia sacada del historico de cada sistema (hinf)
  const dia=t=>Math.floor(t/86400)*86400,dias=new Set();
  for(const s of S)for(const[t]of s.hinf||[])dias.add(dia(t));
  const D_=[...dias].sort((a,b)=>a-b).slice(-21);
  const media=sub=>D_.map(d=>{let v=[];const minimo=Math.max(3,sub.length/2);for(const s of sub){const h=(s.hinf||[]).filter(p=>p[0]<d+86400);if(h.length)v.push(h[h.length-1][1])}return[d+43200,v.length>=minimo?v.reduce((a,b)=>a+b,0)/v.length:null]}).filter(p=>p[1]!=null);
  const H=guardaDia(),hk=Object.keys(H).sort(),tt=k=>Date.parse(k+"T12:00:00Z")/1000;
  document.getElementById("vEvo").innerHTML=
    lineas([{n:"todos los sistemas",color:"#ff8c00",p:media(S)},{n:"controlados",color:"#5adc78",p:media(S.filter(s=>s.ctrl))}],"Influencia media de CDSN","%")+
    lineas([{n:"sistemas",color:"#ff8c00",p:hk.map(k=>[tt(k),H[k].n])},{n:"controlados",color:"#5adc78",p:hk.map(k=>[tt(k),H[k].c])},{n:"alertas",color:"#ff4632",p:hk.map(k=>[tt(k),H[k].a])}],"Sistemas, controlados y alertas","n")+
    `<p class="sub">La influencia sale del histórico de cada sistema. El número de sistemas lo va apuntando este móvil cada día que abres la app.</p>`;
}
// --- app instalable (PWA) ---
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
let aviso=null;const bi=document.getElementById("instalar");
addEventListener("beforeinstallprompt",e=>{e.preventDefault();aviso=e;bi.style.display="inline-block"});
bi.onclick=async()=>{if(!aviso)return;aviso.prompt();await aviso.userChoice;aviso=null;bi.style.display="none"};
addEventListener("appinstalled",()=>{bi.style.display="none"});
document.addEventListener("visibilitychange",()=>{if(!document.hidden)carga()});   // al volver a la app, datos nuevos
// ---------- pestaña Powerplay ----------
const PPE={Exploited:"Explotado",Fortified:"Fortificado",Stronghold:"Bastión",Unoccupied:"Sin ocupar"};
const PPC={"Jerome Archer":"#d0402a","Li Yong-Rui":"#3fb6e0","Edmund Mahon":"#5adc78","Aisling Duval":"#5aaaff","Zemina Torval":"#3a7bd5",
 "Pranav Antal":"#ffd228","Felicia Winters":"#ff9b3d","Archon Delaine":"#c0392b","Yuri Grom":"#e67e22","Denton Patreus":"#9fb0c8",
 "A. Lavigny-Duval":"#a070e0","Nakato Kaine":"#c6e05a"};
const ppCol=n=>PPC[n]||"#c9a36a";
const ppNom=n=>`<span style="color:${ppCol(n)};font-weight:600">${esc(n)}</span>`;
let PPF="";   // filtro por potencia
function ppBarra(v){if(v==null)return'<span class="sub">—</span>';const w=Math.max(0,Math.min(100,v*100));
  return`<div class="bar" style="width:90px;display:inline-block;vertical-align:middle"><i style="width:${w}%;background:${v>=1?"#5adc78":"#ff8c00"}"></i></div> <span class="num sub">${pct(v)}</span>`}
function pintaPP(){
  if(!D)return;const S=Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null);
  const con=S.filter(s=>(s.pp||{}).pot),sin=S.filter(s=>!(s.pp||{}).pot);
  const P={};for(const s of con){const p=s.pp,o=P[p.pot]??={n:p.pot,t:0,c:0,e:{},ref:0,soc:0};o.t++;if(s.ctrl)o.c++;o.e[p.est]=(o.e[p.est]||0)+1;o.ref+=p.ref||0;o.soc+=p.soc||0}
  const PL=Object.values(P).sort((a,b)=>b.t-a.t);
  let h=`<div class="sub" style="margin-bottom:8px">${con.length} de nuestros ${S.length} sistemas tienen potencia · ${sin.length} sin ocupar. Toca una potencia para filtrar.</div><div class="ppc">`+
   PL.map(o=>`<div class="ppk${PPF==o.n?" on":""}" data-p="${esc(o.n)}" style="border-left:4px solid ${ppCol(o.n)}"><b style="color:${ppCol(o.n)}">${esc(o.n)}</b>
    <div><b style="font-size:20px">${o.t}</b> <span class="sub">sistemas (${o.c} controlados)</span></div>
    <div class="sub">${["Stronghold","Fortified","Exploited"].filter(k=>o.e[k]).map(k=>`${PPE[k]} ${o.e[k]}`).join(" · ")}</div>
    <div class="sub">refuerzo <span class="up">${o.ref.toLocaleString("es-ES")}</span> · socav. <span class="dn">${o.soc.toLocaleString("es-ES")}</span></div></div>`).join("")+`</div>`;
  const F=con.filter(s=>!PPF||s.pp.pot==PPF);
  // atencion: socavados y listos para subir
  const peligro=F.filter(s=>(s.pp.soc||0)>(s.pp.ref||0)&&(s.pp.soc||0)>=50).sort((a,b)=>(b.pp.soc-(b.pp.ref||0))-(a.pp.soc-(a.pp.ref||0)));
  const sube=F.filter(s=>(s.pp.prog||0)>=1);
  const fila=(s,extra)=>`<div class="hoy" data-s="${esc(s.sys)}"><b style="color:${s.ctrl?"#fff":"#ff8c00"}">${FAV.has(s.sys)?"⭐ ":""}${esc(s.sys)}</b>${CP(s.sys)} ${ppNom(s.pp.pot)} <span class="sub">${esc(PPE[s.pp.est]||s.pp.est||"")}</span><div class="sub">${extra}</div></div>`;
  if(peligro.length)h+=`<h3>Más socavados que reforzados (${peligro.length})</h3>`+peligro.slice(0,10).map(s=>fila(s,`socavamiento <span class="dn">${s.pp.soc}</span> · refuerzo <span class="up">${s.pp.ref||0}</span> · progreso ${pct(s.pp.prog)}`)).join("");
  if(sube.length)h+=`<h3>Listos para subir de nivel (${sube.length})</h3>`+sube.map(s=>fila(s,`progreso <span class="up">${pct(s.pp.prog)}</span> · refuerzo ${s.pp.ref||0} · socav. ${s.pp.soc||0}`)).join("");
  // tabla de nuestros sistemas
  const O={Stronghold:3,Fortified:2,Exploited:1};
  F.sort((a,b)=>(FAV.has(b.sys)-FAV.has(a.sys))||a.pp.pot.localeCompare(b.pp.pot)||(O[b.pp.est]||0)-(O[a.pp.est]||0)||(b.pp.prog||0)-(a.pp.prog||0));
  h+=`<h3>Nuestros sistemas con potencia${PPF?" · "+esc(PPF)+` <a href="#" id="ppTodas" style="color:#ff8c00">(ver todas)</a>`:""}</h3><div class="tw" style="padding:0 0 12px"><table style="min-width:640px"><tr><th>Sistema</th><th>Potencia</th><th>Estado</th><th>Progreso</th><th class=num>Refuerzo</th><th class=num>Socav.</th><th>Presentes</th></tr>`+
   F.map(s=>`<tr class="s" data-s="${esc(s.sys)}"><td class="${s.ctrl?"ctrl":""}">${FAV.has(s.sys)?"⭐ ":""}${esc(s.sys)}${CP(s.sys)}</td><td>${ppNom(s.pp.pot)}</td><td>${esc(PPE[s.pp.est]||s.pp.est||"—")}</td><td style="white-space:nowrap">${ppBarra(s.pp.prog)}</td>
    <td class="num up">${s.pp.ref??"—"}</td><td class="num ${(s.pp.soc||0)>(s.pp.ref||0)?"dn":"sub"}">${s.pp.soc??"—"}</td><td class="sub">${esc((s.pp.pots||[]).filter(x=>x!=s.pp.pot).join(", "))}</td></tr>`).join("")+`</table></div>`;
  // sin ocupar: quien esta presente
  if(!PPF&&sin.length){const Q={};for(const s of sin)for(const p of(s.pp||{}).pots||[])Q[p]=(Q[p]||0)+1;
    h+=`<h3>Sin ocupar (${sin.length})</h3><div class="sub" style="margin-bottom:12px">Potencias presentes que podrían adquirirlos: ${Object.entries(Q).sort((a,b)=>b[1]-a[1]).map(([p,n])=>ppNom(p)+" "+n).join(" · ")||"ninguna"}</div>`}
  h+=zona();
  document.getElementById("vPP").innerHTML=h;
}
document.getElementById("vPP").onclick=e=>{
  if(e.target.id=="ppTodas"){e.preventDefault();PPF="";pintaPP();return}
  const k=e.target.closest(".ppk");if(k){PPF=PPF==k.dataset.p?"":k.dataset.p;pintaPP();return}
  const d=e.target.closest("[data-s]");if(d)abreFicha(d.dataset.s)};
// ---------- pestaña Visitas: sistemas ordenados por comandantes ----------
let VP=1;   // dias del periodo: 1 hoy, -1 ayer, 7, 30
const VPS=[[1,"Hoy"],[-1,"Ayer"],[5,"5 días"],[30,"30 días"]];
function diasAtras(n){const d=new Date();d.setUTCDate(d.getUTCDate()-n);return d.toISOString().slice(0,10)}
function pintaVis(){
  if(!D)return;
  const dias=VP==-1?[diasAtras(1)]:[...Array(VP).keys()].map(diasAtras),ult5=[...Array(5).keys()].map(diasAtras).reverse();
  const L=Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null).map(s=>{const t=s.trafico||{};const t1=alerta(s)[1];return{s,at:t1=="POSIBLE ATAQUE"?3:t1=="ACTIVIDAD INUSUAL"?2:t1=="ACTIVIDAD A FAVOR"?1:0,n:dias.reduce((a,d)=>a+(t[d]||0),0),serie:ult5.map(d=>t[d]||0)}});
  const tot=L.reduce((a,o)=>a+o.n,0),con=L.filter(o=>o.n>0||o.at).sort((a,b)=>b.at-a.at||b.n-a.n||b.s.inf-a.s.inf),mx=con.length?con[0].n:1;
  const sp=v=>{const m=Math.max(1,...v);return`<span class="spk">${v.map(x=>`<i style="height:${x?Math.max(2,Math.round(x/m*18)):1}px;${x?"":"background:#3a2a12"}"></i>`).join("")}</span>`};
  document.getElementById("vVis").innerHTML=`<div class="vper">${VPS.map(([d,n])=>`<button data-d="${d}" class="${d==VP?"on":""}">${n}</button>`).join("")}</div>
   <div class="sub" style="margin:6px 0 10px">${tot} visitas en ${con.length} sistemas · ${L.length-con.length} sin visitas. Cuenta pilotos distintos por día que envían datos a EDDN (con EDMC u otras herramientas), así que los reales son más.</div>`+
   (con.length?`<div class="tw" style="padding:0 0 12px"><table style="min-width:0"><tr><th>#</th><th>Sistema</th><th>Visitas</th><th>5 días</th></tr>`+
   con.map((o,i)=>{const s=o.s,a=alerta(s);return`<tr class="s ${FILA(a)}" data-s="${esc(s.sys)}"><td class="sub num">${i+1}</td><td><span class="${s.ctrl?"ctrl":""}">${FAV.has(s.sys)?"⭐ ":""}${esc(s.sys)}</span>${CP(s.sys)}${a[0]?" "+TAG(a):""}<div class="sub">infl. ${c1(s.inf)} %</div></td>
    <td style="white-space:nowrap"><div class="bar" style="width:min(18vw,160px);display:inline-block;vertical-align:middle"><i style="width:${o.n/mx*100}%;background:#5aaaff"></i></div> <b class="az">${o.n}</b></td><td>${sp(o.serie)}</td></tr>`}).join("")+"</table></div>":"<p>Nadie ha pasado por nuestros sistemas en este periodo (o el escucha aún no lo ha visto).</p>")+histAtaques();
}
// historial de posibles ataques (lo guarda el escucha v9 en faccion.json: ataques.act y ataques.hist)
function histAtaques(){
  const A=D.ataques||{},act=Object.entries(A.act||{}),H=A.hist||[];
  const f=t=>new Date(t*1000).toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit"})+" "+hora(t);   // dd/mm hh:mm
  let h=`<h3 style="margin-top:16px">Historial de posibles ataques</h3>`;
  if(!A.act&&!A.hist)return h+`<p class="sub">Aún no hay historial: lo empieza a guardar el escucha v9.</p>`;
  if(!act.length&&!H.length)return h+`<p class="sub">Ningún posible ataque registrado.</p>`;
  h+=`<div class="tw" style="padding:0 0 12px"><table style="min-width:0"><tr><th>Sistema</th><th>Desde</th><th class=num>Pilotos</th><th class=num>Influencia</th></tr>`;
  for(const[n,a]of act)h+=`<tr class="s g2" data-s="${esc(n)}"><td>${esc(n)}${CP(n)}</td><td class=sub>${f(a.ini)}</td><td class="num az">${a.v} <span class=sub>(media ${c1(a.m)})</span></td><td class=num>${c1(a.antes)} → ${c1(a.inf)}<br><span class="tag t2">EN CURSO</span></td></tr>`;
  for(const a of H)h+=`<tr class="s g${a.res=="recuperada"?0:1}" data-s="${esc(a.sys)}"><td>${esc(a.sys)}</td><td class=sub>${f(a.ini)}<br>a ${f(a.fin)}</td><td class="num az">${a.v} <span class=sub>(media ${c1(a.m)})</span></td><td class=num>${c1(a.antes)} → ${c1(a.inf)}<br><span class="${a.res=="recuperada"?"up":"dn"}">${a.res=="recuperada"?"recuperada":"perdida"} (${a.dif>0?"+":""}${c1(a.dif)})</span></td></tr>`;
  return h+"</table></div>";
}
document.getElementById("vVis").onclick=e=>{const b=e.target.closest(".vper button");if(b){VP=+b.dataset.d;pintaVis();return}
  const tr=e.target.closest("[data-s]");if(tr)abreFicha(tr.dataset.s)};

// ---------- alerta grande: POSIBLE ATAQUE, DÍA DECISIVO o SISTEMA EN DERROTA (franja fija y tarjeta una vez al dia o si empeora) ----------
let ATK=[],atkI=0;
function diaLocal(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function listaAtaques(){const R={"DÍA DECISIVO":3,"SISTEMA EN DERROTA":2,"POSIBLE ATAQUE":1};
  return Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null).map(s=>({s,al:alerta(s),a:ataque(s)})).filter(o=>o.al[6])
  .sort((x,y)=>(R[y.al[1]]||0)-(R[x.al[1]]||0)||(y.a?y.a.v/Math.max(y.a.m,1):0)-(x.a?x.a.v/Math.max(x.a.m,1):0))}
function vistos(){try{return JSON.parse(localStorage.getItem("cdsn_atk")||"{}")}catch(e){return{}}}
function marcaVistos(){const V={},h=diaLocal();for(const o of ATK)V[o.s.sys]={dia:h,v:o.a?o.a.v:0,baja:o.s.prev-o.s.inf,tit:o.al[1]+o.al[2]};try{localStorage.setItem("cdsn_atk",JSON.stringify(V))}catch(e){}}
function revisaAtaques(){
  ATK=listaAtaques();
  const b=document.getElementById("ataque");
  if(!ATK.length){b.hidden=true;cierraAtaque(false);return}
  b.innerHTML=`⚠ <b>${ATK[0].al[4]?ATK[0].al[4]+" ":""}${esc(ATK[0].al[1])}</b> en ${esc(ATK[0].s.sys)}${ATK.length>1?` y ${ATK.length-1} alerta${ATK.length>2?"s":""} más`:""} · toca para ver`;b.hidden=false;
  const V=vistos(),h=diaLocal();
  const nuevo=ATK.findIndex(o=>{const r=V[o.s.sys];return!r||r.dia!=h||r.tit!=o.al[1]+o.al[2]||(o.a&&o.a.v>r.v)||(!o.al[4]&&(o.s.prev-o.s.inf)>r.baja+.05)});   // no visto hoy o ha cambiado / empeorado
  if(nuevo>=0&&document.getElementById("atk").hidden)abreAtaque(nuevo);
  else if(!document.getElementById("atk").hidden)pintaAtaque();
}
function abreAtaque(i){atkI=i||0;pintaAtaque();document.getElementById("atk").hidden=false}
function cierraAtaque(marca){const m=document.getElementById("atk");if(m.hidden)return;m.hidden=true;if(marca)marcaVistos()}
function pintaAtaque(){
  if(!ATK.length)return;if(atkI>=ATK.length)atkI=0;
  const{s,a,al}=ATK[atkI],v=s.inf-(s.segunda_inf||0),c=(s.conflictos||[]).find(x=>x.estado=="active"),k=c&&conflicto(c);
  let tk=proxTick(s),gl=false;if(!tk&&D.tick_global){tk=D.tick_global+86400;while(tk<now()-1800)tk+=86400;gl=true}
  const falta=tk?Math.max(0,tk-now()):0,fx=Math.floor(falta/3600)+" h "+String(Math.round(falta%3600/60)).padStart(2,"0");
  const cuad=k?"<span class=up>■</span>".repeat(k.g)+"<span class=dn>■</span>".repeat(k.p):"";
  document.getElementById("atkc").innerHTML=`<div class="atkt">${al[4]?al[4]+" ":""}${esc(al[1])}</div><div style="padding:12px 14px">
   <div style="text-align:center;font-size:21px;font-weight:700">${esc(s.sys).toUpperCase()}${CP(s.sys)}</div>
   <div style="text-align:center;font-size:13px;color:${s.ctrl?"#5adc78":"#b06a10"}">${s.ctrl?`controlado · ventaja ${c1(v)} sobre ${esc(s.segunda||"?")}`:`no controlado · manda ${esc(s.ctrl_n||s.segunda||"?")}`}</div>
   ${k?`<div class="atkg"><div><span>${esc(k.tipo)} contra</span><b style="font-size:15px">${esc(c.contra)}</b></div>
   <div><span>Marcador · ${k.diaTxt}</span><b>${k.g}-${k.p}</b> ${cuad}</div></div>
   ${k.juego?`<div style="font-size:15px;font-weight:700;color:#ffeb00;margin-bottom:6px">Hoy: ${esc(k.juego)}</div>`:""}
   ${c.en_juego?`<div style="font-size:13px;margin-bottom:6px">En juego: <b>${esc(c.en_juego)}</b>${c.en_juego_rival?` · si ganamos: <b>${esc(c.en_juego_rival)}</b>`:""}</div>`:""}`
   :`<div class="atkg"><div><span>Pilotos ${a.dia}</span><b class="az">${a.v}</b> <span style="display:inline;font-size:13px;color:#5aaaff">x${c1(a.v/Math.max(a.m,1))}</span><span>media ${c1(a.m)}</span></div>
   <div><span>Influencia</span><b class="dn">${c1(s.inf-s.prev)}</b><span>desde ayer · ahora ${c1(s.inf)} %</span></div></div>`}
   <div class="pk" style="font-size:13px">${tk?`Próximo tick ~${hora(tk)} · en ${fx}${gl?" (galaxia)":""}`:"Próximo tick: aprendiendo..."}</div>
   <div style="font-size:13px;margin-top:6px">Qué hacer: ${k?esc(ACC[(c.tipo||"").toLowerCase()]||SUBIR):`pasar por ${esc(s.sys)}, ver qué misiones se están haciendo y ${SUBIR.charAt(0).toLowerCase()+SUBIR.slice(1)}`}.</div>
   <div class="sub" style="margin-top:6px">dato de hace ${hace(s.t)} · alerta ${atkI+1} de ${ATK.length}</div>
   <div class="atkb"><button data-a="f">Ver ficha</button>${ATK.length>1?'<button data-a="s">Siguiente</button>':""}<button data-a="v" class="v">Visto</button></div></div>`;
}
document.getElementById("ataque").onclick=()=>abreAtaque(0);
document.getElementById("atk").onclick=e=>{
  const b=e.target.closest("button[data-a]");if(!b)return;
  if(b.dataset.a=="s"){atkI=(atkI+1)%ATK.length;pintaAtaque();return}
  const n=ATK[atkI]?.s.sys;cierraAtaque(true);
  if(b.dataset.a=="f"&&n)abreFicha(n);
};
addEventListener("keydown",e=>{if(e.key=="Escape")cierraAtaque(true)});

// ---------- franja de ACTIVIDAD INUSUAL (pico de visitas sin bajada de influencia) ----------
function revisaInusual(){
  const b=document.getElementById("inusual");if(!b||!D)return;
  const L=Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null).map(s=>({s,a:ataque(s)})).filter(o=>o.a&&alerta(o.s)[1]=="ACTIVIDAD INUSUAL")
    .sort((x,y)=>(y.a.v/Math.max(y.a.m,1))-(x.a.v/Math.max(x.a.m,1)));
  if(!L.length){b.hidden=true;return}
  const o=L[0];
  b.innerHTML=`👁 <b>ACTIVIDAD INUSUAL</b> en ${esc(o.s.sys)} (${o.a.v} pilotos ${o.a.dia})${L.length>1?` y ${L.length-1} más`:""} · toca para ver`;
  b.hidden=false;
}
document.getElementById("inusual").onclick=()=>vista("vis");

// ---------- franja de DEFENSA EN CURSO (conflictos que vamos ganando: defensa, a un dia de ganar, victoria segura) ----------
let DEF=[];
function revisaDefensa(){
  const b=document.getElementById("defensa");if(!b||!D)return;
  DEF=Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null).flatMap(s=>(s.conflictos||[]).filter(c=>c.estado=="active")
    .map(c=>({s,c,k:conflicto(c)}))).filter(o=>o.k.tono=="fa").sort((x,y)=>(y.k.g-y.k.p)-(x.k.g-x.k.p));
  if(!DEF.length){b.hidden=true;return}
  const o=DEF[0],t=o.k.fase=="victoria"?"VICTORIA SEGURA":o.k.fase=="a_un_dia"?"A UN DÍA DE GANAR":"DEFENSA EN CURSO";
  b.innerHTML=`🛡 ${o.k.ico} <b>${t}</b> en ${esc(o.s.sys)} (${esc(o.k.tipo.toLowerCase())} contra ${esc(o.c.contra)} · ${o.k.g}-${o.k.p} · ${o.k.diaTxt})`+
    `${DEF.length>1?` y ${DEF.length-1} más`:""} · vamos ganando, ¡ayuda a mantenerlo! · toca para ver`;
  b.hidden=false;
}
document.getElementById("defensa").onclick=()=>{if(DEF.length==1)abreFicha(DEF[0].s.sys);else vista("hoy")};
