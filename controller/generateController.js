const generateResponse = async(req, res) => {
    const { prompt } = req.body;
    console.log(`Received prompt: ${prompt}`);

   
    const mockJsx = `
<div className="container">
  <h1>Hello from AI!</h1>
  <p>You asked me to create this component.</p>
  <button className="button">Click Me</button>
</div>
`;
    const mockCss = `
.container {
  border: 2px solid #4a90e2;
  border-radius: 10px;
  padding: 20px;
  font-family: sans-serif;
  text-align: center;
  background-color: #f0f8ff;
}
.button {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
.button:hover {
  background-color: #357ab8;
}
`;

    // Send the hardcoded response
    res.json({
        jsx: mockJsx,
        css: mockCss
    });
}

export default generateResponse;