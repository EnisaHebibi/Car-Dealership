document.addEventListener("DOMContentLoaded", function() {
  // Get elements
  const sellButton = document.getElementById('sellButton');
  const paymentModal = document.getElementById('paymentModal');
  const successModal = document.getElementById("successModal");

  // Ensure both modals are hidden on page load
  paymentModal.style.display = 'none';
  successModal.style.display = 'none';

  // Show payment when "Sell" button is click
  sellButton.addEventListener('click', function() {
    paymentModal.style.display = 'flex';  //show
    successModal.style.display = 'none'; //hide
  });

  // Payment formvalidation
  const paymentForm = document.getElementById('paymentForm');
  paymentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Clear error messages
    document.getElementById("cardNumberError").innerHTML = "";
    document.getElementById("expirationDateError").innerHTML = "";
    document.getElementById("cvvError").innerHTML = "";

    let hasErrors = false;

    // Get values
    const cardNumber = document.getElementById("card-number").value.trim();
    const expirationDate = document.getElementById("expiration-date").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    // Validation patterns
    const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
    const expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^\d{3}$/;

    // Validation card number
    if (!cardNumberPattern.test(cardNumber)) {
      document.getElementById("cardNumberError").innerHTML = "Enter a valid card number (e.g., 1234 5678 9101 1121).";
      hasErrors = true;
    }

    // Validateion expiration date 
    if (!expirationDatePattern.test(expirationDate)) {
      document.getElementById("expirationDateError").innerHTML = "Enter a valid expiration date in MM/YY format.";
      hasErrors = true;
    }

    // Validation CVV
    if (!cvvPattern.test(cvv)) {
      document.getElementById("cvvError").innerHTML = "Enter a valid 3-digit CVV.";
      hasErrors = true;
    }

    // If there are errors don't proceed
    if (hasErrors) {
      return;
    }

    // If no errors dont show the payment just show success message
    paymentModal.style.display = 'none'; 
    successModal.style.display = 'flex';  
  });
});
