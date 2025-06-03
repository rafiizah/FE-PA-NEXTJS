// import { API_URLS } from "@/app/api/api-url";
// import axios from "axios";

// export const FormEventFacade = {
//   async createEvent(
//     nama_event: string,
//     date: string,
//     time: string,
//     location: string,
//     description: string,
//     image: File | null
//   ) {
//     const formData = new FormData();
//     formData.append("nama_event", nama_event);
//     formData.append("date", date);
//     formData.append("time", time);
//     formData.append("location", location);
//     formData.append("description", description);
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(API_URLS.EVENT, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error creating event:", error);
//       throw new Error("Failed to create event");
//     }
//   },
// };
