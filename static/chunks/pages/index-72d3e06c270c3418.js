(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{48312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(29922)}])},29922:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return F}});var a=n(10797),s=n(85893),r=n(72259),i=n(6158),o=n.n(i),c=n(9008),l=n.n(c),u=n(11163),d=n(67294),m=n(8193),p=n(11426),y=n.n(p),h=n(6876),f=n(63564),g=n(47568),x=n(41799),b=n(69396),v=n(99534),w=n(70655),j=n(79911),N=n(61744),k=n(86501),C=JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"Fuck","type":"error"},{"inputs":[],"name":"NoMoneyForYa","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"coins","type":"uint256"}],"name":"ChestBurried","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"coins","type":"uint256"}],"name":"FoundTreasure","type":"event"},{"inputs":[{"internalType":"bytes32","name":"chest","type":"bytes32"},{"internalType":"address","name":"keuy","type":"address"}],"name":"burryChest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"chestKeuys","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"chest","type":"bytes32"}],"name":"coinsInChest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"confiscatedCoins","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cursed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"chest","type":"bytes32"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"treasure","type":"bytes"}],"name":"diggChest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pirates","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}]');var T=function(e,t){var n=(0,f.PJ)((0,b.Z)((0,x.Z)({},t),{addressOrName:"0x7da73c1bb5a0964cac054fe302a43187db58b1b2",contractInterface:C,functionName:e})).config;return(0,f.GG)(n)},Z=n(70794);function M(){}function P(e){var t;return t="string"===typeof e?e:e?e.toString():"0",new Z.Z(t)}var L=n(39883),_=n(29251),E=n(56371);function O(e){var t=e.map((function(e){var t=e.longitude,n=e.latitude;return(0,E.keccak256)(_.Y0(t))+(0,E.keccak256)(_.Y0(n))})).join("");return(0,E.keccak256)(_.Y0(t))}function I(e){var t=e.map((function(e){return[e.longitude,e.latitude].join("")})).join("");return(0,E.keccak256)(_.Y0(t))}var S=function(){var e=function(e,t){return Math.random()*(t-e)+e};(0,L.Z)({angle:e(55,125),spread:e(50,70),particleCount:e(50,100),origin:{y:.6}})};var H=function(e){var t=e.geoLocations,n=e.amount,a=(0,v.Z)(e,["geoLocations","amount"]),i=(0,u.useRouter)(),o=O(t),c=I(t),l=new j.Wallet(o),d=(0,f.mA)().address,m=(0,f.KQ)({addressOrName:d}).data,p=(0,r.We)().openConnectModal,y=void 0===p?M:p,h=T("burryChest",{args:[c,l.address],overrides:{from:d,value:N.parseEther("".concat(n||0)).toString()}}).writeAsync;function C(){return(C=(0,g.Z)((function(){var e;return(0,w.__generator)(this,(function(a){switch(a.label){case 0:if(console.log("amount: ",n),console.log("balance: ",m),console.log("geoLocations",t),console.log("result hash: ",o),console.log("pirateSigner",l),!d)return y(),[2];if(0===t.length)return k.ZP.error("No PINs were added"),[2];if(!n)return k.ZP.error("How much treasure you want to bury? Enter amount!"),[2];if(P(m.formatted).lt(n))return k.ZP.error("You are too poor"),[2];if(c===o)return k.ZP.error("Something went wrong"),[2];a.label=1;case 1:return a.trys.push([1,4,,5]),[4,null===h||void 0===h?void 0:h()];case 2:return[4,null===(e=a.sent())||void 0===e?void 0:e.wait()];case 3:return a.sent(),S(),[3,5];case 4:return a.sent(),k.ZP.error("User rejected a transaction or something went wrong"),[3,5];case 5:return[2]}}))}))).apply(this,arguments)}return(0,s.jsxs)("button",(0,b.Z)((0,x.Z)({onClick:function(){return C.apply(this,arguments)},className:"flex whitespace-nowrap rounded-xl bg-indigo-600 py-3 px-4 align-middle font-bold text-white"},a),{children:[(0,s.jsx)("img",{src:"".concat(i.basePath,"/assets/icons/pirate.png"),className:"mr-3 -mt-1 w-7",alt:""}),"Bury a treasure"]}))};var Y=function(e){var t=e.geoLocations,n=e.amount,a=O(t),i=I(t),o=new j.Wallet(a),c=(0,f.mA)().address,l=((0,f.KQ)({addressOrName:c}).data,(0,u.useRouter)()),d=function(e){var t=e.map((function(e){return[e.longitude,e.latitude].join("")})).join("");return _.Y0(t)}(t),m=o.signMessage(d);o.signMessage(d).then((function(e){j.verifyMessage(d,e)}));var p=(0,r.We)().openConnectModal,y=void 0===p?M:p,h=T("diggChest",{args:[i,N.parseEther("".concat(n||0)).toString(),m],overrides:{gasLimit:1e7}}),x=(h.data,h.isLoading,h.isSuccess,h.writeAsync);function b(){return(b=(0,g.Z)((function(){var e;return(0,w.__generator)(this,(function(s){switch(s.label){case 0:if(!c)return y(),[2];if(0===t.length)return k.ZP.error("No PINs were added"),[2];if(!n)return k.ZP.error("How much treasure you want to dig out? Enter amount!"),[2];if(i===a)return k.ZP.error("Something went wrong"),[2];s.label=1;case 1:return s.trys.push([1,4,,5]),[4,null===x||void 0===x?void 0:x()];case 2:return[4,null===(e=s.sent())||void 0===e?void 0:e.wait()];case 3:return s.sent(),S(),[3,5];case 4:return s.sent(),k.ZP.error("User rejected a transaction or something went wrong"),[3,5];case 5:return[2]}}))}))).apply(this,arguments)}return(0,s.jsxs)("button",{onClick:function(){return b.apply(this,arguments)},className:"flex w-[150px] rounded-xl bg-yellow-700 py-3 px-4 align-middle font-bold text-white",children:[(0,s.jsx)("img",{src:"".concat(l.basePath,"/assets/icons/shovel.svg"),className:"-my-1 mr-3 w-7",alt:""}),"Withdraw"]})};var A=function(){var e=(0,d.useState)(null),t=(e[0],e[1]);return(0,d.useEffect)((function(){}),[]),{createMap:function(e,n){var a=n.latitude,s=n.longitude;return new Promise((function(n){o().accessToken="pk.eyJ1IjoiZDNwb3J0aWxsbyIsImEiOiJja3ljam5qN24wcTBvMzBueGNtZ25mdXh0In0.KYOQ-CJFDcaEpyH-Ebe8iQ";var r=new(o().Map)({container:e,style:"mapbox://styles/mapbox/streets-v11",center:[s,a],zoom:15});t(r),n(r)}))}}},F=function(){var e=(0,h.sV)(),t=e.position,n=e.watching,i=e.watch,c=e.unwatch,p=A().createMap,g=(0,d.useRef)(null),x=(0,d.useState)([]),b=x[0],v=x[1],w=(0,d.useState)(0),j=w[0],N=w[1],k=(null===t||void 0===t?void 0:t.coords)||{},C=k.longitude,T=k.latitude,Z=(0,f.mA)().address,M=(0,u.useRouter)();(0,f.KQ)({addressOrName:Z}).data;return(0,d.useEffect)((function(){g.current&&t&&(p(g.current,{longitude:C,latitude:T}).then((function(e){e.addControl(new(o().NavigationControl));(new(o().Marker)).setLngLat([C,T]).addTo(e);e.addControl(new(o().GeolocateControl)({positionOptions:{enableHighAccuracy:!0},showUserLocation:!0,trackUserLocation:!0,showUserHeading:!0}))})),g.current=null)}),[g,t]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(l(),{children:[(0,s.jsx)("title",{children:"Pirate Cave"}),(0,s.jsx)("meta",{name:"description",content:"Generated by @rainbow-me/create-rainbowkit"}),(0,s.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,s.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:!0}),(0,s.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@300,500&display=swap",rel:"stylesheet"}),(0,s.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,s.jsxs)("section",{className:"h-screen md:flex",children:[(0,s.jsx)("div",{className:"h-64 grow md:h-full",children:(0,s.jsx)("div",{ref:g,className:"h-full w-full p-2 text-center",id:"map-render",children:"Loading..."})}),(0,s.jsxs)("div",{className:"z-10 py-5 px-4 md:px-10",children:[(0,s.jsx)("div",{className:"",children:(0,s.jsx)(r.NL,{})}),(0,s.jsxs)("div",{className:"mt-5 grid place-items-center",children:[(0,s.jsx)("div",{className:"mx-auto block w-3/12 md:mx-10",children:(0,s.jsx)("img",{src:"".concat(M.basePath,"/assets/icons/logotype.svg"),alt:""})}),(0,s.jsx)("h2",{className:"mx-3 text-2xl md:text-3xl",children:"Hide your crypto assets in a secret location"}),(0,s.jsx)("hr",{className:"my-5 w-full border-gray-600"})]}),(0,s.jsx)("article",{className:"mb-20",children:(0,s.jsxs)("article",{className:"",children:[(0,s.jsxs)("div",{className:"mb-6",children:[(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("hr",{className:"my-5 border-gray-600"}),(0,s.jsxs)("div",{className:"mb-2 flex items-center justify-between",children:[(0,s.jsx)("h4",{className:"inline font-bold",children:"Live location"}),(0,s.jsx)(y(),{className:"mx-2",checked:n,onChange:function(){n?c():i()}})]})]}),b.map((function(e,t){return(0,s.jsxs)("div",{className:"my-1 flex align-middle",children:[(0,s.jsx)("svg",{className:"mr-2 w-7 stroke-amber-50",version:"1.1",viewBox:"0 0 91 91",children:(0,s.jsx)("g",{children:(0,s.jsx)("path",{d:"M34.7,73.3V48.4l34.6-10.1c0.7-0.2,1.2-0.8,1.2-1.5s-0.4-1.4-1-1.7L33.7,20.5c-0.5-0.2-1.1-0.2-1.6,0.2 c-0.5,0.3-0.7,0.8-0.7,1.4v51.2H34.7z"})})}),(0,s.jsx)("input",{disabled:!0,onChange:function(){},className:"w-[200px] rounded-xl border-2 border-gray-200 p-2 text-black disabled:bg-gray-300",type:"text",value:[e.latitude,e.longitude].join(", "),placeholder:"Location"}),(0,s.jsx)("button",{onClick:function(){v((0,a.Z)(b.slice(0,t)).concat((0,a.Z)(b.slice(t+1,b.length))))},className:"bg-gray mx-2 flex rounded-md bg-red-600 px-3 align-middle text-white",children:(0,s.jsx)("img",{src:"".concat(M.basePath,"/assets/icons/remove.svg"),alt:"",className:"mt-3.5 -mb-1 w-5"})})]},t)})),(0,s.jsx)("div",{children:(0,s.jsxs)("button",{disabled:!t,className:"flex w-full items-center rounded-xl border-2 border-indigo-500 bg-indigo-600 p-2 px-4 font-bold text-white",onClick:function(){v((0,a.Z)(b).concat([{longitude:P(C).toFixed(3),latitude:P(T).toFixed(3)}]))},children:[(0,s.jsx)(m.HUq,{className:"text-xl"}),(0,s.jsx)("div",{className:"flex grow items-center justify-center",children:"PIN MY LOCATION"})]})}),0===b.length&&(0,s.jsx)("p",{className:"py-2 text-red-500",children:"No location stored"})]}),(0,s.jsxs)("div",{className:"mb-5",children:[(0,s.jsx)("hr",{className:"my-5 border-gray-600"}),(0,s.jsxs)("label",{children:[(0,s.jsx)("b",{children:"Amount (ETH):"}),(0,s.jsx)("div",{className:"mt-5",children:(0,s.jsx)("input",{placeholder:"0.00",className:"text-whit w-full border-b-2 bg-transparent p-2 outline-none focus:border-lime-500",type:"number",onChange:function(e){N(e.target.value)}})})]})]}),(0,s.jsxs)("article",{className:"mt-16 flex",children:[(0,s.jsx)("div",{className:"mb-5 mr-2",children:(0,s.jsx)(H,{amount:j,geoLocations:b})}),(0,s.jsx)("div",{className:"mb-5",children:(0,s.jsx)(Y,{amount:j,geoLocations:b})})]})]})})]})]})]})}}},function(e){e.O(0,[617,634,789,774,888,179],(function(){return t=48312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);