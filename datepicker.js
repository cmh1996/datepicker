;(function(){
    var datepicker = {};

    //获取指定月份的日期数据
    datepicker.getMonthData = function(year,month){ 
        var ret = [];//存放每一天的数据

        //如果没有传入年月，则默认输出为当天的数据
        if(!year || !month){
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }

        var firstDay = new Date(year,month-1,1);//本月第一天
        var firstDayWeekDay = firstDay.getDay();//本月第一天是星期几
        if(firstDayWeekDay === 0) firstDayWeekDay = 7;//如果是星期日就设置为7

        year = firstDay.getFullYear();
        month = firstDay.getMonth()+1;

        var lastDayOfLastMonth = new Date(year,month-1,0);//上个月的最后一天
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();//上个月的最后一天的日期

        var lastMonthDayCount = firstDayWeekDay-1;//本月显示了多少天上个月的

        var lastDay = new Date(year,month,0);//本月最后一天
        var lastDate = lastDay.getDate();//本月最后一天的日期

        for(var i=0;i<6*7;i++){
            var date = i+1-lastMonthDayCount;//<=0则为上个月的数据，>lastDate则为下个月的数据，在这之间的就是本月的数据
            var showDate = date;//实际显示日期
            var thisMonth = month;//实际月份

            if(date<=0){
                //上个月的
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            }else if(date>lastDate){
                //下个月的
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }

            if(thisMonth === 0) thisMonth=12;
            if(thisMonth === 13) thisMonth=1;

            ret.push({
                month:thisMonth,
                date:date,
                showDate:showDate,
            })
        }
        return {
            year:year,
            month:month,
            days:ret
        };
    }

    window.datepicker = datepicker;
})();