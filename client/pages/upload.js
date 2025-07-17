import { useState } from "react";
import { predictFromFile } from "@/components/ApiService";

export default function UploadPage() {
  const [result, setResult] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      const prediction = await predictFromFile(file, "FD002");
      setResult(prediction);
    } catch (error) {
      console.error(error);
      alert("Prediction failed.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Batch Prediction</h1>
      <input type="file" onChange={handleFileChange} accept=".csv,.txt" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
      >
        Predict
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-semibold">Prediction:</h2>
          <pre>{JSON.stringify(result.prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
