import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const evt = req.body;
  try {
    switch (evt.type) {
      case "user.updated":
        const users = await supabase.from("users").select().eq("id", evt.data.id);

        if (users.data.length) {
          await supabase
            .from("users")
            .update({
              email: evt.data.email_addresses[0].email_address,
              first_name: evt.data.first_name,
              last_name: evt.data.last_name,
              clerk_data: evt.data,
              verified: false,
              credits: 1000,
              role: "admin",
              updated_at: new Date(),
            })
            .eq("id", evt.data.id)
            .then((response) => {
              res.status(200).json({ message: "User updated successfully!" });
            })
            .catch((e) => {
              res.status(500).json({ message: "Update user operation failed! " + e });
            });
        } else {
          await supabase
            .from("users")
            .insert({
              id: evt.data.id,
              email: evt.data.email_addresses[0].email_address,
              first_name: evt.data.first_name,
              last_name: evt.data.last_name,
              clerk_data: evt.data,
              verified: false,
              credits: 1000,
              role: "admin",
            })
            .then((response) => {
              res.status(200).json({ message: "User added successfully!" });
            })
            .catch((e) => {
              res.status(500).json({ message: "Add user operation failed! " + e });
            });
        }
        break;
      default:
        res.status(501).json({ message: "Operation not supported!" });
    }
  } catch (error) {
    console.error("Error handling webhook: ", error);
    res.status(500).end("Internal Server Error");
  }
}
