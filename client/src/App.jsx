import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./pages/Layout/Layout"
import Login from "./pages/Login/Login"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <h1>Erorr.....</h1>,
    children: [
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])




function App() {
  return (<RouterProvider router={router} />)
}

export default App
