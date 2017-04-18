const avatarImg = document.querySelector('header .avatar');
const nameLink = document.querySelector('header .name');

const $window = $(window);

$.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
        user = data.results[0];
        avatarImg.src = getAvatarImageUrl(user)
        nameLink.innerHTML = getName(user);
    }
});

let getAvatarImageUrl = (user) => user.picture.thumbnail;

let getName = (user) => user.name.first + ' ' + user.name.last;

$('.hamburger-icon').click(function() {
    $('aside').toggleClass('open');
});


$('.search input').focus(function() {
    if ($window.width() < 1024) {
        $('.search').addClass('open');
        $('.tab').addClass('close');
    }
});

$('.search input').focusout(function() {
    if ($window.width() < 1024) {
        $('.search').removeClass('open');
        $('.tab').removeClass('close');
    }
});

$('.close-button').click(function() {
    $('.main-content .container .alert-box').slideUp();
});

const currentDate = moment().year(2017).month(7).date(1);
const firstDate = currentDate.subtract(11, 'weeks');

let addDates = () => {
    let dateArray = [];
    let date = firstDate;
    for (let i = 0; i < 11; i++) {
        dateArray[i] = date.format('D') + ' - ' + date.add(6, 'd').format('D');
        date = date.add(1, 'd');
    }

    return dateArray;
}

let ctx = document.getElementById("trafficChart");
let trafficChart = Chart.Scatter(ctx, {
    data: {
        datasets: [{
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            pointBorderColor: 'rgba(128, 134, 195, 1)',
            pointRadius: 5,
            borderColor: 'rgba(187, 190, 233, 1)',
            borderWidth: 2,
            lineTension: 0,
            backgroundColor: 'rgba(128, 134, 195, 0.3)',
            data: [{
                    x: moment().year(2017).month(4).date(16),
                    y: 0
                },
                {
                    x: moment().year(2017).month(4).date(23),
                    y: 500
                },
                {
                    x: moment().year(2017).month(4).date(30),
                    y: 1000
                },
                {
                    x: moment().year(2017).month(5).date(2),
                    y: 750
                },
                {
                    x: moment().year(2017).month(5).date(9),
                    y: 1250
                },
                {
                    x: moment().year(2017).month(5).date(16),
                    y: 1750
                },
                {
                    x: moment().year(2017).month(5).date(23),
                    y: 1250
                },
                {
                    x: moment().year(2017).month(5).date(27),
                    y: 1500
                },
                {
                    x: moment().year(2017).month(6).date(4),
                    y: 1000
                },
                {
                    x: moment().year(2017).month(6).date(11),
                    y: 1500
                },
                {
                    x: moment().year(2017).month(6).date(18),
                    y: 2000
                },
                {
                    x: moment().year(2017).month(6).date(25),
                    y: 1500
                },
                {
                    x: moment().year(2017).month(6).date(31),
                    y: 2000
                }
            ]
        }]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 2500,
                    fixedStepSize: 500,
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 10,
                    fontColor: "#cacaca",
                    padding: 10
                },
                gridLines: {
                    drawTicks: false,
                    zeroLineColor: "rgba(0, 0, 0, 0.1)",
                    drawBorder: false
                }
            }],
            xAxes: [{
                ticks: {
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 10,
                    fontColor: "#cacaca",
                    padding: 20
                },
                gridLines: {
                    zeroLineColor: "rgba(0, 0, 0, 0.1)"
                },
                type: 'time',
                unit: 'week',
                time: {
                    min: moment().year(2017).month(4).date(16),
                    max: moment().year(2017).month(6).date(31),
                    unitStepSize: 7,
                    displayFormats: {
                        'millisecond': 'DD',
                        'second': 'DD',
                        'minute': 'DD',
                        'hour': 'DD',
                        'day': 'DD',
                        'week': 'DD',
                        'month': 'DD',
                        'quarter': 'MDD',
                        'year': 'DD'
                    },
                    tooltipFormat: 'D-MMM-YYYY'
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false
    }
});