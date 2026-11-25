// app.js - CDSN BGS (la pagina index.html solo tiene la estructura)
const VERSION="v1.22";
const NOVEDADES=[
 ["v1.22","25/11/2026",["Pestaña Arquitectos: todos los sistemas de CDSN con su arquitecto; los que no tienen dato salen como heredados hasta que un comandante nos lo facilite","Heredado * en el archivo = comprobado que es heredado de origen","El arquitecto sale también en la ficha de cada sistema"]],
 ["v1.21.2","25/11/2026",["Portanaves: enlace «dueño en Inara» junto a cada matrícula en la ficha del sistema"]],
 ["v1.21.1","25/11/2026",["Consejos corregidos: el truco del tick (zona el día que se gana, bonos el día que se cobran), cómo funciona la retirada y a quién da influencia cobrar recompensas","Consejos nuevos: misiones de masacre y asesinato, cuidado con matar naves de seguridad y una sección de transporte de pasajeros"]],
 ["v1.21","24/11/2026",["La Crónica con imágenes: cada noticia lleva su dibujo (guerra, elecciones, retirada, obras, vecindario…)","En las noticias importantes, imagen con datos reales: el marcador de los 7 días de la guerra, la influencia de la última semana o el alcance de una expansión vecina","Y debajo, qué hacer para ayudar (bonos de combate, misiones de CDSN, comercio…)"]],
 ["v1.20","24/11/2026",["La Crónica más limpia: lo nuestro primero. Las expansiones de otras facciones van a la nueva sección 🔭 Vecindario (ya no llenan «Todas» ni la portada), y con el escucha v11.8 salen una sola vez por facción, con aviso cuando terminan y cuando una facción llega a un sistema nuestro","Resumen del día nuevo y corto: controlados, los que más suben y bajan, conflictos, ventajas justas, riesgo de retirada, cerca de expandirnos y vecindario. Toca «ver resumen» para leerlo entero"]],
 ["v1.19","23/11/2026",["Pestaña Consejos: cómo subir la influencia de CDSN, qué la hace bajar, cómo ganar guerras y elecciones, los umbrales del BGS y consejos de comercio, exploración y colonización (de las guías de NEWP y pruebas de jugadores)","Arriba de Consejos, los conflictos en marcha y los sistemas cerca de la retirada o de la expansión, con qué hacer en cada uno"]],
 ["v1.18","23/11/2026",["Contador de visitas anónimo (GoatCounter): cuenta cuánta gente entra y qué pestañas mira, sin cookies y sin saber quién es"]],
 ["v1.17","23/11/2026",["Franja amarilla 📌 arriba en todas las pestañas mientras haya una noticia fija; al tocarla abre La Crónica","Hemeroteca al final de La Crónica: todas las noticias fijas anteriores con sus fechas, para leerlas enteras (con el escucha v11.7)"]],
 ["v1.16","23/11/2026",["Noticia fija arriba de La Crónica: se escribe a mano en el archivo noticia_fija.txt de cdsn-datos (en GitHub, desde el navegador o el móvil)","Pestaña Crónica: La Crónica de Sion, el periódico de CDSN. Todos los avisos del escucha (los mismos de Discord) como últimas noticias, con su hora y minuto, portada con la noticia más importante y secciones (conflictos, expansión, obras, estaciones, población…). Toca una noticia para abrir la ficha del sistema. Necesita el escucha v11.6"]],
 ["v1.15.1","23/11/2026",["Visitas de 60 días (con el escucha v11.3): la gráfica de visitas por día enseña 60 días y compara los últimos 30 con los 30 anteriores","Pestaña Visitas: nuevo periodo de 60 días"]],
 ["v1.15","23/11/2026",["Gráficos en 6 pestañas: Influencia, Actividad, Conflictos, Estados y población, Alrededor y Powerplay, y Tick","Nuevos: sistemas más visitados, atraques y motivos de denegación, portanaves, zonas de conflicto, marcador día a día de los conflictos activos, rivales más peligrosos, estados, seguridad, población, economías, gobiernos y alianzas vecinas, potencias, expansiones enemigas, candidatos para expandirnos, obras y la hora del tick","Toca una fila con un sistema para abrir su ficha"]],
 ["v1.14","23/11/2026",["RETIRADA INMINENTE (rojo y alerta grande): CDSN por debajo del 2,5 %, con los días que lleva así (la retirada llega a los 5–6 días)","Qué hacer según el estado del sistema: en Auge el comercio cuenta el doble, en Hambruna o Epidemia el combate no sirve, en Crisis el comercio no saca de ella, en Disturbios o Confinamiento cazar recompensas","Hoy dice si el sistema es fácil (menos de 1 millón de habitantes) o difícil (más de 1.000 millones) de mover","Origen probable de la próxima expansión de CDSN: el sistema más feliz (en Hoy y en Gráficos)"]],
 ["v1.13.1","23/11/2026",["Obras: en Hoy, lista de las obras (construction sites) de nuestros sistemas, y en la ficha de cada sistema sus obras con el enlace a Inara para ver el arquitecto","Las obras terminadas desaparecen solas (con el escucha v11.1 también hay aviso a Discord de obra nueva y obra terminada)"]],
 ["v1.13","22/11/2026",["Pestaña Gráficos: visitas por día, mapa de horas (a qué hora entra la gente), influencia, saltos de las últimas 48 h, felicidad y resultados de los conflictos; todo para la facción o para un sistema","EXPANSIÓN ENEMIGA: otra facción prepara una expansión cerca y puede entrar en uno de nuestros sistemas (con el escucha v11)","ESTACIÓN DAÑADA / BAJO ATAQUE, SEGURIDAD BAJADA y OPORTUNIDAD (otra facción en retirada en un sistema nuestro) en la tabla, el radar y Hoy","Ficha: felicidad de cada facción, estaciones y su estado, asentamientos de Odyssey, cambios de población y seguridad y expansiones que apuntan al sistema","Hoy: lista de expansiones y retiradas de otras facciones alrededor"]],
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
const DATOS="https://raw.githubusercontent.com/ortemedder/cdsn-datos/main/faccion.json";
const ARQ_URL="https://raw.githubusercontent.com/ortemedder/cdsn-datos/main/arquitectos.txt";   // arquitectos: "Sistema = CMDR", lo edita el almirante a mano
const ARQ_EDIT="https://github.com/ortemedder/cdsn-datos/edit/main/arquitectos.txt";
let ARQ={};
const arqDe=n=>{const a=ARQ[(n||"").toLowerCase()];return a&&!/^heredad/i.test(a)?a:""};
const arqOk=n=>/^heredad\w*\s*\*/i.test(ARQ[(n||"").toLowerCase()]||"");   // "heredado *" = comprobado que es heredado de origen
const arqTxt=n=>arqDe(n)?"<b style='color:#c9a36a'>"+esc(arqDe(n))+"</b>":arqOk(n)?"heredado <span style='color:#5adc78'>✓ comprobado</span>":"heredado <span class='sub'>(sin comprobar)</span>";
const FIJA_URL="https://raw.githubusercontent.com/ortemedder/cdsn-datos/main/noticia_fija.txt";   // noticia fija de La Crónica (se edita a mano en GitHub)
let FIJA=[];   // [[titular, texto], ...]   // los sube el escucha de la Orange Pi
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
// ---------- datos del escucha v11 ----------
const FEL={1:["😄","eufórica"],2:["🙂","contenta"],3:["😐","descontenta"],4:["☹️","infeliz"],5:["😫","desesperada"]};
const felTxt=n=>FEL[n]?FEL[n][0]+" "+FEL[n][1]:"—";
const EST_ES={UnderRepairs:"en reparación",Damaged:"dañada",Abandoned:"abandonada",UnderAttack:"bajo ataque",Construction:"en construcción",Evacuated:"evacuada"};
const SEGN={"$SYSTEM_SECURITY_high;":3,"$SYSTEM_SECURITY_medium;":2,"$SYSTEM_SECURITY_low;":1,"$GAlAXY_MAP_INFO_state_anarchy;":0,"$GALAXY_MAP_INFO_state_anarchy;":0,"$GALAXY_MAP_INFO_state_lawless;":0};
const SEGT=["sin ley","baja","media","alta"];
// expansiones de otras facciones que pueden llegar a cada sistema nuestro: {sistema: [{n,desde,est,ly}]}
function amenazas(){const A={};for(const[desde,v]of Object.entries(D.vecinos||{}))for(const e of v.exp||[])for(const[n,ly]of e.obj||[])(A[n]??=[]).push({n:e.n,desde,est:e.est,ly,inf:e.inf});return A}
let AMZ={};
const estMal=s=>Object.entries(s.estaciones||{}).filter(([n,e])=>e.estado&&EST_ES[e.estado]&&(e.f==FAC||e.estado=="UnderAttack"||e.estado=="Damaged"));
function segBaja(s){const h=s.hsis||[];if(h.length<2)return null;const a=h[h.length-2],b=h[h.length-1],x=SEGN[a[2]],y=SEGN[b[2]];
  return x!=null&&y!=null&&y<x&&now()-b[0]<3*86400?{de:SEGT[x],a:SEGT[y],t:b[0]}:null}
// obras (construction sites): las que aun no tienen su estacion terminada -> [{n nombre final, sitio, pl planetaria, t}]
function obras(s){const E=s.estaciones||{};return Object.entries(E).filter(([n,e])=>/ConstructionDepot/.test(e.tipo||"")||/Construction Site/.test(n))
  .map(([n,e])=>({n:e.obra||(n.includes(":")?n.split(":").slice(1).join(":").trim():n),sitio:n,pl:/Planetary/.test(n+(e.tipo||"")),t:e.t}))
  .filter(o=>!(E[o.n]&&!/ConstructionDepot/.test(E[o.n].tipo||"")))}
// ---------- reglas del BGS (guía de NovaForce) ----------
// retirada: por debajo del 2,5 % durante 5-6 dias. dias que lleva por debajo, sacado del historico
function diasBajo(s){if(s.inf>=2.5)return 0;const h=s.hinf||[];let t=s.t||now();for(let i=h.length-1;i>=0;i--){if(h[i][1]>=2.5)break;t=h[i][0]}return Math.max(0,(now()-t)/86400)}
const dBajo=s=>{const d=diasBajo(s);return d<1?"menos de 1 día":Math.floor(d)+(Math.floor(d)==1?" día":" días")};
// que hacer segun el estado del sistema (activos de CDSN)
function subir(s){const a=s.activos||[];
  if(a.includes("Famine")||a.includes("Outbreak"))return`Subir influencia SIN combate (en ${a.includes("Famine")?"hambruna":"epidemia"} no cuenta): misiones de CDSN, comercio con beneficio y datos de exploración en sus estaciones`;
  if(a.includes("Boom"))return"Comercio con beneficio en estaciones de CDSN (en auge cuenta el doble), además de misiones, bonos y exploración";
  if(a.includes("Bust"))return"Misiones de CDSN, bonos y datos de exploración (en crisis el comercio no saca de ella)";
  if(a.includes("CivilUnrest")||a.includes("Lockdown"))return"Cazar recompensas y entregar los bonos en estaciones de CDSN (sube la seguridad), además de misiones";
  return SUBIR}
// facil o dificil de mover segun la poblacion
function mover(s){const p=(s.sis||{}).pob;if(!p)return"";return p<1e6?'<span class="up">fácil de mover</span> (poca población)':p>1e9?'<span class="dn">difícil de mover</span> (más de 1.000 millones)':""}
// la expansion sale del sistema mas feliz de la faccion (a igual felicidad, el de mas influencia)
function origenExp(){return Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null&&s.fel).sort((a,b)=>a.fel-b.fel||b.inf-a.inf).slice(0,3)}
const inaraSis=n=>`https://inara.cz/elite/starsystem/?search=${encodeURIComponent(n)}`;
const retAjena=s=>(s.todas||[]).filter(x=>x.n!=FAC&&[...(x.act||[]),...(x.pend||[])].includes("Retreat"));
const sinConf=s=>!(s.conflictos||[]).some(c=>c.estado=="active"||c.estado=="pending");
// alertas: mismas reglas que el radar -> [nivel, titulo, texto, tono, icono, parpadea, alarma]
function alerta(s){
  for(const c of s.conflictos||[]){const t=TIPO[(c.tipo||"").toLowerCase()]||"Conflicto",ico=(c.tipo||"").toLowerCase()=="election"?"✉":"⚔";
    if(c.estado=="active"){const k=conflicto(c);
      return[2,k.tit,`${t} contra ${c.contra} · ${k.diaTxt} · ${k.g}-${k.p}${k.fase=="sin_remedio"?" (sin remedio)":""}${k.juego?" · "+k.juego:""}`,k.tono,k.ico,k.parp,k.alarma]}
    if(c.estado=="pending")return[2,t.toUpperCase()+" PEND.",`contra ${c.contra} · empieza en el próximo tick`,"pu",ico,false,false];}
  if((s.activos||[]).includes("Retreat")||(s.pendientes||[]).includes("Retreat"))return[2,"RETIRADA",`influencia ${c1(s.inf)} %`,"gr"];
  if(s.inf>0&&s.inf<2.5)return[2,"RETIRADA INMINENTE",`${c1(s.inf)} % · ${dBajo(s)} por debajo del 2,5 % (se va a los 5–6)`,"gr","",true,true];
  const vent=s.inf-(s.segunda_inf||0);
  if(s.ctrl&&vent<5)return[2,"VENTAJA BAJA",`solo ${c1(vent)} sobre ${s.segunda}`,"gr"];
  const at=ataque(s);if(at&&at.baja)return[2,"POSIBLE ATAQUE",at.txt,"gr","",false,true];
  if(s.prev!=null&&s.prev-s.inf>=3)return[1,"BAJADA",`${c1(s.inf-s.prev)} desde ayer`,"av"];
  if(at&&!at.sube)return[1,"ACTIVIDAD INUSUAL",at.txt,"av"];
  if(at)return[1,"ACTIVIDAD A FAVOR",at.txt+" (gente propia o ayuda externa)","fa"];
  const em=estMal(s);if(em.length)return[1,em[0][1].estado=="UnderAttack"?"ESTACIÓN BAJO ATAQUE":"ESTACIÓN DAÑADA",`${em[0][0]} ${EST_ES[em[0][1].estado]}${em.length>1?` y ${em.length-1} más`:""}`,"av"];
  const am=AMZ[s.sys];if(am)return[1,"EXPANSIÓN ENEMIGA",`${am[0].n} desde ${am[0].desde} (${c1(am[0].ly)} al)${am.length>1?` y ${am.length-1} más`:""}`,"av","🛸"];
  const sb=segBaja(s);if(sb)return[1,"SEGURIDAD BAJADA",`de ${sb.de} a ${sb.a}`,"av"];
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
  if(!document.getElementById("vHoy").hidden)pintaHoy();if(!document.getElementById("vPP").hidden)pintaPP();if(!document.getElementById("vVis").hidden)pintaVis();if(!document.getElementById("vEvo").hidden)pintaEvo();else guardaDia();if(!document.getElementById("vGra").hidden)pintaGra();if(!document.getElementById("vCro").hidden)pintaCro();if(!document.getElementById("vCon").hidden)pintaCon();if(!document.getElementById("vArq").hidden)pintaArq();
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
    return`<span class="${m?"ctrl":""}">${esc(x.n)}${x.jug?" <span class='sub'>(jugadores)</span>":""}${FEL[x.fel]?` <span title="felicidad: ${FEL[x.fel][1]}">${FEL[x.fel][0]}</span>`:""}<br><span class="sub">${esc(x.gov)} · ${esc(x.alg)}${(x.act||[]).length?" · "+esc(x.act.map(es).join(", ")):""}${(x.pend||[]).length?" · pend.: "+esc(x.pend.map(es).join(", ")):""}</span></span>
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
    felicidad de CDSN: ${felTxt(s.fel)}${(s.hsis||[]).length>1?"<br><span class=sub>cambios: "+s.hsis.slice(-4).map(h=>`${new Date(h[0]*1000).toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit"})} ${pob(h[1])} · seg. ${esc(SEGT[SEGN[h[2]]]??limpia(h[2]))}`).join(" → ")+"</span>":""}<br>
    coordenadas: ${(s.pos||[]).map(v=>v==null?"?":(+v).toFixed(1)).join(" / ")||"—"}${s.ctrl_n?"<br>controla: "+esc(s.ctrl_n):""}`;
  const pw=pp.pot||(pp.pots||[]).length?`potencia: <b>${esc(pp.pot||"ninguna")}</b>${pp.est?" ("+esc(PPE[pp.est]||pp.est)+")":""}<br>
    progreso: ${pct(pp.prog)} · refuerzo: ${pp.ref??"—"} · socavamiento: ${pp.soc??"—"}${(pp.pots||[]).length?"<br><span class=sub>presentes: "+pp.pots.map(esc).join(", ")+"</span>":""}`:"sin Powerplay";
  const zc=(s.zc||[]).map(z=>`${esc(ZC[z.i]||z.i)} <span class=sub>(${hace(z.t)})</span>`).join(" · ")||"no vistas en 24 h";
  const pn=Object.entries(s.pn||{}).map(([c,v])=>`<b>${esc(c)}</b> ${esc(v.n||"")} <span class=sub>(${hace(v.t)})</span> <a target="_blank" rel="noopener" style="color:#ff8c00" href="https://inara.cz/elite/station/?search=${encodeURIComponent(c)}">dueño en Inara ↗</a>`).join("<br>")+(Object.keys(s.pn||{}).length?`<br><span class=sub>El dueño no llega por EDDN; Inara lo muestra si el dueño usa Inara o EDMC.</span>`:"")||"no vistos en 7 días";
  const ay=s.prev!=null?`${c1(s.prev)} % → ${c1(s.inf)} % (${(s.inf-s.prev>0?"+":"")+c1(s.inf-s.prev)}) · cambio visto hace ${hace(s.t)}${s.prev_t?" · dato anterior hace "+hace(s.prev_t):""}`:"—";
  const B=(t,c)=>`<h3 style="margin-top:10px">${t}</h3>${c}`;
  const ob=obras(s),obS=new Set(ob.map(o=>o.sitio));
  const obh=ob.map(o=>`🏗️ <b>${esc(o.n)}</b> <span class=sub>${o.pl?"planetaria":"orbital"} · vista hace ${hace(o.t)}</span>`).join("<br>");
  const ests=Object.entries(s.estaciones||{}).filter(([n,e])=>(e.f||e.tipo)&&!/ConstructionDepot/.test(e.tipo||"")&&!/Construction Site/.test(n)).sort((a,b)=>(a[1].ls??1e9)-(b[1].ls??1e9)).slice(0,10)
    .map(([n,e])=>`<span class="${e.f==FAC?"ctrl":""}">${esc(n)}</span> <span class=sub>${esc(e.tipo||"")}${e.ls!=null?" · "+e.ls+" ls":""} · ${esc(e.f||"?")}</span>${e.estado&&EST_ES[e.estado]?` <span class="tag k-av">${esc(EST_ES[e.estado])}</span>`:""}`).join("<br>")||"<span class=sub>aún no vistas (salen al atracar)</span>";
  const asn=Object.entries(s.asent||{}).sort((a,b)=>(b[1].f==FAC)-(a[1].f==FAC)||a[0].localeCompare(b[0])).slice(0,12)
    .map(([n,a])=>`<span class="${a.f==FAC?"ctrl":""}">${esc(n)}</span> <span class=sub>${esc(a.cuerpo||"")} · ${esc(a.f)}</span>`).join("<br>");
  const amz=(AMZ[s.sys]||[]).map(a=>`🛸 <b>${esc(a.n)}</b> desde ${esc(a.desde)} <span class=sub>(${c1(a.ly)} al · ${a.est=="pend"?"pendiente":"en curso"})</span>`).join("<br>");
  return`<div class="dg"><div><h3>Facciones</h3><div class="fac">${fac}</div>${B("Sistema",sis)}${B("Powerplay",pw)}</div>
  <div><h3>Influencia</h3>${grafica(s.hinf)}${B("Desde ayer",ay)}${B("Conflictos",con)}
  ${B("Estados de CDSN","activos: "+esc((s.activos||[]).map(es).join(", ")||"—")+"<br>pendientes: "+esc((s.pendientes||[]).map(es).join(", ")||"—")+"<br>recuperando: "+esc((s.recuperando||[]).map(es).join(", ")||"—"))}</div>
  <div>${B("Tick",tk)}${B("Visitas (pilotos distintos por día)",tr)}${B("Zonas de conflicto",zc)}${B("Portanaves vistos",pn)}${B("Estaciones",ests)}${ob.length?B(`Obras (${ob.length})`,obh+`<br><a target="_blank" rel="noopener" style="color:#ff8c00" href="${inaraSis(s.sys)}">Ver el arquitecto en Inara ↗</a>`):""}${asn?B("Asentamientos (Odyssey)",asn):""}${amz?B("Expansiones que pueden llegar aquí",amz):""}
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
    D=await fetch(DATOS+"?"+Date.now()).then(r=>r.json());AMZ=amenazas();
    try{const t=await fetch(FIJA_URL+"?"+Date.now()).then(r=>r.ok?r.text():"");   // las lineas con # no salen; --- separa noticias
      FIJA=t.split(/^---\s*$/m).map(b=>b.split("\n").filter(l=>!l.trim().startsWith("#")).join("\n").trim()).filter(Boolean)
        .map(b=>{const[a,...r]=b.split("\n");return[a.trim(),r.join("\n").trim()]})}catch(x){}
    try{const t=await fetch(ARQ_URL+"?"+Date.now()).then(r=>r.ok?r.text():"");const A={};
      for(const l of t.split("\n")){if(l.trim().startsWith("#"))continue;const i=l.indexOf("=");if(i<1)continue;const k=l.slice(0,i).trim(),v=l.slice(i+1).trim();if(k&&v)A[k.toLowerCase()]=v}
      ARQ=A}catch(x){}
    revisaFija();
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
   <div class="sub" style="margin:4px 0">🏗 Arquitecto: ${arqTxt(s.sys)}</div>
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
const VISTAS={tabla:"vTabla",radar:"vRadar",hoy:"vHoy",pp:"vPP",vis:"vVis",evo:"vEvo",gra:"vGra",cro:"vCro",con:"vCon",arq:"vArq"};
// ---------- contador de visitas anonimo (GoatCounter, cdsngoatcountercom.goatcounter.com) ----------
// Sin cookies ni scripts de fuera: una imagen de 1 pixel por pagina y por pestaña vista (una vez por pestaña y carga).
const CONTADOR="https://cdsngoatcountercom.goatcounter.com/count",CONTADAS=new Set();
function contarVisita(v){if(CONTADAS.has(v)||!/github\.io$/.test(location.hostname))return;CONTADAS.add(v);
  try{const q=new URLSearchParams({p:"/"+(v=="tabla"?"":v),t:"CDSN · "+v,r:CONTADAS.size==1?document.referrer:"",s:screen.width,rnd:Math.random().toString(36).slice(2)});
    new Image().src=CONTADOR+"?"+q}catch(e){}}
function vista(v){
  if(!VISTAS[v])v="tabla";contarVisita(v);try{localStorage.setItem("cdsn_vista",v)}catch(e){}
  for(const[k,id]of Object.entries(VISTAS))document.getElementById(id).hidden=k!=v;
  document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b.dataset.v==v));
  if(v=="radar"&&!R_.on){R_.on=true;R_.t0=0;requestAnimationFrame(dibuja)}if(v!="radar")R_.on=false;
  if(v=="hoy")pintaHoy();if(v=="pp")pintaPP();if(v=="vis")pintaVis();if(v=="evo")pintaEvo();if(v=="gra")pintaGra();if(v=="cro")pintaCro();if(v=="con")pintaCon();if(v=="arq")pintaArq();
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
    let hecho=false;const SUB=subir(s);
    for(const c of s.conflictos||[]){const t=(c.tipo||"").toLowerCase(),nom=TIPO[t]||"Conflicto";
      if(c.estado=="active"){const k=conflicto(c),pr={decisivo:104,sin_remedio:103,derrota:102,igualado:100,disputado:99,defensa:97,a_un_dia:96,victoria:60}[k.fase];
        add(pr,k.tit,k.tono,`${nom} contra ${c.contra} · ${k.diaTxt} · ${k.g}-${k.p} (gana quien llegue a 4)`+(k.juego?` · ${k.juego}`:"")+(c.en_juego?` · en juego: ${c.en_juego}`:""),ACC[t]||SUBIR,k.ico,k.parp);hecho=true}
      else if(c.estado=="pending"){add(90,nom.toUpperCase()+" PEND.","pu",`contra ${c.contra} · empieza en el próximo tick`,"Prepararse: "+(ACC[t]||SUBIR).toLowerCase());hecho=true}}
    if(hecho)continue;
    if(act.includes("Retreat")||pen.includes("Retreat"))add(95,"RETIRADA","gr",`influencia ${c1(s.inf)} %, CDSN puede salir del sistema`,SUB);
    else if(s.inf>0&&s.inf<2.5)add(99,"RETIRADA INMINENTE","gr",`${c1(s.inf)} %, ${dBajo(s)} por debajo del 2,5 %: si sigue así 5–6 días, CDSN sale del sistema`,SUB,"",true);
    else if(s.inf<5)add(85,"RIESGO RETIRADA","gr",`influencia ${c1(s.inf)} %, por debajo del 5 %`,SUB);
    else if(ataque(s)?.baja)add(88,"POSIBLE ATAQUE","gr",ataque(s).txt+": puede que alguien esté trabajando contra CDSN",SUB);
    else if(s.ctrl&&v<5)add(80,"VENTAJA BAJA","gr",`solo ${c1(v)} puntos sobre ${s.segunda}: puede haber conflicto por el control`,SUB);
    else if(s.prev!=null&&s.prev-s.inf>=3)add(60,"BAJADA","av",`${c1(s.inf-s.prev)} puntos desde ayer`,SUB);
    else if(ataque(s)?.sube)add(45,"ACTIVIDAD A FAVOR","fa",ataque(s).txt+": alguien trabaja a favor de CDSN (gente propia o ayuda externa)","Seguir así; si no es nuestra gente, averiguar quién nos ayuda");
    else if(ataque(s))add(55,"ACTIVIDAD INUSUAL","av",ataque(s).txt+": vigilar la influencia en el próximo tick","Pasar por el sistema y ver qué misiones se están haciendo; si baja la influencia, "+SUB.toLowerCase());
    else if(estMal(s).length){const[n,e]=estMal(s)[0];add(57,e.estado=="UnderAttack"?"ESTACIÓN BAJO ATAQUE":"ESTACIÓN DAÑADA","av",`${n} está ${EST_ES[e.estado]}${e.f==FAC?" (es nuestra)":""}`,e.estado=="UnderAttack"?"Defender la estación: misiones y combate contra los atacantes":"Ayudar a repararla: misiones de reparación y entregar materiales en la estación")}
    else if(AMZ[s.sys]){const a=AMZ[s.sys][0];add(56,"EXPANSIÓN ENEMIGA","av",`${a.n} prepara una expansión desde ${a.desde} (a ${c1(a.ly)} al) y este sistema tiene hueco (${(s.todas||[]).length} facciones)`,"Mantener la influencia de CDSN alta para que la facción nueva entre lo más baja posible","🛸")}
    else if(segBaja(s)){const b=segBaja(s);add(52,"SEGURIDAD BAJADA","av",`la seguridad ha bajado de ${b.de} a ${b.a} hace ${hace(b.t)}: puede haber piratería o misiones en contra`,"Cazar recompensas y entregar los bonos en estaciones de CDSN")}
    else if(s.ctrl&&v<10)add(50,"VENTAJA AJUSTADA","av",`${c1(v)} puntos sobre ${s.segunda}`,SUB);
    else if(pen.includes("Expansion")||act.includes("Expansion"))add(40,"EXPANSIÓN","av",(pen.includes("Expansion")?"expansión pendiente":"expansión en curso")+(origenExp().length?` · lo más probable es que salga de ${origenExp()[0].sys} (el sistema más feliz)`:""),"Mantener la influencia alta mientras dura");
    else if(s.ctrl&&s.inf>=70)add(30,"CERCA DE EXPANSIÓN","fa",`${c1(s.inf)} %, la expansión salta al 75 %`,SUB);
    else if(retAjena(s).length){const r=retAjena(s)[0];add(35,"OPORTUNIDAD","fa",`${r.n} está en retirada (${c1(r.inf)} %): si sale, queda un hueco`,"Trabajar para CDSN mientras dura: su influencia se reparte entre las demás")}
  }
  return L.sort((a,b)=>b.p-a.p||a.s.inf-b.s.inf);
}
function pintaHoy(){
  if(!D)return;const L=tareas();
  document.getElementById("vHoy").innerHTML=(L.length?`<div class="sub" style="margin-bottom:8px">${L.length} sistemas, de más a menos urgente. Toca uno para ver su ficha.</div>`:"<p>Todo tranquilo: ningún sistema necesita ayuda ahora mismo.</p>")+
   L.slice(0,R_.hoyTodo?999:15).map(t=>`<div class="hoy" data-s="${esc(t.s.sys)}"><b style="color:${t.s.ctrl?"#fff":"#ff8c00"}">${FAV.has(t.s.sys)?"⭐ ":""}${esc(t.s.sys)}</b>${CP(t.s.sys)} <span class="tag k-${t.k}${t.parp?" parp":""}">${t.ico?t.ico+" ":""}${esc(t.tag)}</span>
   <div class="sub">${esc(t.por)}${mover(t.s)?" · "+mover(t.s):""}</div><div class="acc">➜ ${esc(t.acc)}</div></div>`).join("")+(L.length>15&&!R_.hoyTodo?`<button id="hoyTodo" class="favb" style="margin:0">Ver los ${L.length-15} restantes</button>`:"")+alrededor();
}
document.getElementById("vHoy").onclick=e=>{if(e.target.id=="hoyTodo"){R_.hoyTodo=true;pintaHoy();return}const d=e.target.closest(".hoy");if(d)abreFicha(d.dataset.s)};
// expansiones y retiradas de otras facciones (escucha v11: D.vecinos)
function alrededor(){
  const V=Object.entries(D.vecinos||{});
  const ex=V.flatMap(([n,v])=>(v.exp||[]).map(e=>({n,v,e}))).sort((a,b)=>(b.e.obj||[]).length-(a.e.obj||[]).length||a.v.ly-b.v.ly);
  const re=V.flatMap(([n,v])=>(v.ret||[]).map(e=>({n,v,e}))).sort((a,b)=>a.v.ly-b.v.ly);
  let h="";if(D.vecinos){h=`<h3 style="margin-top:16px">Alrededor: expansiones de otras facciones (${ex.length})</h3>`;
  h+=ex.length?ex.map(o=>`<div class="hoy" data-s="${esc((o.e.obj||[])[0]?.[0]||(o.v.propio?o.n:o.v.junto))}"><b>🛸 ${esc(o.e.n)}</b> <span class="sub">${o.e.est=="pend"?"pendiente":"en curso"} · ${c1(o.e.inf)} %</span>
    <div class="sub">desde ${esc(o.n)}${CP(o.n)}${o.v.propio?" (sistema nuestro)":` · a ${c1(o.v.ly)} al de ${esc(o.v.junto)}`}</div>
    <div class="acc">${(o.e.obj||[]).length?"➜ puede llegar a: "+o.e.obj.map(([n,l])=>`${esc(n)} (${c1(l)} al)`).join(", "):"➜ ninguno de nuestros sistemas tiene hueco a menos de 20 al"}</div></div>`).join(""):`<p class="sub">Ninguna a la vista.</p>`;}
  const OB=Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null).map(s=>({s,o:obras(s)})).filter(x=>x.o.length).sort((a,b)=>b.o.length-a.o.length||a.s.sys.localeCompare(b.s.sys));
  if(OB.length)h+=`<h3>Obras en nuestros sistemas (${OB.reduce((a,x)=>a+x.o.length,0)} en ${OB.length})</h3>`+OB.map(x=>`<div class="hoy" data-s="${esc(x.s.sys)}"><b style="color:${x.s.ctrl?"#fff":"#ff8c00"}">🏗️ ${esc(x.s.sys)}</b>${CP(x.s.sys)} <span class="sub">${x.o.length} obra${x.o.length>1?"s":""}</span>
    <div class="sub">${x.o.map(o=>esc(o.n)+(o.pl?" (planetaria)":" (orbital)")).join(" · ")}</div></div>`).join("")+`<div class="sub" style="margin-bottom:12px">Salen cuando alguien atraca en la obra. El arquitecto y el avance no llegan por EDDN: se ven en Inara (enlace en la ficha).</div>`;
  if(re.length)h+=`<h3>Retiradas de otras facciones (${re.length})</h3><div class="sub" style="margin-bottom:12px">`+re.map(o=>`${esc(o.e.n)} en ${esc(o.n)}${o.v.propio?" <span class=up>(nuestro: hueco si sale)</span>":` (${c1(o.v.ly)} al)`}`).join(" · ")+"</div>";
  return h}
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
const VPS=[[1,"Hoy"],[-1,"Ayer"],[5,"5 días"],[30,"30 días"],[60,"60 días"]];
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
function listaAtaques(){const R={"DÍA DECISIVO":3,"RETIRADA INMINENTE":2.5,"SISTEMA EN DERROTA":2,"POSIBLE ATAQUE":1};
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
   :!a?`<div class="atkg"><div><span>Influencia</span><b class="dn">${c1(s.inf)} %</b><span>retirada por debajo del 2,5 %</span></div>
   <div><span>Por debajo desde hace</span><b style="font-size:17px">${dBajo(s)}</b><span>se va a los 5–6 días</span></div></div>`
   :`<div class="atkg"><div><span>Pilotos ${a.dia}</span><b class="az">${a.v}</b> <span style="display:inline;font-size:13px;color:#5aaaff">x${c1(a.v/Math.max(a.m,1))}</span><span>media ${c1(a.m)}</span></div>
   <div><span>Influencia</span><b class="dn">${c1(s.inf-s.prev)}</b><span>desde ayer · ahora ${c1(s.inf)} %</span></div></div>`}
   <div class="pk" style="font-size:13px">${tk?`Próximo tick ~${hora(tk)} · en ${fx}${gl?" (galaxia)":""}`:"Próximo tick: aprendiendo..."}</div>
   <div style="font-size:13px;margin-top:6px">Qué hacer: ${k?esc(ACC[(c.tipo||"").toLowerCase()]||SUBIR):`${a?`pasar por ${esc(s.sys)}, ver qué misiones se están haciendo y `:""}${esc(subir(s).charAt(0).toLowerCase()+subir(s).slice(1))}`}.</div>
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

