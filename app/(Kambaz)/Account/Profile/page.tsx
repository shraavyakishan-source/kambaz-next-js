import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-signin-screen">
      <h1>Profile</h1>
      <FormControl
        id="wd-username"
        defaultValue="Alice"
        placeholder="username"
        className="mb-2 w-50"
      />

      <FormControl
        id="wd-password"
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2 w-50"
      />
      <FormControl
        id="wd-firstname"
        defaultValue="Alice"
        placeholder="firstname"
        className="mb-2 w-50"
      />
      <FormControl
        id="wd-lastname"
        defaultValue="wonderland"
        placeholder="lastname"
        className="mb-2 w-50"
      />
      <FormControl
        placeholder="MM-DD-YY"
        type="date"
        id="wd-dob"
        className="mb-2 w-50"
      />
      <br />
      <FormControl
        defaultValue="Shraavya.kishan@gmail.com"
        type="email"
        id="wd-email"
        className="mb-2 w-50"
      />
      <br />
      <FormControl defaultValue="User" className="mb-2 w-50" />
      <br />
      <Link href="Signin" className="btn btn-danger w-50 mt-3">
        Sign out
      </Link>
    </div>
  );
}
