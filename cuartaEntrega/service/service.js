import passport from "passport";

export default function autenticacion() {
    passport.authenticate("sign-up", {
      successRedirect: "/",
      failureRedirect: "/failregister",
    });
  }
