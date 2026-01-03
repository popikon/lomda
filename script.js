const CHAPTERS_PART = [
    [],   //מסך פתיחה
    ['intro'],
    ['document-build'],        //מבוא
    ['chap1-page'],        //פרק 1
    ['chap2-page'],        //פרק 2
    ['chap3-page'],        //פרק 3
    ['chap4-page'],
    ['finale'],
];

const TOPICS_ORDER = ["employment-data", "tax-data", "payment-data", "funds-data"];
const NUM_OF_CHAPS = 7;
const PROGRESS_CHANGE = [['5vh', '55vh solid #2f3043'], ['14vh', '46vh solid #2f3043'], ['23vh', '37vh solid #2f3043'], ['32vh', '28vh solid #2f3043'], ['41vh', '19vh solid #2f3043'], ['50vh', '10vh solid #2f3043'], ['60vh', '.5vh solid #2f3043']];
let currentPart;
let page;
let infos;
let wantedInfo;
window.addEventListener("load", () => {
    for (let i=1; i<=NUM_OF_CHAPS; i++) {
        document.getElementById(`chap-num${i}`).addEventListener("mouseenter", openChap);
        document.getElementById(`chap-num${i}`).addEventListener("mouseleave", closeChap);
        document.getElementById(`chap-num${i}`).addEventListener("click", manageChap);
    };
    currentPart = 0;
    page = 1;
    document.getElementById('back-button').addEventListener("click",lastPart);
    document.getElementById('next-button').addEventListener("click",nextpart);

    infoOptions = document.getElementsByClassName("info-icon");
    for (i = 0; i < infoOptions.length; i++) {
        infoOptions[i].addEventListener('click', infoImage);
    };
});

const nextpart = () => {
    document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="none";
    if (currentPart >= CHAPTERS_PART[page].length - 1 || page === 0) {
        document.getElementById(`chap-num${page}`).style.color="#2f3043";
        page++;
        document.getElementById(`chap-num${page}`).style.color="#396c84";
        document.getElementById(`chap-num${page}`).addEventListener("mouseenter", openChap);
        document.getElementById(`chap-num${page}`).addEventListener("mouseleave", closeChap);
        document.getElementById(`chap-num${page}`).addEventListener("click", manageChap);
        if (page < 7) {
            document.getElementById("invisible-num-div").style.height = `${100 - page * 14.38}%`;
        } else {
            document.getElementById("invisible-num-div").style.height = `0`;
        }
        currentPart = 0;
        document.getElementById("progress").style.height = `${PROGRESS_CHANGE[page-1][0]}`;
        document.getElementById("progress").style.borderBottom = `${PROGRESS_CHANGE[page-1][1]}`;
    } else {
        currentPart++;
    };
    if (CHAPTERS_PART[page][currentPart] === "intro" || CHAPTERS_PART[page][currentPart] === "finale") {
        document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="flex";
    } else {
        document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="block";
    }
    if (CHAPTERS_PART[page][currentPart] === "finale") {
            document.getElementById("next-button").style.display = "none";
    };
};

const lastPart = () => {
    document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="none";
    document.getElementById("next-button").style.display = "block";
    if (currentPart <= 0) {
        document.getElementById(`chap-num${page}`).style.color="#2f3043";
        page--;
        if (page >= 1) {
            document.getElementById("progress").style.height = `${PROGRESS_CHANGE[page-1][0]}`;
            document.getElementById("progress").style.borderBottom = `${PROGRESS_CHANGE[page-1][1]}`;
            document.getElementById(`chap-num${page}`).style.color="#396c84";
        }
        if (page === 0) {
            window.location.href=`index.html`;
        }
        currentPart = (CHAPTERS_PART[page].length) - 1;
    } else {
        currentPart--;
    };
    
    if (CHAPTERS_PART[page][currentPart] === "intro" || CHAPTERS_PART[page][currentPart] === "finale") {
        document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="flex";
    } else {
        document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="block";
    };

    if (CHAPTERS_PART[page][currentPart] === "finale") {
        document.getElementById("next-button").style.display = "none";
    }

    if (page === 0 && currentPart === 0) {
        window.location.href=`index.html`;
    };
};

const infoImage = (event) => {
    let wantedInfo = event.target.id;
    if (wantedInfo === "frontal-hours" || wantedInfo === "job-hours") {
        wantedInfo = "frontal-hours-job";
    } else if (wantedInfo === "employment-data-more-rank1" || wantedInfo === "employment-data-more-rank2") {
        wantedInfo = "employment-data-more-rank";
    }
    document.getElementById("wanted-info-image").setAttribute('src', `assets/${TOPICS_ORDER[page - 3]}/${wantedInfo}.svg`);
    document.getElementById("info-image-div").style.display = "flex";

    if (wantedInfo === "other-funds") {
        document.getElementById("").style.transform = "translateY(100%)";
    }
};

const openChap = (event) => {
    document.getElementById(`${event.target.id}-text`).style.width="100%";
    document.getElementById(`${event.target.id}-text`).style.paddingLeft="10%";
    document.getElementById(`${event.target.id}-text`).style.padding="1%";
    document.getElementById(`${event.target.id}-text`).style.paddingLeft="10%";
    document.getElementById(`${event.target.id}-text`).style.borderTopLeftRadius="1vh";
    document.getElementById(`${event.target.id}-text`).style.borderBottomLeftRadius="1vh";
    document.getElementById("chap-text-boxes").style.width="13%";
};

const closeChap = (event) => {
    document.getElementById(`${event.target.id}-text`).style.width="0";
    document.getElementById(`${event.target.id}-text`).style.paddingLeft="0";
    document.getElementById(`${event.target.id}-text`).style.padding="0";
    document.getElementById(`${event.target.id}-text`).style.paddingLeft="0";
    document.getElementById(`${event.target.id}-text`).style.borderTopLeftRadius="0";
    document.getElementById(`${event.target.id}-text`).style.borderBottomLeftRadius="0";
    document.getElementById("chap-text-boxes").style.width="0";
};

const manageChap = (event) => {
    for (let i=1; i<=NUM_OF_CHAPS; i++) {
        document.getElementById(`chap-num${i}`).style.color="#2f3043";
    };
    document.getElementById(event.target.id).style.color="#396c84";
    document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="none";
    page = event.target.id;
    page = page.charAt(page.length - 1);
    currentPart = 0;
    document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="block";
    document.getElementById("progress").style.height = `${PROGRESS_CHANGE[page-1][0]}`;
    document.getElementById("progress").style.borderBottom = `${PROGRESS_CHANGE[page-1][1]}`;
};
