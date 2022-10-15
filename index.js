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