// ---------- pestaña Gráficos (para toda la facción o para un sistema) ----------
let GS="";   // sistema elegido ("" = toda la facción)
let GT="inf";try{GT=localStorage.getItem("cdsn_gtab")||"inf"}catch(e){}   // pestaña de gráficos
const AZ="#5aaaff",SUP="#0f0a04";
const fdm=d=>d.slice(8)+"/"+d.slice(5,7);   // AAAA-MM-DD -> dd/mm
// barras: items [{l etiqueta, v valor, tip, c color}]; una sola serie -> sin leyenda, el título la nombra
function barras(items,titulo,o={}){
  if(!items.length||!items.some(x=>x.v||x.v2))return`<h3>${titulo}</h3><p class="sub">${o.vacio||"Aún no hay datos."}</p>`;
  const W=360,H=o.alto||150,L=30,B=22,n=items.length,mx=Math.max(...items.map(x=>Math.max(x.v,x.v2||0)),1),bw=(W-L-6)/n,cada=Math.ceil(n/(o.etiquetas||10));
  const Y=v=>8+(1-v/mx)*(H-B-8);
  let g=[0,.5,1].map(k=>`<line x1="${L}" x2="${W-6}" y1="${Y(mx*k)}" y2="${Y(mx*k)}" stroke="#2a1a06"/><text x="${L-4}" y="${Y(mx*k)+4}" fill="#b06a10" font-size="10" text-anchor="end">${Math.round(mx*k)}</text>`).join("");
  const barra=(x0,w,v,c)=>{const y=Y(v),h=H-B-y;return v?`<path d="M${x0},${H-B}V${y+Math.min(3,h)}q0,-3 3,-3h${Math.max(0,w-6)}q3,0 3,3V${H-B}Z" fill="${c}"/>`:""};
  if(o.dos){items.forEach((x,i)=>{const w=Math.max(1,(bw-4)/2);g+=`<g data-tip="${esc(x.tip||"")}"><rect x="${L+i*bw}" y="8" width="${bw}" height="${H-B-8}" fill="transparent"/>`+barra(L+i*bw+1,w,x.v,o.color||AZ)+barra(L+i*bw+3+w,w,x.v2||0,o.color2||"#ff4632")+`</g>`;
    if(i%cada==0||o.todas)g+=`<text x="${L+i*bw+bw/2}" y="${H-7}" fill="#b06a10" font-size="10" text-anchor="middle">${esc(x.l)}</text>`});items=[]}
  items.forEach((x,i)=>{const x0=L+i*bw+1,w=Math.max(1,bw-2),y=Y(x.v),h=H-B-y;
    g+=`<g data-tip="${esc(x.tip||x.l+": "+x.v)}"><rect x="${L+i*bw}" y="8" width="${bw}" height="${H-B-8}" fill="transparent"/>`+
      (x.v?`<path d="M${x0},${H-B}V${y+Math.min(3,h)}q0,-3 3,-3h${Math.max(0,w-6)}q3,0 3,3V${H-B}Z" fill="${x.c||o.color||AZ}"/>`:"")+`</g>`;
    if(i%cada==0||o.todas)g+=`<text x="${L+i*bw+bw/2}" y="${H-7}" fill="#b06a10" font-size="10" text-anchor="middle">${esc(x.l)}</text>`});
  return`<h3>${titulo}</h3><div class="evo gr"><svg viewBox="0 0 ${W} ${H}">${g}<line x1="${L}" x2="${W-6}" y1="${H-B}" y2="${H-B}" stroke="#4a2c08"/></svg></div>${o.pie?`<div class="sub" style="margin:4px 0 14px">${o.pie}</div>`:'<div style="height:12px"></div>'}`;
}
// mapa de horas: dia de la semana x hora (hora de tu móvil), una escala de azul de menos a más
function mapaHoras(S){
  const M=[...Array(7)].map(()=>Array(24).fill(0)),dias=new Set();
  for(const s of S)for(const[d,L]of Object.entries(s.hdia||{})){dias.add(d);const[y,m,dd]=d.split("-").map(Number);
    L.forEach((v,h)=>{if(!v)return;const t=new Date(Date.UTC(y,m-1,dd,h));M[(t.getDay()+6)%7][t.getHours()]+=v})}
  if(!dias.size)return`<h3>Mapa de horas</h3><p class="sub">Aún no hay datos: lo empieza a guardar el escucha v11 (14 días de saltos por hora).</p>`;
  const W=360,H=176,L=26,T=4,cw=(W-L-4)/24,ch=20,mx=Math.max(1,...M.flat()),DS=["L","M","X","J","V","S","D"],DL=["lunes","martes","miércoles","jueves","viernes","sábado","domingo"];
  let g="";M.forEach((fila,r)=>{g+=`<text x="${L-6}" y="${T+r*ch+ch/2+4}" fill="#b06a10" font-size="10" text-anchor="end">${DS[r]}</text>`;
    fila.forEach((v,h)=>{g+=`<rect data-tip="${DL[r]} ${String(h).padStart(2,"0")}:00–${String(h+1).padStart(2,"0")}:00 · ${v} saltos" x="${L+h*cw+1}" y="${T+r*ch+1}" width="${cw-2}" height="${ch-2}" rx="2" fill="${v?mezcla("#1c2a3a",AZ,Math.sqrt(v/mx)):"#1a1208"}"/>`})});
  for(const h of[0,6,12,18,23])g+=`<text x="${L+h*cw+cw/2}" y="${T+7*ch+14}" fill="#b06a10" font-size="10" text-anchor="middle">${h}h</text>`;
  let pk=[0,0,0];M.forEach((f,r)=>f.forEach((v,h)=>{if(v>pk[2])pk=[r,h,v]}));
  const tot=M.flat().reduce((a,b)=>a+b,0);
  return`<h3>Mapa de horas · saltos de los últimos ${dias.size} días</h3><div class="evo gr"><svg viewBox="0 0 ${W} ${H}">${g}</svg></div>
   <div class="sub" style="margin:4px 0 14px">Más oscuro = menos saltos · más claro = más (${tot} en total). Hora de tu móvil. Lo más movido: <b style="color:var(--b)">${DL[pk[0]]} de ${pk[1]}:00 a ${pk[1]+1}:00</b> (${pk[2]} saltos).</div>`;
}
// barras horizontales con nombre (para listas: sistemas, facciones, estados...). items [{l,v,sub,c,s sistema,tip,txt}]
function hbarras(items,titulo,o={}){
  items=items.filter(x=>x.v>0);if(!items.length)return`<h3>${titulo}</h3><p class="sub">${o.vacio||"Aún no hay datos."}</p>`;
  const L=items.slice(0,o.max||10),mx=Math.max(...L.map(x=>x.v));
  return`<h3>${titulo}</h3><div class="hb">`+L.map(x=>`<div class="hbr"${x.s?` data-s="${esc(x.s)}"`:""} data-tip="${esc(x.tip||x.l+": "+(x.txt??x.v))}"><div class="hbl">${esc(x.l)}${x.sub?`<div class="sub">${x.sub}</div>`:""}</div>
    <div class="bar"><i style="width:${Math.max(2,x.v/mx*100)}%;background:${x.c||o.color||AZ}"></i></div><b class="num">${x.txt??x.v}</b></div>`).join("")+
   `</div>${items.length>L.length?`<div class="sub">y ${items.length-L.length} más</div>`:""}${o.pie?`<div class="sub" style="margin:4px 0 14px">${o.pie}</div>`:'<div style="height:12px"></div>'}`}
