export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <button>Collapse All</button>
      <button>View Progress</button>
      <select id="wd-module">
        <option selected value="Publish">
          Publish All
        </option>
      </select>
      <button>+Module</button>
      <ul>
        <li className="wd-module">
          <div className="wd-title">
            Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
          </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
          </ul>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 1 - Introduction
                </li>
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 1 - Creating User
                </li>
              </ul>
            </li>
          </ul>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to Web Development
                </li>
                <li className="wd-content-item">
                  Creating an HTTP Server with Node.js
                </li>
                <li className="wd-content-item">
                  Creating a react Application
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">
            Week 1, Lecture 2 - Formatting user interfaces with HTML
          </div>
        </li>
      </ul>
    </div>
  );
}
