import { Outlet } from "react-router";
import "./App.css"
import Navbar from "../components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
        ThoughtSpace © 2026
      </footer>

    </div>
  );
}

export default App;