const cuenta=(arr,f)=>{const C={};for(const x of arr){const k=f(x);if(k!=null&&k!=="")C[k]=(C[k]||0)+1}return Object.entries(C).sort((a,b)=>b[1]-a[1])};
// marcador dia a dia de un conflicto activo (casillas 1..7)
function casillas(c){const k=conflicto(c),R=c.res||[],d0=c.res_desde||1,col={G:"#5adc78",P:"#ff4632","=":"#c9a36a","?":"#3a2a12"};
  // dias anteriores a cuando lo vio el escucha: se rellenan con el marcador (orden desconocido)
  let g0=Math.max(0,k.g-R.filter(x=>x=="G").length),p0=Math.max(0,k.p-R.filter(x=>x=="P").length);const pre=[];
  for(let d=1;d<Math.min(d0,k.dia);d++){if(g0>0){g0--;pre.push("g")}else if(p0>0){p0--;pre.push("p")}else pre.push("?")}
  let h="";for(let d=1;d<=DIAS_CONF;d++){let r=d>=d0?R[d-d0]:d<k.dia?pre[d-1]:null;const hoy=d==k.dia,aprox=r&&r==r.toLowerCase()&&r!="="&&r!="?";
    if(aprox)r=r.toUpperCase();
    h+=`<span class="cas" data-tip="día ${d}: ${hoy?"se juega hoy":r=="G"?"ganado":r=="P"?"perdido":r=="="?"sin resultado":r=="?"?"sin datos":"por jugar"}${aprox?" (orden aproximado)":""}" style="background:${r?col[r]:"transparent"};${hoy?"outline:2px solid #ffeb00;":""}${!r&&!hoy?"border:1px solid #3a2a12;":""}${aprox?"opacity:.6;":""}">${r&&r!="?"?r:hoy?"·":""}</span>`}
  return h}
