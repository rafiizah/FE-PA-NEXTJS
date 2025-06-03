// service/MapDataInstance.ts
import { API_URLS } from "@/app/api/api-url";
import { Location } from "@/types/map";
import { jawaTimurData } from "@/types/jawatimur";

export class MapDataService {
  private static instance: MapDataService;
  private locations: Location[] = [];

  public static getInstance(): MapDataService {
    if (!MapDataService.instance) {
      MapDataService.instance = new MapDataService();
    }
    return MapDataService.instance;
  }

  public async fetchMapData(): Promise<Location[]> {
    if (this.locations.length > 0) {
      return this.locations;
    }

    try {
      const response = await fetch(API_URLS.CHART_DATA);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data && Array.isArray(data.labels) && Array.isArray(data.values)) {
        this.locations = data.labels.map((label: string, index: number) => ({
          id: index,
          name: label,
          latitude:
            jawaTimurData.find((item) => item.name === label)?.latitude || 0,
          longitude:
            jawaTimurData.find((item) => item.name === label)?.longitude || 0,
          umkm_count: data.values[index],
        }));
        return this.locations;
      } else {
        console.error("Unexpected data structure from API");
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  public getLocations(): Location[] {
    return this.locations;
  }
}
