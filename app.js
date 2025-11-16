async function fetchResponseCount() {
  const sheetID = "YOUR_SHEET_ID_HERE";

  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    // Remove first 47 characters + last 2 characters to get clean JSON
    const cleanJSON = text.substring(47).slice(0, -2);

    const data = JSON.parse(cleanJSON);

    // Count number of rows (each row = one Google Form submission)
    const count = data.table.rows.length;

    // Display it
    document.getElementById("response-count").innerText = count;

  } catch (error) {
    console.error("Error fetching form responses:", error);
  }
}

window.onload = fetchResponseCount;


