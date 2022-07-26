function alert() {
    Swal.fire(this.innerText);
    let month = document.getElementById(("month")).innerText.slice(0, -5);
    let year = document.getElementById(("month")).innerText.split(" ")[1];
    document.getElementById("schedule-date").innerText = `Schedule for ${month} ${this.innerText}, ${year}`;
    this.style.backgroundColor = "";
}

let liElementCollection = document.getElementById("table").getElementsByTagName("li");

for (const li of liElementCollection) {
    li.addEventListener("click", alert);
}

let presentDate = moment();
let presentMonth = presentDate.format('MMMM');
let presentYear = presentDate.format('YYYY');
console.log(presentMonth);
console.log(presentYear);

document.getElementById(("month")).innerText = `${presentMonth} ${presentYear}`;
arrowLeftElement.click();
arrowRightElement.click();
