var user_table = $('#user-table').DataTable({
	columns: [{
			title: "ID"
		},
		{
			title: "First Name"
		},
		{
			title: "Last Name"
		},
		{
			title: "Email"
		},
		{
			title: "Phone"
		},
		{
			title: "Social Contacts",
			render: data => `${data}<button id="edit">Edit</button> <button id="delete">Delete</button>`
		}
	]
});


$("#entry-form").submit(function (event) {
	const form = new FormData(event.target);
	const data = Object.fromEntries(form.entries());
	const entry = Object.values(data);

	console.log(entry);
	user_table.row.add(entry).draw();
	event.target.reset();
	return false;
});

$("#user_table").on("click", "tbody tr #edit", function (event) {
	//get affected row entry
	const row = user_table.row($(event.target).closest('tr'));
	//get affected row().index() and append that to 'Submit' button attributes
	//you may use global variable for that purpose if you prefer
	$('#submit').attr('rowindex', row.index());
	//switch 'Submit' button role to 'confirmEdit'
	$('#submit').attr('action', 'confirmEdit');
	//set up 'Type' and 'Amount' values according to the selected entry
	$('#type').val(row.data()[0]);
	$('#id').val(row.data()[1]);
});

$("#user-table").on("click", "tbody tr #delete", function (event) {
	user_table.row($(event.target).closest('tr')).remove().draw();
});

//edit button creates form via element.create, values set to current values
//onclick, form submits data via update_form (modelled after entry form)
//user_table.draw();