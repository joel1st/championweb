// jquery
(function($){
  var $fixedHeader = $("#header-fixed");
  var $table = $("#table-1");
  var $fixedHeaderTd = $("#header-fixed td");
  var $originalHeaderTd = $("#original-header td");

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
          //Fixes discrepancy between fixedHeader and tables width upon filtering or changing sort role. 
          if($fixedHeader.width() != $table.width()){
            $fixedHeader.width($table.width());
              for(var t=0;t<$fixedHeaderTd.length;t++){
                $fixedHeaderTd.eq(t).width($originalHeaderTd.eq(t).width());
              }
          }
          $fixedHeader.show();
        }
      }
      else if (offset < tableOffset) {
          $fixedHeader.hide();
      }
  });
})(jQuery);
