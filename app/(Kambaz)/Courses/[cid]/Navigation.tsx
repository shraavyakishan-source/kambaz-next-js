import Link from "next/link";
export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation">
      <Link href="/Courses/5610/Home">Home</Link>
      <br />
      <Link href="/Courses/5610/Modules">Modules</Link>
      <br />
      <Link href="https://piazza.com/class/mf08v5tcamaem/post/35">Piazza</Link>
      <br />
      <Link href="https://northeastern.zoom.us/">Zoom</Link>
      <br />
      <Link href="/Courses/5610/Assignments">Assignments</Link>
      <br />
      <Link href="https://northeastern.instructure.com/courses/225999/quizzes">
        Quizzes
      </Link>
      <br />
      <Link href="https://northeastern.instructure.com/courses/225999/grades">
        Grades
      </Link>
      <br />
      <Link href="/Courses/5610/People/Table">People</Link>
      <br />
    </div>
  );
}
