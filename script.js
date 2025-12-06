const navDialog = document.getElementById('nav-dialog');
function handleMenu() {
    navDialog.classList.toggle('hidden');
}

/* PARALLAX FOR 3 ROW SCROLLER */

const SPEED = 0.15;

// Initial positions for each row
const INITIAL_LINE1 = -180;
const INITIAL_LINE2 =  120;   // opposite direction → positive
const INITIAL_LINE3 = -180;

function setupParallaxLine(element, direction, initialOffset, speed) {

    function handleScroll() {
        const rect = element.getBoundingClientRect();

        // How much the row should move based on scroll
        const progress = (window.innerHeight - rect.top) * speed;

        const x = direction === "ltr"
            ? initialOffset + progress
            : -(initialOffset + progress);

        element.style.transform = `translateX(${x}px)`;
    }

    // Only run parallax when row is actually visible (performance!)
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            window.addEventListener("scroll", handleScroll);
            handleScroll();
        } else {
            window.removeEventListener("scroll", handleScroll);
        }
    });

    observer.observe(element);
}

/*  APPLY TO THE 3 ROWS */

setupParallaxLine(
    document.getElementById("line1"),
    "ltr",
    INITIAL_LINE1,
    SPEED
);

setupParallaxLine(
    document.getElementById("line2"),
    "rtl",
    INITIAL_LINE2,
    SPEED
);

setupParallaxLine(
    document.getElementById("line3"),
    "ltr",
    INITIAL_LINE3,
    SPEED
);
// ---- SMOOTH SCROLL CONTROLLED HORIZONTAL MOVEMENT ---- //

const line4Wrapper = document.querySelector("#features-line .border"); 
const line4 = document.querySelector("#features-line"); 

let lastScroll = window.scrollY;
let translateX = 0;

window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    // Detect scroll direction
    let direction = currentScroll > lastScroll ? 1 : -1;

    // Speed control (tweak if needed)
    translateX += direction * 3;

    // Apply movement to ALL line-4 elements
    document.querySelectorAll("#features-line #line-4, #features-line #line4")
        .forEach(el => {
            el.style.transform = `translateX(${translateX}px)`;
        });

    lastScroll = currentScroll;
});

