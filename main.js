window.onload = (event) => {


    $(".btn").on("click", function () {
        $(".ham-menu-wrapper").toggleClass("show")
        $(".hamburger-menu").toggleClass("open-menu");
    });

    $(".close").on("click", function () {
        $(".ham-menu-wrapper").toggleClass("show")
        $(".hamburger-menu").toggleClass("open-menu");
    });




    // TABS
    $('#tabs-nav li:first-child').addClass('active');
    $('.tab-content').hide();
    $('.tab-content:first-child').show();

    // Click function
    $('#tabs-nav li').click(function () {
        $(this).parent().children("li").removeClass('active');
        $(this).addClass('active');
        // console.log($(this).parent().parent().children('#tabs-content').children('.tab-content').hide())
        $(this).parent().parent().children('#tabs-content').children('.tab-content').hide()

        var activeTab = $(this).find('a').attr('href');
        $(this).parent().parent().children('#tabs-content').children(activeTab).fadeIn(800)
        return false;
    });


    // DATA PROCESSING
    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .attr("fill", "#f3e1c0")
        .text("Kazakhstan Presidential Election Participation")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("../resources/data.csv").then(function (data, error) {
        if (error) {
            throw error;
        }

        xScale.domain(data.map(function (d) {
            return d.year;
        }));
        yScale.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", height - 250)
            .attr("x", width - 100)
            .attr("text-anchor", "end")
            .attr("fill", "#f3e1c0")
            .text("Year of election");

        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function (d) {
                    return "$" + d;
                })
                .ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("fill", "#f3e1c0")
            .text("Percentage of Population");

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return xScale(d.year);
            })
            .attr("y", function (d) {
                return yScale(d.value);
            })
            .attr("fill", "#f3e1c0")
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return height - yScale(d.value);
            });
    });

};