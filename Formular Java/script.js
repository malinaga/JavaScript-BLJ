const formular = document.getElementById("bestellFormular");

formular.addEventListener("submit", function(event) {
    const email = document.getElementById("mail").value;
    const tiket = document.getElementById("tnumber").value;

    if (!isValidEmail(email)) {
        wrongEmail();
        event.preventDefault();
    }

    if (tiket === "bitte wählen") {
        noTikets();
        event.preventDefault();
    }
});

function isValidEmail(emailAddr) {
    if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(emailAddr)) {
        return true;
    }
    return false;
}

function wrongEmail() {
    alert("Bitte geben Sie eine gültige E-Mail Adresse ein.");
}

function noTikets() {
    alert("Bitte wählen Sie aus, wieviele Tickets sie bestellen möchten.");
}