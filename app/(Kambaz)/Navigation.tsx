"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { label: "Account", path: "/Account", icon: FaRegCircleUser },
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Courses/5610/Home", icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs/Lab1", icon: LiaCogSolid },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 110 }}
      className="rounded-0 bottom-0 top-0 d-none d-md-flex flex-column align-items-center bg-black z-2  "
    >
      {/* NEU Logo */}
      <ListGroupItem
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <img
          src="/Images/NEU.jpg"
          width="85"
          height="100"
          alt="Northeastern University"
        />
      </ListGroupItem>

      {links.map((link) => (
        <ListGroupItem
          key={link.path}
          as={Link}
          href={link.path}
          className={`text-center border-0 ${
            pathname.includes(link.label)
              ? "bg-white text-danger"
              : "bg-black text-white"
          }`}
        >
          <link.icon
            className={`fs-1 ${
              pathname.includes(link.label) ? "text-danger" : "text-white"
            }`}
          />
          <div>{link.label}</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
