<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Calendar</title>
    <link rel="stylesheet" href="styles.css">
    <script src="moment.min.js" defer></script>
    <script src="calendar.js" defer></script>
    <script src="app.js" defer></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
<section id="container">
    <section id="table-section">
        <div id="h1-and-arrows">
            <h1 id="month" class="h1">January 2022</h1>
            <div id="arrows">
                <button id="arrow-left"><</button>
                <button id="arrow-right">></button>
            </div>
        </div>
        <ol id="days">
            <li data-col="7" data-row="1">S</li>
            <li data-col="1" data-row="1">M</li>
            <li data-col="2" data-row="1">T</li>
            <li data-col="3" data-row="1">W</li>
            <li data-col="4" data-row="1">T</li>
            <li data-col="5" data-row="1">F</li>
            <li data-col="6" data-row="1">S</li>
        </ol>
        <ol id="table">

            <li data-col="1" data-row="1">1</li>
            <li data-col="2" data-row="1">2</li>
            <li data-col="3" data-row="1">3</li>
            <li data-col="4" data-row="1">4</li>
            <li data-col="5" data-row="1">5</li>
            <li data-col="6" data-row="1">6</li>
            <li data-col="7" data-row="1">7</li>

            <li data-col="2" data-row="2">8</li>
            <li data-col="1" data-row="2">9</li>
            <li data-col="3" data-row="2">10</li>
            <li data-col="4" data-row="2">11</li>
            <li data-col="5" data-row="2">12</li>
            <li data-col="6" data-row="2">13</li>
            <li data-col="7" data-row="2">14</li>

            <li data-col="1" data-row="3">15</li>
            <li data-col="2" data-row="3">16</li>
            <li data-col="3" data-row="3">17</li>
            <li data-col="4" data-row="3">18</li>
            <li data-col="5" data-row="3">19</li>
            <li data-col="6" data-row="3">20</li>
            <li data-col="7" data-row="3">21</li>

            <li data-col="1" data-row="4">22</li>
            <li data-col="2" data-row="4">23</li>
            <li data-col="3" data-row="4">24</li>
            <li data-col="4" data-row="4">25</li>
            <li data-col="5" data-row="4">26</li>
            <li data-col="6" data-row="4">27</li>
            <li data-col="7" data-row="4">28</li>

            <li data-col="1" data-row="5">29</li>
            <li data-col="2" data-row="5">30</li>
            <li data-col="3" data-row="5">31</li>
            <li data-col="4" data-row="5"></li>
            <li data-col="5" data-row="5"></li>
            <li data-col="6" data-row="5"></li>
            <li data-col="7" data-row="5"></li>

            <li data-col="1" data-row="6"></li>
            <li data-col="2" data-row="6"></li>
            <li data-col="3" data-row="6"></li>
            <li data-col="4" data-row="6"></li>
            <li data-col="5" data-row="6"></li>
            <li data-col="6" data-row="6"></li>
            <li data-col="7" data-row="6"></li>

        </ol>
    </section>
    <section id="people-section">
        <h1 id="schedule-date" class="h1">Schedule for January 21, 2022</h1>
        <ol class="people-list">
            <li>
                <?php
                function getAppointments($dateClicked)
                {
                    $pdo = new PDO('mysql:dbname=tutorial;host=mysql', 'tutorial', 'secret', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
                    $stmt = $pdo->prepare("SELECT * FROM appointments
                                                 INNER JOIN users ON appointments.id_user = users.id
                                                 INNER JOIN locations ON appointments.location = locations.id
                                                 WHERE  cast(appointments.time_start AS DATE)  = :dateClicked");
                    $stmt->bindParam(':dateClicked', $dateClicked);
                    $stmt->execute();
                    $stmt->setFetchMode(PDO::FETCH_ASSOC);
                    while ($row = $stmt->fetch()) {
                        $time_start = new DateTime($row["time_start"]);
                        $time_end = new DateTime($row["time_end"]);
                        echo '<div class="person-div">
                    <img src="images/avatar1.png" alt="firstImage">
                    <p>' . $row["first_name"] . ' ' . $row["last_name"] . '</p>
                    <h2>' . $time_start->format('H:i') . ' - ' . $time_end->format('H:i') . '</h2>
                   <h2>At: ' . $row["address"] . '</h2>
               </div>';
                    }
                }

                if ($_SERVER['REQUEST_METHOD'] == 'GET' && !empty($_GET['date'])) {
                    $dateClicked = htmlspecialchars($_GET["date"]);
                    $dateArray = explode("-", $dateClicked);
                    $dateClicked = strtotime($dateClicked);
                    $dateClicked = date("Y-m-d", $dateClicked);

                    if (checkdate($dateArray[1], $dateArray[2], $dateArray[0])) {
                        getAppointments($dateClicked);
                    } else {
                        echo "eroare parametrii url in php";
                    }
                } else {
                    getAppointments(date("Y-m-d"));
                }
                ?>
            </li>
        </ol>
    </section>
</section>
<form id="form" style="display: none" method="GET">
    <input type="text" id="date-field" name="date" value="">
    <input id="button-submit" type="submit">
</form>
</body>
</html>
