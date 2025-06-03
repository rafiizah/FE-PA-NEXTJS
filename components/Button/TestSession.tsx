// "use client";
// import { useState } from "react";

// const TestSession = () => {
//   const [session, setSession] = useState(null);

//   const handleTest = async () => {
//     try {
//       const response = await fetch("/api/auth/session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       console.log("Session:", data);
//       setSession(data);
//     } catch (error) {
//       console.error("Session fetch error:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleTest}>Test Session</button>
//       <pre>{JSON.stringify(session, null, 2)}</pre>
//     </div>
//   );
// };
// export default TestSession;