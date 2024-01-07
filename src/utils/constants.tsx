import { getStore } from "./functions";

const auth = getStore("auth");

const uid = Date.now().toString(36) + Math.random().toString(36).substring(2);

const regrex = /^[0-9 ]+$/;

export { auth, uid,regrex };
