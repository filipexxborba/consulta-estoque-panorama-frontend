import BottomNav from "./components/bottomNav/BottomNav";
import { GlobalStorage } from "./context/GlobalContext";
import Header from "./components/header/Header";
import Main from "./main/Main";

function App() {
  return (
    <>
      <GlobalStorage>
        <Header />
        <Main />
        <BottomNav />
      </GlobalStorage>
    </>
  );
}

export default App;
