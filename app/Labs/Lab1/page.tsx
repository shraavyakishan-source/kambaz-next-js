export default function Lab1() {
  return (
    <>
      <div id="wd-lab1">
        <b>
          <p>Name: Shraavya B K</p>
          <p>Section: 05 | CRN: 19730 | </p>
        </b>
        <h2>Lab1</h2>
      </div>
      <h3>HTML Examples</h3>
      <div id="wd-h-tag">
        <h4>Heading tags</h4>
      </div>
      <div id="wd-p-tag"></div>
      <h4>Paragraph tag</h4>
      <div id="wd-p-1">
        <p>This is the first paragraph</p>
        <p id="wd-p-2">this is the second paragraph </p>
      </div>
      <h4>List tags</h4>
      <div id="wd-your-favourite-recipe">
        <h3>My favourite recipe</h3>
        How to make Pasta
        <ol>
          <li>Take about 2 cups of pasta and boil it until its cooked well</li>
          <li>
            Add 3 tbsp of butter and garlic to a pan, once melted add chilli
            flakes
          </li>
          <li>Add the pasta to the pan and combine everything</li>
          <li>Add salt and pepper to taste</li>
          <li>Add parsley and parmesan cheese on top</li>
          <li>serve and enjoy</li>
        </ol>
      </div>
      <div id="wd-your-books">
        <h3>My favourite books</h3>
        <ul>
          <li>Harry potter</li>
          <li>it ends with us</li>
          <li>Lord of the rings</li>
          <li>Manga</li>
        </ul>
      </div>
      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>HTML</td>
              <td>3/2/24</td>
              <td>95</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>3/9/24</td>
              <td>92</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>JavaScript</td>
              <td>3/15/24</td>
              <td>94</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>94</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div id="wd-images">
        <h4>Image tag</h4>
        Loading an image from the internet: <br />
        <img
          id="wd-starship"
          width="400px"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        <br />
        Loading a local image:
        <br />
        <img id="wd-teslabot" src="/images/teslabot.jpg" height="200px" />
      </div>
      <div id="wd-forms">
        <h4>Form Elements</h4>
        <form id="wd-text-fields">
          <h5>Text Fields</h5>
          <label htmlFor="wd-text-fields-username">Username:</label>
          <input placeholder="Shraavya" id="wd-text-fields-username" /> <br />
          <label htmlFor="wd-text-fields-password">Password:</label>
          <input
            type="password"
            defaultValue="123@#$asd"
            id="wd-text-fields-password"
          />
          <br />
          <label htmlFor="wd-text-fields-first-name">First name:</label>
          <input
            type="text"
            title="Shraavya"
            id="wd-text-fields-first-name"
          />{" "}
          <br />
          <label htmlFor="wd-text-fields-last-name">Last name:</label>
          <input
            type="text"
            defaultValue="Bharadwaj"
            title="The last name"
            id="wd-text-fields-last-name"
          />
        </form>
      </div>
      <h4>Text boxes</h4>
      <label>Biography:</label>
      <br />
      <textarea id="wd-textarea" cols={30} rows={10}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </textarea>
      <h4 id="wd-buttons">Buttons</h4>
      <button
        type="button"
        //onClick={() => alert("Life is Good!")}
        id="wd-all-good"
      >
        Hello World!
      </button>{" "}
      <br />
      <h4 id="wd-radio-buttons">Radio buttons</h4>
      <label>Favorite movie genre:</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-comedy" />
      <label htmlFor="wd-radio-comedy">Comedy</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-drama" />
      <label htmlFor="wd-radio-drama">Drama</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-scifi" />
      <label htmlFor="wd-radio-scifi">Science Fiction</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
      <label htmlFor="wd-radio-fantasy">Fantasy</label>
      <h4 id="wd-checkboxes">Checkboxes</h4>
      <label>Favorite movie genre:</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
      <label htmlFor="wd-chkbox-comedy">Comedy</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
      <label htmlFor="wd-chkbox-drama">Drama</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
      <label htmlFor="wd-chkbox-scifi">Science Fiction</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
      <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
      <h4 id="wd-dropdowns">Dropdowns</h4>
      <h5>Select one</h5>
      <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label>
      <br />
      <select id="wd-select-one-genre">
        <option value="COMEDY">Comedy</option>
        <option value="DRAMA">Drama</option>
        <option selected value="SCIFI">
          Science Fiction
        </option>
        <option value="FANTASY">Fantasy</option>
      </select>
      <h5>Select many</h5>
      <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label>
      <br />
      <select multiple id="wd-select-many-genre">
        <option value="COMEDY" selected>
          {" "}
          Comedy{" "}
        </option>
        <option value="DRAMA"> Drama </option>
        <option value="SCIFI" selected>
          {" "}
          Science Fiction{" "}
        </option>
        <option value="FANTASY"> Fantasy </option>
      </select>{" "}
      <br />
      <h4>Other HTML field types</h4>
      <label htmlFor="wd-text-fields-email"> Email: </label>
      <input
        type="email"
        placeholder="Shraavya.kishan@gmail.com"
        id="wd-text-fields-email"
      />
      <br />
      <label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
      <input
        type="number"
        defaultValue="4848484"
        placeholder="1000"
        id="wd-text-fields-salary-start"
      />
      <br />
      <label htmlFor="wd-text-fields-rating"> Rating: </label>
      <input type="range" value="2" max="6" id="wd-text-fields-rating" />
      <br />
      <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
      <input type="date" value="2001-02-21" id="wd-text-fields-dob" />
      <br />
      <h4>Anchor tag</h4>
      Please &nbsp;
      <a
        href="https://northeastern.instructure.com/courses/225999/assignments/2886893"
        id="wd-lipsum"
      >
        click here &nbsp;
      </a>
      to go to the assignment page.
      <br />
    </>
  );
}
