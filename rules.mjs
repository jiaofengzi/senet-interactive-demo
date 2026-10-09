export const RULES_SOURCE='https://www.museumofgaming.org.uk/RULES-Senet.pdf';
export function scoreSticks(faces){if(faces.length!==4||faces.some(x=>typeof x!=='boolean'))throw new Error('需要四根掷棒');const count=faces.filter(Boolean).length;return {unpainted:count,score:count||5,extra:[0,1,4].includes(count)};}
export function position(n){if(!Number.isInteger(n)||n<1||n>30)throw new Error('格号须为1至30');const row=Math.floor((n-1)/10), i=(n-1)%10;return {row,col:row===1?9-i:i};}
export function isProtected(board,n){const p=board[n];return !!p&&([15,26].includes(n)||board[n-1]===p||board[n+1]===p);}
export function move(board,from,steps){
 if(!board[from])return {ok:false,reason:'empty'};
 if(!Number.isInteger(steps)||steps<1||steps>5)return {ok:false,reason:'score'};
 const to=from+steps,owner=board[from],next={...board};
 if(to>30){if(from>=28&&to===31){delete next[from];return {ok:true,board:next,event:'exit',from,to:31};}return {ok:false,reason:'exact_exit'};}
 if(board[to]===owner)return {ok:false,reason:'own'};
 if(board[to]&&isProtected(board,to))return {ok:false,reason:'protected'};
 if(to===27&&board[15]&&from!==15)return {ok:false,reason:'unspecified_rebirth'};
 if(board[to]&&to>=28&&board[15]&&from!==15)return {ok:false,reason:'unspecified_rebirth'};
 delete next[from];let event='move';
 if(board[to]){if(to>=28){next[15]=board[to];event='end_capture';}else{next[from]=board[to];event='swap';}}
 next[to]=owner;
 if(to===27){delete next[27];next[15]=owner;event='water';}
 return {ok:true,board:next,event,from,to};
}
