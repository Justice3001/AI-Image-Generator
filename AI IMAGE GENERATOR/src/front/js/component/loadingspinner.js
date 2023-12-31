import React, { useState, useEffect } from 'react';

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation (e.g., fetching data)
    const fetchData = async () => {
      // Perform your data fetching or any other asynchronous tasks here

      // Simulate a delay (remove this in a real-world scenario)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update the loading state to hide the spinner
      setLoading(false);
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return loading ? (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
       animation="border" variant="primary" role="status">
        <span className="sr-only">Loading...</span>
      
    </div>
  ) : (
    // Your actual content goes here once loading is complete
    <div>
      <h1>Your Main Content</h1>
      {/* Other components and content */}
    </div>
  );
};

export default LoadingSpinner;
