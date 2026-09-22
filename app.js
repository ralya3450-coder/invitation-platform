// =========================================
// INVITATION PLATFORM
// STEP 1 — TEMPLATE SELECTION
// =========================================


// Selected template
let selectedTemplate = null;


// Elements
const templateCards =
    document.querySelectorAll(".template-card");

const selectButtons =
    document.querySelectorAll(".select-template");

const continueButton =
    document.getElementById("continue-button");

const selectionMessage =
    document.getElementById("selection-message");

const categories =
    document.querySelectorAll(".category");

const searchInput =
    document.getElementById("template-search");


// =========================================
// SELECT TEMPLATE
// =========================================

selectButtons.forEach(button => {

    button.addEventListener("click", function () {

        const templateId =
            this.dataset.template;

        selectTemplate(templateId);

    });

});


function selectTemplate(templateId) {

    selectedTemplate = templateId;


    // Remove previous selection

    templateCards.forEach(card => {

        card.classList.remove("selected");

    });


    // Select current card

    const selectedCard =
        document.querySelector(
            `.template-card[data-template="${templateId}"]`
        );


    if (selectedCard) {

        selectedCard.classList.add("selected");

    }


    // Enable continue button

    continueButton.disabled = false;


    selectionMessage.textContent =
        "تم اختيار التصميم — يمكنك المتابعة";


    // Update buttons

    selectButtons.forEach(button => {

        if (button.dataset.template === templateId) {

            button.textContent = "تم الاختيار";

        } else {

            button.textContent = "اختيار";

        }

    });

}


// =========================================
// CATEGORY FILTER
// =========================================

categories.forEach(category => {

    category.addEventListener("click", function () {

        categories.forEach(item => {

            item.classList.remove("active");

        });

        this.classList.add("active");


        const selectedCategory =
            this.dataset.category;


        templateCards.forEach(card => {

            const cardCategory =
                card.dataset.category;


            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


// =========================================
// SEARCH
// =========================================

searchInput.addEventListener("input", function () {

    const searchTerm =
        this.value.trim().toLowerCase();


    templateCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const category =
            card.dataset.category.toLowerCase();


        if (
            name.includes(searchTerm) ||
            category.includes(searchTerm)
        ) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });

});


// =========================================
// CONTINUE
// =========================================

continueButton.addEventListener("click", function () {

    if (!selectedTemplate) {
        return;
    }


    // Save selected template

    localStorage.setItem(
        "selectedTemplate",
        selectedTemplate
    );


    // Temporary next step

    alert(
        "تم اختيار التصميم رقم " +
        selectedTemplate +
        ". الخطوة التالية ستكون اختيار نوع المناسبة."
    );

});
