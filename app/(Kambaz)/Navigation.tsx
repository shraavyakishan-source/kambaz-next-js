import Link from "next/link";
export default function KambazNavigation() {
  return (
    <div>
      <a href="https://www.northeastern.edu/" target="_blank">
        Northeastern
      </a>
      <br />
      <Link href="/Account"> Account</Link>
      <br />
      <Link href="/Dashboard"> Dashboard</Link>
      <br />
      <Link href="/Dashboard"> Courses</Link>
      <br />
      <Link href="https://northeastern.instructure.com/calendar#view_name=month&view_start=2025-09-17">
        Calendar
      </Link>
      <br />
      <Link href="/Inbox"> Inbox</Link>
      <br />
      <Link href="/Labs"> Labs</Link>
      <br />
    </div>
  );
}
