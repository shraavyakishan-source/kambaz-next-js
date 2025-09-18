export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea
        id="wd-description"
        defaultValue={`The assignment is available online Submit a link to the landing page of
your web application running on Netlify. The landing page should include
the following: Your full name and section Links to each of the lab
assignments Link to the Kambaz application Links to all relevant source
code repositories.`}
      />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue="100" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label>Assignment Group</label>
            </td>
            <td>
              <select defaultValue="Assignment">
                <option defaultValue="Assignment">ASSIGNMENTS</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label>Display Grade as</label>
            </td>
            <td>
              <select defaultValue="Percentage">
                <option defaultValue="Percentage">Percentage</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label>Submission Type</label>
            </td>
            <td>
              <select defaultValue="Online">
                <option defaultValue="Online">Online</option>
              </select>
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              <label>Online Entry Options</label>
              <br />
              <input type="checkbox" id="wd-chkbox-Text" />
              <label htmlFor="wd-chkbox-Text"> Text Entry</label>
              <br />

              <input type="checkbox" id="wd-chkbox-URL" />
              <label htmlFor="wd-chkbox-URL"> Website URL</label>
              <br />

              <input type="checkbox" id="wd-chkbox-Recordings" />
              <label htmlFor="wd-chkbox-Recordings"> Media Recordings</label>
              <br />

              <input type="checkbox" id="wd-chkbox-Annotation" />
              <label htmlFor="wd-chkbox-Annotation"> Student Annotation</label>
              <br />

              <input type="checkbox" id="wd-chkbox-File" />
              <label htmlFor="wd-chkbox-File"> File Uploads</label>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-Everyone">Assign</label>
            </td>
            <td>
              <label htmlFor="wd-Everyone">Assign to</label>
              <br />
              <input id="wd-Everyone" defaultValue="Everyone" />
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              <label htmlFor="wd-due-date">Due</label>
              <br />
              <input type="date" defaultValue="2024-05-13" id="wd-due-date" />
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              <label htmlFor="wd-available-date">Available from</label>
              &nbsp;&nbsp;&nbsp;
              <label htmlFor="wd-until-date">Until</label>
              <br />
              <input
                type="date"
                defaultValue="2024-05-06"
                id="wd-available-date"
              />
              &nbsp;&nbsp;
              <input type="date" defaultValue="2024-05-20" id="wd-until-date" />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}></td>
            <td>
              <button>Cancel</button>
              <button>Save</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
