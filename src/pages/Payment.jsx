import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWOPDetailByCode,
  updateTrx,
  getAllTrx,
  deleteTrx,
  getWopGuide,
  setIsLoadingState,
} from "../store/redux/slices/trx";
import { addToPaidCourse, getAllPaidCourse } from "../store/redux/slices/course";

import Card from "../components/ui/Card";
import KelasDetailPackage from "../components/kelas/KelasDetailPackage";
import KelasPaymentProgress from "../components/kelas/KelasPaymentProgress";
import TrxGuideAccordion from "../components/trx/TrxGuideAccordion";
import Spinner from "../components/ui/Spinner";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trx: currentTrx, course: kelasData } = useLoaderData();
  const classPackage = useSelector((state) => state.course.classPackage);
  let isLoading = useSelector((state) => state.trx.isLoading);

  useEffect(() => {
    dispatch(getWOPDetailByCode({ code: currentTrx.wopCode }));
    dispatch(getWopGuide({ type: currentTrx.trxType }));
  }, [currentTrx.wopCode, currentTrx.trxType]);

  const dataPaymentGuide = useSelector((state) => state.trx.paymentStepGuide);
  const currentTrxWopInfo = useSelector((state) => state.trx.selectedWOP);

  const selectedWOP = useSelector((state) => state.trx.selectedWOP);
  const isPending = selectedWOP.isMaintenance;

  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const checkoutHandler = async () => {
    const status = isPending ? "INP" : "DONE";
    const trx = {
      id: currentTrx.id,
      status: status,
      paidDt: new Date().toLocaleString(),
    };
    dispatch(updateTrx({ trxObj: trx }));
    dispatch(getAllTrx());
    if (!isPending) {
      dispatch(addToPaidCourse({ course: { courseId: Number(currentTrx.kelasId) } }));
      dispatch(getAllPaidCourse());
    }

    navigate(`/status/${currentTrx.id}`);
  };

  const rollbackHandler = () => {
    const rollbackTrx = {
      id: Number(currentTrx.id),
    };
    dispatch(deleteTrx({ trxObj: rollbackTrx }));
    navigate(`/checkout/${currentTrx.kelasId}`);
  };

  setTimeout(() => {
    dispatch(setIsLoadingState({ status: false }));
  }, 1000);

  return (
    <section>
      <KelasPaymentProgress />
      <main className="m-5 p-5">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-5 md:gap-10 w-full">
            <div className="w-full md:w-3/5">
              <Card className="mb-5">
                <section>
                  <h1 className="font-bold text-xl mb-3">Metode Pembayaran</h1>
                  <Card className="mb-5 flex flex-col justify-center items-center gap-3">
                    <img
                      className="w-[50px]"
                      src={currentTrxWopInfo.img}
                      alt={currentTrxWopInfo.title}
                      loading="lazy"
                    />
                    <p className="font-bold">Bayar melalui {currentTrxWopInfo.title}</p>
                    <div className="flex items-center gap-3">
                      <p className="text-slate-500">{currentTrx.vaNo}</p>
                      <button className="text-red-500">Salin</button>
                    </div>
                  </Card>
                </section>
                <section>
                  <h1 className="font-bold text-xl mb-3">Ringkasan Pesanan</h1>
                  <div className="flex justify-between items-start text-slate-500 mb-3 text-sm md:text-base">
                    <p>Video Learning: {currentTrx.kelasTitle}</p>
                    <p>{currencyFormatter.format(currentTrx.price)}</p>
                  </div>
                  <div className="flex justify-between items-start text-slate-500 mb-3 text-sm md:text-base">
                    <p>Biaya Admin</p>
                    <p>{currencyFormatter.format(currentTrx.admin)}</p>
                  </div>
                  <hr />
                  <div className="flex justify-between items-start my-3 font-bold">
                    <p>Total Pembayaran</p>
                    <p className="text-primary ">{currencyFormatter.format(currentTrx.price + currentTrx.admin)}</p>
                  </div>
                </section>
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <button
                    disabled={currentTrx.status == "DONE"}
                    onClick={rollbackHandler}
                    className="w-full text-sm lg:text-base bg-white border border-primary text-primary rounded-md py-1"
                  >
                    Ganti Metode Pembayaran
                  </button>
                  <button
                    disabled={currentTrx.status == "DONE"}
                    onClick={checkoutHandler}
                    className="w-full text-sm lg:text-base bg-primary text-white rounded-md py-1"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </Card>
              <Card className="mb-5">
                <h1 className="font-bold text-xl mb-3">Tata Cara Pembayaran</h1>
                {dataPaymentGuide.map((data, idx) => {
                  return <TrxGuideAccordion key={idx} data={data} />;
                })}
              </Card>
            </div>
            <Card className="w-full md:w-2/5">
              <KelasDetailPackage data={kelasData} packages={classPackage} isReadOnly={true} />
            </Card>
          </div>
        )}
      </main>
    </section>
  );
};

export default Payment;
