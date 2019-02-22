const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

function removeFromArray(array, item) {
    array.splice(array.indexOf(item), 1)
    return array
}

var playerState = {
    currentRoom : "",
    playerInventory : [],
    playerStatus : ""
}

let roomArray = ["182 Main St.", "182 Main St. - Foyer", "Church and Main", "Riley's Apartment", "Mr Mikes", "BCA Classroom"]

async function askToPlay (){
    console.log("Welcome to Zorkington!\nThis is an interactive video game developed by Monte Verde Media.")
    let start = await ask("Would you like to play?\n>_")
    if (start.includes("y") || start.includes("k")) {
        console.log("Cool! Before we start, let's make sure you understand the rules.\n 1) You control your character using verbs.\n 2) I can't answer any questions.\n 3) Don't use any punctuation in your commands.\n 4) Please type in all lowercase letters.\nThose are the only rules.")
        let understandRules = await ask("Do you understand the rules?\n>_")
            if (understandRules.toString().trim().toLowerCase() == "yes"){
                mainStreet1();
             } else {
                console.log("Ok, let's start over.")
                askToPlay();
             }
    } else {
        console.log("Alright then. Bye!")
        process.exit();
    }
}

async function mainStreet1(){
    playerState.currentRoom = "182 Main St."
    console.log("182 Main St.\nYou are standing on Main Street between Church and South Winooski.\nThere is a door here. A keypad sits on the handle.\nOn the door is a handwritten sign.")
    while (playerState.currentRoom === "182 Main St.") {
        let action = await ask(">_")
        let actionParsed = action.split(" ")
        if (action.includes("read")){
            console.log("The sign says 'Welcome to Burlington Code Academy!\nCome on up to the second floor.\nIf the door is locked, use the code 12345.'")
        } else if (action.includes("take")){
            console.log("That would be selfish. How will other students find their way?")
        } else if (action.includes("open")) {
            console.log("The door is locked. There is a keypad on the door handle.")
        } else if (action.includes("12345")) {
            console.log("Success! The door opens. You step inside and the door shuts behind you.")
            playerState.currentRoom = "182 Main St. - Foyer";
            foyer();
        } else if (actionParsed.includes("code") || actionParsed.includes("enter") || actionParsed.includes("key")) {
            console.log("Bzzzzt! That code is incorrect. The door is still locked.")
        } else if (action.includes("west")) {
            console.log("Ok, you walked West down Main Street. Now you're standing on the corner of Church and Main.")
            playerState.currentRoom = "Church and Main";
            churchSt()
        } else if (action.includes("east")) {
            console.log("Ok, you're walking east up Main Street.")
            playerState.currentRoom = "East";
            east()
        } else if (action.includes("inventory")){
            console.log("You are carrying:\n" + playerState.playerInventory)
        } else {
            console.log("Sorry, I don't know how to " + action)
        }
    }
}

async function foyer() {
    playerState.currentRoom = "182 Main St. - Foyer";
    console.log("You are in a foyer. Or maybe it's an antechamber.\nOr a vestibule. Or an entryway. Or an atrium.\nOr a narthex.\nBut let's forget all that fancy flatlander vocabulary \nand just call it a foyer. In Vermont, this is pronounced 'FO-ee-yurr.'\nA copy of Seven Days lies in a corner.")
    while (playerState.currentRoom === "182 Main St. - Foyer") {
        let action = await ask(">_")
        if (action.includes("take") || action.includes("read") || action.includes("pick")) {
            console.log("You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else does. Would you like to add it to your inventory?")
            let addPaper = await ask(">_")
            if (addPaper == "yes" || addPaper == "add") {
                playerState.playerInventory.push("A copy of Seven Days, Vermont's Alt-Weekly")
                console.log("Ok, it's been added to your inventory. To check your inventory, type 'inventory' or 'take inventory.'")
             } else {
                console.log("Ok, you set it back down and it has not been added to your inventory. What now?.") 
             }
        } else if (action.includes("inventory")){
            console.log("You are carrying:\n" + playerState.playerInventory)
        } else if (action.includes("drop")){
            playerState.playerInventory.delete("A copy of Seven Days, Vermont's Alt-Weekly");
            console.log("Ok, Seven Days has been removed from your inventory.")
        } else if (action.includes("out") || action.includes("back") || action.includes("leave")){
            console.log("Ok, you're back outside on Main St.");
            playerState.currentRoom = "182 Main St.";
            mainStreet1();
        } else if (action.includes("up") || action.includes("stairs")) {
            console.log("Ok, you've walked up the stairs and are now in the Burlington Code Academy classroom.")
            playerState.currentRoom = "BCA Classroom";
            classroom()
        } else {
            console.log("Sorry, I don't know how to " + action)
        }
    }
}

