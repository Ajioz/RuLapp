const API_BASE = "http://localhost:8000"; // Update if hosted elsewhere

export async function predictFromForm(
  data,
  engineType = "FD002",
  condition = "standard",
  rowIndex = 0
) {
  const payload = {
    engine_type: engineType,
    condition: condition,
    row_index: rowIndex,
    data: data,
  };

  const response = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch prediction");
  }

  return await response.json();
}

export async function predictFromFile(
  file,
  engineType = "FD002",
  rowIndex = 0
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("engine_type", engineType);
  formData.append("row_index", rowIndex);

  const response = await fetch(`${API_BASE}/predict/batch`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch batch prediction");
  }

  return await response.json();
}
