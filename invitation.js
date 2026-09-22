/* =========================================================
   INVITATION DATA
========================================================= */

const defaultInvitation = {

    template: "floral",

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

    enableRSVP: true

};


/* =========================================================
   GET DATA
========================================================= */

function getInvitationData() {

    try {

        const saved =
            localStorage.getItem("invitationData");

        if (!saved) {

            return defaultInvitation;

        }

        return {
            ...defaultInvitation,
            ...JSON.parse(saved)
        };

    } catch (error) {

        console.error(
            "Could not load invitation data:",
            error
        );

        return defaultInvitation;

    }

}


/* =========================================================
   URL GUEST
========================================================= */

function getGuestFromURL(data) {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const guestId =
        params.get("guest");

    if (!guestId) {

        return {
            name: "ضيفنا العزيز",
            count: 1
        };

    }

    const guest =
        data.guests?.find(
            item =>
                String(item.id) ===
                String(guestId)
        );

    if (!guest) {

        return {
            name: "ضيفنا العزيز",
            count: 1
        };

    }

    return guest;

}


/* =========================================================
   EVENT TYPE
========================================================= */

function getEventCategory(eventType) {

    const text =
        String(eventType || "")
            .toLowerCase();

    if (
        text.includes("مولود") ||
        text.includes("بيبي") ||
        text.includes("baby") ||
        text.includes("سبوع") ||
        text.includes("ولادة")
    ) {

        return "baby";

    }

    if (
        text.includes("ميلاد") ||
        text.includes("birthday") ||
        text.includes("عيد ميلاد")
    ) {

        return "birthday";

    }

    if (
        text.includes("تخرج") ||
        text.includes("graduation") ||
        text.includes("تخرّج")
    ) {

        return "graduation";

    }

    if (
        text.includes("طفل") ||
        text.includes("أطفال") ||
        text.includes("بنات") ||
        text.includes("أولاد") ||
        text.includes("castle")
    ) {

        return "children";

    }

    return "wedding";

}


/* =========================================================
   SHOW ILLUSTRATION
========================================================= */

function showIllustration(category) {

    const illustrations =
        document.querySelectorAll(
            ".illustration"
        );

    illustrations.forEach(
        illustration => {

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
   APPLY TEMPLATE
========================================================= */

function applyTemplate(template) {

    document.body.dataset.template =
        template || "floral";

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "—";

    }

    try {

        const date =
            new Date(dateString);

        return new Intl.DateTimeFormat(
            "ar-SA",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ).format(date);

    } catch {

        return dateString;

    }

}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(timeString) {

    if (!timeString) {

        return "—";

    }

    try {

        const [hours, minutes] =
            timeString.split(":");

        const date =
            new Date();

        date.setHours(
            Number(hours),
            Number(minutes)
        );

        return new Intl.DateTimeFormat(
            "ar-SA",
            {
                hour: "numeric",
                minute: "2-digit"
            }
        ).format(date);

    } catch {

        return timeString;

    }

}


/* =========================================================
   POPULATE
========================================================= */

function populateInvitation() {

    const data =
        getInvitationData();

    const guest =
        getGuestFromURL(data);


    /* Guest */

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
        guest.count || 1;


    /* Couple */

    const personOne =
        data.personOne || "";

    const personTwo =
        data.personTwo || "";


    let coupleName =
        `${personOne} & ${personTwo}`;

    if (
        !personOne &&
        !personTwo
    ) {

        coupleName =
            data.familyName ||
            "دعوتنا الخاصة";

    }


    document.getElementById(
        "couple-names"
    ).textContent =
        coupleName;


    /* Text */

    document.getElementById(
        "invitation-title"
    ).textContent =
        data.invitationTitle ||
        "يسعدنا دعوتكم لمشاركتنا فرحتنا";


    document.getElementById(
        "invitation-message"
    ).textContent =
        data.invitationMessage ||
        "نتشرف بحضوركم ومشاركتكم أجمل لحظاتنا.";


    document.getElementById(
        "invitation-closing"
    ).textContent =
        data.invitationClosing ||
        "تشرفنا حضوركم ومشاركتكم فرحتنا";


    /* Event */

    document.getElementById(
        "event-type"
    ).textContent =
        data.eventType ||
        "المناسبة";


    document.getElementById(
        "event-date"
    ).textContent =
        formatDate(
            data.eventDate
        );


    document.getElementById(
        "event-time"
    ).textContent =
        formatTime(
            data.eventTime
        );


    document.getElementById(
        "venue-name"
    ).textContent =
        data.venueName ||
        "—";


    document.getElementById(
        "venue-city"
    ).textContent =
        data.venueCity ||
        "—";


    /* Map */

    const mapLink =
        document.getElementById(
            "map-link"
        );

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


    /* Template */

    applyTemplate(
        data.template
    );


    /* Illustration */

    const category =
        getEventCategory(
            data.eventType
        );

    showIllustration(
        category
    );


    /* RSVP */

    if (
        data.enableRSVP === false
    ) {

        document.getElementById(
            "rsvp-section"
        ).style.display =
            "none";

    }

}


/* =========================================================
   OPEN INVITATION
========================================================= */

function openInvitation() {

    const envelope =
        document.getElementById(
            "envelope"
        );

    const screen =
        document.getElementById(
            "envelope-screen"
        );

    const main =
        document.getElementById(
            "main-invitation"
        );


    envelope.classList.add(
        "open"
    );


    setTimeout(() => {

        screen.classList.add(
            "hidden"
        );

        main.classList.add(
            "visible"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 1000);

}


/* =========================================================
   RSVP
========================================================= */

function setupRSVP() {

    const yes =
        document.getElementById(
            "rsvp-yes"
        );

    const no =
        document.getElementById(
            "rsvp-no"
        );

    const result =
        document.getElementById(
            "rsvp-result"
        );


    yes.addEventListener(
        "click",
        () => {

            result.textContent =
                "تم تأكيد حضوركم بكل سرور ♡";

        }
    );


    no.addEventListener(
        "click",
        () => {

            result.textContent =
                "شكرًا لإبلاغنا، ونتمنى أن نلتقي بكم في مناسبة قادمة ♡";

        }
    );

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        populateInvitation();

        setupRSVP();


        document
            .getElementById(
                "open-invitation"
            )
            .addEventListener(
                "click",
                openInvitation
            );

    }
);
