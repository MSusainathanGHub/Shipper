import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthProvider } from "./component/auth/AuthContext";
 import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./component/routes/AppRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )

}

export default App;
