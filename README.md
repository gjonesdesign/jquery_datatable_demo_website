# Jquery-DataTable-Sample
A functional user data list made with Jquery and the DataTable library. Styled purely with Bootstrap. 

#Description
This site is made by initializing a table and using form submission to populate and edit rows of data. The single entry form has functionality 
for both adding new rows and editing existing ones. When clicking the add button, the form appears in add mode and will create a new row with the entered data after pressing save.
When clicking the edit button of a row, the form appears in edit mode and populates the fields with the current data. This data can be edited, and after pressing save the updated data will replace the old data. The delete button next to the edit button on each row will delete an entry.

On save, the field will be cleared. It will also be cleared if the user closes the modal without saving. All entries are cleaned of any forbidden characters that may be malicious.