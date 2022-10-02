import { CssBaseline } from "@mui/material";
import "./App.css";
import Form from "./Components/Form";

function App() {
  return (
    <>
      <div className="bg">
        <CssBaseline />
        <h1 className="heading">Weather App</h1>
        <Form />
      </div>
    </>
  );
}

export default App;
