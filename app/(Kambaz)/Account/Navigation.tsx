import Link from "next/link";
export default function AccountNavigation() {
  return (
    <div className="wd list-group fs-5 rounded-0">
      <Link href="Signin" className="text-danger text-decoration-none">
        Signin
      </Link>
      <br />
      <Link href="Signup" className="text-danger text-decoration-none">
        Signup
      </Link>
      <br />
      <Link href="Profile" className="text-danger text-decoration-none">
        Profile
      </Link>
      <br />
    </div>
  );
}
