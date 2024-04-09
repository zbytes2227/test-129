import Cards from "@/model/Cards";
import connectDb from "../../middleware/mongoose";
import Attendance from "@/model/Attendance";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      // Fetch all attendance records
      const allAttendance = await Attendance.find();

      // Create an array to store details of each attendance record
      const attendanceDetails = [];

      // Loop through each attendance record
      for (const attendanceRecord of allAttendance) {
        // Assuming cardID is a property in the attendance record
        const cardID = attendanceRecord.cardID;

        // Use the Cards model to find details based on cardID
        const cardDetails = await Cards.findOne({ cardID });

        // Add the attendance record and card details to the array
        attendanceDetails.push({
          cardID: cardDetails.cardID,
          name: cardDetails.name,
          class: cardDetails.class,
          contact: cardDetails.contact,
          login: attendanceRecord.Login,
          logout: attendanceRecord.Logout,
        });
      }

      // Send the array of attendance details to the client
      return res.json({ success: true, allAttendanceLogs :  allAttendance});
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, msg: "Server error...." });
    }
  }
};
export default connectDb(handler);
