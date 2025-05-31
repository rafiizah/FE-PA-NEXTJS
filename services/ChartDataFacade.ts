// services/ChartDataFacade.ts

export interface ChartData {
  labels: string[];
  values: number[];
}

export const ChartDataFacade = {
  async getUMKMChartData(): Promise<ChartData> {
    const response = await fetch("http://localhost:8000/api/chart-data");
    if (!response.ok) {
      throw new Error("Failed to fetch chart data");
    }

    const data = await response.json();
    const { labels, values } = data;

    return { labels, values };
  },
};
