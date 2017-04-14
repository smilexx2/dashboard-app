const avatarImg = document.querySelector('header .avatar');
const nameLink = document.querySelector('header .name');

let $window = $(window);

$.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
        user = data.results[0];
        avatarImg.src = getAvatarImageUrl(user)
        nameLink.innerHTML = getName(user);
    }
});

var getAvatarImageUrl = (user) => user.picture.thumbnail;

var getName = (user) => user.name.first + ' ' + user.name.last;

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
    $('.main-content .container .wrapper').addClass('close');
});