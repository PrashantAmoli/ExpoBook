import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const evt = req.body;
  try {
    switch (evt.type) {
      case "organization.updated":
        const organizations = await supabase.from("organizations").select().eq("id", evt.data.id);

        if (organizations.data.length) {
          await supabase
            .from("organizations")
            .update({
              name: evt.data.name,
              slug: evt.data.slug,
              clerk_data: evt.data,
              updated_at: new Date(),
            })
            .eq("id", evt.data.id)
            .then((response) => {
              res.status(200).json({ message: "Organization updated successfully!" });
            })
            .catch((e) => {
              res.status(500).json({ message: "Update organization operation failed! " + e });
            });
        } else {
          await supabase
            .from("organizations")
            .insert({
              id: evt.data.id,
              name: evt.data.name,
              slug: evt.data.slug,
              clerk_data: evt.data,
            })
            .then((response) => {
              res.status(200).json({ message: "Organization added successfully!" });
            })
            .catch((e) => {
              res.status(500).json({ message: "Add organization operation failed! " + e });
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
