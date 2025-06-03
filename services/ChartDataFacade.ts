import { API_URLS } from "@/app/api/api-url";
import axios from "axios";

export interface ChartData {
  labels: string[];
  values: number[];
}

export const ChartDataFacade = {
  async getUMKMChartData(): Promise<ChartData> {
    try {
      const response = await axios.get(API_URLS.CHART_DATA);
      const { labels, values } = response.data;
      return { labels, values };
    } catch (error) {
      console.error("Error fetching chart data:", error);
      throw new Error("Failed to fetch chart data");
    }
  },
};