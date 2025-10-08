function getLocalDateInputValue(date = new Date()) {
  // const tzOffsetMs = date.getTimezoneOffset();
  const local = new Date(date.getTime());
  return local.toISOString().slice(0, 10);
}

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(total) {
  const h = String(Math.floor(total / 60)).padStart(2, "0");
  const m = String(total % 60).padStart(2, "0");
  return `${h}:${m}`;
}

function roundUpToNext30(d = new Date()) {
  const mins = d.getMinutes();
  const add = (30 - (mins % 30)) % 30;
  const rounded = new Date(d);
  rounded.setMinutes(mins + add, 0, 0);
  return fromMinutes(rounded.getHours() * 60 + rounded.getMinutes());
}

function buildSlots(dateStr, open = "08:00", close = "24:00") {
  const openM = toMinutes(open);
  const closeM = toMinutes(close);
  let start = openM;

  const todayStr = getLocalDateInputValue();
  if (dateStr === todayStr) {
    const newRounded = roundUpToNext30();
    start = Math.max(openM, toMinutes(newRounded));
  }

  const out = [];
  for (let m = start; m <= closeM - 30; m += 30) out.push(fromMinutes(m));
  return out;
}

export { buildSlots, getLocalDateInputValue };
