function alert() {
    let month = document.getElementById(("month")).innerText.slice(0, -5);
    let year = document.getElementById(("month")).innerText.split(" ")[1];
    document.getElementById("form-day-field").value = `${this.innerText}`;
    document.getElementById("form-month-field").value = `${month}`;
    document.getElementById("form-year-field").value = `${year}`;
    document.getElementById("schedule-date").innerText = `Schedule for ${month} ${this.innerText}, ${year}`;
//     Swal.fire({
//         title: 'Do you want to save the appointment?',
//         showDenyButton: true,
//         showCancelButton: false,
//         confirmButtonText: 'Save',
//         denyButtonText: `Don't save`,
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire('Saved!', '', 'success')//.then(document.getElementById("button-submit").click());
//             let swalOk = document.getElementsByClassName("swal2-confirm swal2-styled");
//             swalOk[0].onclick = function () {
//                 document.getElementById("button-submit").click();
//             };
//         } else if (result.isDenied) {
//             Swal.fire('No appointment was made.', '', 'error');
//         }
//     })
    document.getElementById("button-submit").click();
 }

let liElementCollection = document.getElementById("table").getElementsByTagName("li");

for (const li of liElementCollection) {
    li.addEventListener("click", alert);
}



if(!document.URL.includes('=')) {
    let currentDate = moment();
    let currentDay = currentDate.format('DD');
    let currentMonth = currentDate.format('MMMM');
    let currentYear = currentDate.format('YYYY');
    document.getElementById("month").innerText = `${currentMonth} ${currentYear}`;
    document.getElementById("schedule-date").innerText = `Schedule for ${currentMonth} ${currentDay}, ${currentYear}`;
    arrowLeftElement.click();
    arrowRightElement.click();
} else {
    let url = document.URL;
    let dayInURL = url.substring(url.search(/day=/), url.search(/&/));
    let monthInURL = url.substring(url.search(/month=/), url.search(/&year/));
    let yearInURL = url.substring(url.search(/year=/));

    yearInURL = yearInURL.split("=").pop();
    monthInURL = monthInURL.split("=").pop();
    dayInURL = dayInURL.split("=").pop();

    document.getElementById("month").innerText = `${monthInURL} ${yearInURL}`;
    document.getElementById("schedule-date").innerText = `Schedule for ${monthInURL} ${dayInURL}, ${yearInURL}`;
    arrowLeftElement.click();
    arrowRightElement.click();
}