import React from 'react';

const API = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>API Documentation</h1>
      
      <p style={styles.text}>
        To use the API, the main endpoint for submitting solar images for segmentation is the POST
        /predict method.
      </p>
      
      <h2 style={styles.subtitle}>Request Format</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>Content-Type:</strong> application/json
        </li>
      </ul>

      <h2 style={styles.subtitle}>Body Parameters</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>image</strong> (string, required): The image to process, encoded as a base64 string (PNG
          or JPG format). This allows binary image data to be safely transmitted in JSON.
        </li>
        
        <li style={styles.listItem}>
          <strong>threshold</strong> (string, required): The segmentation threshold to use. Options are:
          <ul style={styles.subList}>
            <li>conservative: Fewer, more certain regions</li>
            <li>medium: Balanced detection</li>
            <li>nonconservative: More, possibly less certain regions</li>
          </ul>
        </li>
        
        <li style={styles.listItem}>
          <strong>tasktype</strong> (string, required): The type of segmentation task:
          <ul style={styles.subList}>
            <li>AR: Active Regions segmentation</li>
            <li>CH: Coronal Holes segmentation</li>
          </ul>
        </li>
        
        <li style={styles.listItem}>
          <strong>instrument</strong> (string, required): The source instrument of the image, e.g., aia or suvi.
        </li>
        
        <li style={styles.listItem}>
          <strong>date</strong> (string, optional): Acquisition date in YYYY-MM-DD format, for traceability.
        </li>
        
        <li style={styles.listItem}>
          <strong>time</strong> (string, optional): Acquisition time in HH:MM:SS format.
        </li>
      </ul>

      <h2 style={styles.subtitle}>Response Codes</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>200 Success:</strong> Returns a valid JSON object
        </li>
        
        <li style={styles.listItem}>
          <strong>400 Bad Request:</strong> Returned if required fields are missing or the input is invalid (e.g.,
          malformed base64 image).
        </li>
        
        <li style={styles.listItem}>
          <strong>500 Internal Server Error:</strong> Indicates a failure during processing (e.g., model error, image
          decoding failure)
        </li>
      </ul>

      <h2 style={styles.subtitle}>Command Line Usage</h2>
      <p style={styles.text}>
        The API can also be accessed and tested from the command line. Example cURL request
        should look like:
      </p>
      <pre style={styles.code}>
        {`curl -X POST http://147.232.204.249:5000/predict \\
-H "Content-Type: application/json" \\
-d '{"image": "<base64>", "threshold": "medium", "tasktype": "AR", "instrument": "aia"}'`}
      </pre>
      <p style={styles.text}>
        Where {'<base64>'} is an actual input base64-encoded image data.
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    color: '#1B3A6F',
    marginBottom: '20px',
  },
  subtitle: {
    color: '#1B3A6F',
    marginTop: '30px',
    marginBottom: '15px',
  },
  text: {
    lineHeight: '1.6',
    fontSize: '16px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '20px',
    lineHeight: '1.6',
    fontSize: '16px',
  },
  subList: {
    listStyle: 'disc',
    marginLeft: '30px',
    marginTop: '10px',
  },
  code: {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '4px',
    overflow: 'auto',
    fontSize: '14px',
    fontFamily: 'monospace',
    marginTop: '10px',
    marginBottom: '10px',
  },
};

export default API;