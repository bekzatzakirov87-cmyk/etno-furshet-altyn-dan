
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");
const dateInput = document.getElementById("date");

// Мобилдик меню
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Менюдагы шилтемени басканда жабылат
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Брондоо үчүн бүгүнкү күндөн кийинки датаны тандоо
const today = new Date();
const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

dateInput.min = localToday;

// Форма толтурулганда WhatsApp билдирүүсүн даярдоо
bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) {
        return;
    }

    const formData = new FormData(bookingForm);

    const name = formData.get("name").trim();
    const phone = formData.get("phone").trim();
    const eventType = formData.get("event");
    const date = formData.get("date");
    const guests = formData.get("guests");
    const message = formData.get("message").trim();

    const text = [
        "Саламатсызбы! Этнофуршет Алтын Данга заказ бергим келет.",
        "",
        `Атым: ${name}`,
        `Телефонум: ${phone}`,
        `Иш-чара: ${eventType}`,
        `Күнү: ${date}`,
        `Коноктордун саны: ${guests}`,
        `Кошумча каалоо: ${message || "Жок"}`
    ].join("\n");

    formStatus.textContent =
        "Билдирүү даяр. WhatsApp аркылуу жөнөтүү үчүн төмөнкү баскычты басыңыз.";

    // Өзүңүздүн WhatsApp номериңизди жазыңыз:
    // Өлкө коду менен, + белгисиз, мисалы 996XXXXXXXXX
    const whatsappNumber = "996500644600";

    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    let sendButton = document.getElementById("whatsappSend");

    if (!sendButton) {
        sendButton = document.createElement("a");
        sendButton.id = "whatsappSend";
        sendButton.className = "btn btn-submit";
        sendButton.style.marginTop = "12px";
        sendButton.style.textAlign = "center";
        sendButton.textContent = "WhatsApp аркылуу жөнөтүү ↗";
        formStatus.insertAdjacentElement("afterend", sendButton);
    }

    sendButton.href = whatsappUrl;
    sendButton.target = "_blank";
    sendButton.rel = "noopener noreferrer";
});

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const eventType = document.getElementById("event").value;
    const date = document.getElementById("date").value;
    const guests = document.getElementById("guests").value;
    const message = document.getElementById("message").value;

    // Бул жерге бизнес ээсинин WhatsApp номерин жазабыз
    const whatsappNumber = "996500644600";

    const orderText = `
🌿 ЭТНО ФУРШЕТ АЛТЫН ДАН
📩 Жаңы заказ!

👤 Аты: ${name}
📞 Телефон: ${phone}
🎉 Иш-чара: ${eventType}
📅 Дата: ${date}
👥 Коноктор: ${guests}

📝 Кошумча маалымат:
${message}
    `;

    const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(orderText);

    window.open(whatsappURL, "_blank");
});
