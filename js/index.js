$(window).scroll(function(){
    let t = $(window).scrollTop();
    if(t >= 300){
      $('.navbar').addClass('bg-black')
      $('.navbar').removeClass('bg-transparent')
      $('.navbar').css('tranisition','1s')
    }else{
        $('.navbar').addClass('bg-transparent')
        $('.navbar').removeClass('bg-black')  
    }
})

$(document).ready(function() {

  var counters = $(".count");
  var countersQuantity = counters.length;
  var counter = [];

  for (i = 0; i < countersQuantity; i++) {
    counter[i] = parseInt(counters[i].innerHTML);
  }

  var count = function(start, value, id) {
    var localStart = start;
    setInterval(function() {
      if (localStart < value) {
        localStart++;
        counters[id].innerHTML = localStart;
      }
    }, 40);
  }

  for (j = 0; j < countersQuantity; j++) {
    count(0, counter[j], j);
  }
});