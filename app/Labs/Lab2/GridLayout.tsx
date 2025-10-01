export default function GridLayout() {
  return (
    <div className="min-h-screen font-bold">
      <div className="grid-container">
        <div className="left-half">Left half</div>
        <div className="right-half">Right half</div>
        <div className="left-third">Left third</div>
        <div className="right-two-thirds">Right two thirds</div>
        <div className="left-sidebar">
          Side bar
          <div className="content-text">This is the left sidebar</div>
        </div>
        <div className="main-content">
          Main content
          <div className="content-text">
            This is the main content. This is the main content. This is the main
            content.
          </div>
        </div>
        <div className="right-sidebar">
          Side bar
          <div className="content-text">This is the right sidebar</div>
        </div>
      </div>
    </div>
  );
}