function pintaGra(){
  if(!D)return;const T=Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null).sort((a,b)=>(FAV.has(b.sys)-FAV.has(a.sys))||a.sys.localeCompare(b.sys));
  if(GS&&!T.some(s=>s.sys==GS))GS="";
  const S=GS?T.filter(s=>s.sys==GS):T,uno=GS?S[0]:null;
  let h=`<div class="ctl" style="padding:0 0 10px"><label for="gSel" style="color:var(--v)">Ver:</label><select id="gSel"><option value="">Toda la facción (${T.length} sistemas)</option>${T.map(s=>`<option value="${esc(s.sys)}"${s.sys==GS?" selected":""}>${FAV.has(s.sys)?"⭐ ":""}${esc(s.sys)}</option>`).join("")}</select>
   ${uno?`<a href="#" id="gFicha" style="color:#ff8c00">ver ficha</a>`:""}</div>`;
  // 1) visitas por dia (31 dias)
  const d60=[...Array(60).keys()].map(diasAtras).reverse();
  const vis=d60.map(d=>({l:fdm(d),v:S.reduce((a,s)=>a+((s.trafico||{})[d]||0),0)}));vis.forEach(x=>x.tip=`${x.l}: ${x.v} visitas`);
  const conV=vis.filter(x=>x.v),med=conV.length?conV.reduce((a,x)=>a+x.v,0)/conV.length:0;
  h+="§act§";h+=`<div>${barras(vis,"Visitas por día · últimos 60 días",{etiquetas:6,pie:`Pilotos distintos por día${GS?"":", sumando todos los sistemas"}. Media de los días con visitas: <b style="color:var(--b)">${c1(med)}</b>.`+(()=>{const a=vis.slice(-30).reduce((x,y)=>x+y.v,0),b=vis.slice(0,30).reduce((x,y)=>x+y.v,0);return b?` Últimos 30 días: <b style="color:var(--b)">${a}</b> · 30 anteriores: ${b} (<span class="${a>=b?"up":"dn"}">${a>=b?"+":""}${Math.round((a-b)/b*100)} %</span>).`:` Últimos 30 días: <b style="color:var(--b)">${a}</b> (aún no hay 30 días anteriores para comparar).`})()})}</div>`;
  // 2) mapa de horas
  h+=`<div>${mapaHoras(S)}</div>`;
  // 3) influencia
  h+="§inf§";if(uno)h+=`<div>${lineas([{n:"CDSN",color:"#ff8c00",p:(uno.hinf||[]).map(p=>[p[0],p[1]])}],"Influencia de CDSN en "+esc(uno.sys),"%")}</div>`;
  else{const tr=[[0,5],[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[60,70],[70,101]];
    h+=`<div>${barras(tr.map(([a,b])=>{const n=T.filter(s=>s.inf>=a&&s.inf<b).length;return{l:b>100?"70+":a+"",v:n,c:a<5?"#ff4632":b<=50?"#ffd228":"#5adc78",tip:`${a}–${b>100?100:b} %: ${n} sistemas`}}),"Sistemas según la influencia de CDSN",{todas:1,pie:'<span style="color:#ff4632">■</span> menos de 5 % (riesgo de retirada) · <span style="color:#ffd228">■</span> 5–50 % · <span style="color:#5adc78">■</span> más del 50 %'})}</div>`}
  // 4) saltos de las ultimas 48 h
  const h0=Math.floor(now()/3600)*3600;const sal=[...Array(48).keys()].reverse().map(k=>{const t=h0-k*3600;return{l:hora(t).slice(0,2)+"h",v:S.reduce((a,s)=>a+((s.saltos||{})[t]||0),0),tip:`${new Date(t*1000).toLocaleDateString("es-ES",{weekday:"short"})} ${hora(t)}: ${S.reduce((a,s)=>a+((s.saltos||{})[t]||0),0)} saltos`}});
  h+="§act§";h+=`<div>${barras(sal,"Saltos por hora · últimas 48 h",{etiquetas:8,color:"#ff8c00",pie:"Naves que llegan saltando al sistema (FSDJump) cada hora."})}</div>`;
  // 5) felicidad
  h+="§est§";if(!uno){const F=[1,2,3,4,5].map(k=>({l:FEL[k][0],v:T.filter(s=>s.fel==k).length,c:k<=2?"#5adc78":k==3?"#ffd228":"#ff4632",tip:`${FEL[k][1]}: ${T.filter(s=>s.fel==k).length} sistemas`}));
    h+=`<div>${barras(F,"Felicidad de la población de CDSN",{todas:1,alto:130,vacio:"Aún no hay datos: los guarda el escucha v11.",pie:(origenExp().length?`La próxima expansión de CDSN saldrá seguramente del sistema más feliz: <b style="color:var(--b)">${origenExp().map(x=>esc(x.sys)+" "+FEL[x.fel][0]).join(" · ")}</b>. `:"")+"Cuanto más descontenta, más cuesta mover la influencia. "+[1,2,3,4,5].map(k=>FEL[k].join(" ")).join(" · ")})}</div>`}
  // 6) conflictos terminados
  const CH=(D.conflictos_hist||[]).filter(c=>!GS||c.sys==GS);
  h+="§con§";if(D.conflictos_hist){const R=[["ganado","Ganados","#5adc78"],["perdido","Perdidos","#ff4632"],["empate","Empate","#c9a36a"],["desconocido","No se sabe","#6b4a1c"]];
    h+=`<div>${barras(R.map(([k,l,c])=>({l,v:CH.filter(x=>x.res==k).length,c,tip:`${l}: ${CH.filter(x=>x.res==k).length}`})),`Conflictos terminados (${CH.length})`,{todas:1,alto:130,vacio:"Ningún conflicto terminado todavía.",
      pie:(()=>{const Q={};for(const c of CH)(Q[c.contra]??=[0,0])[c.res=="ganado"?0:1]++;const L=Object.entries(Q).sort((a,b)=>(b[1][0]+b[1][1])-(a[1][0]+a[1][1])).slice(0,5);
        return L.length?"Rivales más repetidos: "+L.map(([n,[g,p]])=>`${esc(n)} <span class=up>${g}</span>-<span class=dn>${p}</span>`).join(" · "):""})()})}</div>`}
  // ---------- ACTIVIDAD ----------
  h+="§act§";
  const d7=[...Array(7).keys()].map(diasAtras);
  if(!uno)h+=`<div>${hbarras(T.map(s=>({l:s.sys,s:s.sys,v:d7.reduce((a,d)=>a+((s.trafico||{})[d]||0),0),sub:`infl. ${c1(s.inf)} %`})).sort((a,b)=>b.v-a.v),"Sistemas más visitados · 7 días",{pie:"Pilotos distintos por día, sumados."})}</div>`;
  const d8=[...Array(8).keys()].map(diasAtras).reverse(),AT=S.flatMap(s=>Object.values(s.estaciones||{}));
  const atq=d8.map(d=>{let ok=0,no=0;for(const e of AT){const x=(e.atq||{})[d];if(x){ok+=x.ok||0;no+=x.no||0}}return{l:fdm(d),v:ok,v2:no,tip:`${fdm(d)}: ${ok} concedidos · ${no} denegados`}});
  const NEG={NoSpace:"sin sitio",TooLarge:"nave grande",Hostile:"hostil",Offences:"delitos",Distance:"lejos",ActiveFighter:"caza fuera",NoReason:"sin motivo",RestrictedAccess:"acceso restringido",DockOffline:"atraque cerrado",JumpImminent:"salto inminente"};
  const neg={};for(const e of AT)for(const[k,v]of Object.entries(e.neg||{}))neg[k]=(neg[k]||0)+v;
  h+=`<div>${barras(atq,"Atraques por día · 8 días",{dos:1,todas:1,alto:140,pie:`<span style="color:${AZ}">■</span> concedidos · <span style="color:#ff4632">■</span> denegados`+(Object.keys(neg).length?" · Motivos de denegación: "+Object.entries(neg).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${esc(NEG[k]||k)} <b style="color:var(--b)">${v}</b>`).join(" · "):"")})}</div>`;
  h+=`<div>${uno?hbarras(Object.entries(uno.pn||{}).map(([c,v])=>({l:c+" "+(v.n||""),v:Math.max(1,Math.round((now()-(v.d||v.t))/3600)),txt:hace(v.d||v.t),sub:"visto hace "+hace(v.t)})),"Portanaves en el sistema · 7 días",{vacio:"Ningún portanaves visto en 7 días.",pie:"La barra es el tiempo que lleva aparcado."})
    :hbarras(T.map(s=>({l:s.sys,s:s.sys,v:Object.keys(s.pn||{}).length})).sort((a,b)=>b.v-a.v),"Portanaves por sistema · 7 días",{color:"#c9a36a",vacio:"Ningún portanaves visto en 7 días.",pie:"Un portanaves aparcado mucho tiempo puede ser de alguien trabajando el sistema."})}</div>`;
  const ZCs=S.flatMap(s=>(s.zc||[]).filter(z=>now()-z.t<86400).map(z=>({s,z})));
  h+=`<div>${barras([["Low","baja","#ffd228"],["Med","media","#ff8c00"],["High","alta","#ff4632"]].map(([k,l,c])=>({l,c,v:ZCs.filter(x=>x.z.i==k).length,tip:`intensidad ${l}: ${ZCs.filter(x=>x.z.i==k).length}`})),"Zonas de conflicto vistas · 24 h",{todas:1,alto:120,vacio:"Ninguna zona de conflicto vista en 24 h.",
    pie:ZCs.length?"En: "+[...new Set(ZCs.map(x=>x.s.sys))].map(esc).join(" · "):""})}</div>`;
  // ---------- CONFLICTOS ----------
  h+="§con§";
  const CA=S.flatMap(s=>(s.conflictos||[]).filter(c=>c.estado=="active").map(c=>({s,c})));
  h+=`<div><h3>Conflictos activos día a día (${CA.length})</h3>`+(CA.length?CA.map(({s,c})=>{const k=conflicto(c);return`<div class="hbr" data-s="${esc(s.sys)}" style="grid-template-columns:minmax(0,1fr) auto"><div class="hbl">${k.ico} ${esc(s.sys)}<div class="sub">contra ${esc(c.contra)} · ${k.g}-${k.p} · ${esc(k.tit.toLowerCase())}</div></div><div>${casillas(c)}</div></div>`}).join("")+
    `<div class="sub" style="margin:4px 0 14px"><span style="color:#5adc78">■</span> ganado · <span style="color:#ff4632">■</span> perdido · <span style="color:#c9a36a">■</span> sin resultado · recuadro amarillo = hoy · más tenue = días de antes de que lo viera el escucha (sale el marcador, no el orden). Gana quien llegue a 4.</div>`:`<p class="sub">Ningún conflicto activo.</p>`)+`</div>`;
  const RV=Object.entries(D.rivales||{}).filter(([n,r])=>!GS||(r.sis||[]).includes(GS));
  if(D.rivales)h+=`<div>${hbarras(RV.map(([n,r])=>({l:n,v:r.veces,c:"#ff4632",sub:`${esc(r.motivo||"")} · ${(r.sis||[]).length} sistema${(r.sis||[]).length==1?"":"s"}: ${(r.sis||[]).slice(0,3).map(esc).join(", ")}${(r.sis||[]).length>3?"…":""}`,tip:`${n}: ${r.veces} veces · última hace ${hace(r.ult)}`})).sort((a,b)=>b.v-a.v),"Rivales más peligrosos",{vacio:"Ningún rival vigilado.",pie:"Veces que nos han hecho daño: conflictos y subidas cuando bajamos."})}</div>`;
  // ---------- POBLACION Y ESTADOS ----------
  h+="§est§";
  const EB={Boom:"#5adc78",Investment:"#5adc78",CivilLiberty:"#5adc78",Expansion:"#5aaaff",PublicHoliday:"#5adc78"};
  h+=`<div>${hbarras(cuenta(S.flatMap(s=>(s.activos||[]).map(a=>({a}))),x=>x.a).map(([k,v])=>({l:es(k),v,c:EB[k]||(["War","CivilWar","Election","Retreat","Bust","Famine","Outbreak","CivilUnrest"].includes(k)?"#ff8c00":"#c9a36a"),tip:`${es(k)}: ${v} sistemas`})),"Estados activos de CDSN",{max:14,vacio:"Ningún estado activo.",pie:"Verde: favorables · naranja: malos o de conflicto · azul: expansión."})}</div>`;
  const SG=[[3,"alta","#5adc78"],[2,"media","#ffd228"],[1,"baja","#ff8c00"],[0,"sin ley","#ff4632"]];
  h+=`<div>${barras(SG.map(([k,l,c])=>{const n=S.filter(s=>SEGN[(s.sis||{}).seg]==k).length;return{l,c,v:n,tip:`seguridad ${l}: ${n} sistemas`}}),"Seguridad",{todas:1,alto:120})}</div>`;
  const PB=[[0,1e6,"<1 M","#5adc78"],[1e6,1e7,"1–10 M","#5adc78"],[1e7,1e8,"10–100 M","#ffd228"],[1e8,1e9,"100–1000 M","#ff8c00"],[1e9,1e15,">1000 M","#ff4632"]];
  h+=`<div>${barras(PB.map(([a,b,l,c])=>{const n=S.filter(s=>{const p=(s.sis||{}).pob;return p!=null&&p>=a&&p<b}).length;return{l,c,v:n,tip:`${l} habitantes: ${n} sistemas`}}),"Población",{todas:1,alto:130,pie:'<span style="color:#5adc78">■</span> fácil de mover · <span style="color:#ff4632">■</span> difícil (M = millones)'})}</div>`;
  h+=`<div>${hbarras(cuenta(S,s=>limpia((s.sis||{}).eco)).filter(([k])=>k!="—").map(([k,v])=>({l:k,v,c:"#c9a36a"})),"Economías (principal)",{max:12})}</div>`;
  const V=S.flatMap(s=>(s.todas||[]).filter(x=>x.n!=FAC));
  h+=`<div>${hbarras(cuenta(V,x=>limpia(x.gov)).map(([k,v])=>({l:k,v,c:"#c9a36a"})),"Gobiernos de las facciones vecinas",{max:8,pie:`${V.length} facciones conviven con CDSN. Con el mismo gobierno que CDSN, un empate da elecciones; con otro distinto, guerra.`})}
    ${hbarras(cuenta(V,x=>x.alg).map(([k,v])=>({l:k,v,c:k=="Federation"?"#ff4632":k=="Empire"?"#5aaaff":k=="Alliance"?"#5adc78":"#c9a36a"})),"Alianzas de las facciones vecinas",{max:6})}</div>`;
  // ---------- ALREDEDOR Y POWERPLAY ----------
  h+="§alr§";
  const PO={};for(const s of S){const p=(s.pp||{}).pot;if(p)(PO[p]??=[]).push(s)}
  h+=`<div>${hbarras(Object.entries(PO).map(([p,L])=>({l:p,v:L.length,c:ppCol(p),sub:["Stronghold","Fortified","Exploited"].map(k=>[k,L.filter(s=>s.pp.est==k).length]).filter(x=>x[1]).map(([k,n])=>`${PPE[k]} ${n}`).join(" · ")})).sort((a,b)=>b.v-a.v),"Potencias en nuestros sistemas",{vacio:"Ninguna potencia."+(uno?"":""),pie:`${S.filter(s=>!(s.pp||{}).pot).length} sin ocupar.`})}</div>`;
  const EX=Object.entries(D.vecinos||{}).flatMap(([n,v])=>(v.exp||[]).map(e=>({n,v,e}))).filter(x=>!GS||(x.e.obj||[]).some(o=>o[0]==GS));
  h+=`<div>${hbarras(EX.map(x=>({l:x.e.n,v:(x.e.obj||[]).length,c:"#ff8c00",s:(x.e.obj||[])[0]?.[0],sub:`desde ${esc(x.n)} · ${x.e.est=="pend"?"pendiente":"en curso"}`,txt:(x.e.obj||[]).length+" nuestros",tip:`${x.e.n} puede llegar a ${(x.e.obj||[]).map(o=>o[0]).join(", ")||"ninguno"}`})).sort((a,b)=>b.v-a.v),"Expansiones enemigas: a cuántos sistemas nuestros pueden llegar",{vacio:D.vecinos?"Ninguna expansión enemiga que pueda llegar a nuestros sistemas.":"Aún no hay datos: los guarda el escucha v11."})}</div>`;
  const CX=Object.entries(D.expansion||{}).filter(([n,x])=>!GS||x.junto==GS).sort((a,b)=>a[1].ly-b[1].ly);
  const lyMax=Math.max(20,...CX.map(([n,x])=>x.ly));
  h+=`<div>${hbarras(CX.map(([n,x])=>({l:n,v:lyMax+1-x.ly,txt:c1(x.ly)+" al",c:x.nfac<=4?"#5adc78":"#ffd228",sub:`junto a ${esc(x.junto)} · ${x.nfac} facciones · ${pob(x.pob)} hab.`,tip:`${n}: a ${c1(x.ly)} al de ${x.junto}, ${x.nfac} facciones`})),"Candidatos para expandirnos (los más cerca)",{vacio:"Sin candidatos a la vista.",pie:'Barra más larga = más cerca. <span style="color:#5adc78">■</span> 4 facciones o menos (más hueco) · <span style="color:#ffd228">■</span> 5–6.'})}</div>`;
  h+=`<div>${hbarras(S.map(s=>({l:s.sys,s:s.sys,v:obras(s).length,c:"#c9a36a",sub:obras(s).slice(0,3).map(o=>esc(o.n)).join(", ")+(obras(s).length>3?"…":"")})).sort((a,b)=>b.v-a.v),"Obras por sistema",{vacio:"Ninguna obra vista.",pie:"El arquitecto y el avance se ven en Inara (enlace en la ficha)."})}</div>`;
  // ---------- TICK ----------
  h+="§tick§";
  if(uno){const k=uno.tk||{};h+=`<div><h3>Tick de ${esc(uno.sys)}</h3><div class="atkg"><div><span>Último visto</span><b style="font-size:18px">${uno.tick_ult?hora(uno.tick_ult):"—"}</b><span>${uno.tick_marg!=null?"± "+uno.tick_marg+" min":""}</span></div>
    <div><span>Próximo previsto</span><b class="pk" style="font-size:18px">${proxTick(uno)?"~"+hora(proxTick(uno)):"—"}</b><span>${uno.tick_disp!=null?"± "+uno.tick_disp+" min":"aprendiendo"}</span></div></div>
    <div class="sub">${uno.tick_n||0} ticks bien acotados · ${(k.vent||[]).length} ventanas usadas para el cálculo</div></div>`}
  else{const P=T.filter(s=>proxTick(s));const hs=[...Array(24).keys()].map(hh=>{const n=P.filter(s=>new Date(proxTick(s)*1000).getHours()==hh).length;return{l:hh+"h",v:n,tip:`${hh}:00–${hh+1}:00: ${n} sistemas`}});
    h+=`<div>${barras(hs,"Hora prevista del tick (hora de tu móvil)",{etiquetas:8,color:"#ff6ec8",vacio:"Aún aprendiendo la hora del tick.",pie:`${P.length} de ${T.length} sistemas con previsión.`+(D.tick_global?` Último tick de la galaxia: <b style="color:var(--b)">${new Date(D.tick_global*1000).toLocaleString("es-ES",{weekday:"short",hour:"2-digit",minute:"2-digit"})}</b>.`:"")})}</div>`;
    const TD=[[0,15,"±15 min","#5adc78"],[15,60,"±1 h","#ffd228"],[60,180,"±3 h","#ff8c00"],[180,1e9,"más","#ff4632"]];
    h+=`<div>${barras([...TD.map(([a,b,l,c])=>{const n=T.filter(s=>s.tick_disp!=null&&s.tick_disp>=a&&s.tick_disp<b).length;return{l,c,v:n,tip:`${l}: ${n} sistemas`}}),{l:"sin datos",c:"#3a2a12",v:T.filter(s=>s.tick_disp==null).length,tip:"sin previsión todavía"}],"Lo seguro que es el cálculo del tick",{todas:1,alto:130,pie:"Cuantos más ticks ve el escucha en un sistema, más se estrecha el margen."})}</div>`}
  // ---------- montar la pestaña elegida ----------
  const GR=[["inf","Influencia"],["act","Actividad"],["con","Conflictos"],["est","Estados y población"],["alr","Alrededor y Powerplay"],["tick","Tick"]],B={};
  h.split("§").forEach((x,i,a)=>{if(i%2==1)B[x]=(B[x]||"")+(a[i+1]||"")});const cab=h.split("§")[0];
  if(!GR.some(([k])=>k==GT))GT="inf";
  h=cab+`<div class="vper gtab">${GR.map(([k,n])=>`<button data-g="${k}" class="${k==GT?"on":""}">${n}</button>`).join("")}</div><div class="grs">${B[GT]||'<p class="sub">Nada que enseñar aquí.</p>'}</div>`+
    `<p class="sub">Toca o pasa el ratón por una barra o una casilla para ver su valor. Toca una fila con un sistema para abrir su ficha.</p><div id="gtip" hidden></div>`;
  document.getElementById("vGra").innerHTML=h;
}
{const v=document.getElementById("vGra");
 v.addEventListener("change",e=>{if(e.target.id=="gSel"){GS=e.target.value;pintaGra()}});
 v.addEventListener("click",e=>{const gb=e.target.closest(".gtab button");if(gb){GT=gb.dataset.g;try{localStorage.setItem("cdsn_gtab",GT)}catch(x){}pintaGra();return}if(e.target.id=="gFicha"){e.preventDefault();abreFicha(GS);return}const r=e.target.closest(".hbr[data-s]");if(r&&(D.sistemas||{})[r.dataset.s])abreFicha(r.dataset.s)});
 const tip=e=>{const t=document.getElementById("gtip"),g=e.target.closest("[data-tip]");if(!t)return;if(!g){t.hidden=true;return}
   t.textContent=g.dataset.tip;t.hidden=false;const r=v.getBoundingClientRect();
   t.style.left=Math.min(e.clientX-r.left+12,r.width-t.offsetWidth-4)+"px";t.style.top=(e.clientY-r.top-34)+"px"};
 v.addEventListener("pointermove",tip);v.addEventListener("pointerdown",tip);v.addEventListener("pointerleave",()=>{const t=document.getElementById("gtip");if(t)t.hidden=true})}

// ---------- pestaña Crónica: La Crónica de Sion (los avisos del escucha v11.6 como periódico) ----------
// D.noticias = [[hora, texto, seccion, urgente, sistema], ...] (las 300 ultimas, la mas nueva al final)
const SECS=[["","Todas"],["cronica","📌 Almirante"],["conflictos","⚔ Conflictos"],["expansion","🛸 Expansión"],["vecindario","🔭 Vecindario"],["obras","🏗 Obras"],["estaciones","🏢 Estaciones"],["poblacion","👥 Población"],["actividad","📈 Actividad"],["thargoides","👾 Thargoides"],["resumen","📊 Resúmenes"]];
let CS="";   // seccion elegida
const negritas=t=>esc(t).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
const sinMarcas=t=>String(t).replace(/\*\*/g,"").replace(/^[^\p{L}\p{N}]+/u,"").trim();   // sin negritas ni el icono del principio
const icono=t=>(String(t).match(/^[^\p{L}\p{N}*]+/u)||[""])[0].trim();
function fechaJuego(t){const d=new Date(t*1000);return d.toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long"})+" de "+(d.getFullYear()+1286)}
function diaTit(t){const d=new Date(t*1000),h=new Date(),a=new Date(Date.now()-86400000),k=x=>x.toDateString();
  return k(d)==k(h)?"Hoy":k(d)==k(a)?"Ayer":d.toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long"})}
function pintaCro(){
  if(!D)return;const v=document.getElementById("vCro");
  const N=(D.noticias||[]).filter(n=>n[2]!="escucha").map(n=>n[2]=="expansion"&&String(n[1]).startsWith("🛸")?[n[0],n[1],"vecindario",0,n[4],n[5]]:n).reverse();   // la mas nueva primero; v1.20: 🛸 de otras facciones = vecindario
  const ed=D.t?hora(D.t):hora(now());
  let h=`<div class="cro"><div class="cab"><div class="cab1">LA CRÓNICA DE SION</div><div class="cab2">Diario del BGS de Caballeros de Sion</div>
    <div class="cab3"><span>${esc((x=>x.charAt(0).toUpperCase()+x.slice(1))(fechaJuego(D.t||now())))}</span><span>Edición de las ${ed}</span><span>${N.length} noticias</span></div></div>`;
  for(const[t,x]of FIJA)h+=`<div class="fija"><div class="porK">📌 NOTICIA FIJA</div><div class="porT">${negritas(t)}</div>${x?`<div class="porE">${negritas(x).replace(/\n/g,"<br>")}</div>`:""}</div>`;
  if(!D.noticias){v.innerHTML=h+`<p class="sub" style="text-align:center;margin:20px">La Crónica empezará a publicarse en cuanto la Orange Pi tenga el escucha v11.6: desde entonces, cada aviso de Discord saldrá aquí.</p>`+hemeroteca()+`</div>`;return}
  // portada: la urgente mas reciente de las ultimas 24 h; si no hay, la ultima que no sea un resumen
  const P=N.find(n=>n[3]&&n[2]!="vecindario"&&now()-n[0]<86400)||N.find(n=>n[2]!="resumen"&&n[2]!="vecindario");
  if(P&&!CS){const tx=sinMarcas(P[1]);let[tit,...resto]=tx.split(" · ");
    const k=tit.indexOf(" desde ");if(k>0){resto.unshift(tit.slice(k+1));tit=tit.slice(0,k)}   // titular corto: "X prepara una expansión" / "desde ..."
    resto=resto.map(x=>x.charAt(0).toUpperCase()+x.slice(1));
    const di=datosImg(P,320),ac=accion(P);
    h+=`<div class="por${P[3]?" urg":""}"${P[4]?` data-s="${esc(P[4])}"`:""}><div class="porK">${P[3]?"ÚLTIMA HORA":"PORTADA"}</div>
      <div class="porG">${ilus(tipoNot(P),120)}<div><div class="porT">${icono(P[1])} ${esc(tit)}</div>${resto.length?`<div class="porE">${esc(resto.join(" · "))}</div>`:""}</div></div>
      ${di?`<div class="porD">${di}</div>`:""}${ac?`<div class="acc">${ac}</div>`:""}
      <div class="porF">${diaTit(P[0])}, ${hora(P[0])}${P[4]?" · "+esc(P[4]):""}</div></div>`}
  h+=`<div class="vper csec">${SECS.map(([k,n])=>`<button data-c="${k}" class="${k==CS?"on":""}">${n}</button>`).join("")}</div>`;
  const L=N.filter(n=>CS?n[2]==CS:n[2]!="vecindario");   // v1.20: «Todas» = lo nuestro; lo de otras facciones en Vecindario
  if(!L.length)h+=`<p class="sub" style="text-align:center;margin:16px">Sin noticias en esta sección.</p>`;
  else{h+=`<div class="crol">`;let dia="";
    for(const n of L){const d=diaTit(n[0]);if(d!=dia){dia=d;h+=`<div class="crod">${esc(d.charAt(0).toUpperCase()+d.slice(1))}</div>`}
      const k_=tipoNot(n),gr=["guerra","elecciones","retirada","llega","vecindario"].includes(k_),di=gr?datosImg(n,260):"",ac=gr||k_=="resumen"?accion(n):"";
      h+=`<div class="cron${n[3]?" urg":""}"${n[4]?` data-s="${esc(n[4])}"`:""}><span class="croh">${hora(n[0])}${ilus(k_,40)}</span><span>${negritas(n[1])}${di?`<div class="crdat">${di}</div>`:""}${ac?`<div class="acc">${ac}</div>`:""}${n[5]?`<details><summary class="sub">ver resumen</summary><div class="porE">${negritas(n[5]).replace(/\n/g,"<br>")}</div></details>`:""}</span></div>`}
    h+=`</div>`}
  h+=hemeroteca();
  v.innerHTML=h+`<div class="sub" style="text-align:center;margin:14px 0 4px">Las ${(D.noticias||[]).length} últimas noticias del escucha de EDDN · toca una para abrir la ficha del sistema</div></div>`;
}
document.getElementById("vCro").onclick=e=>{const b=e.target.closest(".csec button");if(b){CS=b.dataset.c;pintaCro();return}
  const n=e.target.closest("[data-s]");if(n&&(D.sistemas||{})[n.dataset.s])abreFicha(n.dataset.s)};

// ---------- v1.21: La Cronica con imagenes: dibujo por tipo, imagen con datos y que hacer ----------
function tipoNot(n){const x=String(n[1]),i=icono(x),s=n[2];
  if(s=="cronica")return"almirante";if(s=="resumen")return"resumen";if(s=="vecindario")return"vecindario";if(s=="thargoides")return"thargoides";
  if(i.startsWith("🛬"))return"llega";if(i.startsWith("🏁"))return"fin";if(i.startsWith("✉"))return"elecciones";
  if(i.startsWith("🚨")&&/Retirada/.test(x)||/ya no está/.test(x)||/Riesgo de retirada/.test(x))return"retirada";
  if(s=="conflictos"&&!i.startsWith("📉")&&!i.startsWith("⬆")&&!i.startsWith("🔻")&&!i.startsWith("🕵"))return/Elecciones/.test(x)?"elecciones":"guerra";
  if(i.startsWith("🆕")||(i.startsWith("📣")&&/Expansión/.test(x)))return"nuestra";
  if(i.startsWith("🏃"))return"huida";
  return{obras:"obra",estaciones:"estacion",poblacion:"poblacion",actividad:"actividad",conflictos:"rival",expansion:"nuestra"}[s]||"otra"}
const IL={   // dibujos de 100x70
 fin:`<path d="M30 10 L30 62" stroke="#f2e6d6" stroke-width="2.5"/><path d="M32 10 h36 v22 h-36Z" fill="#f2e6d6"/><path d="M32 10 h9 v5.5 h-9Z M50 10 h9 v5.5 h-9Z M41 15.5 h9 v5.5 h-9Z M59 15.5 h9 v5.5 h-9Z M32 21 h9 v5.5 h-9Z M50 21 h9 v5.5 h-9Z M41 26.5 h9 v5.5 h-9Z M59 26.5 h9 v5.5 h-9Z" fill="#1a1208"/>`,
 guerra:`<path d="M14 35 L40 20 L40 50Z" fill="#5aaaff"/><path d="M86 35 L60 20 L60 50Z" fill="#ff4632"/><line x1="42" y1="30" x2="58" y2="26" stroke="#ffd228" stroke-width="2.5"/><line x1="42" y1="40" x2="58" y2="44" stroke="#ffd228" stroke-width="2.5"/><circle cx="50" cy="35" r="4" fill="#ffd228"/>`,
 elecciones:`<rect x="30" y="34" width="40" height="28" rx="3" fill="#7f77dd"/><rect x="40" y="30" width="20" height="5" rx="1" fill="#3c3489"/><rect x="43" y="10" width="14" height="22" rx="1" fill="#f2e6d6"/><line x1="46" y1="16" x2="54" y2="16" stroke="#7f77dd"/><line x1="46" y1="21" x2="52" y2="21" stroke="#7f77dd"/><circle cx="50" cy="48" r="6" fill="none" stroke="#f2e6d6" stroke-width="1.5"/>`,
 llega:`<ellipse cx="80" cy="35" rx="11" ry="22" fill="none" stroke="#5adc78" stroke-width="2.5"/><path d="M14 24 L34 29 L14 34Z" fill="#ff8c00"/><path d="M24 38 L44 43 L24 48Z" fill="#ff8c00"/><path d="M42 28 L64 34 L42 40Z" fill="#ffb366"/>`,
 vecindario:`<circle cx="30" cy="35" r="20" fill="none" stroke="#3a2a12" stroke-dasharray="3 3"/><circle cx="30" cy="35" r="6" fill="#ff8c00"/><line x1="36" y1="33" x2="70" y2="18" stroke="#ff8c00" stroke-width="1.5"/><line x1="36" y1="37" x2="72" y2="50" stroke="#ff8c00" stroke-width="1.5"/><circle cx="76" cy="16" r="5" fill="#5adc78"/><circle cx="78" cy="52" r="5" fill="#5adc78"/>`,
 nuestra:`<line x1="34" y1="12" x2="34" y2="62" stroke="#f2e6d6" stroke-width="2.5"/><path d="M36 12 L72 20 L36 30Z" fill="#ff8c00"/><circle cx="34" cy="62" r="4" fill="#5adc78"/><path d="M50 52 l6 -6 l6 6" fill="none" stroke="#5adc78" stroke-width="2.5"/>`,
 huida:`<path d="M64 26 L84 31 L64 36Z" fill="#b06a10"/><path d="M54 40 L74 45 L54 50Z" fill="#b06a10"/><line x1="16" y1="31" x2="56" y2="31" stroke="#3a2a12" stroke-dasharray="4 3"/><line x1="16" y1="45" x2="46" y2="45" stroke="#3a2a12" stroke-dasharray="4 3"/>`,
 obra:`<circle cx="56" cy="38" r="20" fill="none" stroke="#888780" stroke-width="4" stroke-dasharray="20 9"/><rect x="51" y="33" width="10" height="10" fill="#b4b2a9"/><line x1="20" y1="10" x2="20" y2="62" stroke="#ffd228" stroke-width="2.5"/><line x1="20" y1="12" x2="44" y2="12" stroke="#ffd228" stroke-width="2.5"/><line x1="42" y1="12" x2="42" y2="22" stroke="#888780"/>`,
 estacion:`<circle cx="50" cy="35" r="22" fill="none" stroke="#5aaaff" stroke-width="3"/><circle cx="50" cy="35" r="9" fill="#5aaaff"/><line x1="28" y1="35" x2="72" y2="35" stroke="#5aaaff" stroke-width="2"/><line x1="50" y1="13" x2="50" y2="57" stroke="#5aaaff" stroke-width="2"/>`,
 retirada:`<path d="M50 8 L72 17 L70 40 Q66 56 50 63 Q34 56 30 40 L28 17Z" fill="#2a0b07" stroke="#ff4632" stroke-width="2.5"/><path d="M51 12 L45 28 L54 34 L44 48 L50 61" fill="none" stroke="#ff4632" stroke-width="2"/>`,
 poblacion:`<circle cx="36" cy="26" r="7" fill="#ff6ec8"/><path d="M24 54 Q36 34 48 54Z" fill="#ff6ec8"/><circle cx="62" cy="24" r="8" fill="#ffb3e0"/><path d="M48 56 Q62 32 76 56Z" fill="#ffb3e0"/>`,
 actividad:`<polyline points="10,45 28,45 36,22 46,58 56,30 64,45 90,45" fill="none" stroke="#5adc78" stroke-width="3"/>`,
 rival:`<polyline points="14,54 34,44 52,48 70,26 86,18" fill="none" stroke="#ff4632" stroke-width="3"/><path d="M80 14 L90 16 L86 25Z" fill="#ff4632"/>`,
 resumen:`<line x1="18" y1="60" x2="84" y2="60" stroke="#3a2a12"/><rect x="24" y="38" width="10" height="22" fill="#5adc78"/><rect x="40" y="26" width="10" height="34" fill="#2fae55"/><rect x="56" y="32" width="10" height="28" fill="#5adc78"/><rect x="72" y="14" width="10" height="46" fill="#1d8a42"/>`,
 almirante:`<path d="M50 10 L56 26 L73 26 L59 36 L64 53 L50 43 L36 53 L41 36 L27 26 L44 26Z" fill="#ffd228"/><rect x="30" y="56" width="40" height="6" rx="2" fill="#b06a10"/>`,
 thargoides:`<path d="M50 14 L60 30 L80 30 L64 42 L70 60 L50 48 L30 60 L36 42 L20 30 L40 30Z" fill="none" stroke="#5adc78" stroke-width="2.5"/><circle cx="50" cy="38" r="6" fill="#5adc78"/>`,
 otra:`<circle cx="50" cy="35" r="16" fill="none" stroke="#b06a10" stroke-width="2.5"/><circle cx="50" cy="35" r="4" fill="#ff8c00"/>`};
const ilus=(k,w)=>`<svg class="ilu" viewBox="0 0 100 70" width="${w}" height="${Math.round(w*.7)}" aria-hidden="true">${IL[k]||IL.otra}</svg>`;
function conDe(n){const s=(D.sistemas||{})[n[4]];if(!s)return null;const m=String(n[1]).match(/contra \*\*(.+?)\*\*/);
  return(s.conflictos||[]).find(c=>!m||c.contra==m[1])||null}
function barraGuerra(c,w){   // los 7 dias: G verde, P rojo, = gris, hoy amarillo, por jugar punteado
  if(!c)return"";const r=c.res||[],ini=(c.res_desde||1)-1,dia=c.dia||0,W=w||300,k=W/7;let h=`<svg class="dat" viewBox="0 0 ${W} 30" width="${W}" height="30" role="img" aria-label="Marcador ${c.ganados||0}-${c.perdidos||0}">`;
  for(let i=0;i<7;i++){const x=i*k+1,res=i<ini?"?":r[i-ini],hoy=i==dia-1&&c.estado!="pending";
    const col=hoy?"#ffd228":res=="G"?"#5adc78":res=="P"?"#ff4632":res=="="?"#6a5a40":res=="?"?"#3a2a12":"";
    h+=col?`<rect x="${x}" y="3" width="${k-3}" height="20" rx="3" fill="${col}"/>`:`<rect x="${x}" y="3" width="${k-3}" height="20" rx="3" fill="none" stroke="#3a2a12" stroke-dasharray="3 2"/>`;
    h+=`<text x="${x+(k-3)/2}" y="17" text-anchor="middle" font-size="10" fill="${col&&col!="#3a2a12"?"#000":"#b06a10"}" font-family="system-ui">${hoy?"HOY":res=="G"?"✓":res=="P"?"✗":res=="="?"=":"D"+(i+1)}</text>`}
  return h+`</svg><div class="sub">Van ${c.ganados||0}-${c.perdidos||0} · gana quien llegue antes a 4 días</div>`}
