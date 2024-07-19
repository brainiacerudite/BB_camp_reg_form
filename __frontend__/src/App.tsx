import { BrowserRouter } from "react-router-dom";
import RootRouter from "./routes";

// Css
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  );
}

export default App;
