let roles = ['admin', 'common'];

exports.setRoles = roles => roles = roles;

exports.isAuthorized = role => {
    return roles.includes(role);
};

exports.isAuthorizedAsync = role => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(roles.includes(role)), 2600);
    });
};

exports.getIndex = (req, res) => {
    res.render('index');
}