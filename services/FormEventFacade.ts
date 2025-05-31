"use client";
import axios from "axios";


export const FormEventFacade = {
  async createEvent(
    nama_event: string,
    date: string,
    time: string,
    location: string,
    description: string,
    image: File | null
  ) {
    const formData = new FormData();
    formData.append("nama_event", nama_event);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/api/event/",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    const response = await axios.request(config);
    return response.data;
  },
};
