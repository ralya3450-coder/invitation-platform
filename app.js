/* =========================================================
   INVITATION BUILDER
========================================================= */


/* =========================================================
   DATA
========================================================= */

/* =========================================================
   DESIGN COLOR COLLECTIONS
========================================================= */

const templateColors = {

    gold: [

        {
            id: "champagne",
            name: "شامبين فاخر",
            color: "#d8b27c",
            accent: "#9a6d3f",
            background: "#f7ecdc"
        },

        {
            id: "rose-gold",
            name: "روز غولد",
            color: "#c98f82",
            accent: "#8e5c53",
            background: "#f7e5df"
        },

        {
            id: "ivory-gold",
            name: "عاجي وذهبي",
            color: "#c7a66b",
            accent: "#86663b",
            background: "#faf5ea"
        },

        {
            id: "olive-gold",
            name: "زيتوني وذهبي",
            color: "#9a9a72",
            accent: "#676746",
            background: "#f0efe2"
        }

    ],


    ivory: [

        {
            id: "cream",
            name: "كريمي ناعم",
            color: "#d9c2a7",
            accent: "#98765a",
            background: "#fbf5eb"
        },

        {
            id: "dusty-pink",
            name: "وردي غباري",
            color: "#c79a9c",
            accent: "#8f6569",
            background: "#f7e9e9"
        },

        {
            id: "sage",
            name: "سيج",
            color: "#a5ad91",
            accent: "#687157",
            background: "#eff1e8"
        },

        {
            id: "powder-blue",
            name: "أزرق بودرة",
            color: "#9caec1",
            accent: "#5f7287",
            background: "#edf2f7"
        }

    ],


    arabic: [

        {
            id: "sand",
            name: "رملي",
            color: "#c8a477",
            accent: "#785b3e",
            background: "#f4ead9"
        },

        {
            id: "olive",
            name: "زيتوني",
            color: "#8d9470",
            accent: "#586047",
            background: "#edf0e4"
        },

        {
            id: "terracotta",
            name: "تيراكوتا",
            color: "#b87961",
            accent: "#7d4939",
            background: "#f4e2da"
        },

        {
            id: "emerald",
            name: "زمردي",
            color: "#668675",
            accent: "#3f5e4d",
            background: "#e7eee9"
        }

    ],


    floral: [

        {
            id: "blush",
            name: "بلوش وردي",
            color: "#d69c9d",
            accent: "#965d62",
            background: "#faeaea"
        },

        {
            id: "sage-floral",
            name: "أخضر سيج",
            color: "#9da98d",
            accent: "#5f6f54",
            background: "#edf1e8"
        },

        {
            id: "blue-floral",
            name: "أزرق ناعم",
            color: "#91a9c0",
            accent: "#566d84",
            background: "#eaf0f6"
        },

        {
            id: "lavender",
            name: "لافندر",
            color: "#b3a0bb",
            accent: "#745e7c",
            background: "#f1ebf4"
        }

    ],


    dark: [

        {
            id: "black-gold",
            name: "أسود وذهبي",
            color: "#c5a15b",
            accent: "#d7b873",
            background: "#171513"
        },

        {
            id: "navy-gold",
            name: "كحلي وذهبي",
            color: "#b79b62",
            accent: "#d6bb79",
            background: "#151c29"
        },

        {
            id: "plum",
            name: "برغندي داكن",
            color: "#b78680",
            accent: "#d0aaa2",
            background: "#26191e"
        },

        {
            id: "emerald-dark",
            name: "زمردي فاخر",
            color: "#8fac93",
            accent: "#b9c9b5",
            background: "#15221d"
        }

    ],


    romantic: [

        {
            id: "dusty-rose",
            name: "روز غباري",
            color: "#c99599",
            accent: "#8d5d62",
            background: "#f7e8e8"
        },

        {
            id: "mauve",
            name: "موف",
            color: "#aa8f9f",
            accent: "#715b6a",
            background: "#f0e9ef"
        },

        {
            id: "peach",
            name: "خوخي",
            color: "#d9a58c",
            accent: "#9a684e",
            background: "#faebe1"
        },

        {
            id: "champagne-rose",
            name: "شامبين وردي",
            color: "#c9a27f",
            accent: "#89664b",
            background: "#f8eee3"
        }

    ]

};
const invitationData = {

    template: "",

    personOne: "",
    personTwo: "",
    familyName: "",

    eventType: "",
    eventDate: "",
    eventTime: "",

    venueName: "",
    venueCity: "",
    venueMap: "",

    invitationTitle: "",
    invitationMessage: "",
    invitationClosing: "",

    guests: [],

    enableRSVP: true,
    allowGuestCount: false,
    allowNotes: true,

    musicUrl: "",
    musicAutoplay: false

};


