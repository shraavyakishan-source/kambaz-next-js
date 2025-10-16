export default function JsonStringify() {
  const squares = [1, 4, 9, 16, 25, 36];
  return (
    <div className="wd-json-stringify">
      <h3>JavaScript Object Notation (JSON)</h3>
      <h4>JSON Stringify</h4>
      squares = {JSON.stringify(squares)}
      <hr />
    </div>
  );
}
