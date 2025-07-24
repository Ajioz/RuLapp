const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

export async function predictRUL(formData: FormData) {
  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "X-API-Key": API_KEY,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to predict RUL");

  return await res.json();
}
