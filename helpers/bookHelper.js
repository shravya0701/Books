// Function to retrieve a list of books
function getBooks() {
    return [
        {
            title: "I too had a love story", // Title of the book
            price: 12.99, // Price of the book in USD
            coverImage: "image1.jpg", // Filename of the book's cover image
            isbn: "0670356689", // Unique ISBN identifier for the book
        },
        {
            title: "Will you still love me", // Title of the book
            price: 10.99, // Price of the book in USD
            coverImage: "image2.jpg", // Filename of the book's cover image
            isbn: "8185986177", // Unique ISBN identifier for the book
        },
        {
            title: "Your dreams are mine now", // Title of the book
            price: 13.99, // Price of the book in USD
            coverImage: "image3.jpg", // Filename of the book's cover image
            isbn: "9780099282273", // Unique ISBN identifier for the book
        },
    ];
}

// Export the function for use in other parts of the application
module.exports = { getBooks };
