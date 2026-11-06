// Main Form Validation & Delivery Calculation Function
function calculateFee() {
    // 1. Clear previous error messages
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("destError").innerHTML = "";
    document.getElementById("weightError").innerHTML = "";

    // 2. Retrieve values from HTML form DOM elements
    var nameInput = document.getElementById("custName").value;
    var emailInput = document.getElementById("custEmail").value;
    var destInput = document.getElementById("destination").value;
    var weightInput = document.getElementById("cargoWeight").value;
    var speedInput = document.getElementById("speed").value;

    var insuranceCheck = document.getElementById("insurance").checked;
    var shieldCheck = document.getElementById("shield").checked;

    let isValid = true; // Validation Flag

    // 3. Client-Side Input Validation Checks
    if (nameInput.trim() === "") {
        document.getElementById("nameError").innerHTML = "Customer Name is required.";
        isValid = false;
    }

    if (emailInput.trim() === "") {
        document.getElementById("emailError").innerHTML = "Sea-Mail Address is required.";
        isValid = false;
    } else if (emailInput.indexOf("@") === -1 || emailInput.indexOf(".") === -1) {
        document.getElementById("emailError").innerHTML = "Invalid email format (must contain '@' and '.').";
        isValid = false;
    }

    if (destInput === "") {
        document.getElementById("destError").innerHTML = "Please select a drop-off exit destination.";
        isValid = false;
    }

    var weight = parseFloat(weightInput);
    if (weightInput.trim() === "" || isNaN(weight) || weight <= 0) {
        document.getElementById("weightError").innerHTML = "Parcel weight must be a valid number greater than 0 kg.";
        isValid = false;
    }

    // Stop calculation if validation fails
    if (!isValid) {
        alert("⚠️ Input error! Please correct the highlighted fields.");
        return false;
    }

    // 4. Mathematical Calculation Logic
    var baseFee = 10.00;
    var destFee = parseFloat(destInput);
    var speedMultiplier = parseFloat(speedInput);
    var weightFee = weight * 4.00;

    var extrasFee = 0.00;
    if (insuranceCheck) extrasFee += 8.00;
    if (shieldCheck) extrasFee += 5.00;

    var subtotal = baseFee + destFee + weightFee + extrasFee;
    var totalCost = subtotal * speedMultiplier;

    var destSelect = document.getElementById("destination");
    var destText = destSelect.options[destSelect.selectedIndex].text;

    // 5. Construct and Inject Output HTML into DOM Output Container
    var ticketHTML = 
        "<h3>🧾 Official Shipping Calculation Summary</h3>" +
        "<div class='ticket-row'><span><strong>Customer:</strong></span> <span>" + nameInput + "</span></div>" +
        "<div class='ticket-row'><span><strong>Email:</strong></span> <span>" + emailInput + "</span></div>" +
        "<div class='ticket-row'><span><strong>Destination:</strong></span> <span>" + destText + "</span></div>" +
        "<div class='ticket-row'><span><strong>Base Fee:</strong></span> <span>RM " + baseFee.toFixed(2) + "</span></div>" +
        "<div class='ticket-row'><span><strong>Weight Fee (" + weight + " kg):</strong></span> <span>RM " + weightFee.toFixed(2) + "</span></div>" +
        "<div class='ticket-row'><span><strong>Optional Extras:</strong></span> <span>RM " + extrasFee.toFixed(2) + "</span></div>" +
        "<div class='ticket-row'><span><strong>Speed Multiplier:</strong></span> <span>" + speedMultiplier + "x</span></div>" +
        "<div class='total-box'>💰 TOTAL FEE: RM " + totalCost.toFixed(2) + "</div>";

    var outputDiv = document.getElementById("ticketOutput");
    outputDiv.innerHTML = ticketHTML;
    outputDiv.style.display = "block";

    alert("✅ Calculation complete! Scroll down to view your breakdown.");
    return false;
}

// Function to reset form error messages and clear output result box
function resetFormResults() {
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("destError").innerHTML = "";
    document.getElementById("weightError").innerHTML = "";

    var outputDiv = document.getElementById("ticketOutput");
    outputDiv.style.display = "none";
    outputDiv.innerHTML = "";
}