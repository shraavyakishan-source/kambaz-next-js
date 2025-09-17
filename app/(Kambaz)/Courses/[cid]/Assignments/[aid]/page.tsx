export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
        your web application running on Netlify. The landing page should include
        the following: Your full name and section Links to each of the lab
        assignments Link to the Kambaz application Links to all relevant source
        code repositories.
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Assignment Group</label>
          </td>
          <select>
            <option selected value="Assignment">
              ASSIGNMENTS
            </option>
          </select>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Display Grade as</label>
          </td>
          <select>
            <option selected value="Percentage">
              Percentage
            </option>
          </select>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Submission Type</label>
          </td>
          <select>
            <option selected value="Online">
              Online
            </option>
          </select>
        </tr>
        <label>Online Entry Options</label>
        <br />

        <input type="checkbox" name="check-entry" id="wd-chkbox-Text" />
        <label htmlFor="wwd-chkbox-Text">Text Entry</label>
        <br />

        <input type="checkbox" name="check-entry" id="wd-chkbox-URL" />
        <label htmlFor="wd-chkbox-URL">Website URL</label>
        <br />

        <input type="checkbox" name="check-entry" id="wd-chkbox-Recordings" />
        <label htmlFor="wd-chkbox-Recordings">Media Recordings</label>
        <br />

        <input type="checkbox" name="check-entry" id="wd-chkbox-Annotation" />
        <label htmlFor="wwd-chkbox-Annotation">Student Annotation</label>
        <br />

        <input type="checkbox" name="check-entry" id="wd-chkbox-File" />
        <label htmlFor="wd-chkbox-File">File Uploads</label>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-Everyone">Assign to</label>
          </td>
          <td>
            <input id="wd-points" value="Everyone" />
          </td>
        </tr>
        <label htmlFor="wd-text-fields-date"> Available from </label>
        <input type="date" value="2024-06-06" id="wd-text-fields-date" />
        <br />
        <label htmlFor="wd-text-fields-date"> Until </label>
        <input type="date" value="2024-05-20" id="wd-text-fields-date" />
        <br />
      </table>
      <button>Cancel</button>
      <button>save</button>
    </div>
  );
}