function lineaInf(s,w,hh){   // influencia de los ultimos 7 dias, con la raya del 5 %
  const p=(s&&s.hinf||[]).filter(x=>x[0]>now()-7*86400);if(s&&s.inf!=null&&(!p.length||(s.t||0)>p[p.length-1][0]+600))p.push([s.t||now(),s.inf]);if(p.length<2||p[p.length-1][0]-p[0][0]<3600)return"";
  const W=w||300,H=hh||46,t0=p[0][0],t1=p[p.length-1][0]||t0+1,vs=p.map(x=>x[1]),mn=Math.min(4,...vs),mx=Math.max(...vs)+.5;
  const X=t=>4+(W-8)*(t-t0)/Math.max(1,t1-t0),Y=v=>H-4-(H-8)*(v-mn)/Math.max(.1,mx-mn),ul=p[p.length-1][1],baja=ul<p[0][1];
  return`<svg class="dat" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Influencia 7 días">`+(mn<5?`<line x1="0" x2="${W}" y1="${Y(5)}" y2="${Y(5)}" stroke="#ff4632" stroke-dasharray="4 3"/>`:"")
    +`<polyline points="${p.map(x=>X(x[0]).toFixed(1)+","+Y(x[1]).toFixed(1)).join(" ")}" fill="none" stroke="${baja?"#ff4632":"#5adc78"}" stroke-width="2"/>`
    +`<circle cx="${X(t1)}" cy="${Y(ul)}" r="3.5" fill="${baja?"#ff4632":"#5adc78"}"/></svg><div class="sub">Influencia de CDSN, 7 días: ${p[0][1].toFixed(1).replace(".",",")} → ${ul.toFixed(1).replace(".",",")} %</div>`}
