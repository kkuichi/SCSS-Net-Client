import React, { useState } from "react";
import axios from "axios";
import pako from "pako";

function DemonstratorComponent() {
  const [images, setImages] = useState([]);
  const [threshold, setThreshold] = useState("medium");
  const [taskType, setTaskType] = useState("AR");
  const [responses, setResponses] = useState([]);

// Pridáme nové stavy
const [showManualInput, setShowManualInput] = useState(false);
const [manualData, setManualData] = useState({
  instrument: "",
  date: "",
  time: ""
});

// Upravíme funkciu handleImageChange
const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setImages(files);
  
  // Kontrola, či je možné extrahovať údaje z názvu prvého súboru
  if (files.length > 0) {
    const extractedData = extractDateTime(files[0].name);
    if (extractedData.instrument === "Unknown" || 
        extractedData.date === "Unknown" || 
        extractedData.time === "Unknown") {
      setShowManualInput(true);
    } else {
      setShowManualInput(false);
      setManualData({
        instrument: "",
        date: "",
        time: ""
      });
    }
  }
};

// Pridáme funkciu na spracovanie zmien v manuálnom formulári
const handleManualInputChange = (e) => {
  const { name, value } = e.target;
  setManualData(prev => ({
    ...prev,
    [name]: value
  }));
};

const extractDateTime = (fileName) => {
  const match = fileName.match(/(suvi|aia)_(\w+)_(\d{4})_(\d{2})_(\d{2})T(\d{2})_(\d{2})_(\d{2})/i);
  if (match) {
    const [_, instrument, type, year, month, day, hour, minute, second] = match;
    return { instrument: instrument.toLowerCase(), type, date: `${year}-${month}-${day}`, time: `${hour}:${minute}:${second}` };
  }
  return { instrument: "Unknown", type: "Unknown", date: "Unknown", time: "Unknown" };
};

const decompressMask = (encodedMask) => {
  const compressed = Uint8Array.from(atob(encodedMask), c => c.charCodeAt(0));
  const decompressed = pako.inflate(compressed); // Use pako.js for zlib decompression
  return new Uint8Array(decompressed);
};

