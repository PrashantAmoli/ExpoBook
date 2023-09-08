import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const evt = req.body;
  try {
    switch (evt.type) {
      case "user.created":
        const users = await supabase.from("exhibitors").select().eq("email", evt.data.email_addresses[0].email_address);

        if (users.data.length) {
          if (users.data[0].registered) {
            res.status(400).json({ message: "Exhibitor with same email already registered!" });
          } else {
            await supabase
              .from("exhibitors")
              .update({
                clerk_id: evt.data.id,
                registered: true,
              })
              .eq("email", evt.data.email_addresses[0].email_address)
              .then((response) => {
                res.status(200).json({ message: "Exhibitor reactivated successfully!" });
              })
              .catch((e) => {
                res.status(500).json({ message: "Reactivate exhibitor operation failed! " + e });
              });
          }
        } else {
          await supabase
            .from("exhibitors")
            .insert({
              clerk_id: evt.data.id,
              email: evt.data.email_addresses[0].email_address,
              first_name: evt.data.first_name,
              last_name: evt.data.last_name,
              username: evt.data.username,
              clerk_data: evt.data,
              role: "exhibitor",
            })
            .then((response) => {
              res.status(200).json({ message: "Exhibitor added successfully!" });
            })
            .catch((e) => {
              res.status(500).json({ message: "Add exhibitor operation failed! " + e });
            });
        }
        break;
      default:
        res.status(501).json({ message: "Operation not supported!" });
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).end("Internal Server Error");
  }
}
