import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        {/* Add more routes like signup, home, etc. */}
      </Routes>
    </Router>
  );
}

export default App;