async function churchSt() {
    console.log("Wow, you made it to the bottom of Church St! Way to think outside the box. Where to now?")
    while (playerState.currentRoom === "Church and Main") {
        let action = await ask(">_");
        if (action.includes("jeremiah") || action.includes("riley")) {
            console.log("Cool! Walk up Church St to my apartment. I'll pour you a glass of wine when you get here :)")
            playerState.currentRoom = "Riley's Apartment"
            rileysApt()
        } else if (action.includes("shopping")) {
            console.log("Good call! I've hear there's some cool places to shop on Church St. Where do you want to go?")
            let shoppingDestination = await ask(">_")
            if (shoppingDestination.includes("studios")) {
                console.log("Nice! Vermont Woods Studios is a cool company.")
            } else {
                console.log("Sorry, the only viable place to shop in Vermont is Vermont Woods Studios.")
            }
        } else if (action.includes("bar") || action.includes("beer")){
            console.log("Good idea! I know a good spot. Let's go to Halvorson's.")
            process.exit()
        } else if (action.includes("up") || action.includes("north")) {
            console.log("Ok. Here's a few options for you:\n a) Go shopping\n b) Get a beer\n c) Meet my dog Jeremiah")
        } else if (action.includes("inventory")){
            console.log("You are carrying:\n" + playerState.playerInventory)
        } else {
            console.log("Sorry, you can't do that.")
        }
    }
}

async function rileysApt() {
    console.log("Thanks for coming over. Should we get naked?")
    while (playerState.currentRoom == "Riley's Apartment") {
        let action = await ask(">_")
        if (action == "yes") {
            console.log("The rest of this program contains graphic content. You've won the game.")
            process.exit()
        } else {
            console.log("Fine. Go somewhere else, then. Where to?\n" + roomArray)
            let destination = await ask(">_")
            if (destination.includes("foyer")) {
                playerState.currentRoom = "182 Main St - Foyer";
                foyer()
            } else if (action.includes("inventory")){
                console.log("You are carrying:\n" + playerState.playerInventory)
            } else {
                process.exit()
            }
        }
    }
}

async function east(){
    console.log("Where to?\n 1) Muddy Waters\n 2) Mr Mikes\n 3) Club Metronome\n 4) Back West")
    while (playerState.currentRoom == "East") {
        let action = await ask("<_")
        if (action.includes("1") || action.includes("mud")) {
            console.log("Ugh. Muddy's. Great choice. Hey, look, there's Alex Chaffee. Want to offer to buy him a cup of coffee?")
            let coffee = await ask(">_")
            if (coffee.includes("y")) {
                console.log("Cool. The coffee costs 1 copy of Seven Days.")
                if (playerState.playerInventory.includes("A copy of Seven Days, Vermont's Alt-Weekly")) {
                    console.log("Your copy of Seven Days has been removed from your inventory.")
                    removeFromArray(playerState.playerInventory, "A copy of Seven Days, Vermont's Alt-Weekly")
                    playerState.playerInventory.push("Coffee")
                    console.log("A cup of coffee has been added to your inventory.")
                    console.log("Alex is holding your hand and pulling you toward the BCA classroom.")
                    playerState.currentRoom = "BCA Classroom";
                    classroom();
                } else {
                    console.log("You don't have the adequate resources to purchase the coffee. They're kicking you out. Alex is still inside.")
                    east();
                }
            } else {
                console.log("Ok, well they're kicking you out then. Alex is still inside.")
                east();
            }
        } else if (action.includes("2") || action.includes("mike")) {
            console.log("Nice. Grab me a slice?")
            process.exit()
        } else if (action.includes("3") || action.includes("metro")) {
            console.log("Oh hells yeah. Let's party!")
            process.exit()
        } else if (action.includes("west") || action.includes("back")) {
            console.log("Ok, you're on your way back...");
            playerState.currentRoom = "182 Main St.";
            mainStreet1();
        } else if (action.includes("inventory")){
            console.log("You are carrying:\n" + playerState.playerInventory)
        } else {
            console.log("You can't go there.");
            east();
        } 
    }
}

async function classroom() {
    console.log("You're just in time for class. You can sit down or leave.")
    while (playerState.currentRoom == "BCA Classroom") {
        let action = await ask(">_")
        if (action.includes("leave") || action.includes("out") || action.includes("back")) {
            console.log("Ok, where do you want to go?\n" + roomArray)
            let destination = await ask (">_");
            if (destination.includes("foyer")){
                playerState.currentRoom = "182 Main St. - Foyer"
                foyer();
            } else if(destination.includes("out") || destination.includes("182")){
                console.log("Ok, let's go back outside.")
                playerState.currentRoom = "182 Main St.";
                mainStreet1();
            } else if (action.includes("inventory")){
                console.log("You are carrying:\n" + playerState.playerInventory)
            } else {
                console.log("Sorry, you can't get there from the classroom. Try something else.")
            }
        } else if (action.includes("inventory")){
            console.log("You are carrying:\n" + playerState.playerInventory)
        } else if (action.includes("sit") || action.includes("stay")) {
            if (playerInventory.includes("Coffee")) {
                console.log("Arrays and object and logic oh my!")
            } else {
                console.log("Alex begins the lecture:\n 'blahblahblahblahblahblahblahblahblah.'\nSounds like he needs some coffee.\nWhy don't you go down to Muddy's and grab him a cup.")
            }
        } else {
            console.log("Try something else.")
        }
    }

}


askToPlay();