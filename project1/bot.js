function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

// MY BOT
function goalOrientedRobotOPT({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      for (const p of parcels) {
        parcel =
          findRoute(roadGraph, place, parcel.place).length <
          findRoute(roadGraph, place, p.place).length
            ? parcel
            : p;
      }
    } else {
      for (const p of parcels) {
        parcel =
          findRoute(roadGraph, place, parcel.address).length <
          findRoute(roadGraph, place, p.address).length
            ? parcel
            : p;
      }
    }

    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

function lazyRobot({ place, parcels }, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return {
          route: findRoute(roadGraph, place, parcel.place),
          pickUp: true
        };
      } else {
        return {
          route: findRoute(roadGraph, place, parcel.address),
          pickUp: false
        };
      }
    });

    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    function score({ route, pickUp }) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
  }

  return { direction: route[0], memory: route.slice(1) };
}

function countSteps(state, robot, memory) {
  for (let steps = 0; ; steps++) {
    if (state.parcels.length == 0) return steps;
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2, robot3, memory3) {
  let total1 = 0,
    total2 = 0,
    total3 = 0;
  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    total1 += countSteps(state, robot1, memory1);
    total2 += countSteps(state, robot2, memory2);
    total3 += countSteps(state, robot3, memory3);
  }
  return `
  <p>Average</p>
  <p>My Bot: ${total1 / 100} steps</p>
    <p>goalOrientedRobot: ${total2 / 100} steps</p><p>lazyRobot: ${total3 /
    100} steps</p>`;
}
console.log(
  compareRobots(goalOrientedRobotOPT, [], goalOrientedRobot, [], lazyRobot, [])
);

document.getElementById("main").innerHTML = compareRobots(
  goalOrientedRobotOPT,
  [],
  goalOrientedRobot,
  [],
  lazyRobot,
  []
);

runRobotAnimation(VillageState.random(), goalOrientedRobotOPT, []);
