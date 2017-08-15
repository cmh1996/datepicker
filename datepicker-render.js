(function (){
    var datepicker = window.datepicker;
    var monthData,$wrapper;

    datepicker.bulidUi = function(year,month){
        monthData = datepicker.getMonthData(year,month);

        var html = '<div class="datepicker-header">'+
            '<a href="#" class="datepicker-btn datepicker-prev-btn">&lt;</a>'+
            '<a href="#" class="datepicker-btn datepicker-next-btn">&gt;</a>'+
            '<span class="datepicker-curr-month">'+monthData.year+'-'+monthData.month+'</span>'+
        '</div>'+
        '<div class="datepicker-body">'+
            '<table>'+
                '<thead>'+
                    '<tr>'+
                        '<th>一</th>'+
                        '<th>二</th>'+
                        '<th>三</th>'+
                        '<th>四</th>'+
                        '<th>五</th>'+
                        '<th>六</th>'+
                        '<th>日</th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>';

            //渲染内容
            for(var i=0;i<monthData.days.length;i++){
                var date = monthData.days[i];
                if(i%7 === 0){
                    html+='<tr>';
                }
                html+='<td data-date="'+date.date+'">'+date.showDate+'</td>';
                if(i%7 === 6){
                    html+='</tr>';
                }
            }

        html+='</tbody>'+
            '</table>'+
        '</div>';

        return html;
    }

    datepicker.render = function(direction){
       var year,month;
       if(monthData){
           year = monthData.year;
           month = monthData.month;
       }
       if(direction === 'prev'){
           month--;
           if(month===0){
               month = 12;
               year--;
           }
       }
       if(direction === 'next') month++;
        
        //填充内容
        var html = datepicker.bulidUi(year,month);
        $wrapper = document.querySelector('.datepicker-wrapper');
        if(!$wrapper){
            $wrapper = document.createElement('div');
            document.body.appendChild($wrapper);
            $wrapper.className = 'datepicker-wrapper';
        }
        $wrapper.innerHTML = html;
        
    }

    datepicker.init = function(input){
        datepicker.render();

        //点击输入框，弹出datepicker
        var $input = document.querySelector(input);
        var isOpen = false;
        $input.addEventListener('click',function(){
            if(isOpen){
                $wrapper.classList.remove('datepicker-wrapper-show');
                isOpen = false;
            }else{
                $wrapper.classList.add('datepicker-wrapper-show');
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.top = top+height+2+'px';
                $wrapper.style.left = left+'px';
                isOpen = true;
            }
        },false);

        //点击左右切换月份
        $wrapper.addEventListener('click',function(e){
            var $target = e.target;
            if(!$target.classList.contains('datepicker-btn')){
                return;
            }
            if($target.classList.contains('datepicker-prev-btn')){
                datepicker.render('prev');
            }else if($target.classList.contains('datepicker-next-btn')){
                datepicker.render('next');
            }
        },false);

        //点击日期，显示到输入框里
        $wrapper.addEventListener('click',function(e){
            var $target = e.target;
            if($target.tagName.toLowerCase() !== 'td') return;
            var date = new Date(monthData.year,monthData.month-1,$target.dataset.date);
            $input.value = format(date);
            
            $wrapper.classList.remove('datepicker-wrapper-show');
            isOpen = false;
        },false);
    }

    //格式化日期
    function format(date){
        ret = '';

        var padding = function(num){
            if(num<=9){
                return '0'+num;
            }
            return num;
        }

        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth()+1)+'-';
        ret += padding(date.getDate());

        return ret;
    }
})();