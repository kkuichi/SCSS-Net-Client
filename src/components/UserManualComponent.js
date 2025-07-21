import React from 'react';
import figure1 from '../figures/figure1.png';
import figure2 from '../figures/figure2.png';
import figure22 from '../figures/figure22.png';
import figure3 from '../figures/figure3.png';
import figure4 from '../figures/figure4.png';

const UserManual = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Manual</h1>
      
      <h2 style={styles.subtitle}>Introduction</h2>
      <p style={styles.text}>
        The SCSS-Net Demonstrator is a web application that allows users to perform segmentation of solar images
        to identify Active Regions (AR) and Coronal Holes (CH). This manual will guide you through the process
        of using the application effectively.
      </p>

      <h2 style={styles.subtitle}>Getting Started</h2>
      <p style={styles.text}>
        The application consists of four main sections accessible from the navigation bar:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>SCSS-Net Demonstrator - The main interface for image analysis</li>
        <li style={styles.listItem}>About - Information about the project and its authors</li>
        <li style={styles.listItem}>API - Documentation for programmatic access</li>
        <li style={styles.listItem}>User Manual - This guide</li>
      </ul>

        <div style={styles.imageContainer}>
          <img src={figure1} alt="Example result 1" style={styles.image} />
          <p style={styles.imageCaption}>Figure 1: Main page of the application.</p>
        </div>

      <h2 style={styles.subtitle}>Using the Demonstrator</h2>
      <h3 style={styles.subsubtitle}>Step 1: Image Upload</h3>
      <ul style={styles.list}>
        <li style={styles.listItem}>Click on the "Choose File" button to select your solar image</li>
        <li style={styles.listItem}>Supported formats: PNG and JPG</li>
        <li style={styles.listItem}>The image should be a solar observation from either AIA or SUVI instruments</li>
      </ul>

        <div style={styles.imageContainer}>
          <img src={figure2} alt="Example result 2" style={styles.image} />
          <p style={styles.imageCaption}>Figure 2: Image selection and upload</p>
        </div>





      <h3 style={styles.subsubtitle}>Step 2: Configure Parameters</h3>
      <ul style={styles.list}>
        <li style={styles.listItem}>Select the Task Type:
          <ul style={styles.subList}>
            <li>AR - for Active Regions detection</li>
            <li>CH - for Coronal Holes detection</li>
          </ul>
        </li>
        <li style={styles.listItem}>Choose the Threshold:
          <ul style={styles.subList}>
            <li>Conservative - Lesser threshold, with more conservative segmentation</li>
            <li>Medium - Balanced segmentation</li>
            <li>Nonconservative - Higher threshold. Could lead to e.g., removing the filaments from the segmentation in CH detection tasks. </li>
          </ul>
        </li>


          <p style={styles.text}>
            In case, tha the image name contains time, instrument and date information, the application will automatically fill in the date and time fields. Otherwise, you can manually enter the date and time of the image acquisition.
          </p>


        <li style={styles.listItem}>Select the Instrument:
          <ul style={styles.subList}>
            <li>AIA - for SDO/AIA images</li>
            <li>SUVI - for GOES/SUVI images</li>
          </ul>
        </li>
        <li style={styles.listItem}>Optional: Enter the acquisition Date and Time</li>
      </ul>

        <div style={styles.imageContainer}>
          <img src={figure22} alt="Example result 22" style={styles.image} />
          <p style={styles.imageCaption}>Figure 3: Manual setting of the parameters</p>
        </div>


        

        


      <h3 style={styles.subsubtitle}>Step 3: Process the Image</h3>
      <ul style={styles.list}>
        <li style={styles.listItem}>Click the "Submit" button to start the analysis</li>
        <li style={styles.listItem}>Wait for the processing to complete</li>
      </ul>


        <div style={styles.imageContainer}>
          <img src={figure3} alt="Example result 3" style={styles.image} />
          <p style={styles.imageCaption}>Figure 3: Overlay of detected regions</p>
        </div>




      <h3 style={styles.subsubtitle}>Step 4: View Results</h3>
      <p style={styles.text}>
        The results will be displayed as three images, for each of uploaded image:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Original Image - Your uploaded image</li>
        <li style={styles.listItem}>Prediction Mask - The binary segmentation mask</li>
        <li style={styles.listItem}>Overlay - Original image with detected regions highlighted</li>
      </ul>

      <h2 style={styles.subtitle}>Additional Features</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>The results include statistics about detected regions</li>
        <li style={styles.listItem}>For both tasks information about active region locations and areas and sizes</li>
        <li style={styles.listItem}>Ability to download the mask for a given image</li>
      </ul>


        <div style={styles.imageContainer}>
          <img src={figure4} alt="Example result 4" style={styles.image} />
          <p style={styles.imageCaption}>Figure 4: Detailed analysis visualization</p>
        </div>

      <h2 style={styles.subtitle}>Troubleshooting</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>If the image fails to process, ensure it's in the correct format and from a supported instrument</li>
        <li style={styles.listItem}>Check that all required parameters are selected before processing</li>
        <li style={styles.listItem}>For large images, the processing might take a few moments to complete</li>
      </ul>


    </div>
  );
};

const styles = {
  // Existujúce štýly zostávajú...
  
  // Nové štýly pre obrázky
  imageSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px',
  },
  imageContainer: {
    width: 'calc(50% - 10px)', // 2 obrázky v riadku s medzerou
    maxWidth: '500px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  imageCaption: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#666',
  },
  
  // Existujúce štýly pokračujú...
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
  subsubtitle: {
    color: '#1B3A6F',
    marginTop: '20px',
    marginBottom: '10px',
    fontSize: '18px',
  },
  text: {
    lineHeight: '1.6',
    fontSize: '16px',
    marginBottom: '15px',
  },
  list: {
    padding: '0 0 0 20px',
    marginBottom: '15px',
  },
  listItem: {
    marginBottom: '10px',
    lineHeight: '1.6',
    fontSize: '16px',
  },
  subList: {
    listStyle: 'circle',
    marginLeft: '20px',
    marginTop: '5px',
  },
};

export default UserManual;