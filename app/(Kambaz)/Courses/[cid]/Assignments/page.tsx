import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" />
      <button>+Group</button>
      <button>+Assignment</button>
      <br />
      <h3>
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/5610/Assignments/5610"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am |{" "}
            <b>Due</b> May 13 at 11:59pm | 100pts
          </p>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/5610/Assignments/5610"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> May 13 at 12:00am |{" "}
            <b>Due</b> May 20 at 11:59pm | 100pts
          </p>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/5610/Assignments/5610"
            className="wd-assignment-link"
          >
            HAVASCRIPT + REACT
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> May 20 at 12:00am |{" "}
            <b>Due</b> May 27 at 11:59pm | 100pts
          </p>
        </li>
      </ul>
    </div>
  );
}
