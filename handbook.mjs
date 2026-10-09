export function portraitPosition(n){if(!Number.isInteger(n)||n<1||n>30)throw new Error('格号须为1至30');const row=Math.floor((n-1)/10),col=row===1?9-(n-1)%10:(n-1)%10;return {row:col,col:2-row};}
export function swipeDirection(dx,dy,duration){if(duration>850||Math.abs(dx)<55||Math.abs(dx)<Math.abs(dy)*1.6)return 0;return dx<0?1:-1;}
