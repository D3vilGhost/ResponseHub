import React from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ApiDocs from './pages/ApiDocs';
import Dashboard from './pages/Dashboard';
import Overview from './components/documentation/Overview';
import FlexibleRequestFormat from './components/documentation/FlexibleRequestFormat';
import ResponseFormat from './components/documentation/ResponseFormat';
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/docs"
          element={<ApiDocs />}
        >
          <Route
            path=""
            element={<Overview />}
          />
          <Route
            path="request/flexible"
            element={<FlexibleRequestFormat />}
          />
          <Route
            path="response/"
            element={<ResponseFormat />}
          />
        </Route>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </div>
  );
}