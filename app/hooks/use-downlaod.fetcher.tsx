import { useEffect } from "react";
import { useFetcher } from "react-router";

export function useDownloadFetcher() {
    const fetcher = useFetcher();
  
    useEffect(() => {
      if (!fetcher.data || fetcher.state !== "idle") {
        return;
      }
  
      // dynamically create download link
      const link = window.URL.createObjectURL(new Blob([fetcher.data.fileData], {
        type: fetcher.data.fileType,
      }));
  
      // create a temporary anchor element
      const a = document.createElement("a");
      a.href = link;
      a.download = fetcher.data.fileName;
      a.click();
    }, [fetcher.data, fetcher.state]);
  
    return fetcher;
  }