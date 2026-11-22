import{mkdirSync as D,readdirSync as R,readFileSync as F,writeFileSync as W}from'node:fs'
function run(G,N){
let S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),O=new Uint8Array(65536),n=G.length,p=0,k=0,g=0,t=0,l=0,q=0,a,b,v,s,E=e=>[O.subarray(0,l),e]
for(;;){
if(t==1e6)return E(10)
if(g<0||g>=n)return E(9)
let c=G[g],B=c>15&c<35&c!=31
if(!(c<8|B|c>47&c<53|c==64|c==65|c>79&c<84))return E(5)
let m=c==1?1:c==2?4:c>47&c<52?2:0
if(g+m>=n)return E(9)
t++
let x=g+1+m,u=c==7?3:(B&c!=23&c!=27)|c==5|c==6|c==65?2:c>2&c<5|c==23|c==27|c>48&c<51|c==64|c>79&c!=82?1:0,h=c>5&c<8?3:c>3&c<6?2:c==1|c==2|B|c==64|c==82?1:0
if(p<u|p-u+h>256)return E(p<u?2:3)
g=x
if(c==1)S[p++]=G.readInt8(x-1)
else if(c==2)S[p++]=G.readInt32LE(x-4)
else if(c==3)p--
else if(c==4|c==6)S[p]=S[p-1-(c==6)],p++
else if(c==5)v=S[p-1],S[p-1]=S[p-2],S[p-2]=v
else if(c==7)v=S[p-3],S[p-3]=S[p-2],S[p-2]=S[p-1],S[p-1]=v
else if(c==23|c==27)S[p-1]=c==23?-S[p-1]:~S[p-1]
else if(B){b=S[p-1];a=S[p-2];if(!b&&c>18&&c<23)return E(4);S[p-2]=c==16?a+b:c==17?a-b:c==18?Math.imul(a,b):c==19?a/b:c==20?a%b:c==21?Math.floor((a>>>0)/(b>>>0)):c==22?(a>>>0)%(b>>>0):c==24?a&b:c==25?a|b:c==26?a^b:c==28?a<<b:c==29?a>>b:c==30?a>>>b:c==32?a==b:c==33?a<b:(a>>>0)<(b>>>0);p--}
else if(c>47&c<51){let r=G.readInt16LE(x-2);if(c==48||(S[--p]==0)==(c==49))g=x+r}
else if(c==51){if(k==64)return E(7);C[k++]=x;g=G[x-2]|G[x-1]<<8}
else if(c==52){if(!k)return E(8);g=C[--k]}
else if(c>63&c<66){a=S[p-1];if(a<0|a>255)return E(6);if(c==64)S[p-1]=M[a];else M[a]=S[p-2],p-=2}
else if(c==80){s=''+S[p-1];if(l+s.length>65536)return E(11);for(let j of s)O[l++]=j.charCodeAt();p--}
else if(c==81){if(l==65536)return E(11);O[l++]=S[--p]&255}
else if(c==82)S[p++]=N[q++]??-1
else return E(c?S[p-1]&255:0)
}
}
let{MAKEFUN_INPUT_DIR:J='/input',MAKEFUN_OUTPUT_DIR:Y='/output'}=process.env
for(let d of R(J)){let a=J+'/'+d,o=Y+'/'+d,r=run(F(a+'/program.bin'),F(a+'/input.bin'));D(o,{recursive:true});W(o+'/stdout.bin',r[0]);W(o+'/exit.txt',''+r[1])}
