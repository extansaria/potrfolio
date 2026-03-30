function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const action = body.action;
    const payload = body.payload || {};

    if (action === "/api/contact") {
      return jsonResponse(handleContact(payload));
    }

    if (action === "/api/event-register") {
      return jsonResponse(handleEventRegister(payload));
    }

    if (action === "/api/event-stats") {
      return jsonResponse(getEventStats());
    }

    return jsonResponse({ success: false, error: "Unknown action" });
  } catch (error) {
    return jsonResponse({ success: false, error: String(error) });
  }
}

function handleContact(payload) {
  if (!payload.name || !payload.email || !payload.message) {
    return { success: false, error: "Все поля обязательны" };
  }

  const sheet = getOrCreateSheet("contacts", [
    "created_at",
    "name",
    "email",
    "message",
  ]);

  sheet.appendRow([new Date(), payload.name, payload.email, payload.message]);
  return { success: true, message: "Сообщение отправлено" };
}

function handleEventRegister(payload) {
  if (!payload.name || !payload.email || !payload.phone || !payload.eventId) {
    return { success: false, error: "Обязательные поля не заполнены" };
  }

  const registrations = getOrCreateSheet("registrations", [
    "created_at",
    "event_id",
    "event_title",
    "name",
    "email",
    "phone",
    "comment",
  ]);

  const values = registrations.getDataRange().getValues();
  for (let i = 1; i < values.length; i += 1) {
    if (
      String(values[i][1]) === String(payload.eventId) &&
      String(values[i][4]).toLowerCase() === String(payload.email).toLowerCase()
    ) {
      return { success: false, error: "Вы уже зарегистрированы на это событие" };
    }
  }

  registrations.appendRow([
    new Date(),
    payload.eventId,
    payload.eventTitle || "",
    payload.name,
    payload.email,
    payload.phone,
    payload.comment || "",
  ]);

  const stats = getEventStatsForId(payload.eventId);
  return {
    success: true,
    message: "Регистрация успешна!",
    registeredCount: stats.registeredCount,
  };
}

function getEventStats() {
  const events = getOrCreateSheet("events", ["event_id", "max_seats"]);
  if (events.getLastRow() === 1) {
    events.appendRow([1, 30]);
  }

  const eventRows = events.getDataRange().getValues().slice(1);
  const result = eventRows.map((row) => ({
    id: Number(row[0]),
    registeredCount: getEventStatsForId(row[0]).registeredCount,
  }));

  return { success: true, events: result };
}

function getEventStatsForId(eventId) {
  const registrations = getOrCreateSheet("registrations", [
    "created_at",
    "event_id",
    "event_title",
    "name",
    "email",
    "phone",
    "comment",
  ]);

  const values = registrations.getDataRange().getValues().slice(1);
  const count = values.filter((row) => String(row[1]) === String(eventId)).length;
  return { registeredCount: count };
}

function getOrCreateSheet(name, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  return sheet;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
