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
		}, {
			searchable: false,
			orderable: false,
			render: data => "<button class='btn btn-secondary btn-sm' id='edit' data-bs-toggle='modal' data-bs-target='#form-modal'>Edit</button> <button class='btn btn-danger btn-sm' id='delete'>Delete</button>"
		}
	]
});

function save_mode(edit_index) {
	$("#entry-form").off("submit")
	if (edit_index) {
		$("#entry-form").submit(function (event) {
			var form = new FormData(event.target);
			var data = Object.fromEntries(form.entries());
			var entry = Object.values(data);
			for (i = 0; i < entry.length; i++) {
				entry[i] = entry[i].replace(/[^a-z0-9,@.-\s]/gi, "")
				console.log(entry[i]);
			}
			user_table.row(edit_index).data(entry).draw();
			event.target.reset();
			$("#form-modal").modal("hide");
			return false;
		});
	} else {
		$("#entry-form").submit(function (event) {
			var form = new FormData(event.target);
			var data = Object.fromEntries(form.entries());
			var entry = Object.values(data);
			for (i = 0; i < entry.length; i++) {
				entry[i] = entry[i].replace(/[^a-z0-9,@.-\s]/gi, "")
				console.log(entry[i]);
			}
			user_table.row.add(entry).draw();
			event.target.reset();
			$("#form-modal").modal("hide");
			return false;
		});
	}
}

$("#add").on("click", function (event) {
	save_mode(null);
});

$("#user-table").on("click", "tbody tr #edit", function (event) {
	var index = $(event.target).closest('tr');
	var item = user_table.row(index).data();
	var keys = ["id", "fname", "lname", "email", "phone", "contacts"];
	var object = {};
	for (i = 0; i < keys.length; i++) {
		object[keys[i]] = item[i];
	}
	for (key in object) {
		if (object.hasOwnProperty(key))
			$('input[name=' + key + ']').val(object[key]);
	}
	save_mode(index);
});

$("#user-table").on("click", "tbody tr #delete", function (event) {
	user_table.row($(event.target).closest('tr')).remove().draw();
});

$('#form-modal').on('hidden.bs.modal', function (event) {
	$(this).find('form')[0].reset();
});