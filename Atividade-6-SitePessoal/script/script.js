window.addEventListener('load', function(){
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
});