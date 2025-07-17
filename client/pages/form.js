import { useState } from "react";
import { predictFromForm } from "@/components/ApiService";

export default function FormPage() {
  const [formData, setFormData] = useState({
    op_setting_1: 25.0,
    op_setting_2: 0.62,
    op_setting_3: 60.0,
    sensor_2: 643.0,
    sensor_3: 1592.0,
    sensor_4: 1408.0,
    sensor_7: 552.0,
    sensor_8: 2388.0,
    sensor_9: 9058.0,
    sensor_11: 47.3,
    sensor_12: 521.0,
    sensor_13: 2388.0,
    sensor_14: 8128.0,
    sensor_15: 8.4,
    sensor_17: 393.0,
    sensor_20: 38.8,
    sensor_21: 23.3,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async () => {
    try {
      const prediction = await predictFromForm(formData, "FD002");
      setResult(prediction);
    } catch (error) {
      console.error(error);
      alert("Prediction failed.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">RUL Prediction (UI Form)</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block font-medium">{key}</label>
            <input
              type="number"
              step="any"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
      >
        Predict RUL
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-semibold">Prediction Result:</h2>
          <pre>{JSON.stringify(result.prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
