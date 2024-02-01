const STORAGE_TOKEN = "OE86CKWXJ76CJ1P1XWJAWPOZ5J0V8JEFJ6UYRS1U";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}

async function filterObjectById(object, id) {
  return object.filter((obj) => obj.id.toString() === id.toString());
}


async function deleteAllData() {
  let contactData = await getItem("contact");
  let currentUserID = JSON.parse(await getItem("currentUserID"));
  let userData = await getItem("user");
  let addTaskData = await getItem("tasks");

  contactData = [];
  currentUserID = [];
  userData = [];
  addTaskData = [];

  await setItem("contact",(contactData));
  await setItem("currentUserID", (currentUserID));
  await setItem("user", (userData));
  await setItem("tasks", (addTaskData));
}