/* =========================================================
   CURRENT STEP
========================================================= */

let currentStep = 1;


/* =========================================================
   ELEMENTS
========================================================= */

const steps =
    document.querySelectorAll(".builder-step");

const progressSteps =
    document.querySelectorAll(".progress-step");


/* =========================================================
   SHOW STEP
========================================================= */

function showStep(stepNumber) {

    currentStep = stepNumber;


    steps.forEach((step) => {

        step.classList.remove("active");

    });


    const targetStep =
        document.getElementById(
            `step-${stepNumber}`
        );


    if (targetStep) {

        targetStep.classList.add("active");

    }


    progressSteps.forEach((step) => {

        const number =
            Number(
                step.dataset.step
            );


        step.classList.remove("active");

        step.classList.remove("completed");


        if (number === stepNumber) {

            step.classList.add("active");

        }


        if (number < stepNumber) {

            step.classList.add("completed");

        }

    });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    updatePreview();

}


/* =========================================================
   TEMPLATE SELECTION
========================================================= */

const templateCards =
    document.querySelectorAll(
        ".template-card"
    );


const templateButtons =
    document.querySelectorAll(
        ".select-template"
    );


templateButtons.forEach((button) => {

    button.addEventListener(
        "click",
        function () {

            const template =
                this.dataset.template;


            invitationData.template =
                template;


            templateCards.forEach((card) => {

                card.classList.remove(
                    "selected"
                );

            });


            const selectedCard =
                document.querySelector(
                    `.template-card[data-template="${template}"]`
                );


            if (selectedCard) {

                selectedCard.classList.add(
                    "selected"
                );

            }


            const nextButton =
                document.getElementById(
                    "next-step-1"
                );


            if (nextButton) {

                nextButton.disabled = false;

            }


            saveData();

        }
    );

});


/* =========================================================
   STEP 1 NEXT
========================================================= */

const firstNext =
    document.getElementById(
        "next-step-1"
    );


if (firstNext) {

    firstNext.addEventListener(
        "click",
        function () {

            if (!invitationData.template) {

                alert(
                    "يرجى اختيار تصميم الدعوة أولاً."
                );

                return;

            }


            showStep(2);

        }
    );

}


/* =========================================================
   NEXT BUTTONS
========================================================= */

const nextButtons =
    document.querySelectorAll(
        "[data-next]"
    );


nextButtons.forEach((button) => {

    button.addEventListener(
        "click",
        function () {

            const nextStep =
                Number(
                    this.dataset.next
                );


            collectCurrentStepData();


            saveData();


            showStep(nextStep);

        }
    );

});


/* =========================================================
   BACK BUTTONS
========================================================= */

const backButtons =
    document.querySelectorAll(
        "[data-back]"
    );


backButtons.forEach((button) => {

    button.addEventListener(
        "click",
        function () {

            const previousStep =
                Number(
                    this.dataset.back
                );


            collectCurrentStepData();


            saveData();


            showStep(previousStep);

        }
    );

});


/* =========================================================
   COLLECT CURRENT STEP DATA
========================================================= */