function mapaVec(n,w){   // origen de la otra faccion y nuestros sistemas a su alcance
  const m=String(n[1]).match(/^\S*\s*\*\*(.+?)\*\*/),a=m&&(D.vec_av||{})[m[1]];if(!a)return"";
  const ob=Object.entries(a.obj||{}).sort((x,y)=>x[1]-y[1]).slice(0,4),W=w||300,H=26+ob.length*22;if(!ob.length)return"";
  let h=`<svg class="dat" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Alcance de la expansión"><circle cx="34" cy="${H/2}" r="8" fill="#ff8c00"/><text x="34" y="${H/2+20}" font-size="9" text-anchor="middle" fill="#b06a10" font-family="system-ui">${esc((a.orig||[""])[0]).slice(0,14)}</text>`;
  ob.forEach(([s,d],i)=>{const y=16+i*22;h+=`<line x1="44" y1="${H/2}" x2="${W*.45-8}" y2="${y}" stroke="#ff8c00" stroke-width="1.2"/><circle cx="${W*.45}" cy="${y}" r="6" fill="#5adc78"/><text x="${W*.45+12}" y="${y+4}" font-size="11" fill="#f2e6d6" font-family="system-ui">${esc(s)} · ${Math.round(d)} al</text>`});
  return h+`</svg>`}
