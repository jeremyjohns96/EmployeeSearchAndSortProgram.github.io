/**********************************************
Developed by: James Estrada 

Search and display students through pagination.
***********************************************/

// Creating and inserting a search bar into the page header.
const header = document.querySelector('div.page-header');
const searchBar = document.createElement('div');
searchBar.className = 'student-search';
const input = document.createElement('input');
input.placeholder = 'Search for students...';
searchBar.appendChild(input);
const button = document.createElement('button');
button.textContent = 'Search';
searchBar.appendChild(button);
header.appendChild(searchBar);

// Create a message element to display in the page if no students were found with the given search input.
const pageDiv = document.querySelector('div.page');
const ul = document.querySelector('ul.student-list');
const notFoundDiv = document.createElement('div');
notFoundDiv.className = 'not-found';
const img = document.createElement('img');
img.src = 'images/nothing-found.jpg';
img.alt = 'Nothing found';
notFoundDiv.appendChild(img);
const message = document.createElement('h2');
message.textContent = 'No results have been found';
notFoundDiv.appendChild(message);
const alternative = document.createElement('p');
alternative.textContent = "Try adjusting your search to find the student you're looking for.";
notFoundDiv.appendChild(alternative);

/**
 * Search and filter in real time any student name that includes the search input value.
 * Display pagination links based on how many search results are returned, with ten students being the max per page.
 * Show a message if no results were found.
 * 
 * @param {HTMLElement} input - Input element that holds the the search input
 * @param {NodeList} students - The list of students.
 * @returns {undefined} Send to appendPageLinks an array holding all students that included the search input value to display max ten per page.
 */
const search = (input, students) => {
	let searchList = [];
	const paginationDiv = document.querySelector('div.pagination');
	if (input.value) {
		// Remove pagination div only if it exists and there's an input.
		if (paginationDiv) {
			pageDiv.removeChild(paginationDiv); 
		}
		for (const student of students){
			student.style.display = 'none';
			const studentName = student.firstElementChild.firstElementChild.nextElementSibling; // Get <h3> which holds the student's name.
			if (studentName.textContent.toLowerCase().includes(input.value.toLowerCase())) {
				student.style.display = '';
				searchList.push(student);
			}
		}
		if (searchList.length !== 0) {
			// Check if notFoundDiv is descendant of pageDiv and delete it if true.
			if (pageDiv.contains(notFoundDiv)) { 
				pageDiv.removeChild(notFoundDiv);
			}
			appendPageLinks(searchList);
		} else {
			pageDiv.insertBefore(notFoundDiv, ul);
		}
 	} else {
		// Check if notFoundDiv is descendant of pageDiv and delete it if true.
		if (pageDiv.contains(notFoundDiv)) { 
			pageDiv.removeChild(notFoundDiv);
		}
		if (paginationDiv) {
			pageDiv.removeChild(paginationDiv); // Remove pagination div.
		}
		showPage(students, 1);
		appendPageLinks(students);
	}
}

// Event listeners to search in real time through the search bar's input field or button.
input.addEventListener('keyup', () => {
	search(input, studentList);
});
button.addEventListener('click', () => {
	search(input, studentList);
});