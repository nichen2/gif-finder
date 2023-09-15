const apiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

async function getGIF() {
  const searchVal = $("#search").val();
  let response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: { q: searchVal, api_key: apiKey },
  });
  console.log(response.data);
  if (response.data.data.length > 0) {
    const gifURL = response.data.data[0].images.original.url;
    const imgElem = $("<img>").attr("src", gifURL);
    $("<li>").append(imgElem).appendTo("ul");
    saveGIFs();
  } else {
    console.log("No GIFs found for this search :(");
  }
}

function saveGIFs() {
  const gifURLs = [];
  $("ul img").each(function () {
    gifURLs.push($(this).attr("src"));
  });
  localStorage.setItem("gifs", JSON.stringify(gifURLs));
}

function loadGifsFromLocalStorage() {
  const savedGifs = JSON.parse(localStorage.getItem("gifs"));
  if (savedGifs && savedGifs.length > 0) {
    savedGifs.forEach((gifUrl) => {
      const imgElem = $("<img>").attr("src", gifUrl);
      $("<li>").append(imgElem).appendTo("ul");
    });
  }
}

// Call this function at the start of your script or when the DOM is ready
$(document).ready(function () {
  loadGifsFromLocalStorage();
});

$("#search-button").on("click", function (e) {
  e.preventDefault();
  getGIF();
  $("#search").val("");
});

$("#remove-button").on("click", function (e) {
  e.preventDefault();
  $("ul").empty();
  localStorage.removeItem("gifs");
});
