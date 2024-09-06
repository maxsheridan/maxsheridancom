document.addEventListener("DOMContentLoaded", function() {
    var submitted = false;
    
    document.getElementById("contactForm").addEventListener("submit", function(e) {
        if (!submitted) {
            e.preventDefault(); // Prevent the form from submitting normally
            
            var contactForm = document.getElementById("contactForm");
            var formElements = contactForm.querySelectorAll("*");
            formElements.forEach(function(element) {
                element.style.display = "none"; // Hide all elements inside the form
            });
            
            var thanksMessage = document.createElement("p");
            thanksMessage.textContent = "Message received.";
            contactForm.insertBefore(thanksMessage, contactForm.firstChild); // Prepend the message
            
            submitted = true;
            setTimeout(function() {
                contactForm.submit(); // Submit the form after a delay
            }, 1000); // Adjust the delay as needed
        }
    });

    document.getElementById("hidden_iframe").onload = function() {
        if (submitted) {
            console.log('Form submitted and iframe loaded.');
            submitted = false; // Reset the variable if needed
        } else {
            console.error('Iframe loaded without form submission.');
        }
    };
});