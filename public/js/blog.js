//  modal
let url;

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  // Running locally
  url = "http://localhost:3001/";
} else {
  // Running on a remote server
  url = window.location.origin + "/";
}

const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", async (event) => {
  console.log("click");
  try {
    const id = window.location.href.split("/").pop();
    const urlBlog = url + `api/blog/${id}`;
    const response = await fetch(urlBlog, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // The resource has been successfully deleted.
    window.location.href = url;
    // return { success: true };
  } catch (error) {
    console.error("Error:", error);
    // return { success: false, error: error.message };
  }
});
