import { useSelector } from 'react-redux';
import AddCourse from '../components/Uplode.Corese';
import CourseList from '../components/CoreseLayout';
import  UploadedCourses  from '../components/Mycorses'
function CoursePage() {
  const { user } = useSelector((state) => state.auth); 
   console.log("user loging  user " ,user.role)
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>

      {/* If user is a teacher, show upload form */}
      {user?.role === 'teacher' && (
        <div className="mb-10">
          <AddCourse />
        </div>
      )}

      {/* Show course list for everyone */}
      <UploadedCourses/>
    </div>
  );
}

export default CoursePage;
