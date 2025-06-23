"use server";

// every server action must be async and include 'use server' at the top to 
// indicate that it is a server action/ server side


import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function signUp({ formData: FormData }) {
    const createClient = await createClient();

    const credentials = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        // Validate credentials with the sign-up form tsx
    };
    const { data, error } = await supabase.auth.signUp({
        // the credentials are passed to the signUp function to create an object
        email: credentials.email,
        password: credentials.password,
        options: {// we can pass additional information for the user using Supabase Metadata
            data: {
                username: credentials.username,
            },
        },
    });

    if (error) {
        return { status: error?.message, user: null }; // return the error message if there is an error
    };
    // Check if the user already has an email linked to their account
    if (data?.user?.identities?.length === 0) { //This means the email already exists
        return { status: "User with this email already exists", user: null };
        // returns a message if the email already exists
    }

    { /* Currently, revalidatePath invalidates all the routes in the client-side Router Cache when used in a server action. 
    This behavior is temporary and will be updated in the future to apply only to the specific path. 
    Allows for the page to dynamically update its cached content on the server side*/}
    revalidatePath("/", "layout");
    return { status: "success", user: data.user };
}