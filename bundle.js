(()=>{"use strict";!function(){const e=document.querySelector("#app"),t=function(){const e=document.createElement("div"),t=document.createElement("h1");return t.textContent="chau",e.append(t),e}(),n=function(){const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center";const t=document.createElement("h1");t.textContent="Sorteo",e.append(t);const n=document.createElement("div");n.style.display="grid",n.style.gridTemplateColumns="repeat(10, 30px)",n.style.gap="5px",n.style.margin="20px 0";const l=document.createElement("div");l.style.border="1px solid blue",l.style.width="500px",l.style.height="500px",l.style.margin="auto",l.className="pago",l.style.display="none",l.style.position="absolute",l.style.background="white",l.style.borderRadius="5px";const o=document.createElement("button");o.style.position="absolute",o.style.top="10px",o.style.right="10px",o.textContent="X",o.onclick=()=>{l.animate([{transform:"scale(1)",opacity:1},{transform:"scale(0)",opacity:0}],{duration:300,fill:"forwards"}),setTimeout((()=>{l.style.display="none"}),300)},l.append(o);for(let e=1;e<=100;e++){const t=document.createElement("button");t.style.width="30px",t.style.height="30px",t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",t.textContent=e,t.onclick=()=>{window.scrollTo(0,0),l.style.display="none"===l.style.display?"block":"none",l.animate([{transform:"scale(0)",opacity:0},{transform:"scale(1)",opacity:1}],{duration:300,fill:"forwards"})},n.appendChild(t)}return e.append(n,l),e}();e.append(n,t)}()})();