import { useEffect, useState } from "react";

const API = "http://localhost:5000";

export default function Vault({ notify }) {
  const [token, setToken] = useState(
    sessionStorage.getItem("vaultToken") || ""
  );

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [documents, setDocuments] = useState([]);

  const [file, setFile] = useState(null);

  const [meta, setMeta] = useState({
    name: "",
    category: "OTHER",
  });

  const [loading, setLoading] = useState(false);

  // ==============================
  // LOAD DOCUMENTS
  // ==============================

  const loadDocuments = async (authToken) => {
    try {
      const response = await fetch(
        `${API}/api/documents`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 401) {
        sessionStorage.removeItem("vaultToken");
        setToken("");

        throw new Error(
          "Session expired. Please login again."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load documents"
        );
      }

      setDocuments(
        data.documents || data || []
      );
    } catch (error) {
      notify(error.message, "error");
    }
  };

  // ==============================
  // CHECK LOGIN
  // ==============================

  useEffect(() => {
    if (token) {
      loadDocuments(token);
    }
  }, [token]);

  // ==============================
  // LOGIN
  // ==============================

  const login = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        `${API}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(loginForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      sessionStorage.setItem(
        "vaultToken",
        data.token
      );

      setToken(data.token);

      notify("Vault unlocked.");
    } catch (error) {
      notify(
        error.message,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // LOGOUT
  // ==============================

  const logout = () => {
    sessionStorage.removeItem(
      "vaultToken"
    );

    setToken("");

    setDocuments([]);

    notify("Vault locked.");
  };

  // ==============================
  // UPLOAD
  // ==============================

  const uploadDocument = async (event) => {
    event.preventDefault();

    if (!file) {
      notify(
        "Please select a file.",
        "error"
      );

      return;
    }

    if (!meta.name) {
      notify(
        "Please enter document name.",
        "error"
      );

      return;
    }

    const formData = new FormData();

    formData.append(
      "name",
      meta.name
    );

    formData.append(
      "category",
      meta.category
    );

    formData.append(
      "document",
      file
    );

    setLoading(true);

    try {
      const response = await fetch(
        `${API}/api/documents/upload`,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Upload failed"
        );
      }

      setFile(null);

      setMeta({
        name: "",
        category: "OTHER",
      });

      const input =
        document.getElementById(
          "vault-file"
        );

      if (input) {
        input.value = "";
      }

      await loadDocuments(token);

      notify(
        "Document uploaded successfully."
      );
    } catch (error) {
      notify(
        error.message,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DOWNLOAD
  // ==============================

  const downloadDocument = async (
    doc
  ) => {
    try {
      const response =
        await fetch(
          `${API}/api/documents/download/${doc._id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (!response.ok) {
        const data =
          await response
            .json()
            .catch(() => ({}));

        throw new Error(
          data.message ||
            "Download failed"
        );
      }

      const blob =
        await response.blob();

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        doc.originalName ||
        doc.fileName ||
        "document";

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      notify(
        error.message,
        "error"
      );
    }
  };

  // ==============================
  // DELETE
  // ==============================

  const deleteDocument = async (id) => {
    const confirmed =
      window.confirm(
        "Delete this document permanently?"
      );

    if (!confirmed) return;

    try {
      const response =
        await fetch(
          `${API}/api/documents/${id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Delete failed"
        );
      }

      setDocuments(
        documents.filter(
          (doc) =>
            doc._id !== id
        )
      );

      notify(
        "Document deleted."
      );
    } catch (error) {
      notify(
        error.message,
        "error"
      );
    }
  };

  // ==============================
  // LOGIN SCREEN
  // ==============================

  if (!token) {
    return (
      <main className="vault-page section">

        <div className="vault-header reveal">

          <div>
            <span className="eyebrow">
              PRIVATE AREA
            </span>

            <h1>
              Personal{" "}
              <span>Vault.</span>
            </h1>

            <p>
              A private authenticated area
              for your personal documents.
            </p>
          </div>

        </div>

        <form
          className="vault-login reveal"
          onSubmit={login}
        >

          <div className="lock-icon">
            🔐
          </div>

          <h2>
            Unlock your vault
          </h2>

          <p>
            Sign in using your admin account.
          </p>

          <label>
            Email

            <input
              type="email"
              placeholder="Admin email"
              value={loginForm.email}
              onChange={(event) =>
                setLoginForm({
                  ...loginForm,
                  email:
                    event.target.value,
                })
              }
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm({
                  ...loginForm,
                  password:
                    event.target.value,
                })
              }
              required
            />
          </label>

          <button
            className="button primary"
            disabled={loading}
          >
            {loading
              ? "Checking..."
              : "Unlock Vault ↗"}
          </button>

        </form>

      </main>
    );
  }

  // ==============================
  // VAULT SCREEN
  // ==============================

  return (
    <main className="vault-page section">

      <div className="vault-header reveal">

        <div>

          <span className="eyebrow">
            PRIVATE AREA
          </span>

          <h1>
            Personal{" "}
            <span>Vault.</span>
          </h1>

          <p>
            Your authenticated private
            document storage.
          </p>

        </div>

        <button
          className="button secondary"
          onClick={logout}
        >
          🔒 Lock Vault
        </button>

      </div>

      <div className="vault-grid">

        {/* ========================= */}
        {/* UPLOAD */}
        {/* ========================= */}

        <form
          className="upload-card reveal"
          onSubmit={uploadDocument}
        >

          <span className="eyebrow">
            ADD DOCUMENT
          </span>

          <h2>
            Secure upload
          </h2>

          <label>
            Document name

            <input
              type="text"
              placeholder="Example: Passport"
              value={meta.name}
              onChange={(event) =>
                setMeta({
                  ...meta,
                  name:
                    event.target.value,
                })
              }
              required
            />
          </label>

          <label>
            Category

            <select
              value={meta.category}
              onChange={(event) =>
                setMeta({
                  ...meta,
                  category:
                    event.target.value,
                })
              }
            >

              <option value="PAN">
                PAN
              </option>

              <option value="AADHAAR">
                Aadhaar
              </option>

              <option value="PASSPORT">
                Passport
              </option>

              <option value="DRIVING_LICENSE">
                Driving License
              </option>

              <option value="CERTIFICATE">
                Certificate
              </option>

              <option value="RESUME">
                Resume
              </option>

              <option value="OTHER">
                Other
              </option>

            </select>

          </label>

          <label>
            Select file

            <input
              id="vault-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(event) =>
                setFile(
                  event.target.files[0]
                )
              }
              required
            />
          </label>

          <small>
            PDF, JPG or PNG · Maximum 10 MB
          </small>

          <button
            className="button primary"
            disabled={loading}
          >
            {loading
              ? "Uploading..."
              : "Upload Document ↥"}
          </button>

        </form>


        {/* ========================= */}
        {/* DOCUMENTS */}
        {/* ========================= */}

        <section
          className="documents-card reveal delay-1"
        >

          <div className="documents-title">

            <span className="eyebrow">
              YOUR FILES
            </span>

            <h2>
              Documents{" "}
              <span>
                ({documents.length})
              </span>
            </h2>

          </div>


          {documents.length === 0 ? (

            <div className="empty-vault">

              <div
                style={{
                  fontSize: "35px",
                  marginBottom: "15px",
                }}
              >
                📂
              </div>

              <p>
                No documents uploaded yet.
              </p>

              <small>
                Upload your first document
                using the panel on the left.
              </small>

            </div>

          ) : (

            <div className="document-list">

              {documents.map((doc) => (

                <div
                  className="document-row"
                  key={doc._id}
                >

                  <div className="document-icon">
                    {doc.mimeType ===
                    "application/pdf"
                      ? "PDF"
                      : "IMG"}
                  </div>


                  <div className="document-info">

                    <strong>
                      {doc.name}
                    </strong>

                    <span>
                      {doc.category}
                      {" · "}
                      {Math.max(
                        1,
                        Math.round(
                          (doc.size || 0) /
                            1024
                        )
                      )}
                      KB
                    </span>

                  </div>


                  <button
                    onClick={() =>
                      downloadDocument(doc)
                    }
                    title="Download"
                  >
                    ↓
                  </button>


                  <button
                    className="danger"
                    onClick={() =>
                      deleteDocument(
                        doc._id
                      )
                    }
                    title="Delete"
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}