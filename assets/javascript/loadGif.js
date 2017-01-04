	// <script type="text/javascript">
	
		var animalArray = ["lion", "tiger", "monkey", "cat", "dog", "squirrel", "rat", "giraffe", "snake"];

		for (var i = 0; i < animalArray.length; i ++ ) {
			var newButton = $("<button>"); // create new button
			newButton.addClass("animalButton");
			newButton.attr("data-name", animalArray[i]);  // name of the button
			newButton.text(animalArray[i]);  // text to be displayed on the button
			$("#buttonHolder").append(newButton);
		}

		// This function handles events where one button is clicked
		$(document).on("click", "button", function(event) {
			event.preventDefault();
			// console.log("one button clicked");
			var clickedButton = $(this).data("name");  // grab data-name of clicked button
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clickedButton + "&api_key=dc6zaTOxFJmzC&limit=10";

			$.ajax({
				url: queryURL,
				method: "GET"
			})
			.done(function(response) {
				results = response.data;
				$("#gifImages").empty();   // clear out the existing images
				for (var i = 0; i < results.length; i ++) {
					var gifImageDiv = $("<div class=gifImageClass>");  // div to hold the GIF images
					// console.log(results);
					var rating = results[i].rating;   // capture the rating of the GIF
					var p = $("<p>").text("Rating: " + rating);  // create a P tag with text about rating
					var gifImage = $("<img class='imageObjectClass'>").attr("src", results[i].images.fixed_height.url);   // set the src attribute of img tag
					$(gifImage).attr("data-state", "animate");
					$(gifImage).attr("data-index", i); // keep track of the image location
					gifImageDiv.prepend(p);  // put the rating text into the div
					gifImageDiv.prepend(gifImage);  // put the image into the div, ahead of the rating text
					$("#gifImages").append(gifImageDiv);
				}
			})
		});

		// the following code handles the event when a GIF image is clicked
		$(document).on("click", ".imageObjectClass", function(event) {
			event.preventDefault();
			var imageState = $(this).attr("data-state");  // grab data-state of clicked image
			// console.log("data-state = " + imageState);
			var dataIndex = $(this).attr("data-index");
			// console.log("data-index = " + dataIndex);
			if (imageState === "animate") {
				$(this).attr("src", results[dataIndex].images.fixed_height_still.url);
				$(this).attr("data-state", "still");
			} else {  // if image state === still, change it to animate
				$(this).attr("src", results[dataIndex].images.fixed_height.url);
				$(this).attr("data-state", "animate");
			}
		});

		// This code captures information entered in text box and creates a new button
		$(document).on("click", "#animalToInputButton", function(event) {
			event.preventDefault();
			var animalName = document.getElementById('animalToInput').value;
			console.log("Entered animal Name = " + animalName);
			animalArray.push(animalName);  // add the name of the animal to the array
			console.log("new array = " + animalArray);
			$("#buttonHolder").empty();   // clear out the existing buttons
			// renderButtons();
			for (var i = 0; i < animalArray.length; i ++ ) {
				var newButton = $("<button>"); // create new button
				newButton.addClass("animalButton");
				newButton.attr("data-name", animalArray[i]);  // name of the button
				newButton.text(animalArray[i]);  // text to be displayed on the button
				$("#buttonHolder").append(newButton);
			}
		});

	// </script>