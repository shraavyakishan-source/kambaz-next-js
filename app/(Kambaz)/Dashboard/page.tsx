import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/5610" className="wd-dashboard-course-link">
            <Image
              src="/Images/reactjs.jpg"
              width={200}
              height={150}
              alt="CS5610 React JS course thumbnail"
            />
            <div>
              <h5> CS5610 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
              <br />
            </div>
          </Link>
          <br />
          <Link href="/Courses/5800" className="wd-dashboard-course-link">
            <Image
              src="/Images/algorithms.jpg"
              width={200}
              height={150}
              alt="CS5800 Algorithms course thumbnail"
            />
            <h5> CS5800 Algorithms </h5>
            <p className="wd-dashboard-course-title">Algorithms</p>
            <button> Go </button>
            <br />
          </Link>
          <br />
          <Link href="/Courses/5010" className="wd-dashboard-course-link">
            <Image
              src="/Images/pdp.jpg"
              width={200}
              height={150}
              alt="CS5010 Programming Design and Paradigm course thumbnail"
            />
            <h5> CS5010 PDP </h5>
            <p className="wd-dashboard-course-title">
              Programming design and paradigm
            </p>
            <button> Go </button>
          </Link>
          <br />
          <br />

          <Link href="/Courses/5200" className="wd-dashboard-course-link">
            <Image
              src="/Images/DBMS.jpg"
              width={200}
              height={150}
              alt="CS5200 DBMS course thumbnail"
            />
            <h5> CS5200 DBMS </h5>
            <p className="wd-dashboard-course-title">
              Database Management Systems
            </p>
            <button> Go </button>
          </Link>
          <br />
        </div>
      </div>
    </div>
  );
}
