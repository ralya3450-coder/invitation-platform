/* =========================================================
   INVITATION DATA
========================================================= */

const defaultInvitation = {

    template: "floral",

    color: "blush",

    personOne: "محمد",

    personTwo: "سارة",

    familyName: "",

    eventType: "حفل زفاف",

    eventDate: "2026-10-22",

    eventTime: "20:00",

    venueName: "قاعة اللؤلؤة",

    venueCity: "الرياض",

    venueMap: "#",

    invitationTitle:
        "يسعدنا دعوتكم لمشاركتنا فرحتنا",

    invitationMessage:
        "نتشرف بحضوركم ومشاركتكم أجمل لحظاتنا.",

    invitationClosing:
        "تشرفنا حضوركم ومشاركتكم فرحتنا",

    guests: [

        {
            id: 1,
            name: "أم عبدالله",
            count: 4
        },

        {
            id: 2,
            name: "محمد أحمد",
            count: 2
        }

    ],

    enableRSVP: true,

    allowGuestCount: false

};



/* =========================================================
   GET DATA
========================================================= */

function getInvitationData() {

    try {

        const saved =
            localStorage.getItem(
                "invitationData"
            );

        if (!saved) {

            return {
                ...defaultInvitation
            };

        }

        const parsed =
            JSON.parse(saved);

        return {

            ...defaultInvitation,

            ...parsed,

            guests:
                Array.isArray(parsed.guests)
                    ? parsed.guests
                    : defaultInvitation.guests

        };

    } catch (error) {

        console.error(
            "Could not load invitation data:",
            error
        );

        return {
            ...defaultInvitation
        };

    }

}



/* =========================================================
   TEMPLATE + COLOR
========================================================= */

function applyTemplate(
    template,
    color
) {

    document.body.dataset.template =
        template || "floral";


    document.body.dataset.color =
        color || "blush";

}



/* =========================================================
   EVENT CATEGORY
========================================================= */

function getEventCategory(
    eventType
) {

    const value =
        String(eventType || "")
            .toLowerCase()
            .trim();


    if (
        value.includes("زواج") ||
        value.includes("زفاف") ||
        value.includes("عرس") ||
        value.includes("wedding") ||
        value.includes("marriage")
    ) {

        return "wedding";

    }


    if (
        value.includes("مولود") ||
        value.includes("مولوده") ||
        value.includes("مولودة") ||
        value.includes("بيبي") ||
        value.includes("طفل") ||
        value.includes("baby") ||
        value.includes("newborn")
    ) {

        return "baby";

    }


    if (
        value.includes("ميلاد") ||
        value.includes("birthday")
    ) {

        return "birthday";

    }


    if (
        value.includes("تخرج") ||
        value.includes("تخرّج") ||
        value.includes("graduation")
    ) {

        return "graduation";

    }


    if (
        value.includes("أطفال") ||
        value.includes("اطفال") ||
        value.includes("طفولة") ||
        value.includes("أميرة") ||
        value.includes("اميرة") ||
        value.includes("fairytale") ||
        value.includes("children")
    ) {

        return "children";

    }


    return "wedding";

}



/* =========================================================
   SHOW ILLUSTRATION
========================================================= */

function showIllustration(
    category
) {

    const illustrations =
        document.querySelectorAll(
            ".illustration"
        );


    illustrations.forEach(
        (illustration) => {

            illustration.classList.remove(
                "active"
            );

        }
    );


    const selected =
        document.getElementById(
            `${category}-illustration`
        );


    if (selected) {

        selected.classList.add(
            "active"
        );

    }

}



/* =========================================================
   FORMAT DATE
========================================================= */

