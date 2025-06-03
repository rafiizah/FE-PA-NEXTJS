// apiUrlFactory.js

class ApiUrlFactory {
  static createApiUrls(
    baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:8000/api"
  ) {
    if (!baseUrl) {
      console.warn(
        "NEXT_PUBLIC_API_BASE_URL environment variable is not set, using default localhost"
      );
    }

    return {
      TOTAL_EVENT: `${baseUrl}/jumlah-event`,
      TOTAL_UMKM: `${baseUrl}/jumlah-umkm`,
      TOTAL_ASOSIASI: `${baseUrl}/jumlah-asosiasi`,
      CHART_DATA: `${baseUrl}/chart-data`,
      TOTAL_USERS: `${baseUrl}/jumlah-user`,
      LOGIN: `${baseUrl}/login`,
      EVENT: `${baseUrl}/event/`,
      PEMILIK: `${baseUrl}/pemilik/`,
    };
  }

  static createVersionedApiUrls(
    version = "v1",
    baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:8000/api"
  ) {
    const versionedBaseUrl = `${baseUrl}/${version}`;
    return this.createApiUrls(versionedBaseUrl);
  }
}

const API_URLS = ApiUrlFactory.createApiUrls();
const API_URLS_V2 = ApiUrlFactory.createVersionedApiUrls("v2");

export { API_URLS, ApiUrlFactory };
