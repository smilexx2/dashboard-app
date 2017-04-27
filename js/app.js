/*jshint esversion: 6 */
/*globals $:false */
/*globals moment:false */
/*globals Chart:false*/


const avatarImg = document.createElement('img');
const avatarImgContainer = document.querySelector('.avatar-container');
const nameLink = document.querySelector('header .name');
const membersList = document.querySelector('.new-members .list');
const recentActivitiesList = document.querySelector('.recent-activities .list');
const searchUserList = document.querySelector('.search-user-box .list');

const chevronIcon = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" width="16"><style>.list .sideText svg {fill: #8d91c8;}</style><g><g><polygon points="17.4,63.5 14.6,60.5 45.1,32 14.6,3.5 17.4,0.5 50.9,32"/></g></g></svg>';

const $window = $(window);

let allMembers = [];

avatarImg.className = "avatar";
avatarImgContainer.appendChild(avatarImg);

$.ajax({
    url: 'https://randomuser.me/api/?results=500&nat=us,ca,gb,au',
    dataType: 'json',
    success: function(data) {
        const loginUser = data.results[0];
        const newMembers = data.results.slice(1, 5);
        allMembers = data.results.slice();

        avatarImg.src = getAvatarImageUrl(loginUser);
        nameLink.innerHTML = getName(loginUser);
        createMockActivityData(newMembers);
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
};

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
};

let createAvatar = function(member) {
    let avatar = document.createElement('img');
    avatar.src = getAvatarImageUrl(member);
    avatar.className = 'avatar';

    return avatar;
};

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
};



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

$('.alert-box .close-button').click(function() {
    $('.main-content .container .alert-box').slideUp();
});

$('.notification-icon').click(function() {
    $('body').removeClass('disable-scroll');
    $('.dropdown').toggleClass('hide');

    if (!$('.notification-icon').hasClass('hide')) {
        $('.notification-icon').addClass('hide');
    } else {
        $('.dropdown ul').addClass('hide');
        $('.no-notification-message').addClass('show');
    }

    if (!$('.dropdown').hasClass('hide')) {
        $('body').addClass('disable-scroll');
    }

    if ($window.width() < 768) {
        $('aside').removeClass('open');
    }
});

$(document).mouseup(function(e) {
    let container = $('.dropdown, .notification-icon');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.dropdown').addClass('hide');
        $('body').removeClass('disable-scroll');
    }
});

$('.scales li').click(function() {
    $('.chart-wrapper.active').removeClass('active');
    $('.scales li.active').removeClass('active');
    $('.chart-wrapper').eq($('.scales li').index($(this))).addClass('active');
    $(this).addClass('active');
});

$('.search-user-box input').on('keyup focus', function(e) {
    let foundUsers;

    hideUserList();

    if (allMembers.length !== 0 && $(this).val() !== '') {
        foundUsers = searchUsers($(this).val(), allMembers);

        for (let i = 0; i < foundUsers.length; i++) {
            searchUserList.appendChild(createListItem(foundUsers[i], {
                mainText: getName(foundUsers[i]),
                subText: getEmail(foundUsers[i]),
                sideText: ''
            }));
        }
        if (foundUsers.length > 0) {
            $('.autocomplete').addClass('show');
            $('.search-user-box a').click(function(e) {
                e.preventDefault();
                const email = $(this).find('.text .subText').text();
                $('.search-user-box input').val(email);
                hideUserList();
            });

            if (foundUsers.length == 1 && getEmail(foundUsers[0]) == $(this).val()) {
                hideUserList();
            }
        }
    }


});

$(".autocomplete").hover(function() {
    $(this).addClass("hovered");
}, function() {
    $(this).removeClass("hovered");
});

$('.search-user-box input').focusout(function() {
    if (!$(".autocomplete").hasClass("hovered")) {
        $('.autocomplete').removeClass('show');
    }
});

let hideUserList = function() {
    while (searchUserList.hasChildNodes()) {
        searchUserList.removeChild(searchUserList.lastChild);
        $('.autocomplete').removeClass('show hovered');
    }
};

let searchUsers = function(text, members) {
    let foundUsers = [];
    for (let i = 0; i < members.length; i++) {
        if (getName(members[i]).includes(text.toLowerCase()) ||
            getEmail(members[i]).includes(text.toLowerCase())) {
            foundUsers.push(members[i]);
        }
        if (foundUsers.length >= 5) {
            break;
        }
    }
    return foundUsers;
};

for (let i = 0; i < $('.settings .switch-light input').length; i++) {
    let inputElement = $('.settings .switch-light input').get(i);
    if (localStorage.getItem('switch' + i) == 'checked') {
        $(inputElement).prop('checked', true);
    } else if (localStorage.getItem('switch' + i) == 'unchecked') {
        $(inputElement).prop('checked', false);
    }
}

