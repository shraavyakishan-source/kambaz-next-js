import BackgroundColors from "./BackgroundColors";
import ForegroundColors from "./ForegroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import Corners from "./Corners";
import Dimension from "./Dimension";
import Positions from "./Positions";
import "./index.css";
export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p style={{ backgroundColor: "blue", color: "white" }}>
        Style attribute allows configuring look and feel right on the element.
        Although its very convenient it is considered bad practice and you
        should avoid using the style attribute
      </p>
      <h3>Styling with CSS File</h3>
      <p className="wd-bg-color-green wd-fg-color-white">
        Style attribute allows configuring look and feel right on the element.
        Although its very convenient it is considered bad practice and you
        should avoid using the style attribute
      </p>

      <ForegroundColors />
      <BackgroundColors />

      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the elements of the same
          name, e.g. P, we can refer to a specific element by its ID
        </p>
        <p id="wd-id-selector-2">
          Here is another paragraph using a different ID and a different look
          and feel
        </p>
      </div>
      <div id="wd-css-class-selectors">
        <h3>Class selectors</h3>

        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an elements
          CLASS attribute
        </p>

        <h4 className="wd-class-selector">
          This heading has same style as paragraph above
        </h4>
      </div>
      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h3>Document structure selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to refer elements in particular places in
            the document
            <p className="wd-selector-3">
              This paragraphs red background is referenced as
              <br />
              .selector-2 .selector3
              <br />
              meaning the descendant of some ancestor.
              <br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent
              </span>
              <br />
              You can combine these relationships to create specific styles
              depending on the document structure
            </p>
          </div>
        </div>
      </div>
      <Borders />
      <Padding />
      <Margins />
      <Corners />
      <Dimension />
      <Positions />
    </div>
  );
}
