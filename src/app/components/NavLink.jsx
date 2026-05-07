import Link from "next/link";

const NavLink = ({ href, title, active }) => {
  return (
    <Link
      href={href}
      className={`block py-2 pl-3 pr-4 sm:text-base rounded md:p-0 hover:text-primary-400 transition-colors duration-300 ${
        active
          ? "text-primary-400 border-b-2 border-primary-400"
          : "text-[#ADB7BE]"
      }`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
