async function fetchResponseCount() {
  const sheetID = "1pxgwzAB81VYmfPlH8Q9ifiWXZAj8qp2UB_SpM5O5aL4";
  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

  try {
    const res = await fetch(url);
    const text = await res.text();

    // Google Sheets sends weird extra text before/after JSON
    const cleanText = text.substring(47).slice(0, -2);

    const json = JSON.parse(cleanText);

    // Count number of form responses
    const responseCount = json.table.rows.length;

    // Show it on page
    document.getElementById("response-count").innerText = responseCount;

  } catch (error) {
    console.error("Error loading Google Form responses:", error);
    document.getElementById("response-count").innerText = "⚠";
  }
}

// Run on page load
window.onload = fetchResponseCount;

