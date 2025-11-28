// -------------------------
// File: src/context/AppContext.js
// -------------------------
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();
export function useApp() {
  return useContext(AppContext);
}

// Small unique id generator for demo (no external deps)
const genId = () => `id-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

export function AppProvider({ children }) {
  const [users, setUsers] = useState([]); // { name, password }
  const [sosList, setSosList] = useState([]); // {id,type,location,description,need,reporter,timestamp,status}
  const [orders, setOrders] = useState([]); // {id,sosId,target,note,issuedTime}

  useEffect(() => {
    // seed a couple entries for demonstration
    const seed1 = {
      id: genId(),
      type: 'Medical',
      location: 'Brgy. San Isidro, 14.5910,120.9870',
      description: 'Person collapsed near market.',
      need: 'Immediate Transport',
      reporter: 'Citizen (Device)',
      timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
      status: 'incoming',
    };
    const seed2 = {
      id: genId(),
      type: 'Medical',
      location: 'EUWI',
      description: 'Example validated case',
      need: 'Medical Aid',
      reporter: 'Citizen (Device)',
      timestamp: Date.now() - 1000 * 60 * 10, // 10 minutes ago
      status: 'validated',
    };
    setSosList([seed2, seed1]);
  }, []);

  function signUp({ name, password }) {
    if (users.find((u) => u.name === name)) return { ok: false, error: 'User exists' };
    setUsers((p) => [{ name, password }, ...p]);
    return { ok: true };
  }

  function login({ name, password }) {
    const u = users.find((x) => x.name === name && x.password === password);
    if (u) return { ok: true };
    return { ok: false, error: 'Invalid credentials' };
  }

  function sendSos({ type, location, description, need, reporter }) {
    const s = {
      id: genId(),
      type,
      location,
      description,
      need,
      reporter,
      timestamp: Date.now(),
      status: 'incoming',
    };
    setSosList((p) => [s, ...p]);
    return s;
  }

  function validateSos(id) {
    setSosList((p) => p.map((s) => (s.id === id ? { ...s, status: 'validated' } : s)));
    const sos = sosList.find((s) => s.id === id) || {};
    const order = {
      id: genId(),
      sosId: id,
      target: sos.type ? `${sos.type} @ ${sos.location}` : 'Unknown',
      note: 'Proceed with caution. Validate on arrival.',
      issuedTime: Date.now(),
    };
    setOrders((p) => [order, ...p]);
    return order;
  }

  function dismissSos(id) {
    setSosList((p) => p.map((s) => (s.id === id ? { ...s, status: 'dismissed' } : s)));
  }

  // AcknowledgeSos Function
  function acknowledgeSos(id) {
    setSosList((p) =>
      p.map((s) => (s.id === id ? { ...s, status: 'acknowledged' } : s))
    );
    // Notification simulation (replace with Alert or push notification)
    console.log(`Citizen notified for SOS ID: ${id}`);
  }

  return (
    <AppContext.Provider
      value={{
        users,
        signUp,
        login,
        sendSos,
        sosList,
        validateSos,
        dismissSos,
        acknowledgeSos, // <- added here
        orders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
