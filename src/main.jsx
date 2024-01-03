import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './LayOut/Main/Main';
import AddContact from './Pages/Home/AddContact';
import AllContacts from './Pages/AllContacts/AllContacts';
import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import EditContact from './Pages/EditContact/EditContact';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children : [
      {
        path : '/',
        element : <AddContact></AddContact>
      },
      {
        path : '/allContacts',
        element : <AllContacts></AllContacts>
      },
      {
        path : '/editContact/:id',
        element : <EditContact></EditContact>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} />
     </QueryClientProvider>
   
  </React.StrictMode>,
)
