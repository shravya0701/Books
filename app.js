// Import required modules
const express = require("express"); // Import Express framework for building web applications
const exphbs = require("express-handlebars"); // Import Express-Handlebars for template rendering
const bodyParser = require("body-parser"); // Import Body-Parser to parse incoming request bodies
const path = require("path"); // Import Path module for handling file and directory paths

// Initialize the Express application
const app = express();

// Configure Handlebars as the template engine
app.engine("handlebars", exphbs.engine()); // Set up Handlebars with its default engine configuration
app.set("view engine", "handlebars"); // Specify Handlebars as the view engine
app.set("views", path.join(__dirname, "views")); // Set the directory for Handlebars views

// Serve static files from the "public" directory
app.use(express.static("public"));

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data sent via forms
app.use(express.static(path.join(__dirname, "public"))); // Serve static files (redundant as already added above)

// Import and use routes for handling book-related requests
const bookRoutes = require("./routes/bookRoutes"); // Import routes from the "bookRoutes" file
app.use("/", bookRoutes); // Mount the routes to the root path

// Error handling for unmatched routes
app.use((req, res) => {
    // Render a 404 page if no routes match
    res.status(404).render("404", { title: "Page Not Found" });
});

// Error handling middleware for server errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
    res.status(500).render("500", { title: "Server Error" }); // Render a 500 error page
});

// Start the server and listen on the specified port
const PORT = 3000; // Define the port number
app.listen(PORT, () => {
    // Log a message indicating the server is running
    console.log(`Server running on http://localhost:${PORT}`);
});