// Upravíme funkciu handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();

  if (images.length === 0) {
    return;
  }

  const promises = images.map((image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1];
        let fileData;

        if (showManualInput) {
          // Použijeme manuálne zadané údaje
          fileData = {
            instrument: manualData.instrument,
            date: manualData.date,
            time: manualData.time
          };
        } else {
          // Použijeme extrahované údaje
          fileData = extractDateTime(image.name);
        }

        const data = {
          image: base64Image,
          threshold: threshold,
          tasktype: taskType,
          instrument: fileData.instrument,
          date: fileData.date,
          time: fileData.time,
        };

        try {
          const res = await axios.post("http://147.232.204.249:5000/predict", data);
          resolve(res.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      reader.readAsDataURL(image);
    });
  });

  try {
    const results = await Promise.all(promises);
    setResponses(results);
  } catch (error) {
    alert(error);
  }
};

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>SCSS-Net Demonstrator</h1>
      <div style={styles.content}>
        <p style={styles.text}>
          The SCSS-Net models and demonstrator were developed by a consortium Department of Space Physics, Institute of Experimental Physics, Slovak Academy of Sciences;
          the Department of Cybernetics and Artificial Intelligence, Faculty of Electrical Engineering and Informatics, Technical University of Košice;
          and the Solar Physics and Space Weather at the Royal Observatory of Belgium, under the auspices of the European Space Agency (ESA) / Requesting Party Activities (RPA) in Slovakia.
        </p>
        <p style={styles.text}>
          The application serves as a demonstrator of application of developed deep-learning models for segmentation of solar active regions and coronal holes.
          Active regions are areas with intense magnetic fields, often emerging from sunspots on the Sun's surface. Coronal holes are areas of open magnetic field in the corona that appear dark in EUV images.
        </p>
        
        {/* Form section */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Upload Images:</label>
              <label htmlFor="fileInput" style={styles.customButton}>
                Choose Files
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={styles.hiddenInput}
              />
              <span style={styles.fileName}>
                {images.length > 0 ? `${images.length} file(s) selected` : "No files selected"}
              </span>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Threshold:</label>
            <select
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              style={styles.select}
            >
              <option value="conservative">Conservative</option>
              <option value="medium">Medium</option>
              <option value="nonconservative">Non-conservative</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Task Type:</label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              style={styles.select}
            >
              <option value="AR">Active regions segmentation</option>
              <option value="CH">Coronal holes segmentation</option>
            </select>
          </div>
{showManualInput && (
  <div style={styles.formGroup}>
    <h3 style={styles.subTitle}>Manuálne zadanie údajov</h3>
    <div style={styles.manualInputContainer}>
      <div style={styles.manualInputField}>
        <label style={styles.label}>Instrument:</label>
        <select
          name="instrument"
          value={manualData.instrument}
          onChange={handleManualInputChange}
          style={styles.select}
        >
          <option value="">Vyberte instrument</option>
          <option value="suvi">SUVI</option>
          <option value="aia">AIA</option>
        </select>
      </div>
      <div style={styles.manualInputField}>
        <label style={styles.label}>Dátum:</label>
        <input
          type="date"
          name="date"
          value={manualData.date}
          onChange={handleManualInputChange}
          style={styles.input}
        />
      </div>
      <div style={styles.manualInputField}>
        <label style={styles.label}>Čas:</label>
        <input
          type="time"
          name="time"
          step="1"
          value={manualData.time}
          onChange={handleManualInputChange}
          style={styles.input}
        />
      </div>
    </div>
  </div>
)}
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>

        {/* Response section */}
        {responses.length > 0 && (
          <div style={styles.responseContainer}>
            <h2 style={styles.responseTitle}>Responses:</h2>
            {responses.map((response, index) => (
              <div key={index} style={styles.responseCard}>
                <h3 style={styles.responseHeader}>Image {index + 1}:</h3>

                  {response.image && (
                    <div style={styles.imageContainer}>
                      <img
                        src={`data:image/png;base64,${response.image}`}
                        alt={`Predicted ${index + 1}`}
                        style={styles.image}
                      />
                    </div>
                  )}

                <p><strong>Date:</strong> {response.date || "Unknown"}</p>
                <p><strong>Time:</strong> {response.time || "Unknown"}</p>
                <p><strong>Threshold:</strong> {response.threshold || "Unknown"}</p>
                <p><strong>Task Type:</strong> {response.tasktype || "Unknown"}</p>

                    {response.mask && (
                      <div style={styles.downloadContainer}>
                        <button
                          style={styles.downloadButton}
                          onClick={() => {
                            try {
                              console.log("Encoded Mask:", response.mask); // Debugging log
                              const decompressedMask = decompressMask(response.mask);
                              console.log("Decompressed Mask:", decompressedMask); // Debugging log
                              if (!decompressedMask || decompressedMask.length === 0) {
                                alert("Decompressed mask is empty or invalid.");
                                return;
                              }
                              const blob = new Blob([decompressedMask], { type: "application/octet-stream" });
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement("a");
                              link.href = url;
                              link.download = `mask_${index + 1}.txt`;
                              link.click();
                              URL.revokeObjectURL(url);
                            } catch (error) {
                              console.error("Error decompressing mask:", error);
                              alert("Failed to decompress the mask.");
                            }
                          }}
                        >
                          Download Mask
                        </button>
                      </div>
                    )}




                <h4>Holes Information:</h4>
                {response.stats && response.stats.holes && response.stats.holes.length > 0 ? (
                  <div style={styles.holesContainer}>
                    {response.stats.holes.map((hole, holeIndex) => (
                      <div key={holeIndex} style={styles.holeCard}>
                        <p><strong>Label:</strong> {hole.label}</p>
                        <p><strong>Area (Mm²):</strong> {hole.area_mm2.toFixed(2)}</p>
                        <p><strong>Longitude:</strong> {hole.longitude.toFixed(2)}°</p>
                        <p><strong>Latitude:</strong> {hole.latitude.toFixed(2)}°</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No holes detected.</p>
                )}
              </div>
            ))}
        </div>
      )}
      </div>
    </div>
  );
}

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
  text: {
    lineHeight: '1.6',
    fontSize: '16px',
    marginBottom: '20px',
  },
  content: {
    marginTop: '20px',
  },
  form: {
    marginTop: '30px',
    marginBottom: '30px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#1B3A6F',
    fontWeight: 'bold',
  },
  select: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#1B3A6F',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    ':hover': {
      backgroundColor: '#152d54',
    },
  },
  customButton: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#1B3A6F',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  hiddenInput: {
    display: 'none',
  },
  fileName: {
    fontSize: '14px',
    color: '#666',
  },
  responseContainer: {
    marginTop: '30px',
  },
  responseCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  imageContainer: {
    marginBottom: '20px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  downloadButton: {
    backgroundColor: '#1B3A6F',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  holesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  holeCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  manualInputContainer: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '4px',
    marginTop: '20px',
  },
  manualInputField: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  subTitle: {
    fontSize: '1.2em',
    color: '#1B3A6F',
    marginBottom: '10px',
  },
};

export default DemonstratorComponent;