import { CurrencyFormatter } from "../../config/CurrencyFormatter";

function DashboardTable({ customers }) {
  return (
    <div className=" mt-3 p-2 ">
      <h1 className="lead fw-bold text-primary">Recent Transactions</h1>

      <table className="table  table-hover table-responsive">
        <thead className="text-primary">
          <tr>
            <th>Date</th>
            <th>Invoice No</th>
            <th>Name</th>
            <th>No Of Products</th>
            <th>Gross Total</th>
            <th>Discount</th>
            <th>Net Total</th>
          </tr>
        </thead>
        <tbody>
          {customers
            ? customers?.map((customer) => (
                <tr key={customer.invoiceNo}>
                  <td>{customer.purchasedDate}</td>
                  <td>{customer.invoiceNo}</td>
                  <td>{customer.customer}</td>
                  <td>{customer.noOfItems}</td>
                  <td>{CurrencyFormatter(customer.grossTotal)}</td>
                  <td>{customer.discount}</td>
                  <td>{CurrencyFormatter(customer.netTotal)}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;
