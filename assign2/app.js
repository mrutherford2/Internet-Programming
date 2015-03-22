function submit() {
	
	var firstName = byID('firstname');
	var lastName = byID('lastname');

		if(document.getElementById('gendermale').checked = true)
		{
			genderSelection = 'male';
		}
		if(document.getElementById('genderfemale').checked = true)
		{
			genderSelection = 'female';
		}
		
	var address = byID('streetaddress');
	var city = byID('city');
	var state = byID('state');
	var zip = byID('zip');
	var educationlevel = document.getElementById('educationlevel');
	var educationselection = educationlevel.options[educationlevel.selectedIndex].value;
	var typeofemployment = document.getElementById('typeofemployment');
	var typeofemploymentselection = typeofemployment.options[typeofemployment.selectedIndex].value;
	var daysavailable = document.querySelectorAll('.checkbox'); 
	var dateavailable = byID('dateavailable'); 

	validatedata(firstName, lastName, address, city, state, zip, educationselection, typeofemploymentselection, dateavailable);
}


function reset() {

	var inputFields = document.getElementsByTagName('input');
	for(i = 0; i < inputFields.length; i++) {
		inputFields[i].value = "";
		inputFields[i].checked = false; 
	}
	
	var dropDownFields = document.getElementsByTagName('select');
	for(i = 0; i < dropDownFields.length; i++) {
		dropDownFields[i].selectedIndex = 0; 
	}
	
	var textAreaField = document.getElementById('certifications');
	textAreaField.value = "";
	
}

function byID(id) {
return document.getElementById(id).value; 
}

function validatedata(firstName, lastName, address, city, state, zip, educationselection, typeofemploymentselection, dateavailable) {
var errorMessage = ""; 
if(firstName == "")
{
	errorMessage = "Enter a First Name\n"; 
}

if(lastName == "")
{
	errorMessage += "Enter a Last Name\n"; 
}

if(address == "")
{
	errorMessage += "Enter an Address\n";
}

if(city == "")
{
	errorMessage += "Enter a City\n";
}

if(state == "")
{
	errorMessage += "Enter a State\n";
}

if(zip == "")
{
	errorMessage += "Enter a Zip Code\n";
}

if(educationselection == "default")
{
	errorMessage += "Select an Education Level\n";
}

if(typeofemploymentselection == "default")
{
	errorMessage += "Select a type of Employment\n";
}

var daysAvailable = document.querySelectorAll('.checkbox'); 
var daysChecked = 0; 
for(i = 0; i < daysAvailable.length; ++i)
{
	if(daysAvailable[i].checked)
	{
	daysChecked++; 
	}
}

if(daysChecked < 1)
{
	errorMessage += "Select at least one day to work\n"; 
}

if(dateavailable == "")
{
	errorMessage += "Enter date of availability\n"; 
}

if(errorMessage != "")
{
	alert(errorMessage);
}
if(errorMessage == "")
{
	alert('Thank you your application has been submitted!'); 	
}

}
