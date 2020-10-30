import withFetch, { FetchStatus } from "./withFetch";

const withDownloadLink = (
    driveId: string,
  ): FetchStatus<any> => {
    const [result] = withFetch<any>(`documents/download/${driveId}`);
    return result;
  };
  
  export default withDownloadLink;
  