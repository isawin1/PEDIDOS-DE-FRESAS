import { STORAGE_KEY, OLD_KEY, DEFAULT_DATA, normalize, migrateV2 } from "./data.js";

// Guarda en el navegador de este dispositivo (localStorage)
function safeGet(key) {
  try {
    return typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
  } catch (e) {
    return null;
  }
}

export function loadData() {
  const raw = safeGet(STORAGE_KEY);
  if (raw) {
    try {
      return normalize(JSON.parse(raw));
    } catch (e) {
      // si está dañado, se intenta con la versión anterior
    }
  }
  const old = safeGet(OLD_KEY);
  if (old) {
    try {
      return migrateV2(JSON.parse(old));
    } catch (e) {
      // sigue con datos vacíos
    }
  }
  return normalize(DEFAULT_DATA);
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}