function collectCurrentStepData() {


    /* -----------------------------------------
       COUPLE
    ----------------------------------------- */

    const personOne =
        document.getElementById(
            "person-one"
        );

    const personTwo =
        document.getElementById(
            "person-two"
        );

    const familyName =
        document.getElementById(
            "family-name"
        );


    if (personOne) {

        invitationData.personOne =
            personOne.value.trim();

    }


    if (personTwo) {

        invitationData.personTwo =
            personTwo.value.trim();

    }


    if (familyName) {

        invitationData.familyName =
            familyName.value.trim();

    }


    /* -----------------------------------------
       EVENT
    ----------------------------------------- */

    const eventType =
        document.getElementById(
            "event-type"
        );

    const eventDate =
        document.getElementById(
            "event-date"
        );

    const eventTime =
        document.getElementById(
            "event-time"
        );


    if (eventType) {

        invitationData.eventType =
            eventType.value;

    }


    if (eventDate) {

        invitationData.eventDate =
            eventDate.value;

    }


    if (eventTime) {

        invitationData.eventTime =
            eventTime.value;

    }


    /* -----------------------------------------
       VENUE
    ----------------------------------------- */

    const venueName =
        document.getElementById(
            "venue-name"
        );

    const venueCity =
        document.getElementById(
            "venue-city"
        );

    const venueMap =
        document.getElementById(
            "venue-map"
        );


    if (venueName) {

        invitationData.venueName =
            venueName.value.trim();

    }


    if (venueCity) {

        invitationData.venueCity =
            venueCity.value.trim();

    }


    if (venueMap) {

        invitationData.venueMap =
            venueMap.value.trim();

    }


    /* -----------------------------------------
       INVITATION TEXT
    ----------------------------------------- */

    const invitationTitle =
        document.getElementById(
            "invitation-title"
        );

    const invitationMessage =
        document.getElementById(
            "invitation-message"
        );

    const invitationClosing =
        document.getElementById(
            "invitation-closing"
        );


    if (invitationTitle) {

        invitationData.invitationTitle =
            invitationTitle.value.trim();

    }


    if (invitationMessage) {

        invitationData.invitationMessage =
            invitationMessage.value.trim();

    }


    if (invitationClosing) {

        invitationData.invitationClosing =
            invitationClosing.value.trim();

    }


    /* -----------------------------------------
       RSVP
    ----------------------------------------- */

    const enableRSVP =
        document.getElementById(
            "enable-rsvp"
        );

    const allowGuestCount =
        document.getElementById(
            "allow-guest-count"
        );

    const allowNotes =
        document.getElementById(
            "allow-notes"
        );


    if (enableRSVP) {

        invitationData.enableRSVP =
            enableRSVP.checked;

    }


    if (allowGuestCount) {

        invitationData.allowGuestCount =
            allowGuestCount.checked;

    }


    if (allowNotes) {

        invitationData.allowNotes =
            allowNotes.checked;

    }


    /* -----------------------------------------
       MUSIC
    ----------------------------------------- */

    const musicUrl =
        document.getElementById(
            "music-url"
        );

    const musicAutoplay =
        document.getElementById(
            "music-autoplay"
        );


    if (musicUrl) {

        invitationData.musicUrl =
            musicUrl.value.trim();

    }


    if (musicAutoplay) {

        invitationData.musicAutoplay =
            musicAutoplay.checked;

    }

}


/* =========================================================
   GUEST SYSTEM
========================================================= */

const addGuestButton =
    document.getElementById(
        "add-guest"
    );


if (addGuestButton) {

    addGuestButton.addEventListener(
        "click",
        addGuest
    );

}


function addGuest() {

    const nameInput =
        document.getElementById(
            "guest-name"
        );

    const countInput =
        document.getElementById(
            "guest-count"
        );


    const name =
        nameInput.value.trim();


    const count =
        Number(
            countInput.value
        );


    if (!name) {

        alert(
            "يرجى كتابة اسم الضيف."
        );

        return;

    }


    if (!count || count < 1) {

        alert(
            "يرجى إدخال عدد الأشخاص."
        );

        return;

    }


    const guest = {

        id:
            Date.now(),

        name:
            name,

        count:
            count,

        confirmed:
            false

    };


    invitationData.guests.push(
        guest
    );


    nameInput.value = "";

    countInput.value = 1;


    renderGuests();

    saveData();

}


