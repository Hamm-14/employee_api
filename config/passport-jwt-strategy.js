const passport = require("passport"); //using passport for authentication
const JWTStrategy = require("passport-jwt").Strategy; //using passport JWT-Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt;

const Employee = require("../models/employee"); //importing model on which authentication happens

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  new JWTStrategy(opts, function (jwt_payload, done) {
    //setting up JWT Strategy
    Employee.findById(jwt_payload._id, function (err, employee) {
      if (err) {
        console.log("Error in finding employee from jwt");
        return done(err, false);
      }
      if (doctor) {
        return done(null, doctor);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport; //exporting passport
