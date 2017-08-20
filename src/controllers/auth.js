let roles = ['admin', 'common'];
let user;

exports.setUser = newUser => user = newUser;

exports.setRoles = roles => {
    roles = roles
    user.roles = roles;
};

exports.isAuthorized = role => {
    if(user) {
        return user.isAuthorized(role);
    }
};

exports.isAuthorizedAsync = role => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(roles.includes(role)), 2600);
    });
};

exports.getIndex = (req, res) => {
    try {
        if(req.user.isAuthorized('admin')) {
            return res.render('index');
        }
        res.render('notAuth');
    } catch (error) {
        res.render('error');
    }
}