/* =========================================================
   RENDER GUESTS
========================================================= */

function renderGuests() {

    const guestList =
        document.getElementById(
            "guest-list"
        );


    if (!guestList) {

        return;

    }


    guestList.innerHTML = "";


    if (
        invitationData.guests.length === 0
    ) {

        guestList.innerHTML = `
            <p class="empty-guests">
                لم تتم إضافة أي ضيوف بعد.
            </p>
        `;

        return;

    }


    invitationData.guests.forEach(
        (guest) => {

            const guestElement =
                document.createElement(
                    "div"
                );


            guestElement.className =
                "guest-item";


            guestElement.innerHTML = `

                <div class="guest-info">

                    <strong>
                        ${escapeHTML(guest.name)}
                    </strong>

                    <span>
                        ${guest.count} شخص
                    </span>

                </div>


                <button
                    class="remove-guest"
                    data-id="${guest.id}"
                >
                    حذف
                </button>

            `;


            guestList.appendChild(
                guestElement
            );

        }
    );


    const removeButtons =
        document.querySelectorAll(
            ".remove-guest"
        );


    removeButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(
                            this.dataset.id
                        );


                    invitationData.guests =
                        invitationData.guests.filter(
                            (guest) =>
                                guest.id !== id
                        );


                    renderGuests();

                    saveData();

                }
            );

        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


/* =========================================================
   PREVIEW
========================================================= */

function updatePreview() {

    const personOne =
        document.getElementById(
            "person-one"
        )?.value.trim();


    const personTwo =
        document.getElementById(
            "person-two"
        )?.value.trim();


    const familyName =
        document.getElementById(
            "family-name"
        )?.value.trim();


    const eventType =
        document.getElementById(
            "event-type"
        )?.value;


    const eventDate =
        document.getElementById(
            "event-date"
        )?.value;


    const eventTime =
        document.getElementById(
            "event-time"
        )?.value;


    const venueName =
        document.getElementById(
            "venue-name"
        )?.value.trim();


    const venueCity =
        document.getElementById(
            "venue-city"
        )?.value.trim();


    const couplePreview =
        document.getElementById(
            "preview-couple"
        );


    const eventPreview =
        document.getElementById(
            "preview-event"
        );


    const datePreview =
        document.getElementById(
            "preview-date"
        );


    const venuePreview =
        document.getElementById(
            "preview-venue"
        );


    if (couplePreview) {

        let coupleText =
            "الاسم الأول & الاسم الثاني";


        if (personOne && personTwo) {

            coupleText =
                `${personOne} & ${personTwo}`;

        }


        if (
            familyName &&
            personOne &&
            personTwo
        ) {

            coupleText =
                `${personOne} & ${personTwo} ${familyName}`;

        }


        couplePreview.textContent =
            coupleText;

    }


    if (eventPreview) {

        eventPreview.textContent =
            eventType ||
            "نوع المناسبة";

    }


    if (datePreview) {

        let dateText =
            "التاريخ والوقت";


        if (eventDate) {

            dateText =
                formatDate(eventDate);

        }


        if (eventTime) {

            dateText +=
                ` — ${eventTime}`;

        }


        datePreview.textContent =
            dateText;

    }


    if (venuePreview) {

        let venueText =
            "المكان";


        if (venueName) {

            venueText =
                venueName;

        }


        if (venueCity) {

            venueText +=
                ` — ${venueCity}`;

        }


        venuePreview.textContent =
            venueText;

    }

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "التاريخ";

    }


    const date =
        new Date(
            `${dateString}T00:00:00`
        );


    return date.toLocaleDateString(
        "ar-SA",
        {

            weekday: "long",

            year: "numeric",

            month: "long",

            day: "numeric"

        }
    );

}


