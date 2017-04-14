const avatarImg = document.querySelector('header .avatar');
const nameLink = document.querySelector('header .name');

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

function openNav() {
    document.querySelector('aside').style.width = "70px";
    document.querySelector('.main-content').style.marginLeft = "70px";
}

function closeNav() {
    document.querySelector('aside').style.width = "0";
    document.querySelector('.main-content').style.marginLeft = "0";
}