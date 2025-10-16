export default function TernaryOperator() {
  let loggedIn = false;
  loggedIn = true;
  return (
    <div id="wd-ternary-operator">
      <h4>Ternary conditional operator</h4>
      <h4>Logged In</h4>
      {loggedIn ? <p>Welcome</p> : <p>Please login</p>} <hr />
    </div>
  );
}
