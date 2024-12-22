import "../styles/globals.css"; // Add this line to include global styles

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Pass-By-Delivery </title>
            </head>
            <body>{children}</body>
        </html>
    );
}