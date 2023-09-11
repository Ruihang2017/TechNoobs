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
const saveButton = document.getElementById("saveButton");
const blogContentTextarea = document.getElementById("blogContentTextarea");

// deleteButton event listener
deleteButton.addEventListener("click", async (event) => {
  console.log("deleteButton click");
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

// saveButton event listener
saveButton.addEventListener("click", async (event) => {
  console.log("saveButton click");
  try {
    const id = window.location.href.split("/").pop();
    const urlBlog = url + `api/blog/${id}`;

    // Create the request headers
    const headers = {
      "Content-Type": "application/json",
    };

    if (!blogContentTextarea) {
      console.error("blogContentTextarea is null");
    }

    const reqData = {
      blog_content: blogContentTextarea.value,
    };
    console.log(urlBlog);

    // // Create the request options
    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(reqData),
    };

    // // Send the POST request
    fetch(urlBlog, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
});
