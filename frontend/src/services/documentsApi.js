import api from "./api";

export async function getDocuments() {
  console.log("Fetching documents...");
  
  try {
    const response = await api.get("/documents/");
    console.log("Documents:", response.data);
    return response.data.documents || [];
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}

export async function deleteDocument(filename) {
  console.log("Deleting document:", filename);
  
  try {
    const response = await api.delete(`/documents/${encodeURIComponent(filename)}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
}
