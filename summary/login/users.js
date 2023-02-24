setURL("https://gruppe-417.developerakademie.net/join/smallest_backend_ever");

async function loadAtStart() {
  await downloadFromServer();
  let ShowCurrentUserNameForSummery =
    JSON.parse(await backend.getItem("currentUser")) || [];
}
