const supabase = require("../db/supabase");

// Create a document
async function createDocument(req, res) {
  try {
    const {
      owner_id,
      document_type,
      file_url,
      is_verified
    } = req.body;

    if (
      !owner_id ||
      !document_type ||
      !file_url ||
      is_verified === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: owner_id, document_type, file_url, is_verified"
      });
    }

    const { data, error } = await supabase
      .from("document")
      .insert([
        {
          owner_id,
          document_type,
          file_url,
          is_verified
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      document: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all documents
async function getAllDocuments(req, res) {
  try {
    const { data, error } = await supabase
      .from("document")
      .select("*");

    if (error) throw error;

    return res.json({
      success: true,
      documents: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get document by ID
async function getDocumentById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("document")
      .select("*")
      .eq("document_id", id)
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      document: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Update document
async function updateDocument(req, res) {
  try {
    const { id } = req.params;
    const {
      owner_id,
      document_type,
      file_url,
      is_verified
    } = req.body;

    const { data, error } = await supabase
      .from("document")
      .update({
        owner_id,
        document_type,
        file_url,
        is_verified
      })
      .eq("document_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      document: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Delete document
async function deleteDocument(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("document")
      .delete()
      .eq("document_id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message: "Document deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
};