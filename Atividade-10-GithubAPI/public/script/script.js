$(function(){
  getGithubUserData();
  getGithubRepos();
  setGlider();
  setFriends()
  setTimeout(function(){$(".loader").remove();}, 300);
})

function setFriends(){
  $.get("http://localhost:3000/friends", function(result){
    $(".friends-section").html("")
    result.forEach((eachItem)=>{
      const friendName = "<h1>"+ eachItem.name+"</h1>"
      const friendImage = "<img src='"+ eachItem.url_image+ "'>"
      $(".friends-section").append("<div class='card-friend'>"+ friendName + friendImage +"</div>");
    })
    startGlider();
  })
}

function setGlider(){
  $.get("http://localhost:3000/suggested_content", function(result){
    $(".glider").html("")
    result.forEach((eachItem)=>{
      const sliderName = "<h1>"+ eachItem.id+ " - " + eachItem.name+"</h1>"
      const sliderImage = "<img src='"+ eachItem.url_image+ "'>"
      $(".glider").append("<div class='slide'>"+ sliderImage + sliderName +"</div>");
    })
    startGlider();
  })
}

function getGithubUserData(){
  $.get("https://api.github.com/users/daniel10013", function(result){
    $(".photo img").attr("src", result.avatar_url);
    $(".name").html(result.name);
    $("#username").html(result.login);
    $(".github").attr("href", result.html_url);
  })
}

function getGithubRepos(){
  $.get("https://api.github.com/users/daniel10013/repos", function(result){
    $(".repos").html("");
    result.forEach(repository => {
        $(".repos").append("<a href='./repository.html?id="+ repository.id +"'>" +
                    "<h1>"+ repository.name +"</h1>"+
                "</a>");
    });
  })
}

function startGlider(){
  new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    dots: '#dots',
    draggable: true,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  });


  setTimeout(function(){
    var dots = document.querySelectorAll(".glider-dot");
    var activeDot = 1;
    setInterval(function(){
      if(activeDot == dots.length){
        activeDot = 0;
      }
      dots[activeDot].click();
      activeDot++;
    }, 4000);
  }, 200);
}