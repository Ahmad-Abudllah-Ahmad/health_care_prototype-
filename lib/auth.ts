import { betterAuth } from "better-auth";
// import { supabaseAdapter } from "better-auth/adapters/supabase";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

export const auth = betterAuth({
    // database: supabaseAdapter({
    //     provider: "supabase",
    //     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //     key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    // }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        // google: { ... } // Add if needed
    },
    // Placeholder for now to let build pass
});
