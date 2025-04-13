export default function Logout() {
  function handleClick() {
    localStorage.removeItem("jwtToken");
  }

  return (
    <button
      className="border rounded-md text-main-bg bg-main h-full md:px-4 px-2 hover:text-main hover:bg-transparent"
      onClick={handleClick}
    >
      Logout
    </button>
  );
}
