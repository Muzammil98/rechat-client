import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import useLocalStorage from "./hooks/useLocalStorage";
import { ContactsProvider } from "./context/ContactsProvider";
import { ConversationsProvider } from "./context/ConversationsProvider";

function App() {
  const [id, setId] = useLocalStorage("id");
  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
