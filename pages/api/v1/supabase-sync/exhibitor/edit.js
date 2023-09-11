import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const evt = req.body;
  try {
    switch (evt.type) {
      case "user.updated":
        const users = await supabase.from("exhibitors").select().eq("email", evt.data.email_addresses[0].email_address);

        if (users.data.length) {
          await supabase
            .from("exhibitors")
            .update({
              email: evt.data.email_addresses[0].email_address,
              first_name: evt.data.first_name,
              last_name: evt.data.last_name,
              username: evt.data.username,
              clerk_data: evt.data,
              updated_at: new Date(),
            })
            .eq("clerk_id", evt.data.id)
            .then((response) => {
              res.status(200).json({ message: "Exhibitor updated successfully!" });
            })
            .catch((e) => {
              res.status(500).json({ message: "Update exhibitor operation failed! " + e });
            });
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
    console.error("Error handling webhook: ", error);
    res.status(500).end("Internal Server Error");
  }
}
