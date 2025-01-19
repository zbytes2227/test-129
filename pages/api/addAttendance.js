import Cards from "@/model/Cards";
import connectDb from "../../middleware/mongoose";
import Attendance from "@/model/Attendance";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Simply add attendance without any checks
      const newAttendance = new Attendance({
        cardID: req.body.cardID,
        Login: new Date(),
      });

      // Save the new attendance record to the database
      const savedAttendance = await newAttendance.save();

      return res.status(200).json({
        success: true,
        msg: "Attendance added successfully",
      });
    } catch (error) {
      console.error("Error saving attendance:", error);
      return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, msg: "Method not allowed" });
  }
};

export default connectDb(handler);
