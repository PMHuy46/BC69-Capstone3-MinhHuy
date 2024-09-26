export const createFileFromUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    console.log(blob)
    // const newFile = new File([blob], "downloadedFile.png", {
    //   type: blob.type,
    // });
  } catch (error) {
    console.error("Error fetching the file:", error);
  }
};
