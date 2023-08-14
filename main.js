export class Achievement {
  $name;
  $description;
  constructor(name, description) {
    this.$name = name;
    this.$description = description;
  }
  get name() {
    return this.$name;
  }
  get description() {
    return this.$description;
  }
}

export class Player {
  $name;
  $achievementsArray;
  get achArray() {
    return this.$achievementsArray;
  }

  set achArray(achArray) {
    this.$achievementsArray = achArray;
  }

  get name() {
    return this.$name;
  }

  async shit(player) {
    return new Promise(function (valasz) {
      return fetch("sr.txt")
        .then((res) => res.text())
        .then((text) => {
          player.$achievementsArray = generate(text);
          return valasz(generate(text));
        });
    });
  }

  constructor(who) {
    this.$name = who;
    fetch(who+".txt")
      .then((response) => response.text())
      .then((data) => {
        this.$achievementsArray = generate(data);
      });
  }
}
function generate(text) {
  let lines = text.split("\n");
  let AchArray = [];
  for (let ix = 0; ix < lines.length; ix += 3) {
    AchArray.push(new Achievement(lines[ix], lines[ix + 1]));
  }
  return AchArray;
}

function print(text) {
  let tmp = "<tbody>";
  for (let ix = 0; ix < text.length; ix++) {
    tmp += `<tr><td>${text[ix].name}</td><td>${text[ix].description}</td></tr>`;
  }
  $("table").eq(0).html("<thead><tr><th>Name</th><th>Description</th></tr></thead>"+tmp+"</tbody>");
}

function search(players) {
  let tmpList = players[0].achArray.slice();
  for (let hx = 1; hx < players.length; hx++)
    for (let ix = 0; ix < players[hx].achArray.length; ix++) {
      let jx = 0;
      while (
        jx < tmpList.length &&
        players[hx].achArray[ix].name != tmpList[jx].name
      )
        jx++;
        //console.log("ix: ", ix,"jx: ", jx);
      if (jx >= tmpList.length) tmpList.splice(ix, 1);
    }
  print(tmpList);
}

function buttonToggle(players) {
  let names = players.slice();
  for (let ix = 0; ix < names.length; ) {
    if (!$("#" + names[ix].name).prop("checked")) names.splice(ix, 1);
    else ix++;
  }
  search(names);
}

function load() {
  setTimeout(() => {
    //I hate this shit and I won't fix this shit, I've already spent 6 hours for this shit. I hate you JS <3
  }, 1000);

  $(() => {
    for (let ix = 0; ix < 4; ix++) {
      $("input")
        .eq(ix)
        .click(() => {
          buttonToggle(names);
        });
    }
  });
}

let a = new Player("sr");
let ab = new Player("ba");
let names = [
  new Player("sr"),
  new Player("ba"),
  new Player("be"),
  new Player("bo"),
];
load();
