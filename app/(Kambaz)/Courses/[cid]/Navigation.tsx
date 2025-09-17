import Link from "next/link";
export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation">
      <Link href="/Courses/5610/Home">Home</Link>
      <br />
      <Link href="/Courses/5610/Modules">Modules</Link>
      <br />
      <Link href="/Courses/5610/Piazza">Piazza</Link>
      <br />
      <Link href="/Courses/5610/Zoom">Zoom</Link>
      <br />
      <Link href="/Courses/5610/Assignments">Assignments</Link>
      <br />
      <Link href="/Courses/5610/Quizzes">Quizzes</Link>
      <br />
      <Link href="/Courses/5610/Grades">Grades</Link>
      <br />
      <Link href="/Courses/5610/People/Table">People</Link>
      <br />
    </div>
  );
}
