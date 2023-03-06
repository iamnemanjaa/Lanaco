import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Root from "./pages/Root";
import Customers, {loader as customerLoader} from "./pages/Customers";
import InvoiceDetail, { loader as detailLoader, action as invoiceAddEdit } from "./components/invoices/InvoiceDetail";
import Invoices, {loader as invoicesLoader} from "./pages/Invoices";
import Error from "./pages/Error";
import CustomerDetail, {loader as customerDetail, action as customerAddEdit} from "./components/customers/CustomerDetail";
import Sellers, {loader as sellerLoader} from "./pages/Sellers";
import SellerDetail, {loader as sellerDetail, action as sellerAddEdit} from "./components/sellers/SellerDetail";
import CustomerDelete, {action as deleteCustomer} from "./components/customers/CustomerDelete";
import SellerDelete, {action as deleteSeller} from "./components/sellers/SellerDelete";
import InvoiceDelete, {action as deleteInvoice} from "./components/invoices/InvoiceDelete";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {path: 'invoices', element: <Invoices />, loader: invoicesLoader,
        children: [
        {path: ':id', element: <InvoiceDetail />, loader: detailLoader, action: invoiceAddEdit},
        {path: ':id/delete', element: <InvoiceDelete />, action: deleteInvoice},
        {path: 'new', element: <InvoiceDetail />, loader: detailLoader, action: invoiceAddEdit}
        ]},
      {path: 'customers', element: <Customers />, loader: customerLoader,
        children: [
          {path: ':id', element: <CustomerDetail />, loader: customerDetail, action: customerAddEdit},
          {path: ':id/delete', element: <CustomerDelete />, action: deleteCustomer},
          {path: 'new', element: <CustomerDetail />, action: customerAddEdit}
        ]},
      {path: 'sellers', element: <Sellers />, loader: sellerLoader,
        children: [
          {path: ':id', element: <SellerDetail />, loader: sellerDetail, action: sellerAddEdit},
          {path: ':id/delete', element: <SellerDelete />, action: deleteSeller},
          {path: 'new', element: <SellerDetail />, action: sellerAddEdit}
        ]}
    ]
  }
])

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
