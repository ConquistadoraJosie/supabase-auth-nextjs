import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";

const Navbar = async () => {
  // This will update the Navbar to show the user's email if they are logged in
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <nav className="border-b bg-background w-full flex items-center">
      <div className="flex w-full items-center justify-between my-4">
        <Link className="font-bold" href="/">
          Home
        </Link>

        <div className="flex items-center gap-x-5">
          <Link href="/private">Private</Link>
        </div>
        <div className="flex items-center gap-x-5">
          {/* If no users exists, then it will redirect back to the login page  */}
          {!user ? (
            <Link href="/login">
              <div className="text-sm px-4 py-2 bg-blue-500 text-white rounded-md">
                Login
              </div>
            </Link>
          ) : (
            <> {/* If a user exists, then it will show the user's email and a logout button */}
              <div className="flex items-center gap-x-2 text-sm">
                {user?.email}
              </div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
