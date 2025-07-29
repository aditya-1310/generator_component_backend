import { handleUserMessage } from "../services/generateResponse.js";

const generateResponse = async(req, res) => {
    // try{
    //       const { prompt } = req.body;
    //       console.log(`Received prompt: ${prompt}`);

    //       const response = 
        
    //   //     const mockJsx = `
    //   // <div className="container">
    //   //   <h1>Hello from AI!</h1>
    //   //   <p>You asked me to create this component.</p>
    //   //   <button className="button">Click Me</button>
    //   // </div>
    //   // `;
    //   //     const mockCss = `
    //   // .container {
    //   //   border: 2px solid #4a90e2;
    //   //   border-radius: 10px;
    //   //   padding: 20px;
    //   //   font-family: sans-serif;
    //   //   text-align: center;
    //   //   background-color: #f0f8ff;
    //   // }
    //   // .button {
    //   //   background-color: #4a90e2;
    //   //   color: white;
    //   //   border: none;
    //   //   padding: 10px 20px;
    //   //   border-radius: 5px;
    //   //   cursor: pointer;
    //   //   font-size: 16px;
    //   // }
    //   // .button:hover {
    //   //   background-color: #357ab8;
    //   // }
    //   // `;

    //       // Send the hardcoded response
    //       return res.status(200).json({
    //           message: "success",
    //           jsx: mockJsx,
    //           css: mockCss
    //       });
          
    // }
    // catch(error){
    //   console.log(error);

    //   res.json({
    //     message: "error in generating the response"
    //   })

    // }

    
    try {
      
      const { sessionId, userPrompt } =  req.body;
      console.log("data from the frontend is : " , sessionId, userPrompt);
      
      const response = await handleUserMessage({ sessionId, userPrompt });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: err.message });
    } 
}

export default generateResponse;