/* =========================================================
   INPUT LISTENERS
========================================================= */

const allInputs =
    document.querySelectorAll(
        "input, textarea, select"
    );


allInputs.forEach((input) => {

    input.addEventListener(
        "input",
        function () {

            collectCurrentStepData();

            saveData();

            updatePreview();

        }
    );


    input.addEventListener(
        "change",
        function () {

            collectCurrentStepData();

            saveData();

            updatePreview();

        }
    );

});


/* =========================================================
   SAVE DATA
========================================================= */

function saveData() {

    localStorage.setItem(

        "invitationData",

        JSON.stringify(
            invitationData
        )

    );

}


/* =========================================================
   LOAD DATA
========================================================= */

function loadData() {

    const saved =
        localStorage.getItem(
            "invitationData"
        );


    if (!saved) {

        return;

    }


    try {

        const parsed =
            JSON.parse(saved);


        Object.assign(
            invitationData,
            parsed
        );


    } catch (error) {

        console.error(
            "Could not load invitation data.",
            error
        );

        return;

    }


    populateInputs();

    renderGuests();

    updateTemplateSelection();

}


/* =========================================================
   POPULATE INPUTS
========================================================= */

function populateInputs() {

    setValue(
        "person-one",
        invitationData.personOne
    );


    setValue(
        "person-two",
        invitationData.personTwo
    );


    setValue(
        "family-name",
        invitationData.familyName
    );


    setValue(
        "event-type",
        invitationData.eventType
    );


    setValue(
        "event-date",
        invitationData.eventDate
    );


    setValue(
        "event-time",
        invitationData.eventTime
    );


    setValue(
        "venue-name",
        invitationData.venueName
    );


    setValue(
        "venue-city",
        invitationData.venueCity
    );


    setValue(
        "venue-map",
        invitationData.venueMap
    );


    setValue(
        "invitation-title",
        invitationData.invitationTitle
    );


    setValue(
        "invitation-message",
        invitationData.invitationMessage
    );


    setValue(
        "invitation-closing",
        invitationData.invitationClosing
    );


    setValue(
        "music-url",
        invitationData.musicUrl
    );


    setChecked(
        "enable-rsvp",
        invitationData.enableRSVP
    );


    setChecked(
        "allow-guest-count",
        invitationData.allowGuestCount
    );


    setChecked(
        "allow-notes",
        invitationData.allowNotes
    );


    setChecked(
        "music-autoplay",
        invitationData.musicAutoplay
    );

}


/* =========================================================
   SET VALUE
========================================================= */

function setValue(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.value =
            value || "";

    }

}


/* =========================================================
   SET CHECKED
========================================================= */

function setChecked(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.checked =
            Boolean(value);

    }

}


/* =========================================================
   UPDATE TEMPLATE SELECTION
========================================================= */

function updateTemplateSelection() {

    if (!invitationData.template) {

        return;

    }


    templateCards.forEach(
        (card) => {

            card.classList.remove(
                "selected"
            );

        }
    );


    const selected =
        document.querySelector(
            `.template-card[data-template="${invitationData.template}"]`
        );


    if (selected) {

        selected.classList.add(
            "selected"
        );

    }


    const nextButton =
        document.getElementById(
            "next-step-1"
        );


    if (nextButton) {

        nextButton.disabled = false;

    }

}


/* =========================================================
   PUBLISH
========================================================= */

const publishButton =
    document.getElementById(
        "publish-invitation"
    );


if (publishButton) {

    publishButton.addEventListener(
        "click",
        function () {

            collectCurrentStepData();

            saveData();


            alert(
                "تم حفظ الدعوة بنجاح! ✨\n\nنظام نشر الدعوة والرابط الخاص بالضيوف سنضيفه في الخطوة القادمة."
            );

        }
    );

}


/* =========================================================
   START
========================================================= */

loadData();

showStep(1);
