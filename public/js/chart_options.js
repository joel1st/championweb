var radarChartSettings = {
    responsive: true,
    //Boolean - If we show the scale above the chart data     
    scaleOverlay: false,

    tooltipFillColor: "rgba(0,0,0,0)",
    showTooltips: true,
    multiTooltipTemplate: "<%= value %>",
    customTooltips: function(tooltip) {
        var id, row;
        if (tooltip && tooltip.title) {
            if (!this.chart.highlighted) {
                this.chart.highlighted = [];
            } else {
                this.chart.highlighted.forEach(function(e) {
                    e.className = e.className.replace(' highlighted', '');
                });
            }
            id = 'statistics-' + tooltip.title.replace(' ', '-').toLowerCase() + '-row';
            row = document.getElementById(id);
            row.className += ' highlighted';

            if (this.chart.highlighted.indexOf(row) === -1) this.chart.highlighted.push(row);
        }
    },

    //Boolean - Whether to show lines for each scale point
    scaleShowLine: true,

    //String - Colour of the scale line 
    scaleLineColor: "#333",

    //Number - Pixel width of the scale line  
    scaleLineWidth: 1,

    //Boolean - Whether to show labels on the scale 
    scaleShowLabels: false,

    //Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    //String - Scale label font declaration for the scale label
    scaleFontFamily: "'Arial'",

    //Number - Scale label font size in pixels  
    scaleFontSize: 12,

    //String - Scale label font weight style  
    scaleFontStyle: "normal",

    //String - Scale label font colour  
    scaleFontColor: "#E0E0E0",

    //Boolean - Show a backdrop to the scale label
    scaleShowLabelBackdrop: true,

    //String - The colour of the label backdrop 
    scaleBackdropColor: "rgba(255,255,255,0.75)",

    //Number - The backdrop padding above & below the label in pixels
    scaleBackdropPaddingY: 2,

    //Number - The backdrop padding to the side of the label in pixels  
    scaleBackdropPaddingX: 2,

    //Boolean - Whether we show the angle lines out of the radar
    angleShowLineOut: true,

    //String - Colour of the angle line
    angleLineColor: "rgba(255,255,255,0.3)",

    //Number - Pixel width of the angle line
    angleLineWidth: 1,

    //String - Point label font declaration
    pointLabelFontFamily: "'Arial'",

    //String - Point label font weight
    pointLabelFontStyle: "normal",

    //Number - Point label font size in pixels  
    pointLabelFontSize: 12,

    //String - Point label font colour  
    pointLabelFontColor: "#E0E0E0",

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 3,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 1,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: true,

    //Boolean - Whether to animate the chart
    animation: false,

    //Number - Number of animation steps
    animationSteps: 60,

    //String - Animation easing effect
    animationEasing: "easeOutQuart",
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].pointColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
};

var lineChartSettings = {
    animation: false,
    responsive: true,
    //Boolean - If we show the scale above the chart data     
    scaleOverlay: false,

    //Boolean - Whether to show lines for each scale point
    scaleShowLine: true,

    //String - Colour of the scale line 
    scaleLineColor: "#333",

    //Number - Pixel width of the scale line  
    scaleLineWidth: 1,

    //Boolean - Whether to show labels on the scale 
    //scaleShowLabels : false,

    //Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    //String - Scale label font declaration for the scale label
    scaleFontFamily: "'Arial'",

    //Number - Scale label font size in pixels  
    scaleFontSize: 12,

    //String - Scale label font weight style  
    scaleFontStyle: "normal",
    //String - Scale label font colour  
    scaleFontColor: "rgb(179, 179, 179)",
    legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].pointColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'

};

var pieChartSettings =  {

      // Sets the chart to be responsive
      responsive: true,

      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : true,

      //String - The colour of each segment stroke
      segmentStrokeColor : 'rgb(30, 35, 37)',

      //Number - The width of each segment stroke
      segmentStrokeWidth : 3,

      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout : 0, // This is 0 for Pie charts

      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : false,

      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : false,

      tooltipTemplate: "<%if (label){%><%=label%> Games: <%}%><%= value %>%",
      //String - A legend template
      legendTemplate : '<ul class="pie-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

    };
