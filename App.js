// Project: GoSafeLink (multi-file, Expo React Native)
// Files included below. Create the same structure in your project (or in Snack with multiple files).


// -------------------------
// File: App.js
// -------------------------
import React, { useState } from 'react';
import { AppProvider } from './screens/AppContext';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ReporterScreen from './screens/ReporterScreen';
import AdminScreen from './screens/AdminScreen';
import ResponderScreen from './screens/ResponderScreen';


export default function App() {
 const [screen, setScreen] = useState('Signup');
 const [role, setRole] = useState(null);
 const [currentUserName, setCurrentUserName] = useState('');


 function go(to, opts) {
   setScreen(to);
   if (opts?.role) setRole(opts.role);
   if (opts?.name !== undefined) setCurrentUserName(opts.name);
 }


 return (
   <AppProvider>
     {screen === 'Signup' && <SignupScreen onSignedUp={() => go('Login')} />}
     {screen === 'Login' && <LoginScreen onLogin={(name) => go('Dashboard', { name })} onSignup={() => go('Signup')} />}
     {screen === 'Dashboard' && (
       <DashboardScreen
         name={currentUserName}
         onChooseRole={(r) => go('Role', { role: r })}
         onLogout={() => go('Login')}
       />
     )}


     {screen === 'Role' && role === 'reporter' && <ReporterScreen onBack={() => go('Dashboard')} />}
     {screen === 'Role' && role === 'admin' && <AdminScreen onBack={() => go('Dashboard')} />}
     {screen === 'Role' && role === 'responder' && <ResponderScreen onBack={() => go('Dashboard')} />}
   </AppProvider>
 );
}