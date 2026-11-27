function validateNumericInput() {
			const rawAge = document.forms["numericForm"]["age"].value.trim();

			if (rawAge === "") {
				alert("Age field cannot be empty.");
				return false;
			}

			const age = Number(rawAge);
			if (isNaN(age)) {
				alert("Please enter a valid numeric value.");
				return false;
			}

			if (age < 1 || age > 120) {
				alert("Please enter a number between 1 and 120.");
				return false;
			}

			alert("Form submitted successfully!");
			return true;
		}