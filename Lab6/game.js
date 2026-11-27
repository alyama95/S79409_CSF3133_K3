// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

	// Starts the game after validating the player's name
	function startGame() {
		const nameInput = document.getElementById("playerName").value.trim();

		if (nameInput == "") {
			alert("Please enter your name.");
			return;
		}

		gameStarted = true;
		document.getElementById("welcomeMessage").innerHTML = "Welcome, " + nameInput + "!";
		document.getElementById("startTime").innerHTML = "Started on: " + new Date();
	}

	// Randomly selects rock, paper, or scissors for the computer
	function getComputerChoice() {
		const choices = ["rock", "paper", "scissors"];
		const randomIndex = Math.floor(Math.random() * 3);
		return choices[randomIndex];
	}

	// Plays one round, updates images, score, result colour, and history table
	function playRound(playerChoice) {
		if (!gameStarted) {
			alert("Click Start Game first.");
			return;
		}

		const computerChoice = getComputerChoice();

		// Update player and computer images
		document.getElementById("playerImg").src = playerChoice + ".png";
		document.getElementById("computerImg").src = computerChoice + ".png";

		let outcomeText = "";
		let outcomeRecord = "";
		let textColor = "";

		// Determine winner using if...else
		if (playerChoice == computerChoice) {
			draws++;
			outcomeText = "It's a Draw! Both chose " + playerChoice + ".";
			outcomeRecord = "Draw";
			textColor = "grey";
		}
		else if ((playerChoice === "rock" && computerChoice === "scissors") || (playerChoice === "scissors" && computerChoice === "paper") || (playerChoice === "paper" && computerChoice === "rock")) {
			wins++;
			outcomeText = "You Win! " + playerChoice + " beats " + computerChoice + ".";
			outcomeRecord = "Win";
			textColor = "green";
		} 
		else {
			losses++;
			outcomeText = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
			outcomeRecord = "Lose";
			textColor = "red";
		}

		// Update result text and colour
		const resultEl = document.getElementById("result");
		resultEl.innerHTML = outcomeText;
		resultEl.style.color = textColor;

		// Update scoreboard spans
		document.getElementById("wins").innerHTML = wins;
		document.getElementById("losses").innerHTML = losses;
		document.getElementById("draws").innerHTML = draws;

		// Store result and append row to history table
		results.push(outcomeRecord);
		roundCount++;

		document.getElementById("history").innerHTML +=
			"<tr>" +
				"<td>" + roundCount + "</td>" +
				"<td>" + playerChoice + "</td>" +
				"<td>" + computerChoice + "</td>" +
					"<td style='color:" + textColor + "; font-weight:bold;'>" + outcomeRecord + "</td>" +
				"</tr>";
	}

	// Loops through results to compute total rounds and rounded win percentage
	function showSummary() {
		const totalRounds = results.length;

		if (totalRounds == 0) {
			document.getElementById("summary").innerHTML = "You have not played any rounds yet.";
			return;
		}

		let winCount = 0;
		for (let i = 0; i < results.length; i++) {
			if (results[i] === "Win") {
				winCount++;
			}
		}

		const winPercentage = Math.round((winCount / totalRounds) * 100);
		document.getElementById("summary").innerHTML =
			"You played " + totalRounds + " rounds and won " + winPercentage + "%.";
	}

	// Resets scores, history table, result message, and results array
	function resetGame() {
		wins = 0;
		losses = 0;
		draws = 0;
		roundCount = 0;
		results = [];

		document.getElementById("wins").innerHTML = 0;
		document.getElementById("losses").innerHTML = 0;
		document.getElementById("draws").innerHTML = 0;
		document.getElementById("result").innerHTML = "";
		document.getElementById("result").style.color = "";
		document.getElementById("summary").innerHTML = "";

		// Clear all rows except the header row
		document.getElementById("history").innerHTML =
			"<tr>" +
				"<th>Round</th>" +
				"<th>You</th>" +
				"<th>Computer</th>" +
				"<th>Result</th>" +
			"</tr>";
		}