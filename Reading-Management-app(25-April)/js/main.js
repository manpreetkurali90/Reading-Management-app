// console.log('main.js is loaded!');

// const newbookshowcase = document.getElementById('newbookshowcase');
// console.log('shownewbook element:', newbookshowcase.innerText);

// setTimeout(() => {
//     console.log("Delayed check:", document.getElementById("newbookshowcase"));
// }, 1000);


// document.addEventListener('DOMContentLoaded', () => {
//     // Get references to buttons
//     const addBook = document.getElementById("add-new-book");
//     const viewAllBook = document.getElementById("view-all-book");
//     const readingProgress = document.getElementById("reading-record");
//     // const newbookshowcase = document.getElementById('newbookshowcase');
//     // const mybox = document.getElementById('mybox');

//     // Get reference to the submit button
//     const submitBtn = document.getElementById("submit-btn");

//     // Get references to input fields
//     const Title = document.getElementById("Title");
//     const Author = document.getElementById("Author");
//     const Genre = document.getElementById("Genre");
//     const Publicationdate = document.getElementById("Publicationdate");
//     const Pagecount = document.getElementById("Pagecount");

//     console.log("Connected");


//     function newBookShowCase(bookDetails) {
//         let newbookshowcase = document.getElementById('newbookshowcase'); // Select it inside the function
//         if (newbookshowcase) {
//             let newbooktitle = document.createElement('li');
//             newbooktitle.innerText = bookDetails.Title;
//             newbookshowcase.appendChild(newbooktitle);
//         } else {
//             console.log('Element missing');
//         }
//     }
    

//     // Add click event listener to the submit button
//     submitBtn.addEventListener("click", (event) => {
//         // Prevent the form from submitting (if it's inside a form)
//         event.preventDefault();

//         // Define the input IDs
//         const inputIDs = ["Title", "Author", "Genre", "Publicationdate", "Pagecount"];
//         const inputvalues = {}; // Define the object to store input values

//         // Loop through the input IDs and get their values
//         for (const ID of inputIDs) {
//             const input = document.getElementById(ID);
//             if (!input) {
//                 console.error(`Element with ID "${ID}" not found!`);
//                 return;
//             }
//             inputvalues[ID] = input.value.trim(); // Store the trimmed value
//         }

//         // Log the input values
//         console.log(inputvalues);

//         // Show new book details
//         newBookShowCase(inputvalues);
//     });
// });

