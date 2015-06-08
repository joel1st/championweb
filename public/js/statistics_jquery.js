// jquery
(function($){
  var $fixedHeader = $("#header-fixed");
  var $table = $("#table-1");
  var $fixedHeaderTd = $("#header-fixed td");
  var $originalHeaderTd = $("#original-header td");
  // setInterval(function(){
  //   $fixedHeader = $("#header-fixed");
  //   console.log("Hi", $fixedHeader);
  //   $table = $("#table-1");
  //   $fixedHeaderTd = $("#header-fixed td");
  //   $originalHeaderTd = $("#original-header td");
  // }, 100);
  

  function fixWidths(){
     clearTimeout(timeOut);
     var timeOut = setTimeout(function(){
        $fixedHeader.width($table.width());
       for(var t=0;t<$fixedHeaderTd.length;t++){
        $fixedHeaderTd.eq(t).width($originalHeaderTd.eq(t).width());
       }
    },200);
  }

  fixWidths();

  $(window).resize(fixWidths);

  $fixedHeaderTd.add($originalHeaderTd).on('click', fixWidths);

  $(window).bind("scroll", function() {
      var $this = $(this);
      var leftOffset = $this.scrollLeft();
      var offset = $this.scrollTop();
      var tableOffset = $table.offset().top;

      if (offset >= tableOffset) {
          
        $fixedHeader.css('margin-left','-'+leftOffset+'px');
          
        if($fixedHeader.is(":hidden")){
          $fixedHeader.show();
        }
      }
      else if (offset < tableOffset) {
          $fixedHeader.hide();
      }
  });
})(jQuery);