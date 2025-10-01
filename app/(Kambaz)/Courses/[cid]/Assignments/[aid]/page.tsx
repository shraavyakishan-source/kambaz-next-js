import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AssignmentEditorBootstrap() {
  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Assignment</h5>

          {/* Description / top block */}
          <div className="mb-4">
            <label htmlFor="wd-name" className="form-label">
              Assignment Name
            </label>
            <input id="wd-name" className="form-control" defaultValue="A1" />
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <p>
                The assignment is
                <span className="fw-bold text-danger"> available online</span>
              </p>
              <p>
                Submit a link to the landing page of your Web application
                running on Netlify.
              </p>
              <p>The landing page should include the following:</p>
              <ul>
                <li>Your full name and section</li>
                <li>Links to each of the lab assignments</li>
                <li>Link to the Kanbas application</li>
                <li>Links to all relevant source code repositories</li>
              </ul>
              <p>
                The Kanbas application should include a link to navigate back to
                the landing page.
              </p>
            </div>
          </div>

          <form>
            <div className="row g-3 align-items-start">
              <div className="col-md-4 text-md-end">
                <label htmlFor="wd-points" className="form-label">
                  Points
                </label>
              </div>
              <div className="col-md-8">
                <input
                  id="wd-points"
                  className="form-control w-50"
                  defaultValue="100"
                />
              </div>

              <div className="col-md-4 text-md-end">
                <label className="form-label">Assignment Group</label>
              </div>
              <div className="col-md-8">
                <select className="form-select w-50" defaultValue="Assignment">
                  <option value="Assignment">ASSIGNMENTS</option>
                </select>
              </div>

              <div className="col-md-4 text-md-end">
                <label className="form-label">Display Grade as</label>
              </div>
              <div className="col-md-8">
                <select className="form-select w-50" defaultValue="Percentage">
                  <option value="Percentage">Percentage</option>
                </select>
              </div>

              <div className="col-md-4 text-md-end">
                <label className="form-label">Submission Type</label>
              </div>
              <div className="col-md-8">
                <select className="form-select w-50" defaultValue="Online">
                  <option value="Online">Online</option>
                </select>
              </div>

              <div className="col-md-4 text-md-end">
                <label className="form-label">Online Entry Options</label>
              </div>
              <div className="col-md-8">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-chkbox-Text"
                  />
                  <label className="form-check-label" htmlFor="wd-chkbox-Text">
                    Text Entry
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-chkbox-URL"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="wd-chkbox-URL">
                    Website URL
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-chkbox-Recordings"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-chkbox-Recordings"
                  >
                    Media Recordings
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-chkbox-Annotation"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-chkbox-Annotation"
                  >
                    Student Annotation
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-chkbox-File"
                  />
                  <label className="form-check-label" htmlFor="wd-chkbox-File">
                    File Uploads
                  </label>
                </div>
              </div>

              <div className="col-md-4 text-md-end">
                <label htmlFor="wd-Everyone" className="form-label">
                  Assign
                </label>
              </div>
              <div className="col-md-8">
                <label htmlFor="wd-Everyone" className="form-label">
                  Assign to
                </label>
                <input
                  id="wd-Everyone"
                  className="form-control w-50"
                  defaultValue="Everyone"
                />
              </div>

              <div className="col-md-4 text-md-end"></div>
              <div className="col-md-8">
                <label htmlFor="wd-due-date" className="form-label">
                  Due
                </label>
                <input
                  type="date"
                  id="wd-due-date"
                  className="form-control w-50"
                  placeholder="mm-dd-yy"
                />
              </div>

              <div className="col-md-4 text-md-end"></div>
              <div className="col-md-8">
                <div className="mb-1">
                  <label
                    htmlFor="wd-available-date"
                    className="form-label me-3"
                  >
                    Available from
                  </label>
                  <label htmlFor="wd-until-date" className="form-label ms-4">
                    Until
                  </label>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="date"
                    id="wd-available-date"
                    className="form-control w-auto"
                    placeholder="mm-dd-yy"
                  />
                  <input
                    type="date"
                    id="wd-until-date"
                    className="form-control w-auto"
                    placeholder="mm-dd-yy"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-danger">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