$('.settings .switch-light').click(function() {
    if ($(this).find('input').is(':checked')) {
        localStorage.setItem('switch' + $(this).index(), 'checked');
    } else {
        localStorage.setItem('switch' + $(this).index(), 'unchecked');
    }

});

$('form.message-box').submit(function(e) {
    e.preventDefault();
    if (!hasEmptyFields() && !invalidEmail()) {
        showPopUp($(".popup-container.success"));
    }
});

let invalidEmail = function() {
    for (let i = 0; i < allMembers.length; i++) {
        if ($('form.message-box input[name="email"]').val() == getEmail(allMembers[i])) {
            return false;
        }
    }
    showPopUp($(".popup-container.failed"));
    return true;
}

let showPopUp = function($popUpContainer) {
    $('form.message-box button').prop('disabled', true);

    $popUpContainer.fadeIn(200, function() {
        let timeout = setTimeout(function() {
            $popUpContainer.fadeOut(200, function() {
                $('form.message-box button').prop('disabled', false);
            });
        }, 3000);
        // $('.popup .close-button').click(function() {
        //     $popUpContainer.fadeOut(200, function() {
        //         $('form.message-box button').prop('disabled', false);
        //         clearTimeout(timeout);
        //     });
        // });
    });
}

let hasEmptyFields = function() {
    let isEmpty = false;
    $('.message-box .container').each(function() {
        $(this).find('input, textarea').each(function() {
            if ($(this).val() == '') {
                $(this).parent().addClass('error');
                isEmpty = true;
            }
        });
    });
    return isEmpty;
}

$('.message-box .container').each(function() {
    $(this).find('.error-message').click(function() {
        $(this).parent().removeClass('error');
        $(this).parent().find('input, textarea').focus();
    });

    $(this).find('input, textarea').focus(function() {
        $(this).parent().removeClass('error');
    });
});



let dataHourly = [{
    x: moment().year(2017).month(6).date(30).hour(0),
    y: 3
}, {
    x: moment().year(2017).month(6).date(30).hour(1),
    y: 4
}, {
    x: moment().year(2017).month(6).date(30).hour(2),
    y: 0
}, {
    x: moment().year(2017).month(6).date(30).hour(3),
    y: 13
}, {
    x: moment().year(2017).month(6).date(30).hour(4),
    y: 5
}, {
    x: moment().year(2017).month(6).date(30).hour(5),
    y: 7
}, {
    x: moment().year(2017).month(6).date(30).hour(6),
    y: 18
}, {
    x: moment().year(2017).month(6).date(30).hour(7),
    y: 17
}, {
    x: moment().year(2017).month(6).date(30).hour(8),
    y: 12
}, {
    x: moment().year(2017).month(6).date(30).hour(9),
    y: 15
}, {
    x: moment().year(2017).month(6).date(30).hour(10),
    y: 11
}, {
    x: moment().year(2017).month(6).date(30).hour(11),
    y: 20
}, {
    x: moment().year(2017).month(6).date(30).hour(12),
    y: 6
}, {
    x: moment().year(2017).month(6).date(30).hour(13),
    y: 10
}, {
    x: moment().year(2017).month(6).date(30).hour(14),
    y: 2
}, {
    x: moment().year(2017).month(6).date(30).hour(15),
    y: 19
}, {
    x: moment().year(2017).month(6).date(30).hour(16),
    y: 8
}, {
    x: moment().year(2017).month(6).date(30).hour(17),
    y: 14
}, {
    x: moment().year(2017).month(6).date(30).hour(18),
    y: 9
}, {
    x: moment().year(2017).month(6).date(30).hour(19),
    y: 1
}, {
    x: moment().year(2017).month(6).date(30).hour(20),
    y: 16
}, {
    x: moment().year(2017).month(6).date(30).hour(21),
    y: 7
}, {
    x: moment().year(2017).month(6).date(30).hour(22),
    y: 9
}, {
    x: moment().year(2017).month(6).date(30).hour(23),
    y: 11
}, {
    x: moment().year(2017).month(6).date(31).hour(0),
    y: 12
}];

let optionsHourly = {
    max: 25,
    fixedStepSize: 5,
    time: {
        unit: 'hour',
        round: 'hour',
        min: moment().year(2017).month(6).date(30).hour(0).minute(0),
        max: moment().year(2017).month(6).date(31).hour(0).minute(0),
        displayFormats: {
            'millisecond': 'H',
            'second': 'H',
            'minute': 'H',
            'hour': 'H',
            'day': 'H',
            'week': 'H',
            'month': 'H',
            'quarter': 'H',
            'year': 'H'
        },
        tooltipFormat: 'H:00'
    }
};

