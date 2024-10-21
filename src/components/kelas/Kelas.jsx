import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, filteredClass } from "../../store/redux/slices/course";
import KelasList from "./KelasList";

const Kelas = () => {
  const dispatch = useDispatch();
  const dataKelas = useSelector((state) => state.course.classes);

  const navLinks = [
    {
      id: 1,
      title: "Semua Kelas",
      target: "#all",
      category: "",
    },
    {
      id: 2,
      title: "Pemasaran",
      target: "#mkt",
      category: "Pemasaran",
    },
    {
      id: 3,
      title: "Desain",
      target: "#dsg",
      category: "Desain",
    },
    {
      id: 4,
      title: "Pengembangan Diri",
      target: "#sdv",
      category: "Development",
    },
    {
      id: 5,
      title: "Bisnis",
      target: "#biz",
      category: "Bisnis",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(1);
  const setActiveHandler = (id, ctg = "") => {
    setActiveIdx(id);
    dispatch(resetFilter());
    dispatch(filteredClass({ category: ctg }));
  };

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold">Koleksi Video Pembelajaran Unggulan</h1>
      <p className="text-sm">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
      <div className="mt-5">
        <ul className="flex text-nowrap overflow-x-auto justify-start items-center gap-3 no-scrollbar">
          {navLinks.map((link) => {
            return (
              <Link
                onClick={() => setActiveHandler(link.id, link.category)}
                key={link.id}
                to={link.target}
                className={`${
                  link.id === activeIdx ? "text-secondary font-bold border-b-secondary border-b-2" : "text-black"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </ul>
        <KelasList data={dataKelas} />
      </div>
    </div>
  );
};

export default Kelas;
