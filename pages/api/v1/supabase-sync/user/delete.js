import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const evt = req.body;
  try {
    switch (evt.type) {
      case "user.deleted":
        await supabase
          .from("users")
          .delete().eq("id", evt.data.id)
          .then((response) => {
            res.status(200).json({ message: "User deleted successfully!" });
          })
          .catch((e) => {
            res.status(500).json({ message: "Delete user operation failed! " + e });
          });
        break;
      default:
        res.status(501).json({ message: "Operation not supported!" });
    }
  } catch (error) {
    console.error("Error handling webhook: ", error);
    res.status(500).end("Internal Server Error");
  }
}
