function admin(request, response, next) {
  if (!request.UserRegistration.isadmin) {
    response.send({ message: "Permission denied." });
  } else {
    next();
  }
}

module.exports = admin;
