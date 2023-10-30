import axios from "axios";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log('auth token', import.meta.env.VITE_AUTH_TOKEN);
    
    const getJSONData = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://api.github.com/repos/chaudhuree/githubapitest/contents/data.json",
        {
          Authorization:
            "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
        }
      );
      const decodedContent = Buffer.from(
        response.data.content,
        "base64"
      ).toString("ascii");
      const jsonData = JSON.parse(decodedContent);
      // console.log('jsonData', jsonData);
      setData(jsonData);
      setLoading(false);
      
    };
    getJSONData();
  }, []);
  
if(loading) return <p>Loading...</p>
  
  return (
    <div>
      <h1>JSON Data</h1>
     {data.map((item) => (
       <div key={item.id}>
         <h2>{item.id}</h2>
         <p>{item.name}</p>
         <p>{item.age}</p>
       </div>
     ))
     }
    </div>
  );
}


// <ul>
// {/* Check if data is an array before mapping over it */}
// {Array.isArray(data) && data.map((item) => (
//   <li key={item.id}>{item.name}</li>
// ))}
// </ul>