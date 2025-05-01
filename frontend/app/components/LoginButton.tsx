import { Link } from "react-router";

export default function LoginButton() {
  return (
    <Link
      className="border md:p-4 p-2 hover:text-main-bg hover:bg-main rounded-md h-full grid place-items-center"
      to={"/auth"}
    >
      Login
    </Link>
  );
}
