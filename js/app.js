const avatarImg = document.querySelector('header .avatar');
const nameLink = document.querySelector('header .name');
const membersList = document.querySelector('.new-members .list');
const recentActivitiesList = document.querySelector('.recent-activities .list');

const chevronIcon = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" width="16"><g><g><polygon points="17.4,63.5 14.6,60.5 45.1,32 14.6,3.5 17.4,0.5 50.9,32"/></g></g></svg>';

const $window = $(window);

$.ajax({
    url: 'https://randomuser.me/api/?results=5',
    dataType: 'json',
    success: function(data) {
        const loginUser = data.results[0];
        const newMembers = data.results.slice(1, data.results.length);

        avatarImg.src = getAvatarImageUrl(loginUser)
        nameLink.innerHTML = getName(loginUser);
        createMockActivityData(newMembers);
        console.log(newMembers);
        createLists(newMembers);
    }
});

let createMockActivityData = function(members) {
    members[0].activity = {
        message: getName(members[0]) + " commented on YourApp's SEO Tip",
        time: '4 hours ago'
    };
    members[1].activity = {
        message: getName(members[1]) + " liked the post Facebook's Change for 2016",
        time: '5 hours ago'
    };
    members[2].activity = {
        message: getName(members[2]) + " commented on Facebook's Change for 2016",
        time: '5 hours ago'
    };
    members[3].activity = {
        message: getName(members[3]) + " posted YourApp's SEO Tip",
        time: '1 day ago'
    };


}

let getAvatarImageUrl = (user) => user.picture.thumbnail;
let getName = (user) => user.name.first + ' ' + user.name.last;
let getEmail = (user) => user.email;
let getRegisterdDate = (user) => moment(user.registered, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YY');

let createLists = function(members) {
    for (let i = 0; i < members.length; i++) {
        membersList.appendChild(createListItem(members[i], {
            mainText: getName(members[i]),
            subText: getEmail(members[i]),
            sideText: getRegisterdDate(members[i])
        }));

        recentActivitiesList.appendChild(createListItem(members[i], {
            mainText: members[i].activity.message,
            subText: members[i].activity.time,
            sideText: chevronIcon
        }));
    }
}

let createAvatar = function(member) {
    let avatar = document.createElement('img');
    avatar.src = getAvatarImageUrl(member);
    avatar.className = 'avatar';

    return avatar;
}

let createListItem = function(member, texts) {
    let mainSpan = document.createElement('span');
    let subSpan = document.createElement('span');
    let sideSpan = document.createElement('span');
    let listItem = document.createElement("li");
    let anchor = document.createElement("a");
    let textDiv = document.createElement('div');
    let avatar = createAvatar(member);

    anchor.href = '#';
    textDiv.className = 'text';

    mainSpan.className = 'mainText';
    subSpan.className = 'subText';
    sideSpan.className = 'sideText';

    mainSpan.textContent = texts.mainText;
    subSpan.textContent = texts.subText;
    sideSpan.innerHTML = texts.sideText;

    textDiv.appendChild(mainSpan);
    textDiv.appendChild(subSpan);

    anchor.appendChild(avatar);
    anchor.appendChild(textDiv);
    anchor.appendChild(sideSpan);
    listItem.appendChild(anchor);
    return listItem;
}



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

const endDate = moment().year(2017).month(6).date(31);
const startDate = moment().year(2017).month(6).date(31).subtract(11, 'weeks').add(1, 'd');

let scatterChartWeekly = Chart.Scatter("scatterChartWeekly", {
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
                    fontColor: "#cacaca"
                },
                gridLines: {
                    zeroLineColor: "rgba(0, 0, 0, 0.1)"
                },
                type: 'time',
                unit: 'week',
                time: {
                    min: startDate,
                    max: endDate,
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

let barChartDaily = new Chart("barChartDaily", {
    type: 'bar',
    data: {
        labels: ["S", "M", "T", "W", "T", "F", "S"],
        datasets: [{
            data: [50, 75, 150, 100, 200, 175, 75],
            backgroundColor: 'rgba(115, 121, 189, 1)'
        }],
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 250,
                    fixedStepSize: 50,
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
                barPercentage: 0.6,
                ticks: {
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 10,
                    fontColor: "#cacaca"
                },
                gridLines: {
                    drawBorder: false,
                    zeroLineColor: "rgba(0, 0, 0, 0.1)"
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false
    }
});

var pieChartMobileUser = new Chart("pieChartMobileUser", {
    type: 'doughnut',
    data: {
        labels: [
            "Desktop",
            "Tablets",
            "Phones"
        ],
        datasets: [{
            data: [67, 18, 15],
            backgroundColor: [
                "#7379bd",
                "#83c891",
                "#76b1be"
            ],
            hoverBackgroundColor: [
                "#7379bd",
                "#83c891",
                "#76b1be"
            ]
        }]
    },
    options: {
        rotation: 0 * Math.PI,
        legend: {
            position: 'right',
            labels: {
                fontFamily: "'Roboto', sans-serif",
                fontSize: 10,
                fontColor: "#7e7e7e",
                boxWidth: 10
            },
            reverse: true
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            arc: {
                borderWidth: 0
            }

        }
    }

});