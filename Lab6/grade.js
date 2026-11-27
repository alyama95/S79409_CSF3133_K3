// Error 1 (grade.html, Line 19): Script src pointed to "grades.js" instead of "grade.js".
// Error 2 (grade.html, Line 9): onsubmit="checkMark()" did not return false, causing page reload and clearing result.
// Error 3 (grade.html, Line 16): onclick="showtable()" had wrong casing (should be showTable()).
// Error 4 (grade.js, Line 2): Missing '=' in `let name = ...`.
// Error 5 (grade.js, Line 3): Missing '=' and used ')' instead of ']' in `["mark"]`.
// Error 6 (grade.js, Line 4 & 6): Used '=' instead of '===' for comparison and missed closing '}' before next if.
// Error 7 (grade.js, Line 7): Used `isNan` instead of `isNaN`.
// Error 8 (grade.js, Line 14): Used `&&` instead of `||` for out-of-range mark check.
// Error 9 (grade.js, Line 16): Missing '=' in `mark = parseInt(mark, 10);`.
// Error 10 (grade.js, Line 23): Missing ')' in `else if (mark >= 50)`.
// Error 11 (grade.js, Line 24): Lowercase "c" instead of "C" and missing semicolon.
// Error 12 (grade.js, Line 26): Missing '=' in `grade = "F";`.
// Error 13 (grade.js, Line 28): Used `getElementByID` instead of `getElementById`.
// Error 14 (grade.js, Line 29): Missing quotes around `" got grade "`.
// Error 15 (grade.js, Line 30): Used `style.colour` instead of `style.color`.
// Error 16 (grade.js, Line 38): Loop started at `i = 1` instead of `i = 0`, skipping grade "A".
// Error 17 (grade.js, Line 39-40): Missing `"</td></tr>";` and `tableHTML += "</table>";` was inside the loop.
// Error 18 (grade.js, Line 43): Used `.innerHtml` instead of `.innerHTML`.

function checkMark() {
	const name = document.forms["gradeForm"]["name"].value.trim();
	const markRaw = document.forms["gradeForm"]["mark"].value.trim();

	if (name == "") {
		alert("Name must be filled out.");
		return false;
	}

	// Extension: Check for empty mark field
	if (markRaw === "") {
		alert("Mark field cannot be empty.");
		return false;
	}

	if (isNaN(markRaw)) {
		alert("Please enter a valid numeric value.");
		return false;
	}

	const mark = Number(markRaw);

	if (mark < 0 || mark > 100) {
		alert("Mark must be between 0 and 100.");
		return false;
	}

	let grade;
	
	if (mark >= 80) {
		grade = "A";
	} 
	else if (mark >= 65) {
		grade = "B";
	} 
	else if (mark >= 50) {
		grade = "C";
	} 
	else {
		grade = "F";
	}

	// Extension: Set result colour by grade (green for A/B, orange for C, red for F)
	let resultColor;
	
	if (grade == "A" || grade == "B") {
		resultColor = "green";
	} 
	else if (grade === "C") {
		resultColor = "orange";
	} 
	else {
		resultColor = "red";
	}

	const resultEl = document.getElementById("result");
	resultEl.innerHTML = name + " got grade " + grade;
	resultEl.style.color = resultColor;

	// Extension: Display date and time when grade was checked
	const checkedTimeEl = document.getElementById("checkedTime");
	checkedTimeEl.innerHTML = "Checked on: " + new Date();
	checkedTimeEl.style.color = resultColor;

	return false;
}

// Extension: Generates a random whole number from 0 to 100 in the mark input
function setRandomMark() {
	const randomMark = Math.floor(Math.random() * 101);
	document.getElementById("mark").value = randomMark;
}

function showTable() {
	const grades = ["A", "B", "C", "F"];
	const ranges = ["80-100", "65-79", "50-64", "0-49"];

	let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
	for (let i = 0; i < grades.length; i++) {
		tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
	}
	tableHTML += "</table>";

	document.getElementById("tableContainer").innerHTML = tableHTML;
}