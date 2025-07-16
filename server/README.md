# RUL Prediction UI

This is the client-side application for the RUL (Remaining Useful Life) Prediction service. It provides a user interface to interact with the machine learning model, allowing for data upload, single and batch predictions.

This project was bootstrapped with Create Next App.

## Features

-   **Home Page**: Welcome page for the application.
-   **Predict Page**:
    -   Make a RUL prediction for a single data instance.
    -   Make RUL predictions for a batch of data instances (in JSON format).
    -   Download batch predictions as a CSV file.
-   **Upload Page**: Upload a training data file (CSV) to the backend.

## Tech Stack

-   Next.js
-   React
-   styled-components
-   axios for API communication

## Prerequisites

-   Node.js (v18.x or later recommended)
-   npm, yarn, or pnpm
-   A running instance of the RUL Prediction API backend.

## Getting Started

Follow these steps to get the development environment running.

### 1. Navigate to client directory

If you haven't already, navigate to the `client` directory from the root of the project.

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm dev
