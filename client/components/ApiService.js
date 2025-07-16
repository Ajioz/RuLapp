// import axios from "axios";

// const BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// export const uploadTrainingFile = (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   return axios.post(`${BASE_URL}/upload`, formData);
// };

// export const predictBatch = (payload) => {
//   return axios.post(`${BASE_URL}/predict/batch`, payload);
// };


import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const uploadTrainingFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${BASE_URL}/upload`, formData);
};

export const predictBatch = (payload) => {
  return axios.post(`${BASE_URL}/predict/batch`, payload);
};

export const predictSingle = (features, model = 'xgb') => {
  return axios.post(`${BASE_URL}/predict`, { features, model });
};

export const downloadPredictionCSV = (data) => {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'rul_predictions.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Add any additional utilities here as needed
