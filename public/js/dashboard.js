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

// Add an event listener for the form submission
document
  .getElementById("newBlogFrom")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve the values of name and description from the form
    const title = document.getElementById("newBlogFromTitle").value;
    const content = document.getElementById("newBlogFromContent").value;

    // You can now use the 'name' and 'description' variables for further processing (e.g., sending to a server)
    createNewBlog(title, content);
  });

// createNewBlog
const createNewBlog = (title, content) => {
  const thisUrl = url + "api/blog/";

  // Create the request headers
  const headers = {
    "Content-Type": "application/json",
  };

  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toISOString();

  const reqData = {
    blog_name: title,
    blog_content: content,
    postDate: formattedDateTime,
    // user_id: 1, //change to the user ID after login is done
  };

  // Create the request options
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(reqData),
  };
  // Send the POST request
  fetch(thisUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((resData) => {
      // Handle the response data here if needed
      window.location.reload();
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
    });
};
