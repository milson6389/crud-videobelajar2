import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterTrxByCategory, filterTrxByTitle, resetFilter } from "../store/redux/slices/trx";

import Card from "../components/ui/Card";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFilter from "../components/dashboard/DashboardFilter";
import OrderList from "../components/order/OrderList";
import Footer from "../components/layout/Footer";

const Orders = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const navLinks = [
    {
      id: 1,
      title: "Semua Pesanan",
      code: "",
    },
    {
      id: 2,
      title: "Menunggu",
      code: "PENDING",
    },
    {
      id: 3,
      title: "Berhasil",
      code: "DONE",
    },
    {
      id: 4,
      title: "Gagal",
      code: "INP",
    },
  ];

  const setQueryHandler = (keyword) => {
    setQuery(keyword);
    dispatch(resetFilter());
    dispatch(filterTrxByTitle({ title: keyword }));
  };

  const setDataByCategory = (ctg) => {
    setCategory(ctg);
    dispatch(resetFilter());
    dispatch(filterTrxByCategory({ ctg: ctg }));
  };

  return (
    <>
      <main className="m-5 p-5">
        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-20">
          <DashboardNavbar />
          <Card className="w-full">
            <DashboardFilter navData={navLinks} queries={setQueryHandler} categories={setDataByCategory} />
            <OrderList />
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
