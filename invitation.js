/* =========================================================
   GUEST INVITATION
========================================================= */


/* =========================================================
   DEFAULT INVITATION
========================================================= */

const defaultInvitation = {

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

    ]

};


/* =========================================================
   GET INVITATION DATA
========================================================= */

function getInvitationData() {

    const saved =
        localStorage.getItem(
            "invitationData"
        );


    if (!saved) {

        return defaultInvitation;

    }


    try {

        const parsed =
            JSON.parse(saved);


        return {

            ...defaultInvitation,

            ...parsed

        };

    } catch (error) {

        return defaultInvitation;

    }

}


const invitation =
    getInvitationData();


/* =========================================================
   GET GUEST
========================================================= */

/*
   For now we use ?guest=1

   Example:

   invitation.html?guest=1

   Later this will become a real unique link
   from Supabase.
*/

const params =
    new URLSearchParams(
        window.location.search
    );


const guestNumber =
    Number(
        params.get("guest")
    ) || 1;


const guestIndex =
    guestNumber - 1;


const guest =
    invitation.guests &&
    invitation.guests.length > guestIndex

        ? invitation.guests[guestIndex]

        : {

            name: "ضيفنا العزيز",

            count: 1

        };


/* =========================================================
   ELEMENTS
========================================================= */

const envelope =
    document.getElementById(
        "envelope"
    );


const openButton =
    document.getElementById(
        "open-invitation"
    );


const envelopeScreen =
    document.getElementById(
        "envelope-screen"
    );


const mainInvitation =
    document.getElementById(
        "main-invitation"
    );


/* =========================================================
   PERSONALIZED GUEST
========================================================= */

document.getElementById(
    "guest-name"
).textContent =
    guest.name;


document.getElementById(
    "personalized-name"
).textContent =
    guest.name;


document.getElementById(
    "allowed-guests"
).textContent =
    guest.count;


/* =========================================================
   COUPLE
========================================================= */

let coupleName =
    invitation.personOne &&
    invitation.personTwo

        ? `${invitation.personOne} & ${invitation.personTwo}`

        : "محمد & سارة";


if (invitation.familyName) {

    coupleName +=
        ` ${invitation.familyName}`;

}


document.getElementById(
    "couple-names"
).textContent =
    coupleName;


/* =========================================================
   TEXT
========================================================= */

if (invitation.invitationTitle) {

    document.getElementById(
        "invitation-title"
    ).textContent =
        invitation.invitationTitle;

}


if (invitation.invitationMessage) {

    document.getElementById(
        "invitation-message"
    ).textContent =
        invitation.invitationMessage;

}


if (invitation.invitationClosing) {

    document.getElementById(
        "invitation-closing"
    ).textContent =
        invitation.invitationClosing;

}


/* =========================================================
   EVENT
========================================================= */

if (invitation.eventType) {

    document.getElementById(
        "event-type"
    ).textContent =
        invitation.eventType;

}


if (invitation.eventDate) {

    document.getElementById(
        "event-date"
    ).textContent =
        formatDate(
            invitation.eventDate
        );

}


if (invitation.eventTime) {

    document.getElementById(
        "event-time"
    ).textContent =
        formatTime(
            invitation.eventTime
        );

}


/* =========================================================
   VENUE
========================================================= */

if (invitation.venueName) {

    document.getElementById(
        "venue-name"
    ).textContent =
        invitation.venueName;

}


if (invitation.venueCity) {

    document.getElementById(
        "venue-city"
    ).textContent =
        invitation.venueCity;

}


/* =========================================================
   MAP
========================================================= */

const mapLink =
    document.getElementById(
        "map-link"
    );


if (
    invitation.venueMap &&
    invitation.venueMap !== "#"
) {

    mapLink.href =
        invitation.venueMap;

} else {

    mapLink.style.display =
        "none";

}


/* =========================================================
   OPEN INVITATION
========================================================= */

openButton.addEventListener(
    "click",
    function () {

        envelope.classList.add(
            "open"
        );


        openButton.disabled =
            true;


        openButton.textContent =
            "جارٍ فتح الدعوة...";


        setTimeout(
            function () {

                envelopeScreen.classList.add(
                    "hidden"
                );


                setTimeout(
                    function () {

                        envelopeScreen.style.display =
                            "none";


                        mainInvitation.classList.add(
                            "visible"
                        );


                        window.scrollTo({

                            top: 0,

                            behavior: "smooth"

                        });

                    },
                    500
                );

            },
            1200
        );

    }
);


/* =========================================================
   RSVP
========================================================= */

const rsvpYes =
    document.getElementById(
        "rsvp-yes"
    );


const rsvpNo =
    document.getElementById(
        "rsvp-no"
    );


const rsvpResult =
    document.getElementById(
        "rsvp-result"
    );


rsvpYes.addEventListener(
    "click",
    function () {

        rsvpResult.textContent =
            "شكراً لتأكيد حضوركم، يسعدنا وجودكم معنا ✨";

    }
);


rsvpNo.addEventListener(
    "click",
    function () {

        rsvpResult.textContent =
            "شكراً لإبلاغنا، نتمنى أن نلتقي بكم في مناسبات قادمة.";

    }
);


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(
    dateString
) {

    const date =
        new Date(
            `${dateString}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return dateString;

    }


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
   FORMAT TIME
========================================================= */

function formatTime(
    timeString
) {

    if (!timeString) {

        return "";

    }


    const parts =
        timeString.split(":");


    const hours =
        Number(parts[0]);


    const minutes =
        parts[1] || "00";


    const period =
        hours >= 12
            ? "مساءً"
            : "صباحاً";


    let displayHour =
        hours % 12;


    if (displayHour === 0) {

        displayHour = 12;

    }


    return `${displayHour}:${minutes} ${period}`;

}
