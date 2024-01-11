export { Character, Fighter, Paladin, Monk, Berzerker, Assassin, Wizard };

class Character {
  constructor(name, hp, dmg, mana) {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.status = "alive";
  }

  takeDamage(damage) {
    if (this.reduceDamage) {
      damage -= this.reduceDamage;
    }
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.status = "dead";
    }
  }

  dealDamage(target) {
    if (target.status !== "dead") {
      target.takeDamage(this.dmg);
      if (target.status === "dead") {
        this.mana += 20;
      }
    }
  } 

  resetReduceDamage() {
    this.reduceDamage = null
  }
}



class Fighter extends Character {
  constructor(name) {
    super(name, 12, 4, 40);
    this.spellCost = 20;
  }

  darkVision(target) {
    if (this.mana >= this.spellCost) {
      console.log(`${this.name} utilise son attaque spéciale Dark Vision sur ${target.name} !`)
      this.mana -= this.spellCost;
      target.takeDamage(5);
      console.log(`${target.name} perd 5 pv et réduis les dégats de 2 pour le tour !`)
      this.reduceDamage = 2;
    }
    else {
      console.log(`${this.name} croit pouvoir faire son attaque spéciale mais QUE NENI, il n'a pas assez de mana...`)
    }
  }
}

class Paladin extends Character {
  constructor(name) {
    super(name, 16, 3, 160);
    this.spellCost = 40;
  }

  healingLighting(target) {
    if (this.mana >= this.spellCost) {
      console.log(`${this.name} utilise son attaque spéciale Healing Lighting !`)
      this.mana -= this.spellCost;
      target.takeDamage(4);
      if (this.hp = 16) {
        console.log(`${target.name} perd 4 pv`)
        target.hp -= 4;
      }
      else if (this.hp >= 11) {
        console.log(`${target.name} perd 4 pv et ${this.name} se soigne entièrement récupère ${16 - this.hp} pv.`)
        this.hp = 16;
        target.hp -= 4;
      }
      else {
        console.log(`${target.name} perd 4 pv et ${this.name} se soigne de 5 pv.`)
        this.hp += 5;
        target.hp -= 4;
      }
    }
    else {
      console.log(`${this.name} croit pouvoir faire son attaque spéciale mais QUE NENI, il n'a pas assez de mana...`)
    }
  }
}

class Monk extends Character {
  constructor(name) {
    super(name, 8, 2, 200);
    this.spellCost = 25;
  }

  heal() {
    if (this.mana >= this.spellCost) {
      console.log(`${this.name} utilise son attaque spéciale Heal !`)
      this.mana -= this.spellCost;
      if (this.hp = 8) {
        console.log(`Il ne se passe rien... ${this.name} est déjà au max de ses pv.`)
      }
      else if (this.hp >= 1) {
        this.hp = 8;
        console.log(`${this.name} régénère sa vie entièrement en récupérant ${8 - this.hp} pv.`)
      }
    }
    else {
      console.log(`${this.name} croit pouvoir faire son attaque spéciale mais QUE NENI, il n'a pas assez de mana...`)
    }
  }
}

class Berzerker extends Character {
  constructor(name) {
    super(name, 12, 4, 0);
    this.spellCost = 0;
  }

  rage() {
    console.log(`${this.name} utilise son attaque spéciale Rage !`)
    this.dmg += 1;
    this.hp -= 1;
    console.log(`${this.name} perd 1 pv et inflige désormais 1 dégat supplémentaire!`)
  }
}

class Assassin extends Character {
  constructor(name) {
    super(name, 6, 6, 20);
    this.spellCost = 20;
  }

  shadowHit(target) {
    if (this.mana >= this.spellCost) {
      console.log(`${this.name} utilise son attaque spéciale Shadow Hit !`)
      this.mana -= this.spellCost;
      if (target.hp <= 7) {
        console.log(`${target.name} perd 7 pv et meurt. ${this.name} est insensible pour le tour.`)
        this.reduceDamage = 100;
        target.status = "dead";
      }
      else {
        console.log(`${this.name} se suicide, dommage bouffon!`)
        this.hp = 0
        this.status = "dead"
      }
    }
    else {
      console.log(`${this.name} croit pouvoir faire son attaque spéciale mais QUE NENI, il n'a pas assez de mana...`)
    }
  }
}

class Wizard extends Character {
  constructor(name) {
      super(name, 10, 2, 200); 
      this.spellCost = 25;
  }

  fireball(target) {
    if (this.mana >= 25) {
        console.log(`${this.name} lance une boule de feu sur ${target.name}!`);
        target.takeDamage(7); 
        this.mana -= 25; 
    } else {
        console.log(`${this.name} n'a pas assez de mana pour lancer une boule de feu!`);
    }
  }
}