//initialization -------------------------------------------------//
const stats ={
  potatoes: 3,
  destiny: 0,
  orcs: 0
}

let potatoesToRemoveOrcs = 1;

const garden_actions = [
  {
    result: 1,
    text: "You happily root about all day in your garden.",
    gains: {
      potatoes: 1
    },
    losses:{

    }
  },
  {
    result: 2,
    text: "You narrowly avoid a visitor by hiding in a potato sack.",
    gains: {
      potatoes: 1,
      destiny: 1
    },
    losses:{

    }
  },
  {
    result: 3,
    text: "A hooded stranger lingers outside your farm.",
    gains: {
      orcs: 1,
      destiny: 1
    },
    losses:{

    }
  },
  {
    result: 4,
    text: "Your field is ravaged in the night by unseen enemies.",
    gains: {
      orcs: 1
    },
    losses:{
      potatoes: 1
    }
  },
  {
    result: 5,
    text: "You trade potatoes for other delicious foodstuffs.",
    gains: {
    },
    losses:{
      potatoes: 1
    }
  },
  {
    result: 6,
    text: "You burrow into a bumper crop of potatoes. Do you cry with joy? Possibly.",
    gains: {
      potatoes: 2
    },
    losses:{

    }
  }
]

const knock_actions = [
  {
    result: 1,
    text: "A distant cousin. They are after your potatoes. They may snitch on you.",
    gains: {
      orcs: 1
    },
    losses:{

    }
  },
  {
    result: 2,
    text: "A dwarven stranger. You refuse them entry. Ghastly creatures.",
    gains: {
      destiny: 1
    },
    losses:{

    }
  },
  {
    result: 3,
    text: "A wizard strolls by. You pointedly draw the curtains.",
    gains: {
      orcs: 1,
      destiny: 1
    },
    losses:{

    }
  },
  {
    result: 4,
    text: "There are rumors of war in the reaches. You eat some potatoes.",
    gains: {
      orcs: 2
    },
    losses:{
      potatoes: 1
    }
  },
  {
    result: 5,
    text: "It's an elf. They are not serious people.",
    gains: {
      destiny: 1
    },
    losses:{

    }
  },
  {
    result: 6,
    text: "It's a sack of potatoes from a generous neighbor. You really must remember to pay them a visit one of these years.",
    gains: {
      potatoes: 2,
    },
    losses:{

    }
  }
]

createStatDisplay();

//actions -------------------------------------------------//
function roll(){
  const result = rolld6();
  if (result <= 2) {
    updateLog("You enter your garden.", "italic");
    rollAction("garden");
  } else if (result <= 4) {
    updateLog("You hear a knock at your door.", "italic");
    rollAction("knock");
  } else {
    potatoesToRemoveOrcs +=1;
    document.getElementById("trade").textContent = "Trade " + potatoesToRemoveOrcs + " potatoes to remove 1 Orc";
    updateLog("The world is growing darker.", "italic"); 
    updateLog("It now requires " + potatoesToRemoveOrcs + " potatoes to stave off orcs.");
  }

  updateStatDisplay();
  checkForEndCondition();  
  return result;
}

function checkForEndCondition(){

  if (stats.potatoes >= 10){
      updateLog("You have become a successful potato farmer.");
      updateLog("THE END");
     
  } else if (stats.destiny >=10) {
      updateLog("You are recruited by a wizard for a magical adventure.");
      updateLog("THE END");
      
  } else if (stats.orcs >= 10){
      updateLog("You have been eaten by orcs. :(")
      updateLog("THE END");
      
  } else {   
      return false;
  }

  document.getElementById('trade').removeEventListener("click", trade);
  document.getElementById('roll').removeEventListener("click", roll);
    
  const actions = document.getElementById("actions");
  const restart = document.createElement("button");
  restart.textContent = "New Game";
  restart.addEventListener("click", (e)=>{location.reload()})
  actions.appendChild(restart);
  
  return true;
}

function trade(){
  if (stats.potatoes >= potatoesToRemoveOrcs){
    stats.potatoes -= 1 * potatoesToRemoveOrcs;
    stats.orcs -= 1;
    updateStatDisplay()
  }
  
}

function rolld6(){
  return Math.floor(Math.random() * (6 - 1) + 1);
}

function rollAction(action_type){
  const result = rolld6();

  let action;
  if (action_type === "garden"){
    action = garden_actions[result];
  } else {
    action = knock_actions[result];
  }

  for (const[key,value] of Object.entries(action.gains)){
    stats[key] += value;
  }
  for (const[key,value] of Object.entries(action.losses)){
    if (stats[key] - value > 0){
      stats[key] -= value;
    } else {
      stats[key] = 0;
    }

  }

  
  updateLog(action.result + ": " + action.text);
}

document.getElementById("trade").addEventListener("click", trade);
document.getElementById("roll").addEventListener("click", roll);

//views--------------------------------------------------------//

function updateStatDisplay(){
  Object.keys(stats).forEach(key => {
    const currentStat = document.getElementById(key);
    Array.from(currentStat.children).forEach((child, index) =>{
      if (index+1 <= stats[key] && !child.classList.contains("filled")){
        child.classList.add("filled");
        child.classList.remove("empty")
      }
    })
  })  
}

function createStatDisplay(){
  Object.keys(stats).forEach(key =>{
    const currentStat = document.getElementById(key);
    for (let i = 1; i <=10; i++){
      const newStatBox = document.createElement("div");
      newStatBox.classList.add("empty");
      currentStat.append(newStatBox);
    }
  })
  updateStatDisplay();
}

function updateLog(text, className){
  const log = document.getElementById("log");
  const newLogEntry = document.createElement("div");
  newLogEntry.textContent = text;
  if (className){
    newLogEntry.classList.add(className);
  }
  log.appendChild(newLogEntry);
  log.scrollTo(0, log.scrollHeight);
}