function datosImg(n,w){const k=tipoNot(n),s=(D.sistemas||{})[n[4]];
  if(k=="guerra"||k=="elecciones")return barraGuerra(conDe(n),w);
  if(k=="vecindario")return mapaVec(n,w);
  if(["retirada","llega","rival","nuestra","poblacion","huida"].includes(k))return lineaInf(s,w);
  return""}
function accion(n){const k=tipoNot(n),s=n[4]?`<b>${esc(n[4])}</b>`:"el sistema",c=conDe(n);
  return{guerra:`⚔ Hoy cuenta: bonos de combate en las zonas de conflicto de ${s}${c&&c.mio?" · nos jugamos "+esc(c.mio):""}`,
    elecciones:`✉ Hoy cuenta: misiones, comercio y datos para CDSN en ${s} (sin combate)`,
    retirada:`🚨 Necesita ayuda: misiones de CDSN, comercio con beneficio y datos de exploración en ${s}`,
    llega:`🛡 Defiende ${s}: misiones de CDSN para no perder terreno frente al recién llegado`,
    rival:`🛡 Frena al rival en ${s}: misiones de CDSN con recompensa de influencia`,
    nuestra:`🛸 Un empujón en ${s}: misiones de influencia para CDSN`,
    vecindario:`🔭 Atentos: si llega a un sistema nuestro, toca reforzarlo`,
    resumen:`📊 Mira en la pestaña Consejos dónde hace más falta hoy`}[k]||""}

// ---------- noticia fija: franja arriba y hemeroteca (escucha v11.7: D.fija y D.hemeroteca) ----------
function revisaFija(){const b=document.getElementById("fijaBar");if(!b)return;
  if(!FIJA.length){b.hidden=true;return}
  b.innerHTML=`📌 <b>${esc(FIJA[0][0])}</b>${FIJA.length>1?` y ${FIJA.length-1} más`:""} · toca para leer`;b.hidden=false}
document.getElementById("fijaBar").onclick=()=>{vista("cro");scrollTo({top:document.getElementById("vCro").offsetTop-10,behavior:"smooth"})};
function hemeroteca(){
  const f=t=>new Date(t*1000).toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit",year:"2-digit"}),H=D.hemeroteca||[];
  let h=`<div class="heme"><div class="hemeT">HEMEROTECA · Comunicados del Almirante</div>`;
  const desde=(D.fija||{}).desde;
  for(const[t]of FIJA)h+=`<div class="hemeI"><span class="hemeF">📌 AHORA${desde?"<br>desde "+f(desde):""}</span><span><b>${negritas(t)}</b></span></div>`;
  for(const x of H)h+=`<div class="hemeI"><span class="hemeF">${f(x.desde)}<br>– ${f(x.hasta)}</span><details><summary><b>${negritas(x.tit)}</b> <span class="sub">▸ leer</span></summary><div class="porE" style="margin-top:4px">${negritas(x.txt||"").replace(/\n/g,"<br>")||"<i>(sin texto)</i>"}</div></details></div>`;
  if(!FIJA.length&&!H.length)h+=`<p class="sub">Aún no hay comunicados guardados${D.hemeroteca?"":" (la hemeroteca la guarda el escucha v11.7)"}.</p>`;
  return h+`</div>`}

