setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

async function loadAtStart() {
  await downloadFromServer();
  /* loggedUsers = JSON.parse(await backend.getItem("loggedUser")) || []; */
  let ShowCurrentUserNameForSummery =
    JSON.parse(await backend.getItem("currentUser")) || [];
  console.log(ShowCurrentUserNameForSummery);
}

/* function loadCurrentUserMail() {
  let lastUser = loggedUsers.length - 1;
  return loggedUsers[lastUser].email;
}
 */
/* function loadDataFromCurrentUser() {
  let currentEmail = loadCurrentUserMail();
  let loggedInUser = users.filter((a) => a.email === currentEmail);
  return loggedInUser;
} */

/* function getCurrentUserName() {
  let guest = [];
  guest = loggedUsers.map((a) => a.email === "guest@join.com");
  let lastUser = guest.length - 1;
  if (guest[lastUser] === true) {
    let name = "Max Kebabmann";
    return name;
  } else {
    let name = loadDataFromCurrentUser();
    name = name[0].name;
    return name;
  }
}
 */
