// Initializes the empty table. Populates the column headers.
var user_table = $('#user-table').DataTable({
	pagingType: "simple",
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
			// Add edit and delete buttons in their own column to the end of each entry.
			render: data => "<div class='btn-group'><button class='btn btn-secondary btn-sm' id='edit' data-bs-toggle='modal' data-bs-target='#form-modal'>Edit</button> <button class='btn btn-danger btn-sm' id='delete'>Delete</button></div>"
		}
	]
});

// Function to change the functionality of the save/submit button. 
// Can either save to new item or to current item when making an edit. 
// Accepts a param edit_index for edit mode.
function save_mode(edit_index) {
	// Clear the current form submit handler to avoid multiple modes being preformed at once.
	$("#entry-form").off("submit")
	// Check to see if we are editing by checking for the edit_index param.
	if (edit_index) {
		// Change form submit handler to save the edit.
		$("#entry-form").submit(function (event) {
			// Get form data from form.
			var form = new FormData(event.target);
			// Convert form data into an object.
			var data = Object.fromEntries(form.entries());
			// Extract object values and place them into an array. 
			var entry = Object.values(data);
			// Remove any forbidden characters that may be malicious.
			for (i = 0; i < entry.length; i++) {
				entry[i] = entry[i].replace(/[^a-z0-9,@.-\s]/gi, "")
			}
			// Replace the data of the edit_index row element and redraw the table.
			user_table.row(edit_index).data(entry).draw();
			// Clear the form. Close the modal.
			event.target.reset();
			$("#form-modal").modal("hide");
			return false;
		});
	} else {
		// Change form submit handler to add a new row. Same as lines 39 - 55 except instead of replacing data we add and populate a new row.
		$("#entry-form").submit(function (event) {
			var form = new FormData(event.target);
			var data = Object.fromEntries(form.entries());
			var entry = Object.values(data);
			for (i = 0; i < entry.length; i++) {
				entry[i] = entry[i].replace(/[^a-z0-9,@.-\s]/gi, "")
			}
			user_table.row.add(entry).draw();
			event.target.reset();
			$("#form-modal").modal("hide");
			return false;
		});
	}
}

// Sets the add button click event to call the save_mode function and toggle the save button functionality.
// Passes null into save_mode, indicating that we are not editing.
$("#add").on("click", function (event) {
	save_mode(null);
});

// Sets the edit button click event to populate the entry form with the data of the targeted row. 
// Calls the save_mode function and passes it the row element that we are editing to indicate we are editing.
$("#user-table").on("click", "tbody tr #edit", function (event) {
	// Get the row element we want to edit. (We store this in a variable named index as it is being used to select what we want
	// to edit in a similar fashion to an index, but it is in fact NOT an traditional index but an actual DOM element.)
	var index = $(event.target).closest('tr');
	// Use the index to get the row data from the table data.
	var item = user_table.row(index).data();
	// Create an array of keys to combine with the table data into an object.
	var keys = ["id", "fname", "lname", "email", "phone", "contacts"];
	var object = {};
	// Loop through the key array, adding the key to the newly created 
	// object and assigning each entry of the table data to the corresponding key.
	for (i = 0; i < keys.length; i++) {
		object[keys[i]] = item[i];
	}
	// Loop through the object and populate each field of the entry form with the value of the corresponding key.
	for (key in object) {
		if (object.hasOwnProperty(key))
			$('input[name=' + key + ']').val(object[key]);
	}
	// Calls save_mode function to toggle the save button functionality. Passes in our index (DOM element)
	// to indicate that we are editing. The passed index allows us to select the correct row element to update. 
	save_mode(index);
});

// Sets the delete button click event to remove the targeted row element from the table.
$("#user-table").on("click", "tbody tr #delete", function (event) {
	user_table.row($(event.target).closest('tr')).remove().draw();
});

// When the entry form modal is hidden, clears the form.
$('#form-modal').on('hidden.bs.modal', function (event) {
	$(this).find('form')[0].reset();
});