import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import QueryProvider from "@/libs/QueryProvider.tsx";

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;