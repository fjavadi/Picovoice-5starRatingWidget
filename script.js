function start(func) {
  if(document.readyState != 'loading') {
    func();
  } else {
    document.addEventListener('DOMContentLoaded', func);
  }
}

var rating = 0;

start(function(){

  stars = document.getElementsByClassName("star");
  myCanvas = document.getElementById("myCanvas").getContext("2d");
  myCanvas.font = "20px Arial"
  myCanvas.fillStyle = "#26517a";

  for (var i = 0; i < 5; i++){

    stars[i].addEventListener("click", function(event){
      //get Url of the product corresponding with the rating
      productUrl = event.target.parentElement.getAttribute('url');
      //get product id from productUrl
      productId = productUrl.substring(productUrl.lastIndexOf('/') + 1)
      rating = parseInt(event.target.getAttribute('id')) + 1;

      //submit data to REST server
      $.ajax({
        type: "POST",
        url: productUrl,
        data: ({ "pid" : productId, "productRating" : rating })
      });

      for (j = 0; j < 5; j++){
        stars[j].classList.remove("hover");
        if(j < rating){
          stars[j].classList.add("selected");
        }
      }
      event.preventDefault();

      // print the rating value
      myCanvas.clearRect(0, 0, 200, 30);
      myCanvas.fillText("Your rating: " + rating, 0, 20);

    });

    stars[i].addEventListener("mouseover", function(event){
      for (var j = 0; j < 5; j++){
        stars[j].classList.remove("selected");

        if (j <= parseInt(event.target.getAttribute('id'))){
          stars[j].classList.add("hover");
        }
      }
    });

    stars[i].addEventListener("mouseout", function(){
      for (var j = 0; j < 5; j++){
        stars[j].classList.remove("hover");
      }
      if (rating != 0){
        for (var j = 0; j < rating; j++){
          stars[j].classList.add("selected");
        }
      }
    });
  }
});
