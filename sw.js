const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let gold = 100;
let units = [];

// ===== UNIT CLASS =====
class Unit {
  constructor(x,y,hp,atk,speed,color,type){
    this.x=x; this.y=y; this.hp=hp; this.atk=atk; this.speed=speed;
    this.color=color; this.type=type;
  }
  draw(){
    ctx.fillStyle=this.color;
    ctx.fillRect(this.x,this.y-30,15,30);
    // HP bar
    ctx.fillStyle="red";
    ctx.fillRect(this.x,this.y-35,15*(this.hp/50),3);
  }
  update(){
    this.x += this.speed; // đơn giản đi sang phải
  }
}

// ===== SPAWN UNIT =====
function buyUnit(type){
  if(type==='miner' && gold>=20){ gold-=20; units.push(new Unit(50,450,20,0,0,'brown','miner')); }
  if(type==='sword' && gold>=30){ gold-=30; units.push(new Unit(50,450,30,5,1,'blue','sword')); }
  if(type==='archer' && gold>=35){ gold-=35; units.push(new Unit(50,450,20,3,1.2,'green','archer')); }
  if(type==='mage' && gold>=50){ gold-=50; units.push(new Unit(50,450,15,7,0.8,'purple','mage')); }
  if(type==='giant' && gold>=80){ gold-=80; units.push(new Unit(50,450,80,10,0.5,'gray','giant')); }
  updateUI();
}

// ===== UPDATE UI =====
function updateUI(){
  document.getElementById("gold").innerText=gold;
}

// ===== GAME LOOP =====
function loop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  units.forEach(u=>{
    u.update();
    u.draw();
    // Miner tăng vàng
    if(u.type==='miner') gold += 0.1;
  });
  updateUI();
  requestAnimationFrame(loop);
}

// ===== START GAME =====
function startGame(){
  document.getElementById("menu").style.display='none';
  document.getElementById("game-container").style.display='block';
  loop();
}
