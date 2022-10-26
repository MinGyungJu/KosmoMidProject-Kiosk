$(function(){
	
	var sum =0;
   $('select').change(function(){
   
   var tr = $('<tr/>');

   //2 메뉴 이름 저장
   var name = $(this).parent().find('span:eq(0)').attr('value');
   //3 주문 개수 저장
   var count = $(this).val();
   
   // 카운트 0인거 리스트에 안올리는거 
		if (count == 0) {
			return;
		}
		
   //4 가격 저장 후 총합 계산
   var price = $(this).parent().find('span:eq(1)').attr('value');
      sum+=count*price;
   $('#total').attr('value',sum); 
   
   var tdName =$('<td/>').text(name);
   var tdCount =$('<td/>').text(count);
   var tdPrice =$('<td/>').text(price*count);
   var tdDel =$('<td><button class="del">삭제</button></td>');   
   tr.append(tdName,tdCount,tdPrice,tdDel)
   $('#listTable').append(tr)
   
  
	})
	
	$("#listTable").on("click", ".del", function() { 
		//총액에서  tdPrice뺌
		sum -= $(this).parent().parent().find('td:eq(2)').text();
		$('#total').attr('value', sum);
		 //this(btn)의 부모(td)의 부모(tr)를 삭제
		$(this).parent().parent().remove();      
	});

	//주문하기 버튼 눌릴시 총액나오게하기
	$('#btn').click(function() {
		alert('결제하실 금액은은 ' +sum+'원 입니다.')
	})
	
})