function formatArabicDate(
    dateValue
) {

    if (!dateValue) {

        return "—";

    }


    const date =
        new Date(
            `${dateValue}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return dateValue;

    }


    return new Intl.DateTimeFormat(
        "ar-SA",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    ).format(date);

}



/* =========================================================
   FORMAT TIME
========================================================= */

function formatArabicTime(
    timeValue
) {

    if (!timeValue) {

        return "—";

    }


    const parts =
        String(timeValue).split(":");


    if (parts.length < 2) {

        return timeValue;

    }


    let hour =
        parseInt(
            parts[0],
            10
        );


    const minute =
        parts[1];


    if (
        Number.isNaN(hour)
    ) {

        return timeValue;

    }


    const period =
        hour >= 12
            ? "مساءً"
            : "صباحاً";


    if (hour === 0) {

        hour = 12;

    } else if (hour > 12) {

        hour -= 12;

    }


    return `${hour}:${minute} ${period}`;

}



/* =========================================================
   GET GUEST FROM URL
========================================================= */

function getGuestFromURL(
    data
) {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const guestParameter =
        params.get("guest");


    if (!guestParameter) {

        return null;

    }


    /*
        Supports:

        ?guest=1
        ?guest=2

        and also:

        ?guest=guest-id
    */


    const numericID =
        Number(
            guestParameter
        );


    if (
        !Number.isNaN(
            numericID
        )
    ) {

        return (
            data.guests || []
        ).find(
            (guest) =>
                Number(guest.id) ===
                numericID
        );

    }


    return (
        data.guests || []
    ).find(
        (guest) =>
            String(guest.id) ===
            String(guestParameter)
    );

}



/* =========================================================
   POPULATE GUEST
========================================================= */

function populateGuest(
    guest
) {

    const guestName =
        guest?.name ||
        "ضيفنا العزيز";


    const guestElement =
        document.getElementById(
            "guest-name"
        );


    const personalizedName =
        document.getElementById(
            "personalized-name"
        );


    if (guestElement) {

        guestElement.textContent =
            guestName;

    }


    if (personalizedName) {

        personalizedName.textContent =
            guestName;

    }


    const allowedGuests =
        document.getElementById(
            "allowed-guests"
        );


    if (!allowedGuests) {

        return;

    }


    if (
        guest &&
        guest.count &&
        Number(guest.count) > 1
    ) {

        allowedGuests.textContent =
            `يشرفنا حضوركم برفقة ${guest.count} أشخاص`;

    } else {

        allowedGuests.textContent =
            "ننتظركم بكل شوق";

    }

}



/* =========================================================
   POPULATE INVITATION
========================================================= */

function populateInvitation() {

    const data =
        getInvitationData();


    /* -------------------------------
       DESIGN
    -------------------------------- */

    applyTemplate(
        data.template,
        data.color
    );


    /* -------------------------------
       CATEGORY
    -------------------------------- */

    const category =
        getEventCategory(
            data.eventType
        );


    showIllustration(
        category
    );


    /* -------------------------------
       COUPLE
    -------------------------------- */

    const coupleNames =
        document.getElementById(
            "couple-names"
        );


    if (coupleNames) {

        let names =
            data.personOne ||
            "";


        if (data.personTwo) {

            names +=
                ` & ${data.personTwo}`;

        }


        if (
            data.familyName &&
            data.familyName.trim()
        ) {

            names +=
                ` ${data.familyName}`;

        }


        coupleNames.textContent =
            names || "محمد & سارة";

    }


    /* -------------------------------
       TITLE
    -------------------------------- */

    const title =
        document.getElementById(
            "invitation-title"
        );


    if (title) {

        title.textContent =
            data.invitationTitle ||
            "يسعدنا دعوتكم لمشاركتنا فرحتنا";

    }


    /* -------------------------------
       MESSAGE
    -------------------------------- */

    const message =
        document.getElementById(
            "invitation-message"
        );


    if (message) {

        message.textContent =
            data.invitationMessage ||
            "نتشرف بحضوركم ومشاركتكم أجمل لحظاتنا.";

    }


    /* -------------------------------
       CLOSING
    -------------------------------- */

    const closing =
        document.getElementById(
            "invitation-closing"
        );


    if (closing) {

        closing.textContent =
            data.invitationClosing ||
            "تشرفنا حضوركم ومشاركتكم فرحتنا";

    }


    /* -------------------------------
       DATE
    -------------------------------- */

    const eventDate =
        document.getElementById(
            "event-date"
        );


    if (eventDate) {

        eventDate.textContent =
            formatArabicDate(
                data.eventDate
            );

    }


    /* -------------------------------
       TIME
    -------------------------------- */

    const eventTime =
        document.getElementById(
            "event-time"
        );


    if (eventTime) {

        eventTime.textContent =
            formatArabicTime(
                data.eventTime
            );

    }


    /* -------------------------------
       VENUE
    -------------------------------- */

    const venueName =
        document.getElementById(
            "venue-name"
        );


    const venueCity =
        document.getElementById(
            "venue-city"
        );


    if (venueName) {

        venueName.textContent =
            data.venueName ||
            "—";

    }


    if (venueCity) {

        venueCity.textContent =
            data.venueCity ||
            "—";

    }


    /* -------------------------------
       MAP
    -------------------------------- */

    const mapLink =
        document.getElementById(
            "map-link"
        );


    if (mapLink) {

        if (
            data.venueMap &&
            data.venueMap !== "#"
        ) {

            mapLink.href =
                data.venueMap;

            mapLink.style.display =
                "inline-flex";

        } else {

            mapLink.style.display =
                "none";

        }

    }


    /* -------------------------------
       GUEST
    -------------------------------- */

    const guest =
        getGuestFromURL(
            data
        );


    populateGuest(
        guest
    );


    /* -------------------------------
       RSVP
    -------------------------------- */

    const rsvpSection =
        document.getElementById(
            "rsvp-section"
        );


    if (rsvpSection) {

        if (
            data.enableRSVP === false
        ) {

            rsvpSection.style.display =
                "none";

        } else {

            rsvpSection.style.display =
                "";

        }

    }

}



/* =========================================================
   OPEN ENVELOPE
========================================================= */

function openInvitation() {

    const envelope =
        document.getElementById(
            "envelope"
        );


    const envelopeScreen =
        document.getElementById(
            "envelope-screen"
        );


    const mainInvitation =
        document.getElementById(
            "main-invitation"
        );


    const openButton =
        document.getElementById(
            "open-invitation"
        );


    if (!envelope) {

        return;

    }


    envelope.classList.add(
        "open"
    );


    if (openButton) {

        openButton.disabled =
            true;

        openButton.style.opacity =
            "0.5";

    }


    setTimeout(
        () => {

            if (mainInvitation) {

                mainInvitation.classList.add(
                    "visible"
                );

            }

        },
        700
    );


    setTimeout(
        () => {

            if (envelopeScreen) {

                envelopeScreen.classList.add(
                    "opened"
                );

            }

        },
        1500
    );

}



/* =========================================================
   RSVP
========================================================= */

function setupRSVP() {

    const yesButton =
        document.getElementById(
            "rsvp-yes"
        );


    const noButton =
        document.getElementById(
            "rsvp-no"
        );


    const result =
        document.getElementById(
            "rsvp-result"
        );


    if (!result) {

        return;

    }


    if (yesButton) {

        yesButton.addEventListener(
            "click",
            () => {

                result.textContent =
                    "شكراً لتأكيد حضوركم، يسعدنا استقبالكم ♥";

                result.dataset.status =
                    "yes";

            }
        );

    }


    if (noButton) {

        noButton.addEventListener(
            "click",
            () => {

                result.textContent =
                    "شكراً لإبلاغنا، نتمنى أن نلتقي بكم في مناسبات قادمة.";

                result.dataset.status =
                    "no";

            }
        );

    }

}



/* =========================================================
   MUSIC
========================================================= */

function setupMusic() {

    const data =
        getInvitationData();


    if (!data.musicUrl) {

        return;

    }


    const audio =
        document.createElement(
            "audio"
        );


    audio.id =
        "invitation-music";

    audio.src =
        data.musicUrl;

    audio.loop =
        true;

    audio.preload =
        "auto";


    document.body.appendChild(
        audio
    );


    /*
       Browsers may block autoplay.
       We therefore start the music
       after the visitor opens the envelope.
    */


    const openButton =
        document.getElementById(
            "open-invitation"
        );


    if (openButton) {

        openButton.addEventListener(
            "click",
            () => {

                if (
                    data.musicAutoplay !== false
                ) {

                    audio.play()
                        .catch(
                            () => {}
                        );

                }

            },
            {
                once: true
            }
        );

    }

}



/* =========================================================
   PAGE START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        populateInvitation();

        setupRSVP();

        setupMusic();


        const openButton =
            document.getElementById(
                "open-invitation"
            );


        if (openButton) {

            openButton.addEventListener(
                "click",
                openInvitation
            );

        }

    }
);
