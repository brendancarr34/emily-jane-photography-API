const express = require('express');
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post("/create-order", async (req, res) => {
    try {
        console.log('starting order...');
  
        const apiUrl = "https://api.sandbox.prodigi.com/v4.0/Orders";
        const apiKey = "test_4c5abfeb-c442-4e68-8d7b-daf4a9f03b00"; // Replace with your actual API key
  
        const data = {
            shippingMethod: "Budget",
            recipient: {
                address: {
                    line1: "14 test place",
                    line2: "test",
                    postalOrZipCode: "12345",
                    countryCode: "US",
                    townOrCity: "somewhere",
                    stateOrCounty: "somewhereelse",
                },
                name: "John Testman",
                email: "jtestman@prodigi.com",
            },
            items: [
                {
                    sku: "GLOBAL-FAP-16x24",
                    copies: 1,
                    sizing: "fillPrintArea",
                    assets: [
                        {
                            printArea: "default",
                            url: "https://picsum.photos/200/300",
                        },
                    ],
                },
            ],
        };
  
        const response = await axios.post(apiUrl, data, {
            headers: {
                "X-API-Key": apiKey,
                "Content-Type": "application/json",
            },
        });
  
        console.log('success!');
  
        // Send the API response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error creating order:", error.message);
  
        // Send the error message back to the client
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Internal Server Error",
        });
    }
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
