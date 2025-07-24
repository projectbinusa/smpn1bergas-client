export const uploadFileToS3 = async (files) => {
  try {
    const uploadedFiles = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://s3.lynk2.co/api/s3/slbc/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Gagal mengunggah lampiran ${file.name}`);
      }

      const data = await response.json();
      if (data.data && data.data.url_file) {
        console.log(`URL lampiran berhasil didapat: ${data.data.url_file}`);
        uploadedFiles.push(data.data.url_file);
      } else {
        throw new Error("URL lampiran tidak tersedia dalam respons S3");
      }
    }
    return uploadedFiles;
  } catch (error) {
    console.error("Error upload ke S3:", error);
    throw error;
  }
};
