let liElementCollection = document.getElementById("table").getElementsByTagName("li");
let buttonInsertElement = document.getElementById("button-insert");
let pNameOnAppointmentElements = document.querySelectorAll(".nameOnAppointment");

for (const li of liElementCollection) {
    li.addEventListener("click", alert);
}

if (document.URL.includes('=')) {
    buttonInsertElement.addEventListener("click", insertPopup);
    buttonInsertElement.style.visibility = "visible";
} else {
    buttonInsertElement.style.visibility = "hidden";
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

    let dateValidator = function (date) {
        let x = moment(date, "YYYY-M-D", true);
        return x.isValid();
    };

    let yearInURL = dateFromURL.split("-")[0];
    let monthInURL = dateFromURL.split("-")[1];
    monthInURL = moment().month(monthInURL - 1).format("MMMM");
    let dayInURL = dateFromURL.split("-")[2];

    if (dateValidator(dateFromURL)) {
        document.getElementById("month").innerText = `${monthInURL} ${yearInURL}`;
        document.getElementById("schedule-date").innerText = `Schedule for ${monthInURL} ${dayInURL}, ${yearInURL}`;
        arrowLeftElement.click();
        arrowRightElement.click();

        let monthInLeftH1 = document.getElementById(("month")).innerText.slice(0, -5);

        for (const li of liElementCollection) {
            if (li.innerText === dayInURL && monthInURL === monthInLeftH1) {
                li.style.backgroundColor = "purple";
            }
        }

    } else {
        refreshCalendarToCurrentDate();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    }
}

function alert() {
    let month = document.getElementById(("month")).innerText.slice(0, -5);
    let year = document.getElementById(("month")).innerText.split(" ")[1];
    document.getElementById("date-field").value = `${year}-${moment().month(month).format("M")}-${this.innerText}`;
    document.getElementById("schedule-date").innerText = `Schedule for ${month} ${this.innerText}, ${year}`;
    document.getElementById("button-submit").click();
}

function insertPopup() {
    Swal.fire({
        title: 'Do you want to make an appointment?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Fill all the fields!',
                html: `<form id="form-insert" method="POST">
                        <input type="text" id="date-field-insert-form" name="date-field-insert-form" style="display: none;">
                        <select id="time-start-in-swal-field" class="swal2-select" style="text-align: center" name="time-start-in-swal-field">  
                                <option value="8:00">8:00</option>
                                <option value="9:00">9:00</option>
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                                <option value="12:00">12:00</option>
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                                <option value="17:00">17:00</option>
                                <option value="18:00">18:00</option>
                                <option value="19:00">19:00</option>
                                <option value="20:00">20:00</option>
                        </select>
                        <select id="location-in-swal-field" class="swal2-select"  style="text-align: center" name="location-in-swal-field">
                                <option value="Zizinului 14">Zizinului 14, Brasov</option>
                                <option value="Grivitei 3">Grivitei 3, Brasov</option>
                                <option value="Turnului 17">Turnului 17, Bucuresti</option>
                        </select>
                        <input id="button-insert-form" style="display: none" type="submit">
                        </form>`,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Make an appointment!'
            }).then((result) => {
                    if (result.isConfirmed) {
                        let buttonInsertFormElement = document.getElementById("button-insert-form");
                        let dateFieldElement = document.getElementById('date-field-insert-form');
                        let url = new URL(window.location.href);
                        dateFieldElement.value = url.searchParams.get("date");
                        buttonInsertFormElement.click();
                    }
                }
            );
        }
    })
}



