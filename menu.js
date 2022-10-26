$(function() {

	var sum = 0;
	// select 선택했을때
	$('select').change(function() {

		var tr = $('<tr/>');

		//2 메뉴 이름 저장
		var name = $(this).parent().find('span:eq(0)').attr('value');

		//3 주문 개수 저장
		var count = $(this).val();
		if (count == 0) {
			return;
		}
		//4 가격 저장 후 총합 계산
		var price = $(this).parent().find('span:eq(1)').attr('value');
		sum += count * price;
		$('#total').attr('value', sum);

		//각각의 메뉴명,값,가격 가져와서 변수에 저장
		var tdName = $('<td/>').text(name);

		/* 중복일 경우 */
		var flag = false;                                       //중복 여부 판단 변수 선언
		var lis = $('#listTable tr');                        //추가된 tr 저장한 변수
		for (var i = 0; i < lis.length; i++) {
			if (name == $(lis[i]).find('td:eq(0)').text()) {         //주문내역 table에 선택한 메뉴의 이름이 있을 경우
			
				var currentCount = Number($(lis[i]).find('td:eq(1)').text());         //해당하는 tr(lis[i])의 자식요소(td)중 2번째의 값 저장
				currentCount += Number(count);
				$(lis[i]).find('td:eq(1)').text(currentCount);   //개수 수정 후 출력

				var currentPrice = Number($(lis[i]).find('td:eq(2)').text());          //해당하는 tr(lis[i])의 자식요소(td)중 3번째의 값 저장
				currentPrice += Number(count) * Number(price);
				$(lis[i]).find('td:eq(2)').text(currentPrice);      // 가격 수정 후 출력

				flag = true;
			}//if-for
		}//for

		if (!flag) {                                             //중복이 아닐 경우
			var tdCount = $('<td/>').text(count);
			var tdPrice = $('<td/>').text(price * count);
			//취소버튼만들어서 변수에 저장
			var tdDel = $('<td><button class="del">취소</button></td>');

			//위에서 만든 tr에 메뉴명,값,가격 붙임

			tr.append([tdName, tdCount, tdPrice, tdDel])
			$('#listTable').append(tr);
		
}


	})



	/* 주문내역의 삭제 버튼을 누를 경우 */

	//listTable안의 btn을 선택
	$("#listTable").on("click", ".del", function() {
		//총액에서  tdPrice뺌
		sum -= $(this).parent().parent().find('td:eq(2)').text();
		$('#total').attr('value', sum);
		//this(btn)의 부모(td)의 부모(tr)를 삭제
		$(this).parent().parent().remove();
	});

	//주문하기 버튼 눌릴시 총액나오게하기
	$('#btn2').click(function() {
		alert('결제하실 금액은은 ' + sum + '원 입니다.')
		$('#listTable tr td').remove();
		$('#total').attr('value','0'); 
		sum=0;
	})
	
	//삭제버튼
	$('#btn').click(function(){
		$('#total').attr('value','0');
		sum=0;
		$('#listTable tr td').remove();
	})
	
})



