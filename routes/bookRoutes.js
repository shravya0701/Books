// Import required modules
const express = require("express"); // Import Express for handling routes
const router = express.Router(); // Create a router instance for modular routing
const { getBooks } = require("../helpers/bookHelper"); // Import the helper function to fetch book data

// Route: Home Page - View Books
router.get("/", (req, res) => {
    // Render the landing page with dynamic data
    res.render("landing", {
        title: "Welcome", // Page title
        authorName: "Ravinder Singh", // Displayed author's name
        yourName: "Shravya Mandala", // Displayed user's name
    });
});

// Route: View Books
router.get("/view-books", (req, res) => {
    const books = getBooks(); // Retrieve the list of books from the helper function
    // Render the books page with the list of books and additional data
    res.render("books", {
        title: "View Books", // Page title
        authorName: "Ravinder Singh",
        yourName: "Shravya Mandala",
        books, // Pass the books data to the template
    });
});

// Route: Order Page (Display form)
router.get("/order", (req, res) => {
    const books = getBooks(); // Retrieve the list of books
    // Render the order form page with default data
    res.render("order", {
        title: "Order a Book", // Page title
        authorName: "Ravinder Singh",
        yourName: "Shravya Mandala",
        books, // Pass the books data to populate the dropdown
        errors: {}, // Initialize with no errors
        quantity: "", // Initialize quantity as empty
    });
});

// Route: Handle Book Order Submission
router.post("/order", (req, res) => {
    const { book, quantity } = req.body; // Extract form data from the request body
    const books = getBooks(); // Retrieve the list of books
    const errors = {}; // Object to hold validation errors

    // Validation for book selection
    if (!book) errors.book = "Please select a book.";
    // Validation for quantity input
    if (!quantity || isNaN(quantity) || quantity < 1) {
        errors.quantity = "Please enter a valid number of copies (at least 1).";
    }

    // If validation errors exist, re-render the order form with errors
    if (Object.keys(errors).length > 0) {
        return res.render("order", {
            title: "Order a Book", // Page title
            authorName: "Ravinder Singh",
            yourName: "Shravya Mandala",
            books, // Repopulate books list
            errors, // Pass validation errors
            quantity, // Keep entered quantity
        });
    }

    // Find the selected book details based on its ISBN
    const selectedBook = books.find((b) => b.isbn === book);
    // Calculate the total price with a 1.75% tax
    const totalPrice = (selectedBook.price * quantity * 1.0175).toFixed(2);

    // Render the receipt page with the order details
    res.render("receipt", {
        title: "Order Receipt", // Page title
        authorName: "Ravinder Singh",
        yourName: "Shravya Mandala",
        ...selectedBook, // Spread the selected book's details
        quantity, // Include the quantity ordered
        total: totalPrice, // Include the total price
    });
});

// Export the router to be used in the main app
module.exports = router;
