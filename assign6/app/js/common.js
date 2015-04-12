$(document).ready(function() {
	$(document).on('click', '#register', function() {
		$('.ui.modal').modal('show');
	});
	$('.checkbox').checkbox('checked');
	$('.ui.dropdown').dropdown();

	$(document).on('click', '#save', function() {
		$('#savemessage').slideToggle();
	});

	$(document).on('click', '#delete', function() {
		$('#deletemessage').slideToggle();
	});

	$(document).on('click', '#close', function() {
  		$('#savemessage').slideToggle();
	});

	$(document).on('click', '#closeDelete', function() {
  		$('#deletemessage').slideToggle();
	});
});

