// prettier-ignore
// eslint-disable-next-line
xxx=Function.prototype.bind.call(console.log,console),function(root,factory){var define=define||{};"function"==typeof define&&define.amd?define([],factory):"object"==typeof exports&&"object"==typeof module?module.exports=factory():"object"==typeof exports?exports.consoleColor=factory():root.consoleColor=factory()}(this,(function(){function consoleColors(namespace){namespace=namespace||{};const _log=window.console.log,_warn=window.console.warn,_clear=window.console.clear,baseStyles="border-radius:3px; padding: 0 3px;",colors={white:"white",black:"black",silver:"silver",gray:"gray",red:"#E86C5D",green:"#74ED7B",blue:"#3F6FFB",gold:"gold",yellow:"yellow",pink:"pink",cyan:"cyan"},lib={big:"font-size: 2em",bold:"font-weight: bold",italic:"font-style: italic",capitalize:"text-transform: capitalize",shadow:"text-shadow: -1px 1px rgba(0,0,0,.5)"};let styles=baseStyles;const proxyC=new Proxy(namespace,{get:(target,prop)=>prop in target?target[prop]:namespace}),define=(name,value)=>{Reflect.defineProperty(proxyC,name,{get:()=>(styles=styles+";"+("function"==typeof value?value():value),proxyC)})},getRandomProperty=function(obj){const keys=Object.keys(obj);return obj[keys[keys.length*Math.random()<<0]]},randomBg=v=>`background:${v||getRandomProperty(colors)}; padding:0 .6 0 0`,userColor=v=>"color:"+(v||getRandomProperty(colors));for(const key in colors){const bgKey="bg"+key.replace(/\b\w/g,c=>c.toUpperCase());lib[key]="color:"+colors[key],lib[bgKey]=`background:${colors[key]};`}for(const key in lib)define(key,lib[key]);function print(args,method){const isValid=(args=[...args]).some(v=>"string number boolean symbol undefined".includes(typeof v)||null===v),currentStyles=styles;return styles=baseStyles,isValid?method.bind(window.console,"%c "+args.join(" "),currentStyles):method.bind(window.console,...args)}return define("bg",randomBg),define("random",userColor),proxyC.log=function(){return print(arguments,_log)},proxyC.warn=function(){return print(arguments,_warn)},proxyC.clear=function(){_clear(),arguments[0]&&proxyC.log.apply(null,arguments),styles=baseStyles},proxyC.json=function(){const value=[...arguments].map(v=>JSON.stringify(v)).join(" \n\n ");proxyC.log.call(null,value),styles=baseStyles},proxyC}return consoleColors}));
