$('.buy').on('click', function() {
		$('dialog')[0].showModal();
});
$('.close-popup').on('click', function(e) {
		e.preventDefault();
		$('dialog')[0].close();
});
