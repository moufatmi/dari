import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { SubmitPropertyPage } from './pages/SubmitPropertyPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <PropertyProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />
              <Route path="/submit-property" element={<SubmitPropertyPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </PropertyProvider>
  );
}

export default App;