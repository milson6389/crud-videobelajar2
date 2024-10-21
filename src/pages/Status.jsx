import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../components/ui/Card";
import KelasPaymentProgress from "../components/kelas/KelasPaymentProgress";
import Success from "../assets/img/payment_success.png";
import Pending from "../assets/img/payment_inp.png";

const Status = () => {
  const isPending = useSelector((state) => state.trx.selectedWOP).isMaintenance;
  const navigate = useNavigate();

  const checkDetailHandler = () => {
    navigate("/order");
  };
  return (
    <section>
      <KelasPaymentProgress />
      <main className="m-5 p-5">
        <Card className="flex flex-col items-center justify-center gap-5 p-5">
          {isPending ? (
            <>
              <img src={Pending} alt="pending" loading="lazy" />
              <h1 className="font-bold text-2xl">Pembayaran Tertunda!</h1>
            </>
          ) : (
            <>
              <img src={Success} alt="success" loading="lazy" />
              <h1 className="font-bold text-2xl">Pembayaran Berhasil!</h1>
            </>
          )}
          <p>Silahkan cek Email kamu untuk informasi lebih lanjut. Hubungi Kami jika ada kendala.</p>
          <button onClick={checkDetailHandler} className="bg-primary text-white rounded-md py-2 w-full md:w-1/2">
            Lihat Detail Pesanan
          </button>
        </Card>
      </main>
    </section>
  );
};

export default Status;
