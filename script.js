console.log("javascript loaded");

let potatoes = 0;
let destiny = 0;
let orcs = 0;

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
    text: "You narrowly avoid a visitor by hiding in a potato sack.",
    gains: {
      potatoes: 1,
      destiny: 1
    },
    losses:{

    }
  },
  {
    result: 4,
    text: "You narrowly avoid a visitor by hiding in a potato sack.",
    gains: {
      potatoes: 1,
      destiny: 1
    },
    losses:{

    }
  },
  {
    result: 5,
    text: "You narrowly avoid a visitor by hiding in a potato sack.",
    gains: {
      potatoes: 1,
      destiny: 1
    },
    losses:{

    }
  },
  {
    result: 6,
    text: "You narrowly avoid a visitor by hiding in a potato sack.",
    gains: {
      potatoes: 1,
      destiny: 1
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
    text: "You narrowly avoid a visitor by hiding in a potato sack.",
    gains: {
      potatoes: 1,
      destiny: 1
    },
    losses:{

    }
  },
  {
    result: 4,
    text: "You narrowly avoid a visitor by hiding in a potato sack.",
    gains: {
      potatoes: 1,
      destiny: 1
    },
    losses:{

    }
  },
  {
    result: 5,
    text: "You narrowly avoid a visitor by hiding in a potato sack.",
    gains: {
      potatoes: 1,
      destiny: 1
    },
    losses:{

    }
  },
  {
    result: 6,
    text: "You narrowly avoid a visitor by hiding in a potato sack.",
    gains: {
      potatoes: 1,
      destiny: 1
    },
    losses:{

    }
  }
]
function rolld6(){
  return (Math.floor(Math.random() * 5)) + 1;
}


function roll(){
  const result = rolld6();
  if (result <= 2) rollAction("garden");
  else if (result <= 4) rollAction("knock");
  else {
    potatoesToRemoveOrcs +=1;
  }
  return result;
}

function trade(){
  potatoes -= 1 * potatoesToRemoveOrcs;
  orcs -= 1;
}

function rollAction(action_type){
  const result = rolld6()-1;
  if (action_type === "garden"){
    const action = garden_actions[result];
  } else {
    const action = knock_actions[result];
  }
  for (const key,value) of Object.entries(action.gains){
    window[key] += value;
  }
  for (const key,value) of Object.entries(action.losses){
    window[key] -= value;
  }
}