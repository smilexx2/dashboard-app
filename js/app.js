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