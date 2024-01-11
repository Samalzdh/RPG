
import { Character, Fighter, Paladin, Monk, Berzerker, Assassin, Wizard } from './character.js';

class Game {
  constructor(players) {
    this.players = players;
    this.turnLeft = 10;
  }


  startGame() {
    console.log("Le jeu commence !");
    while (this.turnLeft > 0 && this.players.filter(player => player.status !== "dead").length > 1) {
      this.startTurn();
      this.players = this.shuffle(this.players);
      this.playTurn();
      this.skipTurn();
      this.checkEndGame();
    }
  }
  
  playTurn() {
    this.players.forEach(player => {
      if (player.status !== "dead") {
        console.log(`-> C'est au tour de ${player.name} de jouer.`);
        let randomPlayer = this.getRandomPlayer(player);
        if (player.name === "Axel le beau") {
          let action;
          do {
            action = prompt("Tu préfères attaquer ou utiliser ton attaque spéciale ? Tu peux consulter les stats avec w (a/s/w)");
            if (action === "a") {
              this.performAttack(player, randomPlayer);
            } else if (action === "s") {
              this.performSpecialAttack(player, randomPlayer);
            } else if (action === "w") {
              this.watchStats();
            }
          } while (action === "w"); // si l'utilisateur choisit "w", demander à nouveau une action
        } else {
          this.performAttack(player, randomPlayer);
        }
      }
    });
  }
  
  getRandomPlayer(currentPlayer) {
    let playersAlive = this.players.filter(p => p.status !== "dead" && p !== currentPlayer);
    let randomPlayer;
    do {
      randomPlayer = playersAlive[Math.floor(Math.random() * playersAlive.length)];
    } while (randomPlayer.status === "dead");
    return randomPlayer;
  }
  
  performAttack(player, target) {
    let randomAttack = Math.random();
    if (randomAttack < 0.5 || player.mana < player.spellCost) {
      player.dealDamage(target);
      console.log(`${player.name} fait une attaque normale sur ${target.name} et lui inflige ${player.dmg} points de dégâts !`);
    } else {
      this.performSpecialAttack(player, target);
    }
  }
  
  performSpecialAttack(player, target) {
    switch (player.constructor.name) {
      case "Fighter":
        player.darkVision(target);
        break;
      case "Paladin":
        player.healingLighting(target);
        break;
      case "Monk":
        player.heal();
        break;
      case "Berzerker":
        player.rage();
        break;
      case "Assassin":
        player.shadowHit(target);
        break;
      case "Wizard":
        player.fireball(target);
        break;
    }
  }
  

  // Tirage aléatoire des joueurs 
  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // Tant qu'il reste des éléments à mélanger
    while (0 !== currentIndex) {
      // Prendre un élément restant
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // Et échanger avec l'élément actuel
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    // Renvoyer le tableau mélangé
    return array;
  }

  startTurn() {
    console.log("------ > ROUND " + (10 - this.turnLeft + 1) + " < ------");
  }

  skipTurn() { 
    console.log("------------------------ FIN DU ROUND ------------------------------");
    this.players.forEach(player => {
      player.resetReduceDamage();
    });
    this.turnLeft -= 1;
  }

  watchStats() {
    console.log(axel);
    console.log(lalaina);
    console.log(alex);
    console.log(sam);
    console.log(louis);
    console.log(greg);
  }

  checkEndGame() {
    let alivePlayers = this.players.filter(player => player.status === "alive");

    if (this.turnLeft === 0) {
      let winner = alivePlayers.reduce((prev, current) => (prev.hp > current.hp) ? prev : current);
      console.log(`Le gagnant est ${winner.name} avec ${winner.hp} points de vie restants !`);
    } else if (alivePlayers.length === 1) {
      console.log(`Le gagnant est ${alivePlayers[0].name} !`);
    }
  }
}

document.getElementById('attackButton').addEventListener('click', function() {
  game.playerTurn('attack');
});

document.getElementById('specialAttackButton').addEventListener('click', function() {
  game.playerTurn('specialAttack');
});

document.getElementById('statsButton').addEventListener('click', function() {
  game.watchStats();
});



let axel = new Fighter("Axel le beau");
let lalaina = new Paladin("Lalaina la belle");
let alex = new Monk("Alex la chipo");
let sam = new Berzerker("Sam la merguez");
let louis = new Assassin("Louis la chips");
let greg = new Wizard("Greg le pieton");

let game = new Game([axel, lalaina, alex, louis, sam, greg]);

game.startGame();

