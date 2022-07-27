function alert() {
    let month = document.getElementById(("month")).innerText.slice(0, -5);
    console.log(month)
    let year = document.getElementById(("month")).innerText.split(" ")[1];
    document.getElementById("date-field").value = `${year}-${moment().month(month).format("M")}-${this.innerText}`;

    document.getElementById("schedule-date").innerText = `Schedule for ${month} ${this.innerText}, ${year}`;
    // Swal.fire({
    //     title: 'Do you want to save the appointment?',
    //     showDenyButton: true,
    //     showCancelButton: false,
    //     confirmButtonText: 'Save',
    //     denyButtonText: `Don't save`,
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         Swal.fire('Saved!', '', 'success');//.then(document.getElementById("button-submit").click());
    //         let swalOk = document.getElementsByClassName("swal2-confirm swal2-styled");
    //         swalOk[0].onclick = function () {
    //             document.getElementById("button-submit").click();
    //         };
    //     } else if (result.isDenied) {
    //         Swal.fire('No appointment was made.', '', 'error');
    //     }
    // })
    document.getElementById("button-submit").click();
}

let liElementCollection = document.getElementById("table").getElementsByTagName("li");

for (const li of liElementCollection) {
    li.addEventListener("click", alert);
}


function refreshCalendarToCurrentDate() {
    let currentDate = moment();
    let currentDay = currentDate.format('DD');
    let currentMonth = currentDate.format('MMMM');
    let currentYear = currentDate.format('YYYY');
    document.getElementById("month").innerText = `${currentMonth} ${currentYear}`;
    document.getElementById("schedule-date").innerText = `Schedule for ${currentMonth} ${currentDay}, ${currentYear}`;
    arrowLeftElement.click();
    arrowRightElement.click();
}

if (!document.URL.includes('=')) {
    refreshCalendarToCurrentDate();
} else {
    let url = new URL(window.location.href);
    let dateFromURL = url.searchParams.get("date");
    let dateValidator = function () {
        return moment(dateFromURL, "YYYY-M-D", true).isValid();
    };
    let yearInURL = dateFromURL.split("-")[0];
    let monthInURL = dateFromURL.split("-")[1];
    monthInURL = moment().month(monthInURL - 1).format("MMMM");
    let dayInURL = dateFromURL.split("-")[2];

    if (dateValidator()) {
        document.getElementById("month").innerText = `${monthInURL} ${yearInURL}`;
        document.getElementById("schedule-date").innerText = `Schedule for ${monthInURL} ${dayInURL}, ${yearInURL}`;
        arrowLeftElement.click();
        arrowRightElement.click();
    } else {
        refreshCalendarToCurrentDate();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    }
}