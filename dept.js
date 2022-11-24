function updateDept(){
    $('.update-popup').css('display', 'block');
}

//전체사원 조회하는 함수
function getDept(pageNum){
    $.ajax({
        url: 'http://localhost:8080/api/v1/dept?page='+pageNum,
        type : 'GET',
        dataType : 'json',
        success : function(response){
            $('#empData').empty();
            $('.pagination').empty();
            console.log(response);
            var html = '';
            for(var i=0; i<response.list.length; i++){
                //사원 목록에 사원 데이터 *바인딩 (== 사원 목록 HTML에 데이터 보여주기)
                //tbody태그 id : empData에 바인딩 하기!
                html += '<tr onclick="getEmpByEmpno('+response.list[i].empno+')"><td>'+response.list[i].empno+'</td><td>'+response.list[i].ename+'</td><td>'+response.list[i].job+'</td><td>'+response.list[i].sal+'</td><td>'+response.list[i].hiredate+'</td><td>'+response.list[i].dname+'</td></tr>';
            }
            $('#empData').append(html);//table 바인딩 작업!

            var paginationHtml = '';
            if(response.hasPreviousPage){ //이전 버튼 여부 확인
                paginationHtml += '<a onclick="getDept('+(pageNum-1)+')">Previous</a>';
            }
            for(var i=0; i< response.navigatepageNums.length; i++){ //총 보여줄 페이지
                var page = response.navigatepageNums[i];
                paginationHtml += '<a onclick="getDept('+page+')">'+page+'</a>'
            }
            if(response.hasNextPage){ //다음 버튼 여부 확인
                paginationHtml += '<a onclick="getDept('+(pageNum+1)+')">Next</a>';
            }
            $('.pagination').append(paginationHtml); //페이징 바인딩 작업!
        }
    });
}