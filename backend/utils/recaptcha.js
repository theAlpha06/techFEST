export default function verifyRecaptcha(token, ip, cb_success, cb_failure) {
  fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET,
      response: token,
      remoteip: ip,
    }),
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  }).then((response) => response.json())
    .then(function (response) {
      if (response.success) {
        cb_success();
      } else {
        cb_failure(response["error-codes"]);
      }
    }).catch((err) => cb_failure(err));
}
