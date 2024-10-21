import { useSelector } from "react-redux";
import CourseListItem from "./CourseListItem";

const CourseList = () => {
  const allPaidClass = useSelector((state) => state.course.paidCourse);

  return (
    <div className="md:m-2">
      {allPaidClass.length > 0 &&
        allPaidClass.map((cls) => {
          return <CourseListItem key={cls.id} data={cls} />;
        })}
    </div>
  );
};

export default CourseList;
