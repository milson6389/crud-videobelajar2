import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetCourseFilter, filteredCourse } from "../store/redux/slices/course";

import Card from "../components/ui/Card";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFilter from "../components/dashboard/DashboardFilter";
import CourseList from "../components/course/CourseList";
import Footer from "../components/layout/Footer";

const Classes = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const navLinks = [
    {
      id: 1,
      title: "Semua Kelas",
      code: "",
    },
    {
      id: 2,
      title: "Sedang Berjalan",
      code: "INP",
    },
    {
      id: 3,
      title: "Selesai",
      code: "DONE",
    },
  ];

  const setQueryHandler = (keyword) => {
    setQuery(keyword);
    dispatch(resetCourseFilter());
    dispatch(filteredCourse({ keyword: keyword }));
  };
  return (
    <>
      <main className="m-5 p-5">
        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-20">
          <DashboardNavbar />
          <Card className="w-full">
            <DashboardFilter navData={navLinks} queries={setQueryHandler} isCategoryFilterOn={false} />
            <CourseList />
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Classes;
