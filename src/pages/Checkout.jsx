import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrx, addTrx } from "../store/redux/slices/trx";
import KelasDetailPackage from "../components/kelas/KelasDetailPackage";
import KelasPaymentProgress from "../components/kelas/KelasPaymentProgress";
import Card from "../components/ui/Card";
import KelasWOPAccordion from "../components/kelas/KelasWOPAccordion";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const kelasData = useSelector((state) => state.course.classes).find((cls) => cls.id == id);
  const classPackage = useSelector((state) => state.course.classPackage);
  const wopData = useSelector((state) => state.trx.wop);
  const selectedWOP = useSelector((state) => state.trx.selectedWOP);
  const adminFee = selectedWOP.admin;
  const userInfo = useSelector((state) => state.user.user);

  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const coursePrice = kelasData.price * 1000;

  const checkoutHandler = async () => {
    const generatedId = +new Date();
    const newTrx = {
      id: generatedId,
      kelasId: kelasData.id,
      title: kelasData.title,
      email: userInfo.email,
      trxType: selectedWOP.trxType,
      wopCode: selectedWOP.code,
      price: kelasData.price * 1000,
      admin: adminFee,
      vaNo: `${selectedWOP.va_code} ${userInfo.no_hp.replace(userInfo.no_hp.slice(0, 3), "0")}`,
    };
    dispatch(addTrx({ trxObj: newTrx }));
    dispatch(getAllTrx());
    setTimeout(() => {
      navigate(`/payment/${generatedId}/${kelasData.id}`);
    }, 1000);
  };

  return (
    <section>
      <KelasPaymentProgress />
      <main className="m-5 p-5">
        <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-5 md:gap-10 w-full">
          <div className="w-full md:w-3/5">
            <Card className="mb-5">
              <h1 className="font-bold text-xl mb-3">Metode Pembayaran</h1>
              {wopData.map((data) => {
                return <KelasWOPAccordion key={data.id} data={data} />;
              })}
            </Card>
            <Card className="mb-5">
              <h1 className="font-bold text-xl mb-3">Ringkasan Pesanan</h1>
              <div className="flex justify-between items-start text-slate-500 mb-3 text-sm md:text-base">
                <p>Video Learning: {kelasData.title}</p>
                <p>{currencyFormatter.format(coursePrice)}</p>
              </div>
              <div className="flex justify-between items-start text-slate-500 mb-3 text-sm md:text-base">
                <p>Biaya Admin</p>
                <p>{currencyFormatter.format(adminFee)}</p>
              </div>
              <hr />
              <div className="flex justify-between items-start my-3 font-bold">
                <p>Total Pembayaran</p>
                <p className="text-primary ">{currencyFormatter.format(coursePrice + adminFee)}</p>
              </div>
              <button onClick={checkoutHandler} className="w-full bg-primary text-white rounded-md py-1">
                Beli Sekarang
              </button>
            </Card>
          </div>
          <Card className="w-full md:w-2/5">
            <KelasDetailPackage data={kelasData} packages={classPackage} isReadOnly={true} />
          </Card>
        </div>
      </main>
    </section>
  );
};

export default Checkout;
