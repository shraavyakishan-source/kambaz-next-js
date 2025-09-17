export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"></input>
      <button>+Group</button>
      <button>+Assignment</button>
      <br />
      <h3>
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a
            href="/Courses/5610/Assignments/5610"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </a>
        </li>
        <li className="wd-assignment-list-item"></li>
      </ul>
    </div>
  );
}
