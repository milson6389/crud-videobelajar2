import { useSelector } from "react-redux";
import OrderListItem from "./OrderListItem";

const OrderList = () => {
  const allTrx = useSelector((state) => state.trx.trxHistory);
  return (
    <div className="md:m-2">
      {allTrx.length > 0 &&
        allTrx.map((trx) => {
          return <OrderListItem key={trx.id} data={trx} />;
        })}
    </div>
  );
};

export default OrderList;