let dataDaily = [{
    x: moment().year(2017).month(6).date(23),
    y: 50
}, {
    x: moment().year(2017).month(6).date(24),
    y: 75
}, {
    x: moment().year(2017).month(6).date(25),
    y: 150
}, {
    x: moment().year(2017).month(6).date(26),
    y: 100
}, {
    x: moment().year(2017).month(6).date(27),
    y: 200
}, {
    x: moment().year(2017).month(6).date(28),
    y: 175
}, {
    x: moment().year(2017).month(6).date(29),
    y: 75
}, {
    x: moment().year(2017).month(6).date(30),
    y: 159
}];

let optionsDaily = {
    max: 250,
    fixedStepSize: 50,
    time: {
        unit: 'day',
        round: 'day',
        min: moment().year(2017).month(6).date(30).subtract(7, 'd').hour(0).minute(0),
        max: moment().year(2017).month(6).date(30).hour(0).minute(0),
        displayFormats: {
            'millisecond': 'ddd',
            'second': 'ddd',
            'minute': 'ddd',
            'hour': 'ddd',
            'day': 'ddd',
            'week': 'ddd',
            'month': 'ddd',
            'quarter': 'ddd',
            'year': 'ddd'
        },
        tooltipFormat: 'dddd, DD-MM-YYYY'
    }
};

let dataWeekly = [{
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
        x: moment().year(2017).month(7).date(1),
        y: 2000
    }
];

let optionsWeekly = {
    max: 2500,
    fixedStepSize: 500,
    time: {
        round: 'day',
        min: moment().year(2017).month(6).date(31).subtract(11, 'weeks').add(1, 'd'),
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
            'quarter': 'DD',
            'year': 'DD'
        },
        tooltipFormat: 'D-MMM-YYYY'

    }
};

let dataMonthly = [{
        x: moment().year(2017).month(0).date(1),
        y: 4490
    },
    {
        x: moment().year(2017).month(1).date(1),
        y: 6139
    },
    {
        x: moment().year(2017).month(2).date(1),
        y: 5741
    },
    {
        x: moment().year(2017).month(3).date(1),
        y: 4964
    },
    {
        x: moment().year(2017).month(4).date(1),
        y: 4406
    },
    {
        x: moment().year(2017).month(5).date(1),
        y: 7333
    },
    {
        x: moment().year(2017).month(6).date(1),
        y: 5333
    },
    {
        x: moment().year(2017).month(7).date(1),
        y: 4089
    },
    {
        x: moment().year(2017).month(8).date(1),
        y: 7559
    },
    {
        x: moment().year(2017).month(9).date(1),
        y: 4306
    },
    {
        x: moment().year(2017).month(10).date(1),
        y: 5011
    },
    {
        x: moment().year(2017).month(11).date(1),
        y: 4559
    }
];

let optionsMonthly = {
    max: 10000,
    fixedStepSize: 2000,
    time: {
        unit: 'month',
        round: 'month',
        min: moment().year(2017).month(0).date(1),
        max: moment().year(2017).month(11).date(1),
        displayFormats: {
            'millisecond': 'MMM',
            'second': 'MMM',
            'minute': 'MMM',
            'hour': 'MMM',
            'day': 'MMM',
            'week': 'MMM',
            'month': 'MMM',
            'quarter': 'MMM',
            'year': 'MMM'
        },
        tooltipFormat: 'MMMM YYYY'

    }
};

let datasetsScatterChart = (data) => {
    return {
        datasets: [{
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            pointBorderColor: 'rgba(128, 134, 195, 1)',
            pointRadius: 5,
            borderColor: 'rgba(187, 190, 233, 1)',
            borderWidth: 2,
            lineTension: 0,
            backgroundColor: 'rgba(128, 134, 195, 0.3)',
            data: data
        }]
    };
};

let optionsScatterChart = (options) => {
    return {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: options.max,
                    fixedStepSize: options.fixedStepSize,
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
                    autoSkip: true,
                    autoSkipPadding: 20
                },
                gridLines: {
                    zeroLineColor: "rgba(0, 0, 0, 0.1)"
                },
                type: 'time',
                time: options.time
            }]
        },
        responsive: true,
        maintainAspectRatio: false
    };
};

let scatterChartHourly = new Chart("scatterChartHourly", {
    type: 'line',
    data: datasetsScatterChart(dataHourly),
    options: optionsScatterChart(optionsHourly)
});

let scatterChartDaily = new Chart("scatterChartDaily", {
    type: 'line',
    data: datasetsScatterChart(dataDaily),
    options: optionsScatterChart(optionsDaily)
});

let scatterChartWeekly = new Chart("scatterChartWeekly", {
    type: 'line',
    data: datasetsScatterChart(dataWeekly),
    options: optionsScatterChart(optionsWeekly)
});

let scatterChartMonthly = new Chart("scatterChartMonthly", {
    type: 'line',
    data: datasetsScatterChart(dataMonthly),
    options: optionsScatterChart(optionsMonthly)
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