---
title: Let it Snow
author: Naitian Zhou
permalink: /blog/2018/12/13/Let-it-Snow/

description: A Little Bookmarklet for the Winter

---
##
> Just drag this link to the bookmark bar, click it, and you, too, can be
> greeted by the non-denominational red deer-pulled guy:
>
> <a href="javascript:void%20function(){function%20e(){var%20e=/[\%3F%26]flake=([^%26%23]*)/,n=e.exec(window.location.href);null!==n%26%26(g=t(n[1])),e=/[\%3F%26]colors=([^%26%23]*)/,n=e.exec(window.location.href),null!==n%26%26(M=o(t(n[1])))}function%20t(e){e=unescape(e);for(var%20t=%22%22,o=0,n=0,a=0;o%3Ce.length;)n=e.charCodeAt(o),128%3En%3Ft+=String.fromCharCode(n):224%3En%26%26n%3E191%3F(a=e.charCodeAt(++o),t+=String.fromCharCode((31%26n)%3C%3C6|63%26a)):(a=e.charCodeAt(++o),c3=e.charCodeAt(++o),t+=String.fromCharCode((15%26n)%3C%3C12|(63%26a)%3C%3C6|63%26c3)),o++;return%20t.replace(/%26/g,%22%26amp;%22).replace(/%3C/g,%22%26lt;%22).replace(/%3E/g,%22%26gt;%22)}function%20o(e){var%20t=%220123456789abcdef%22,o=e.split(%22,%22);o=o.map(function(e){return%20e.split(%22:%22)});for(var%20n,a,r,l,s=[],i=0;i%3C500*o.length;i++)if(n=o[Math.floor(Math.random()*o.length)],n[1]){for(a=%22%22,r=Math.random(),l=0;l%3Cn[0].length;l++){var%20d=parseInt(n[0][l],16),f=parseInt(n[1][l],16);a+=t[Math.floor(r*d+(1-r)*f)]}s.push(%22%23%22+a)}else%20s.push(%22%23%22+n[0]);return%20s}function%20n(){E=window.outerWidth,T=window.outerHeight,j=E-40,O=T-(z%3F5:37),z%26%26(G=N/j),A%26%26(F=150)}function%20a(){if(e(),document.body.classList%3Fdocument.body.classList.add(%22has-snow%22):document.body.className+=%22%20has-snow%22,H=document.createElement(%22div%22),H.id=%22snowcontainer%22,H.style.position=%22fixed%22,H.style.top=%220%22,H.style.left=%220%22,H.style.width=%22100%25%22,H.style.height=%22100%25%22,H.style.marginTop=%22-20px%22,H.style.overflow=%22hidden%22,H.style.zIndex=%2210%22,H.style.pointerEvents=%22none%22,document.body.appendChild(H),K%26%26(k=document.createElement(%22img%22),k.src=P,k.style.position=%22absolute%22,k.style.top=Math.floor(Math.random()*O-R)+%22px%22,k.style.zIndex=%22-1%22,H.appendChild(k)),z)for(var%20t=0;N%3Et;t++)_[t]=O;if(A%26%26!h){var%20o=document.createElement(%22canvas%22);o.style.position=%22absolute%22,o.style.left=%220%22,o.style.top=%220%22,o.style.width=E+%22px%22,o.style.height=T+%22px%22,o.style.zIndex=%22-1%22,o.style.pointerEvents=%22none%22,I=o.getContext(%222d%22),document.body.appendChild(o),I.lineWidth=2,I.strokeStyle=%22white%22}for(var%20t=0;u%3E=t;t++)D[t]=document.createElement(%22span%22),g%20instanceof%20Array%3FD[t].innerHTML=g[Math.floor(Math.random()*w)]:D[t].innerHTML=g,D[t].style.color=M[Math.floor(Math.random()*M.length)],D[t].style.fontFamily=x[Math.floor(Math.random()*x.length)],q=Math.floor(Math.random()*B)+b,D[t].size=q,z%26%26(D[t].size-=5),D[t].style.fontSize=q+%22pt%22,D[t].style.position=%22absolute%22,D[t].x=Math.floor(Math.random()*j),W[t]=Math.floor(Math.random()*O),D[t].style.left=D[t].x+%22px%22,D[t].style.top=W[t]+%22px%22,D[t].fall=v*q/5,D[t].style.zIndex=%22-2%22,H.appendChild(D[t]);window.requestAnimationFrame(z%3Fr:A%3Fs:l)}function%20r(){K%26%26(V+=U,V%3E=j+Q%26%26(V=-Q,k.style.top=Math.floor(Math.random()*O-R)+%22px%22),k.style.left=V+%22px%22);for(var%20e=0;u%3E=e;e++)if(W[e]+=D[e].fall,D[e].style.top=W[e]+%22px%22,S=D[e].x+10*Math.sin(W[e]/9),D[e].style.left=S+%22px%22,L=Math.floor(G*(S+D[e].size/2)),W[e]+D[e].size%3E_[L]){var%20t=D[e].innerHTML;(_[L+1]-_[L]%3C5%26%26_[L-1]-_[L]%3C5||W[e]%3E=O)%26%26(_[L]=W[e]%3C_[L]%3FW[e]:_[L],D[e]=document.createElement(%22span%22),D[e].innerHTML=t,D[e].style.color=M[Math.floor(Math.random()*M.length)],D[e].style.fontFamily=x[Math.floor(Math.random()*x.length)],q=Math.floor(Math.random()*B)+b,D[e].size=q-5,D[e].style.fontSize=q+%22pt%22,D[e].style.position=%22absolute%22,D[e].x=Math.floor(Math.random()*j),W[e]=-D[e].size,D[e].style.left=D[e].x+%22px%22,D[e].style.top=W[e]+%22px%22,D[e].fall=v*q/5,D[e].style.zIndex=%22-1%22,H.appendChild(D[e]))}setTimeout(function(){window.requestAnimationFrame(r)},1e3/snowfps)}function%20l(){K%26%26(V+=U,V%3E=j+Q%26%26(V=-Q,k.style.top=Math.floor(Math.random()*O-R)+%22px%22),k.style.left=V+%22px%22);for(var%20e=0;u%3E=e;e++)W[e]+=D[e].fall,W[e]%3E=O%26%26(W[e]=-D[e].size),D[e].style.top=W[e]+%22px%22,D[e].style.left=D[e].x+10*Math.sin(W[e]/9)+%22px%22;setTimeout(function(){window.requestAnimationFrame(l)},1e3/snowfps)}function%20s(){K%26%26(V+=U,V%3E=j+Q%26%26(V=-Q,k.style.top=Math.floor(Math.random()*O-R)+%22px%22),k.style.left=V+%22px%22);for(var%20e=0;u%3E=e;e++)W[e]+=D[e].fall,W[e]%3E=O%26%26(W[e]=-D[e].size,setTimeout(%22iterfastpile()%22,10)),D[e].style.top=W[e]+%22px%22,D[e].style.left=D[e].x+10*Math.sin(W[e]/9)+%22px%22;setTimeout(function(){window.requestAnimationFrame(s)},1e3/snowfps)}var%20i=%22myCss%22;if(!document.getElementById(i)){var%20d=document.getElementsByTagName(%22head%22)[0],f=document.createElement(%22link%22);f.id=i,f.rel=%22stylesheet%22,f.type=%22text/css%22,f.href=%22https://gist.githubusercontent.com/naitian/6c7d304f80fd72ca2e116f8bfe03b6a1/raw/b38981c888ec2dab53d2e844348ff7f016fb13c6/snow.css%22,f.media=%22all%22,d.appendChild(f)}var%20p=%22https://ion.tjhsst.edu/static/themes/snow/%22,h=%22Microsoft%20Internet%20Explorer%22===navigator.appName,c=-1!==navigator.userAgent.toLowerCase().indexOf(%22android%22),m=c,y=!h;if(%22undefined%22==typeof%20u)var%20u=m%3F15:100;window.requestAnimationFrame||(window.requestAnimationFrame=function(e){return%20e()});var%20M=[%22%23aac%22,%22%23ddF%22,%22%23ccD%22],w=3,x=[%22Arial%20Black%22,%22Arial%20Narrow%22,%22Times%22,%22Comic%20Sans%20MS%22];if(%22undefined%22==typeof%20g)var%20g=h%3F%22*%22:[%22❄%22,%22❅%22,%22❆%22];if(%22undefined%22==typeof%20v)var%20v=y%3F.5:1;if(%22undefined%22==typeof%20C||%22undefined%22==typeof%20b)var%20C=m%3F44:22,b=m%3F16:8;%22undefined%22==typeof%20snowfps%26%26(snowfps=30);var%20z=y,A=!y;A=A%26%26!h;var%20E,T,F,I,S,L,q,H,k,N=200,B=C-b,D=[],W=[],j=1e3,O=1e3,_=[],G=N/j,J=new%20Date,K=11===J.getMonth()%26%26J.getDate()%3C=25,P=p+%22santa_xsnow.gif%22,Q=210,R=83,U=5,V=-Q;window.onresize=n,n();a()}();" >❄️Let it Snow❄️</a>


![Screenshot of Christmas](/assets/img/let-it-snow-screenshot.png)

[Ion](https://ion.tjhsst.edu) has a winter theme that gets activated every December,
with snowfall and a [Non-denominational Red Deer-Pulled Guy](https://github.com/tjcsl/ion/blob/master/intranet/static/themes/snow/snow.js#L102).

I found myself missing this, since Michigan's "Intranet", Wolverine Access (which is actually
just Oracle SIS, but I digress) doesn't have this nifty feature.

So I decided to port the snow theme over to a bookmarklet, so I can access get snow at any time!

Thanks Derek Morris (TJ '11) and Zachary Yaro (TJ '12) for the actual code.

Pro Tip: if you click it multiple times, you'll get multiple non-denominational holidays!

Pro Tip 2: if you click it enough times, your computer will overheat to keep you warm
during those cold winter nights.