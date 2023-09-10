import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const evt = req.body;
  try {
    switch (evt.type) {
      case "user.created":
        const users = await supabase.from("organizers").select().eq("email", evt.data.email_addresses[0].email_address);

        if (users.data.length) {
          if (users.data[0].registered) {
            res.status(400).json({ message: "Organizer with same email already registered!" });
          } else {
            await supabase
              .from("organizers")
              .update({
                clerk_id: evt.data.id,
                registered: true,
              })
              .eq("email", evt.data.email_addresses[0].email_address)
              .then((response) => {
                res.status(200).json({ message: "Organizer reactivated successfully!" });
              })
              .catch((e) => {
                res.status(500).json({ message: "Reactivate organizer operation failed! " + e });
              });
          }
        } else {
          await supabase
            .from("organizers")
            .insert({
              clerk_id: evt.data.id,
              email: evt.data.email_addresses[0].email_address,
              first_name: evt.data.first_name,
              last_name: evt.data.last_name,
              username: evt.data.username,
              clerk_data: evt.data,
            })
            .then((response) => {
              res.status(200).json({ message: "Organizer added successfully!" });
            })
            .catch((e) => {
              res.status(500).json({ message: "Add organizer operation failed! " + e });
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