// ---------- pestaña Consejos: como ayudar a CDSN (guias de NEWP y pruebas de jugadores) ----------
const CONS_TXT=`<h3>Subir la influencia de CDSN</h3><ul>
<li>Haz misiones de <b>Caballeros de Sion</b> y elige siempre la recompensa de <b>influencia</b> (+INF). Mira quién da cada misión: el tablón tiene las de todas las facciones.</li>
<li><b>Mezcla</b> actividades: misiones, comercio con beneficio, datos de exploración y recompensas de CDSN. Repetir siempre lo mismo rinde cada vez menos.</li>
<li>Vende con <b>beneficio</b> en estaciones de CDSN (también lo minado) y entrega allí los datos en Cartografía Universal.</li>
<li>Entrega <b>antes del tick</b>: cuenta para el día en que se entrega.</li>
<li>Los sistemas <b>pequeños</b> (poca población) se mueven más rápido: ahí cunde más el trabajo.</li>
<li>Donar dinero o mercancía no paga, pero sube mucho la reputación y abre mejores misiones.</li>
<li>Misiones de <b>masacre</b> (matar piratas) y de <b>asesinato</b> (señores piratas) de CDSN, en paz o en guerra: con +INF suben muchísimo. Además, las recompensas de esos piratas que haya emitido <b>CDSN</b> también le dan influencia al cobrarlas en el sistema.</li></ul>
<h3>🧳 Transporte de pasajeros</h3><ul>
<li>En la <b>Sala de pasajeros</b> cada contrato es de una facción: acepta solo los de <b>Caballeros de Sion</b> y elige la recompensa con más <b>+INF</b>.</li>
<li>Los grupos (turistas, trabajadores, refugiados) son rápidos y seguros, y dan buena influencia.</li>
<li>Cuidado con los pasajeros <b>buscados</b>: si te escanean al entrar en una estación de CDSN es un delito en su sistema y falla la misión. Usa navegación silenciosa o disipadores de calor, o no los cojas.</li>
<li>Los VIP cancelan si les escanean, si la nave recibe daño o si tardas: una misión fallida <b>baja</b> a CDSN.</li>
<li>Rinden más en <b>elecciones</b> (actividad pacífica que suma días) y en sistemas en <b>Auge</b>; en Hambruna, Brote o Guerra salen evacuaciones que también suman si las da CDSN.</li></ul>
<h3>Lo que hace bajar a CDSN</h3><ul>
<li>Fallar o abandonar misiones de CDSN.</li>
<li>Vender con <b>pérdidas</b> o en el <b>mercado negro</b> de sus estaciones.</li>
<li>Cometer delitos en sus sistemas.</li>
<li>Cobrar en sus sistemas recompensas emitidas por <b>otras facciones</b> (escáner de órdenes de muerte): la influencia va a la facción que <b>emitió</b> la recompensa, no a CDSN ni al dueño de la estación.</li>
<li>Matar <b>naves de seguridad</b> (Autoridad del Sistema) en sistemas de CDSN: es de lo que más hunde a la facción que controla y puede traer <b>Disturbios</b> o <b>Confinamiento</b>.</li></ul>
<h3>⚔ Guerras</h3><ul>
<li>Duran de 4 a 7 días. Gana el primero que gana <b>4 días</b>, o el que ya no puede ser alcanzado. El marcador sale en la tabla y en Hoy.</li>
<li>Cada día va de tick a tick y lo gana el bando con más actividad de guerra: <b>zonas de conflicto ganadas</b>, bonos de combate y misiones de combate.</li>
<li>Lo que más pesa es <b>ganar zonas de conflicto</b>; los bonos sirven sobre todo para desempatar.</li>
<li>Truco: la <b>zona ganada</b> suma al marcador el día en que la ganas (al acabar la batalla) y los <b>bonos</b> el día en que los cobras. Gana la zona <b>antes del tick</b> y cobra los bonos <b>después</b>: cuenta para dos días.</li>
<li>Zonas: baja (solo ganar), media (Fuerzas Especiales o corresponsales), alta (2–3 objetivos, capitanes y naves capitales si hay superpotencia).</li>
<li>Durante la guerra la influencia está <b>congelada</b>. Al acabar, la diferencia queda en 8, 4 o 0 puntos según los días ganados, y el que pierde se queda sin el activo en disputa.</li></ul>
<h3>✉ Elecciones</h3><ul>
<li>Se ganan <b>sin violencia</b>: misiones, comercio con beneficio y datos de exploración en estaciones de CDSN.</li>
<li>Mismo marcador que la guerra: gana quien llegue a 4 días.</li></ul>
<h3>Umbrales del BGS</h3><div class="tw" style="padding:0"><table><tr><th>Influencia</th><th>Qué pasa</th></tr>
<tr><td class=num>75 % o más</td><td>Expansión a un sistema cercano (aviso CERCA DE EXPANSIÓN desde el 70 %)</td></tr>
<tr><td class=num>Igual que otra, &gt; 7 %</td><td>Guerra o elecciones; la influencia queda congelada</td></tr>
<tr><td class=num>5 % o menos</td><td>Aviso RIESGO RETIRADA</td></tr>
<tr><td class=num>Menos del 2,5 %</td><td>Retirada: 1 día pendiente y unos 5–6 activos. Si en el último tick CDSN sigue por debajo del 2,5 %, sale del sistema; si ha subido, se salva</td></tr>
<tr><td class=num>1 %</td><td>Mínimo; nunca baja de ahí</td></tr></table></div>
<h3>Según el estado del sistema</h3><ul>
<li><b>Auge</b>: las misiones de comercio ayudan más.</li>
<li><b>Fallo de infraestructura</b>: sube la demanda de comida y maquinaria; buen momento para llevarlas.</li>
<li>Expansión, retirada y brotes bajan la riqueza del sistema.</li></ul>
<h3>Otros consejos</h3><ul>
<li><b>Comercio</b>: mercados actualizados hace menos de 6 horas y no vender más de lo que piden. Rutas en Spansh o Inara.</li>
<li><b>Exploración</b>: los mundos tipo Tierra y acuáticos terraformables pagan más (hasta 3,2 M con DSS y primer descubrimiento).</li>
<li><b>Colonización</b>: si se coloniza expandiendo desde un sistema de CDSN, la primera estación es de CDSN. Reclamar cuesta 25 M y solo a menos de 15 al.</li>
<li><b>En Abierto</b>: ante un ganker, sométete a la interdicción, 4 pips a escudos y 2 a motores, y salto de alta estela. Nunca te desconectes en combate.</li></ul>
<div class="fnt">El BGS no tiene manuales oficiales: esto sale de las guías de <a href="https://newp.io/faction" target="_blank" rel="noopener">NEWP</a> y de pruebas de jugadores en el foro de Frontier e Inara.</div>`;
// ---------- v1.22: pestaña Arquitectos (arquitectos.txt de cdsn-datos, a mano) ----------
let ARQ_Q="";
function pintaArq(){const v=document.getElementById("vArq");if(!v||!D)return;
  const S=Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null).sort((a,b)=>a.sys.localeCompare(b.sys,"es"));
  const con=S.filter(s=>arqDe(s.sys)),q=ARQ_Q.toLowerCase();
  const F=S.filter(s=>!q||s.sys.toLowerCase().includes(q)||arqDe(s.sys).toLowerCase().includes(q));
  const fila=s=>{const a=arqDe(s.sys);return`<tr><td>${esc(s.sys)}${CP(s.sys)}</td><td>${arqTxt(s.sys)}</td><td class="sub"><a target="_blank" rel="noopener" style="color:#ff8c00" href="https://inara.cz/elite/starsystem/?search=${encodeURIComponent(s.sys)}">Inara ↗</a></td></tr>`};
  v.innerHTML=`<div class="cons"><h3>🏗 Arquitectos de los sistemas de CDSN</h3>
<p>El <b>arquitecto</b> es el comandante que colonizó el sistema. <b>No se puede sacar de forma automática</b>: no llega por EDDN, Spansh no lo tiene e Inara no deja leerlo con programas. Por eso lo apunta <b>el almirante a mano</b>, con los datos que le facilitan los comandantes.</p>
<p>Todos los sistemas salen como <b>heredados</b> hasta que alguien nos dé el dato. Muchos lo seguirán siendo siempre, porque ya eran de CDSN antes de la colonización. Cuando un comandante nos facilita el arquitecto de un sistema, ese sistema pasa de <i>heredado</i> al <b>nombre del CMDR</b>. Una vez puesto no cambia nunca.</p>
<p><b>Heredado ✓ comprobado</b>: ya se ha mirado y el sistema es heredado de origen (nunca tendrá arquitecto). <b>Heredado (sin comprobar)</b>: aún no se sabe; puede tener arquitecto.</p>
<p class="sub">¿Sabes quién es el arquitecto de un sistema? Lo ves en el mapa de la galaxia (vista de colonización) o en Inara. Pásaselo al almirante.</p>
<p><b>${con.length}</b> con arquitecto · <b>${S.filter(s=>arqOk(s.sys)).length}</b> heredados comprobados · <b>${S.length-con.length-S.filter(s=>arqOk(s.sys)).length}</b> sin comprobar · ${S.length} sistemas</p>
<div class="ctl" style="padding:0 0 8px"><input type="search" id="arqQ" placeholder="Buscar sistema o CMDR..." value="${esc(ARQ_Q)}"></div>
<div class="tw" style="padding:0"><table><tr><th>Sistema</th><th>Arquitecto</th><th></th></tr>${F.map(fila).join("")||'<tr><td colspan=3 class="sub">Nada con ese nombre.</td></tr>'}</table></div>
<p class="sub" style="margin-top:10px">La lista de sistemas se actualiza sola, y el escucha añade al final del archivo los sistemas nuevos como heredados, con la fecha. Los arquitectos están en <a target="_blank" rel="noopener" style="color:#ff8c00" href="${ARQ_EDIT}">arquitectos.txt</a> (cdsn-datos), una línea por sistema: <code>Sistema = CMDR</code>, <code>Sistema = heredado</code> o <code>Sistema = heredado *</code> (comprobado).</p></div>`;
  const i=document.getElementById("arqQ");i.oninput=()=>{ARQ_Q=i.value;const p=i.selectionStart;pintaArq();const j=document.getElementById("arqQ");j.focus();j.setSelectionRange(p,p)}}
function pintaCon(){const v=document.getElementById("vCon");if(!v)return;const S=Object.values(D.sistemas||{}).filter(s=>!s.fuera&&s.inf!=null);
  const fila=(s,tag,k,txt,acc,parp)=>`<div class="hoy" data-s="${esc(s.sys)}"><b style="color:${s.ctrl?"#fff":"#ff8c00"}">${FAV.has(s.sys)?"⭐ ":""}${esc(s.sys)}</b>${CP(s.sys)} <span class="tag k-${k}${parp?" parp":""}">${esc(tag)}</span> <span class="sub">${txt}</span><div class="acc">${acc}</div></div>`;
  let ya="";
  for(const s of S)for(const c of s.conflictos||[]){if(c.estado!="active"&&c.estado!="pending")continue;const t=(c.tipo||"").toLowerCase(),el=t=="election";
    const acc=el?"Elecciones: misiones, comercio con beneficio y datos de exploración en estaciones de CDSN":"Guerra: gana zonas de conflicto a favor de CDSN (antes del tick) y entrega los bonos";
    if(c.estado=="pending"){ya+=fila(s,(el?"✉ ":"⚔ ")+(TIPO[t]||"Conflicto").toUpperCase()+" PEND.","pu",`contra ${esc(c.contra)} · empieza en el próximo tick`,acc);continue}
    const k=conflicto(c);ya+=fila(s,k.ico+" "+k.tit,k.tono,`contra ${esc(c.contra)} · ${k.diaTxt} · ${k.g}-${k.p}${k.juego?" · "+esc(k.juego):""}`,acc,k.parp)}
  const L=S.filter(s=>sinConf(s)&&(s.inf<5||(s.ctrl&&s.inf>=70))).sort((a,b)=>(a.inf<5?a.inf:200-a.inf)-(b.inf<5?b.inf:200-b.inf));
  const ot=L.map(s=>s.inf<5?fila(s,s.inf>0&&s.inf<2.5?"RETIRADA INMINENTE":"RIESGO RETIRADA","gr",`influencia ${c1(s.inf)} %`,SUBIR,s.inf>0&&s.inf<2.5)
    :fila(s,"CERCA DE EXPANSIÓN","fa",`${c1(s.inf)} %, la expansión salta al 75 %`,"Seguir subiendo influencia aquí para expandir CDSN")).join("");
  const nr=L.filter(s=>s.inf<5).length,ne=L.length-nr;
  v.innerHTML=`<div class="cons"><h3>Ahora mismo</h3>${ya||'<p class="sub">Ningún conflicto en marcha.</p>'}`+
   (L.length?`<details class="ley"><summary>Cerca de la retirada (${nr}) o de la expansión (${ne}) · toca para ver</summary>${ot}</details>`:"")+CONS_TXT+"</div>";
  v.onclick=e=>{const d=e.target.closest("[data-s]");if(d&&!e.target.closest(".cp"))abreFicha(d.dataset.s)}}
