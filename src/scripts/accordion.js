/* -------------------------------------------
 Accordion functionality for the FAQ section 
---------------------------------------------*/

document.querySelectorAll(".accordion-btn").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        const allAnswers = document.querySelectorAll(".accordion-answer");
        const icon = button.querySelector(".faq-icon");
        const allIcons = document.querySelectorAll(".faq-icon");

        // Close all open answers
        allAnswers.forEach((answer) => {
            answer.style.maxHeight = "0";
        });

        // Set all icons to "+"
        allIcons.forEach((icon) => {
            icon.innerHTML = "+";
        });


        // Toggle FAQ plus and minus icon
        icon.innerHTML = (icon.innerHTML === "+") ? "-" : "+";

        // Toggle the content's max-height for smooth opening and closing
        if (answer.style.maxHeight && answer.style.maxHeight !== "0px") {
            answer.style.maxHeight = "0";
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }

        // DEBUG
        console.log(icon.innerHTML);
    });
});