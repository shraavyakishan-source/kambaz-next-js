import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function KambazNavigation() {
  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-flex flex-column align-items-center bg-black z-2"
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      {/* NEU logo */}
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img
          src="/Images/NEU.jpg"
          width="85"
          height="100"
          alt="Northeastern University"
        />
      </ListGroupItem>

      {/* Account */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/Account"
          id="wd-account-link"
          className="text-white text-decoration-none"
        >
          <FaRegCircleUser className="fs-1" />
          <div>Account</div>
        </Link>
      </ListGroupItem>

      {/* Dashboard */}
      <ListGroupItem className="border-0 bg-white text-center">
        <Link
          href="/Dashboard"
          id="wd-dashboard-link"
          className="text-danger text-decoration-none"
        >
          <AiOutlineDashboard className="fs-1" />
          <div>Dashboard</div>
        </Link>
      </ListGroupItem>

      {/* Courses */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/Courses/5610/Home"
          id="wd-courses-link"
          className="text-white text-decoration-none"
        >
          <LiaBookSolid className="fs-1 text-danger" />
          <div>Courses</div>
        </Link>
      </ListGroupItem>

      {/* Calendar */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="https://northeastern.instructure.com/calendar#view_name=month"
          id="wd-calendar-link"
          className="text-white text-decoration-none"
        >
          <IoCalendarOutline className="fs-1 text-danger" />
          <div>Calendar</div>
        </Link>
      </ListGroupItem>

      {/* Inbox */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/Inbox"
          id="wd-inbox-link"
          className="text-white text-decoration-none"
        >
          <FaInbox className="fs-1 text-danger" />
          <div>Inbox</div>
        </Link>
      </ListGroupItem>

      {/* Labs */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/Labs/Lab1"
          id="wd-labs-link"
          className="text-white text-decoration-none"
        >
          <LiaCogSolid className="fs-1 text-danger" />
          <div>Labs</div>
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
