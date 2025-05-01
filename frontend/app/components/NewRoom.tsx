import type { FormEvent } from "react";
import type { SetState } from "./utils";
import { config } from "./config";
import { useNavigate } from "react-router";

export default function NewRoom({
  mutate,
  title,
  setTitle,
}: {
  mutate: () => void;
  title: string;
  setTitle: SetState<string>;
}) {
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      title,
    };

    const token = localStorage.getItem("jwtToken");

    if (token === null) {
      mutate();
      return;
    }

    const res = await fetch(`${config.apiUrl}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const location = res.headers.get("location");
      const roomNumber = location ? parseInt(location) : NaN;
      if (!isNaN(roomNumber)) {
        await navigate(`/room/${String(roomNumber)}`);
      } else {
        alert("Sorry, something is wrong...");
      }
    } else if (res.status === 401) {
      mutate();
    } else {
      alert("Sorry, something is wrong...");
    }
  };

  return (
    <form
      className="grid grid-cols-[1fr_auto] mb-4 bg-sub-bg p-4 rounded-md"
      onSubmit={(e) => void handleSubmit(e)}
    >
      <input
        className="outline-none rounded-full bg-light-bg md:p-4 p-2 focus:placeholder:invisible placeholder:text-sub"
        size={8}
        placeholder="Room Title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        required
      />
      <button
        className="h-full md:p-4 p-2 border hover:text-main-bg hover:bg-main rounded-md ml-4"
        type="submit"
      >
        New
      </button>
    </form>
  );
}
