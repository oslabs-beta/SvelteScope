var Ut=Object.defineProperty;var Yt=(e,t,n)=>t in e?Ut(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Le=(e,t,n)=>(Yt(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function V(){}function Xt(e,t){for(const n in t)e[n]=t[n];return e}function _t(e){return e()}function tt(){return Object.create(null)}function ge(e){e.forEach(_t)}function He(e){return typeof e=="function"}function ne(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Zt(e){return Object.keys(e).length===0}function Jt(e,...t){if(e==null){for(const i of t)i(void 0);return V}const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function he(e,t,n){e.$$.on_destroy.push(Jt(t,n))}function St(e,t,n,i){if(e){const s=gt(e,t,n,i);return e[0](s)}}function gt(e,t,n,i){return e[1]&&i?Xt(n.ctx.slice(),e[1](i(t))):n.ctx}function zt(e,t,n,i){if(e[2]&&i){const s=e[2](i(n));if(t.dirty===void 0)return s;if(typeof s=="object"){const r=[],m=Math.max(t.dirty.length,s.length);for(let f=0;f<m;f+=1)r[f]=t.dirty[f]|s[f];return r}return t.dirty|s}return t.dirty}function bt(e,t,n,i,s,r){if(s){const m=gt(t,n,i,r);e.p(m,s)}}function vt(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let i=0;i<n;i++)t[i]=-1;return t}return-1}function nt(e){return e??""}function ae(e,t,n){return e.set(n),t}function Se(e,t){e.appendChild(t)}function y(e,t,n){e.insertBefore(t,n||null)}function P(e){e.parentNode&&e.parentNode.removeChild(e)}function it(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function D(e){return document.createElement(e)}function We(e){return document.createTextNode(e)}function F(){return We(" ")}function qe(){return We("")}function se(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function A(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Qt(e){return Array.from(e.childNodes)}function $t(e,t){t=""+t,e.data!==t&&(e.data=t)}function ee(e,t,n){e.classList.toggle(t,!!n)}function en(e,t,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(e,{detail:t,bubbles:n,cancelable:i})}function st(e,t){return new e(t)}let ve;function be(e){ve=e}function ze(){if(!ve)throw new Error("Function called outside component initialization");return ve}function Pt(e){ze().$$.on_mount.push(e)}function tn(e){ze().$$.after_update.push(e)}function wt(e){ze().$$.on_destroy.push(e)}function nn(){const e=ze();return(t,n,{cancelable:i=!1}={})=>{const s=e.$$.callbacks[t];if(s){const r=en(t,n,{cancelable:i});return s.slice().forEach(m=>{m.call(e,r)}),!r.defaultPrevented}return!0}}function sn(e,t){return ze().$$.context.set(e,t),t}function ln(e){return ze().$$.context.get(e)}const pe=[],ke=[];let _e=[];const lt=[],yt=Promise.resolve();let Ie=!1;function xt(){Ie||(Ie=!0,yt.then(Ct))}function rn(){return xt(),yt}function Be(e){_e.push(e)}const De=new Set;let de=0;function Ct(){if(de!==0)return;const e=ve;do{try{for(;de<pe.length;){const t=pe[de];de++,be(t),on(t.$$)}}catch(t){throw pe.length=0,de=0,t}for(be(null),pe.length=0,de=0;ke.length;)ke.pop()();for(let t=0;t<_e.length;t+=1){const n=_e[t];De.has(n)||(De.add(n),n())}_e.length=0}while(pe.length);for(;lt.length;)lt.pop()();Ie=!1,De.clear(),be(e)}function on(e){if(e.fragment!==null){e.update(),ge(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Be)}}function fn(e){const t=[],n=[];_e.forEach(i=>e.indexOf(i)===-1?t.push(i):n.push(i)),n.forEach(i=>i()),_e=t}const Ee=new Set;let le;function Ve(){le={r:0,c:[],p:le}}function je(){le.r||ge(le.c),le=le.p}function I(e,t){e&&e.i&&(Ee.delete(e),e.i(t))}function T(e,t,n,i){if(e&&e.o){if(Ee.has(e))return;Ee.add(e),le.c.push(()=>{Ee.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function xe(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function te(e){e&&e.c()}function J(e,t,n){const{fragment:i,after_update:s}=e.$$;i&&i.m(t,n),Be(()=>{const r=e.$$.on_mount.map(_t).filter(He);e.$$.on_destroy?e.$$.on_destroy.push(...r):ge(r),e.$$.on_mount=[]}),s.forEach(Be)}function Q(e,t){const n=e.$$;n.fragment!==null&&(fn(n.after_update),ge(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function un(e,t){e.$$.dirty[0]===-1&&(pe.push(e),xt(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function re(e,t,n,i,s,r,m=null,f=[-1]){const u=ve;be(e);const o=e.$$={fragment:null,ctx:[],props:r,update:V,not_equal:s,bound:tt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(u?u.$$.context:[])),callbacks:tt(),dirty:f,skip_bound:!1,root:t.target||u.$$.root};m&&m(o.root);let _=!1;if(o.ctx=n?n(e,t.props||{},(w,x,...B)=>{const z=B.length?B[0]:x;return o.ctx&&s(o.ctx[w],o.ctx[w]=z)&&(!o.skip_bound&&o.bound[w]&&o.bound[w](z),_&&un(e,w)),x}):[],o.update(),_=!0,ge(o.before_update),o.fragment=i?i(o.ctx):!1,t.target){if(t.hydrate){const w=Qt(t.target);o.fragment&&o.fragment.l(w),w.forEach(P)}else o.fragment&&o.fragment.c();t.intro&&I(e.$$.fragment),J(e,t.target,t.anchor),Ct()}be(u)}class oe{constructor(){Le(this,"$$");Le(this,"$$set")}$destroy(){Q(this,1),this.$destroy=V}$on(t,n){if(!He(n))return V;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(t){this.$$set&&!Zt(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const cn="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(cn);const me=[];function Ae(e,t=V){let n;const i=new Set;function s(f){if(ne(e,f)&&(e=f,n)){const u=!me.length;for(const o of i)o[1](),me.push(o,e);if(u){for(let o=0;o<me.length;o+=2)me[o][0](me[o+1]);me.length=0}}}function r(f){s(f(e))}function m(f,u=V){const o=[f,u];return i.add(o),i.size===1&&(n=t(s,r)||V),f(e),()=>{i.delete(o),i.size===0&&n&&(n(),n=null)}}return{set:s,update:r,subscribe:m}}const Mt=!0;function Ce(e){if(!e.endsWith("px"))return;const t=parseFloat(e.slice(0,e.length-2));return isNaN(t)?void 0:t}const Et=e=>e?"height":"width",Fe=e=>window.getComputedStyle(e),Te=e=>e.getBoundingClientRect(),an=(e,t=!0)=>{if(e.getPropertyValue("box-sizing")==="border-box")return;const n=Ce(e.getPropertyValue("border-left-width"));if(n===void 0){console.error("Splitpanes Error: Fail to parse container `border-left-width`.");return}const i=Ce(e.getPropertyValue("border-top-width"));if(i===void 0){console.error("Splitpanes Error: Fail to parse container `border-top-width`.");return}const s={left:n,top:i};if(t){const r=Ce(e.getPropertyValue("border-right-width"));if(r===void 0){console.error("Splitpanes Error: Fail to parse container `border-right-width`.");return}const m=Ce(e.getPropertyValue("border-bottom-width"));if(m===void 0){console.error("Splitpanes Error: Fail to parse container `border-bottom-width`.");return}const f=s;f.right=r,f.bottom=m}return s};function dn(e,t){t||(t=Fe(e));const n=Te(e),i=an(t,!0)||{left:0,top:0,right:0,bottom:0};return{width:n.width-i.left-i.right,height:n.height-i.top-i.bottom,left:n.left+i.left,top:n.top+i.top}}const rt=(e,t)=>({left:e.left-t.left,top:e.top-t.top});function ot(e){const t=e,n=e,{clientX:i,clientY:s}="ontouchstart"in window&&n.touches?n.touches[0]:t;return{left:i,top:s}}function ft(e,t,n,i){let s=0;for(let r=t;r<n;r++)s+=i(e[r],r);return s}function Me(e,t,n,i){for(let s=t;s<n;s++)i(e[s],s)}function mn(e){let t,n,i,s,r=!Mt;const m=e[16].default,f=St(m,e,e[18],null);return{c(){t=D("div"),n=F(),f&&f.c(),A(t,"id",e[0]),A(t,"class",i=`splitpanes ${e[3]||""} ${e[4]||""}`),A(t,"style",e[2]),ee(t,"splitpanes--horizontal",e[1]),ee(t,"splitpanes--vertical",!e[1]),ee(t,"splitpanes--dragging",e[7]||e[8]),ee(t,"splitpanes--freeze",!e[6])},m(u,o){y(u,t,o),Se(t,n),f&&f.m(t,null),e[17](t),s=!0},p(u,o){f&&f.p&&(!s||o[0]&262144)&&bt(f,m,u,u[18],s?zt(m,u[18],o,null):vt(u[18]),null),(!s||o[0]&1)&&A(t,"id",u[0]),(!s||o[0]&24&&i!==(i=`splitpanes ${u[3]||""} ${u[4]||""}`))&&A(t,"class",i),(!s||o[0]&4)&&A(t,"style",u[2]),(!s||o[0]&26)&&ee(t,"splitpanes--horizontal",u[1]),(!s||o[0]&26)&&ee(t,"splitpanes--vertical",!u[1]),(!s||o[0]&408)&&ee(t,"splitpanes--dragging",u[7]||u[8]),(!s||o[0]&88)&&ee(t,"splitpanes--freeze",!u[6])},i(u){s||(I(r),I(f,u),s=!0)},o(u){T(r),T(f,u),s=!1},d(u){u&&P(t),f&&f.d(u),e[17](null)}}}const kt={};function pn(e,t,n){let i,s,r,{$$slots:m={},$$scope:f}=t,{id:u=void 0}=t,{horizontal:o=!1}=t,{pushOtherPanes:_=!0}=t,{dblClickSplitter:w=!0}=t,{rtl:x="auto"}=t,{firstSplitter:B=!1}=t,{style:z=null}=t,{theme:R="default-theme"}=t,{class:h=""}=t;const N=nn();let H,W=!1,Y=!1,j=!1,U=!1,G=!1,C=-1,M=-1,ie,d=new Array,$=Ae(o);he(e,$,l=>n(31,r=l));const fe=Ae(B);he(e,fe,l=>n(30,s=l));const Z=Ae(void 0);he(e,Z,l=>n(29,i=l));let k=null,ue=null;sn(kt,{showFirstSplitter:fe,veryFirstPaneKey:Z,isHorizontal:$,ssrRegisterPaneSize:void 0,onPaneInit:l=>(i===void 0&&ae(Z,i=l,i),{undefinedPaneInitSize:0}),clientOnly:{onPaneAdd:Nt,onPaneRemove:Ot}});function Nt(l){let a=-1;Array.from(l.element.parentNode.children).some(c=>(c.className.includes("splitpanes__pane")&&a++,c===l.element)),a===0&&ae(Z,i=l.key,i),d.splice(a,0,l);for(let c=0;c<d.length;c++)d[c].index=c;W&&Oe().then(()=>{l.isReady=!0,N("pane-add",{index:a,panes:ce()})});const S=(c,v=!0)=>g=>{(v||l.index>0)&&c(g,l)};return{onSplitterDown:S(It,!1),onSplitterClick:S(Bt,!1),onSplitterDblClick:S(Ye),onPaneClick:S(Lt),reportGivenSizeChange:S(Dt)}}async function Ot(l){const a=d.findIndex(S=>S.key===l);if(a>=0){const S=d.splice(a,1)[0];for(let c=0;c<d.length;c++)d[c].index=c;a===0&&ae(Z,i=d.length>0?d[0].key:void 0,i),W&&(await Oe(),N("pane-remove",{removed:S,panes:ce()}))}}function Lt(l,a){N("pane-click",a)}function Dt(l,a){a.setSz(l),Oe()}Pt(()=>{$e(),Qe();for(let l=0;l<d.length;l++)d[l].isReady=!0;W=!0,N("ready"),setTimeout(()=>{n(6,j=!0)},0)}),wt(()=>{W&&Ke(),W=!1}),tn(()=>{$e()});function Ge(l){if(x==="auto")try{return(l??Fe(H)).direction==="rtl"}catch{}return x===!0}function At(){document.body.style.cursor=$?"col-resize":"row-resize",document.addEventListener("mousemove",Pe,{passive:!1}),document.addEventListener("mouseup",we),"ontouchstart"in window&&(document.addEventListener("touchmove",Pe,{passive:!1}),document.addEventListener("touchend",we))}function Ke(){document.body.style.cursor="",document.removeEventListener("mousemove",Pe),document.removeEventListener("mouseup",we),"ontouchstart"in window&&(document.removeEventListener("touchmove",Pe),document.removeEventListener("touchend",we))}const Re=l=>l.nodeType===Node.ELEMENT_NODE&&l.classList.contains("splitpanes__splitter");function Ue(l,a,S){let c=l[o?"top":"left"];return S&&!o&&(c=a-c),c}const Ne=()=>Et(o);function It(l,a){n(7,U=!0),C=a.index,a.setSplitterActive(!0);let c=a.element;for(;c!=null&&(c=c.previousSibling,!Re(c)););if(c==null){console.error("Splitpane Error: Active splitter wasn't found!");return}k=c;const v=ot(l),g=Te(k);ue=Ue(rt(v,g),g[Ne()],Ge()),At()}function Pe(l){if(U){l.preventDefault(),n(8,G=!0);const a=ot(l),S=Fe(H),c=dn(H,S),v=c[Ne()],g=Ge(S),p=rt(a,c),b=Ue(p,v,g);Tt(b,v),N("resize",ce())}}function we(){G&&N("resized",ce()),n(7,U=!1),d[C].setSplitterActive(!1),setTimeout(()=>{n(8,G=!1),Ke()},100)}function Bt(l,a){if("ontouchstart"in window){l.preventDefault();const S=a.index;w&&(M===S?(ie&&clearTimeout(ie),ie=null,Ye(l,a),M=-1):(M=S,ie=setTimeout(()=>{M=-1},500)))}G||N("splitter-click",a)}function Ye(l,a){if(w){const S=a.index;let c=0;for(let p=0;p<d.length;p++){const b=d[p];p!==S&&(c+=b.min())}const v=Math.min(Math.max(0,100-c),a.max()),g=c+v;if(g>=100)for(let p=0;p<d.length;p++){const b=d[p];b!==a?b.setSz(b.min()):b.setSz(100-c)}else{let p=100-g;a.setSz(v);const b=E=>{const O=E.min(),q=E.max(),K=Math.min(Math.max(0,p),q-O);E.setSz(O+K),p-=K};for(let E=S-1;E>=0;E--)b(d[E]);for(let E=S+1;E<d.length;E++)b(d[E]);p!=0&&console.warn("Splitpanes: there is a left spare size after computation of splitter double click, which means there are issues on the size constains of the panes.")}N("pane-maximize",a),N("resized",ce())}n(7,U=!1)}const ce=()=>d.map(l=>({min:l.min(),max:l.max(),size:l.sz(),snap:l.snap()}));function Ft(l,a){const S=q=>Te(q)[Ne()],c=S(k);let v=0,g=k.previousSibling;for(;g!=null;)Re(g)&&(v+=S(g)),g=g.previousSibling;let p=0,b=k.nextSibling;for(;b!=null;)Re(b)&&(p+=S(b)),b=b.nextSibling;const E=v+ue,O=v+c+p;return(l-E)/(a-O)*100}function Tt(l,a){let S=C-1,c=d[S],v=C,g=d[v],p={prevPanesSize:Ze(S),nextPanesSize:Je(v),prevReachedMinPanes:0,nextReachedMinPanes:0};const b=0+(_?0:p.prevPanesSize),E=100-(_?0:p.nextPanesSize),O=Math.max(Math.min(Ft(l,a),E),b),q=p.prevPanesSize+c.min()+c.snap(),K=100-(p.nextPanesSize+g.min()+g.snap());let L=O,X=!1;O<=q?O>p.prevPanesSize+c.min()&&(L=Math.max(c.min()+p.prevPanesSize,100-(g.max()+p.nextPanesSize)),X=!0):O>=K&&O<100-p.nextPanesSize-g.min()&&(L=Math.min(100-(g.min()+p.nextPanesSize),c.max()+p.prevPanesSize),X=!0);const ye=c.max()<100&&L>=c.max()+p.prevPanesSize,Kt=g.max()<100&&L<=100-(g.max()+p.nextPanesSize);if(ye||Kt)ye?(c.setSz(c.max()),g.setSz(Math.max(100-c.max()-p.prevPanesSize-p.nextPanesSize,0))):(c.setSz(Math.max(100-g.max()-p.prevPanesSize-p.nextPanesSize,0)),g.setSz(g.max()));else{if(_&&!X){const et=Ht(p,L);if(!et)return;({sums:p,paneBeforeIndex:S,paneAfterIndex:v}=et),c=d[S],g=d[v]}S!=null&&c.setSz(Math.min(Math.max(L-p.prevPanesSize-p.prevReachedMinPanes,c.min()),c.max())),v!=null&&g.setSz(Math.min(Math.max(100-L-p.nextPanesSize-p.nextReachedMinPanes,g.min()),g.max()))}}function Ht(l,a){var g,p;const S=C-1;let c=S,v=S+1;if(a<l.prevPanesSize+d[c].min()&&(c=(g=Wt(S))==null?void 0:g.index,l.prevReachedMinPanes=0,c<S&&Me(d,c+1,S+1,b=>{b.setSz(b.min()),l.prevReachedMinPanes+=b.min()}),l.prevPanesSize=Ze(c),c==null))return l.prevReachedMinPanes=0,d[0].setSz(d[0].min()),Me(d,1,S+1,b=>{b.setSz(b.min()),l.prevReachedMinPanes+=b.min()}),d[v].setSz(100-l.prevReachedMinPanes-d[0].min()-l.prevPanesSize-l.nextPanesSize),null;if(a>100-l.nextPanesSize-d[v].min()){v=(p=qt(S))==null?void 0:p.index,l.nextReachedMinPanes=0,v>S+1&&Me(d,S+1,v,E=>{E.setSz(E.min()),l.nextReachedMinPanes+=E.min()}),l.nextPanesSize=Je(v);const b=d.length;if(v==null)return l.nextReachedMinPanes=0,d[b-1].setSz(d[b-1].min()),Me(d,S+1,b-1,E=>{E.setSz(E.min()),l.nextReachedMinPanes+=E.min()}),d[c].setSz(100-l.prevPanesSize-l.nextReachedMinPanes-d[b-1].min()-l.nextPanesSize),null}return{sums:l,paneBeforeIndex:c,paneAfterIndex:v}}const Xe=l=>l.sz(),Ze=l=>ft(d,0,l,Xe),Je=l=>ft(d,l+1,d.length,Xe),Wt=l=>[...d].reverse().find(a=>a.index<l&&a.sz()>a.min()),qt=l=>d.find(a=>a.index>l+1&&a.sz()>a.min());async function Oe(){Y=!0,await rn(),Y&&(Qe(),Y=!1)}function Qe(){Vt(),W&&N("resized",ce())}function Vt(){if(d.length===0)return;const l=d.length;let a=100,S=0,c=0,v=0,g=[],p=[];for(let K=0;K<l;K++){const L=d[K],X=L.sz();L.givenSize==null?L.isReady?(v+=X,X>=L.max()&&g.push(L),X<=L.min()&&p.push(L)):c+=1:(a-=X,S++,g.push(L),p.push(L))}const b=l-S,E=b-c;let O,q;if(E>0?(O=v/E,O>.1&&a>.1?(v+=c*O,q=a/v):(O=0,q=1)):(O=a/b,q=1),a+v>.1){a=100;for(let K=0;K<l;K++){const L=d[K];if(L.givenSize==null){const X=L.isReady?L.sz():O,ye=Math.max(Math.min(X*q,L.max()),L.min());L.setSz(ye)}a-=L.sz()}Math.abs(a)>.1&&(a=jt(a,g,p))}isFinite(a)?Math.abs(a)>.1&&console.warn("Splitpanes: Could not resize panes correctly due to their constraints."):console.warn("Splitpanes: Internal error, sizes might be NaN as a result.")}function jt(l,a,S){const v=d.length-(l>0?a.length:S.length);if(v<=0)return l;const g=l/v;if(d.length===1)d[0].setSz(100),l=0;else for(let p=0;p<d.length;p++){const b=d[p],E=b.sz();if(l>0&&!a.includes(b)){const O=Math.max(Math.min(E+g,b.max()),b.min()),q=O-E;l-=q,b.setSz(O)}else if(!S.includes(b)){const O=Math.max(Math.min(E+g,b.max()),b.min()),q=O-E;l-=q,b.setSz(O)}}return l}function $e(){var c;const{children:l}=H;let a=0,S=!1;for(let v=0;v<l.length;v++){const g=l.item(v),p=g.classList.contains("splitpanes__pane"),b=g.classList.contains("splitpanes__splitter");if(!p&&!b){(c=g.parentNode)==null||c.removeChild(g),console.warn("Splitpanes: Only <Pane> elements are allowed at the root of <Splitpanes>. One of your DOM nodes was removed.");return}else p&&(!S&&d[a].element!==g&&(S=!0),a++)}if(S){const v=[];for(let g=0;g<l.length;g++){const p=l.item(g);if(p.classList.contains("splitpanes__pane")){const E=d.find(O=>O.element===p);E!=null?(E.index=v.length,v.push(E)):console.warn("Splitpanes: Internal error - found a <Pane> elements which isn't tracked.")}}d=v,ae(Z,i=d.length>0?d[0].key:void 0,i)}}function Gt(l){ke[l?"unshift":"push"](()=>{H=l,n(5,H)})}return e.$$set=l=>{"id"in l&&n(0,u=l.id),"horizontal"in l&&n(1,o=l.horizontal),"pushOtherPanes"in l&&n(12,_=l.pushOtherPanes),"dblClickSplitter"in l&&n(13,w=l.dblClickSplitter),"rtl"in l&&n(14,x=l.rtl),"firstSplitter"in l&&n(15,B=l.firstSplitter),"style"in l&&n(2,z=l.style),"theme"in l&&n(3,R=l.theme),"class"in l&&n(4,h=l.class),"$$scope"in l&&n(18,f=l.$$scope)},e.$$.update=()=>{e.$$.dirty[0]&2&&ae($,r=o,r),e.$$.dirty[0]&32768&&ae(fe,s=B,s)},[u,o,z,R,h,H,j,U,G,$,fe,Z,_,w,x,B,m,Gt,f]}class hn extends oe{constructor(t){super(),re(this,t,pn,mn,ne,{id:0,horizontal:1,pushOtherPanes:12,dblClickSplitter:13,rtl:14,firstSplitter:15,style:2,theme:3,class:4},null,[-1,-1,-1])}}const _n=(e,t)=>n=>{const i=e();i!=null&&i[t](n)},Sn=e=>_n.bind(null,e);function gn(e){let t,n,i,s,r,m,f=(e[4]!==e[9]||e[5])&&ut(e);const u=e[20].default,o=St(u,e,e[19],null);return{c(){f&&f.c(),t=F(),n=D("div"),o&&o.c(),A(n,"class",i=`splitpanes__pane ${e[0]||""}`),A(n,"style",e[3])},m(_,w){f&&f.m(_,w),y(_,t,w),y(_,n,w),o&&o.m(n,null),e[21](n),s=!0,r||(m=se(n,"click",e[11]("onPaneClick")),r=!0)},p(_,w){_[4]!==_[9]||_[5]?f?f.p(_,w):(f=ut(_),f.c(),f.m(t.parentNode,t)):f&&(f.d(1),f=null),o&&o.p&&(!s||w&524288)&&bt(o,u,_,_[19],s?zt(u,_[19],w,null):vt(_[19]),null),(!s||w&1&&i!==(i=`splitpanes__pane ${_[0]||""}`))&&A(n,"class",i),(!s||w&8)&&A(n,"style",_[3])},i(_){s||(I(o,_),s=!0)},o(_){T(o,_),s=!1},d(_){_&&(P(t),P(n)),f&&f.d(_),o&&o.d(_),e[21](null),r=!1,m()}}}function ut(e){let t,n,i,s;return{c(){t=D("div"),A(t,"class",n="splitpanes__splitter "+(e[2]?"splitpanes__splitter__active":""))},m(r,m){y(r,t,m),i||(s=[se(t,"mousedown",e[11]("onSplitterDown")),se(t,"touchstart",e[11]("onSplitterDown")),se(t,"click",e[11]("onSplitterClick")),se(t,"dblclick",e[11]("onSplitterDblClick"))],i=!0)},p(r,m){m&4&&n!==(n="splitpanes__splitter "+(r[2]?"splitpanes__splitter__active":""))&&A(t,"class",n)},d(r){r&&P(t),i=!1,ge(s)}}}function zn(e){let t,n,i=!e[10]&&gn(e);return{c(){i&&i.c(),t=qe()},m(s,r){i&&i.m(s,r),y(s,t,r),n=!0},p(s,[r]){s[10]||i.p(s,r)},i(s){n||(I(i),n=!0)},o(s){T(i),n=!1},d(s){s&&P(t),i&&i.d(s)}}}function bn(e,t,n){let i,s,r,m,f,{$$slots:u={},$$scope:o}=t;const{ssrRegisterPaneSize:_,onPaneInit:w,clientOnly:x,isHorizontal:B,showFirstSplitter:z,veryFirstPaneKey:R}=ln(kt);he(e,B,k=>n(18,r=k)),he(e,z,k=>n(5,f=k)),he(e,R,k=>n(4,m=k));let{size:h=null}=t,{minSize:N=0}=t,{maxSize:H=100}=t,{snapSize:W=0}=t,{class:Y=""}=t;const j={},U=!Mt,{undefinedPaneInitSize:G}=w(j);let C,M=h??G,ie=!1,d;const $=Sn(()=>d),fe=k=>{k!=M&&$("reportGivenSizeChange")(k)};Pt(()=>{const k={key:j,element:C,givenSize:h,sz:()=>M,setSz:ue=>{n(16,M=ue),h!=null&&h!=M&&n(12,h=M)},min:()=>N,max:()=>H,snap:()=>W,setSplitterActive:ue=>{n(2,ie=ue)},isReady:!1};d=x.onPaneAdd(k)}),wt(()=>{x.onPaneRemove(j)});function Z(k){ke[k?"unshift":"push"](()=>{C=k,n(1,C)})}return e.$$set=k=>{"size"in k&&n(12,h=k.size),"minSize"in k&&n(13,N=k.minSize),"maxSize"in k&&n(14,H=k.maxSize),"snapSize"in k&&n(15,W=k.snapSize),"class"in k&&n(0,Y=k.class),"$$scope"in k&&n(19,o=k.$$scope)},e.$$.update=()=>{e.$$.dirty&4096&&h!=null&&fe(h),e.$$.dirty&262144&&n(17,i=Et(r)),e.$$.dirty&196608&&n(3,s=`${i}: ${M}%;`)},[Y,C,ie,s,m,f,B,z,R,j,U,$,h,N,H,W,M,i,r,o,u,Z]}class ct extends oe{constructor(t){super(),re(this,t,bn,zn,ne,{size:12,minSize:13,maxSize:14,snapSize:15,class:0})}}function vn(e){let t,n,i,s,r,m,f,u,o,_,w,x,B,z,R,h,N,H,W,Y,j,U,G;return{c(){t=D("h1"),t.textContent="Hello World",n=F(),i=D("h1"),i.textContent="Hello World",s=F(),r=D("h1"),r.textContent="Hello World",m=F(),f=D("h1"),f.textContent="Hello World",u=F(),o=D("h1"),o.textContent="Hello World",_=F(),w=D("h1"),w.textContent="Hello World",x=F(),B=D("h1"),B.textContent="Hello World",z=F(),R=D("h1"),R.textContent="Hello World",h=F(),N=D("h1"),N.textContent="Hello World",H=F(),W=D("h1"),W.textContent="Hello World",Y=F(),j=D("h1"),j.textContent="Hello World",U=F(),G=D("h1"),G.textContent="Hello World"},m(C,M){y(C,t,M),y(C,n,M),y(C,i,M),y(C,s,M),y(C,r,M),y(C,m,M),y(C,f,M),y(C,u,M),y(C,o,M),y(C,_,M),y(C,w,M),y(C,x,M),y(C,B,M),y(C,z,M),y(C,R,M),y(C,h,M),y(C,N,M),y(C,H,M),y(C,W,M),y(C,Y,M),y(C,j,M),y(C,U,M),y(C,G,M)},p:V,i:V,o:V,d(C){C&&(P(t),P(n),P(i),P(s),P(r),P(m),P(f),P(u),P(o),P(_),P(w),P(x),P(B),P(z),P(R),P(h),P(N),P(H),P(W),P(Y),P(j),P(U),P(G))}}}class Rt extends oe{constructor(t){super(),re(this,t,null,vn,ne,{})}}function at(e,t,n){const i=e.slice();return i[5]=t[n],i}function dt(e,t,n){const i=e.slice();return i[5]=t[n],i}function mt(e){let t,n,i=e[5].label+"",s,r,m,f;return{c(){t=D("li"),n=D("span"),s=We(i),A(n,"class","svelte-1d5z5tq"),A(t,"class",r=nt(e[1]===e[5].value?"active":"")+" svelte-1d5z5tq")},m(u,o){y(u,t,o),Se(t,n),Se(n,s),m||(f=se(n,"click",function(){He(e[2](e[5].value))&&e[2](e[5].value).apply(this,arguments)}),m=!0)},p(u,o){e=u,o&1&&i!==(i=e[5].label+"")&&$t(s,i),o&3&&r!==(r=nt(e[1]===e[5].value?"active":"")+" svelte-1d5z5tq")&&A(t,"class",r)},d(u){u&&P(t),m=!1,f()}}}function pt(e){let t,n,i,s;var r=e[5].component;function m(f,u){return{}}return r&&(n=st(r,m())),{c(){t=D("div"),n&&te(n.$$.fragment),i=F(),A(t,"class","box svelte-1d5z5tq")},m(f,u){y(f,t,u),n&&J(n,t,null),Se(t,i),s=!0},p(f,u){if(u&1&&r!==(r=f[5].component)){if(n){Ve();const o=n;T(o.$$.fragment,1,0,()=>{Q(o,1)}),je()}r?(n=st(r,m()),te(n.$$.fragment),I(n.$$.fragment,1),J(n,t,i)):n=null}},i(f){s||(n&&I(n.$$.fragment,f),s=!0)},o(f){n&&T(n.$$.fragment,f),s=!1},d(f){f&&P(t),n&&Q(n)}}}function ht(e){let t,n,i=e[1]==e[5].value&&pt(e);return{c(){i&&i.c(),t=qe()},m(s,r){i&&i.m(s,r),y(s,t,r),n=!0},p(s,r){s[1]==s[5].value?i?(i.p(s,r),r&3&&I(i,1)):(i=pt(s),i.c(),I(i,1),i.m(t.parentNode,t)):i&&(Ve(),T(i,1,1,()=>{i=null}),je())},i(s){n||(I(i),n=!0)},o(s){T(i),n=!1},d(s){s&&P(t),i&&i.d(s)}}}function Pn(e){let t,n,i,s,r,m,f,u,o=xe(e[0]),_=[];for(let z=0;z<o.length;z+=1)_[z]=mt(dt(e,o,z));let w=xe(e[0]),x=[];for(let z=0;z<w.length;z+=1)x[z]=ht(at(e,w,z));const B=z=>T(x[z],1,1,()=>{x[z]=null});return{c(){t=D("ul");for(let z=0;z<_.length;z+=1)_[z].c();n=F(),i=D("span"),i.textContent="+",s=F();for(let z=0;z<x.length;z+=1)x[z].c();r=qe(),A(i,"class","button svelte-1d5z5tq"),A(t,"class","svelte-1d5z5tq")},m(z,R){y(z,t,R);for(let h=0;h<_.length;h+=1)_[h]&&_[h].m(t,null);Se(t,n),Se(t,i),y(z,s,R);for(let h=0;h<x.length;h+=1)x[h]&&x[h].m(z,R);y(z,r,R),m=!0,f||(u=se(i,"click",e[3]()),f=!0)},p(z,[R]){if(R&7){o=xe(z[0]);let h;for(h=0;h<o.length;h+=1){const N=dt(z,o,h);_[h]?_[h].p(N,R):(_[h]=mt(N),_[h].c(),_[h].m(t,n))}for(;h<_.length;h+=1)_[h].d(1);_.length=o.length}if(R&3){w=xe(z[0]);let h;for(h=0;h<w.length;h+=1){const N=at(z,w,h);x[h]?(x[h].p(N,R),I(x[h],1)):(x[h]=ht(N),x[h].c(),I(x[h],1),x[h].m(r.parentNode,r))}for(Ve(),h=w.length;h<x.length;h+=1)B(h);je()}},i(z){if(!m){for(let R=0;R<w.length;R+=1)I(x[R]);m=!0}},o(z){x=x.filter(Boolean);for(let R=0;R<x.length;R+=1)T(x[R]);m=!1},d(z){z&&(P(t),P(s),P(r)),it(_,z),it(x,z),f=!1,u()}}}function wn(e,t,n){let{items:i=[]}=t,{activeTabValue:s=1}=t,r=2;const m=u=>()=>n(1,s=u),f=u=>()=>{i.push({label:`Editor ${r}`,value:r,component:Rt}),n(1,s=r),n(0,i),r++};return e.$$set=u=>{"items"in u&&n(0,i=u.items),"activeTabValue"in u&&n(1,s=u.activeTabValue)},[i,s,m,f]}class yn extends oe{constructor(t){super(),re(this,t,wn,Pn,ne,{items:0,activeTabValue:1})}}function xn(e){let t,n;return t=new yn({props:{items:e[0]}}),{c(){te(t.$$.fragment)},m(i,s){J(t,i,s),n=!0},p:V,i(i){n||(I(t.$$.fragment,i),n=!0)},o(i){T(t.$$.fragment,i),n=!1},d(i){Q(t,i)}}}function Cn(e){return[[{label:"Editor 1",value:1,component:Rt}]]}class Mn extends oe{constructor(t){super(),re(this,t,Cn,xn,ne,{})}}function En(e){let t;return{c(){t=D("div"),t.innerHTML="<p>hello world!</p>",A(t,"class","pane1 svelte-5456z")},m(n,i){y(n,t,i)},p:V,d(n){n&&P(t)}}}function kn(e){let t,n,i;return n=new Mn({}),{c(){t=D("div"),te(n.$$.fragment),A(t,"class","pane2 svelte-5456z")},m(s,r){y(s,t,r),J(n,t,null),i=!0},p:V,i(s){i||(I(n.$$.fragment,s),i=!0)},o(s){T(n.$$.fragment,s),i=!1},d(s){s&&P(t),Q(n)}}}function Rn(e){let t,n,i,s;return t=new ct({props:{size:50,minSize:20,$$slots:{default:[En]},$$scope:{ctx:e}}}),i=new ct({props:{size:50,minSize:20,$$slots:{default:[kn]},$$scope:{ctx:e}}}),{c(){te(t.$$.fragment),n=F(),te(i.$$.fragment)},m(r,m){J(t,r,m),y(r,n,m),J(i,r,m),s=!0},p(r,m){const f={};m&1&&(f.$$scope={dirty:m,ctx:r}),t.$set(f);const u={};m&1&&(u.$$scope={dirty:m,ctx:r}),i.$set(u)},i(r){s||(I(t.$$.fragment,r),I(i.$$.fragment,r),s=!0)},o(r){T(t.$$.fragment,r),T(i.$$.fragment,r),s=!1},d(r){r&&P(n),Q(t,r),Q(i,r)}}}function Nn(e){let t,n;return t=new hn({props:{style:"height: 100%",$$slots:{default:[Rn]},$$scope:{ctx:e}}}),{c(){te(t.$$.fragment)},m(i,s){J(t,i,s),n=!0},p(i,[s]){const r={};s&1&&(r.$$scope={dirty:s,ctx:i}),t.$set(r)},i(i){n||(I(t.$$.fragment,i),n=!0)},o(i){T(t.$$.fragment,i),n=!1},d(i){Q(t,i)}}}class On extends oe{constructor(t){super(),re(this,t,null,Nn,ne,{})}}function Ln(e){let t,n,i;return n=new On({}),{c(){t=D("main"),te(n.$$.fragment)},m(s,r){y(s,t,r),J(n,t,null),i=!0},p:V,i(s){i||(I(n.$$.fragment,s),i=!0)},o(s){T(n.$$.fragment,s),i=!1},d(s){s&&P(t),Q(n)}}}class Dn extends oe{constructor(t){super(),re(this,t,null,Ln,ne,{})}}new Dn({target:document.getElementById("app")});