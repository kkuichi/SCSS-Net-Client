import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About SCSS-Net</h1>
      <p style={styles.text}>
        The SCSS-Net models and demonstrator were developed by a consortium Department of Space Physics, 
        Institute of Experimental Physics, Slovak Academy of Sciences; the Department of Cybernetics 
        and Artificial Intelligence, Faculty of Electrical Engineering and Informatics, Technical 
        University of Košice; and the Solar Physics and Space Weather at the Royal Observatory of Belgium, 
        during the project SKR1-08: Development of SCSS-Net: Solar Corona Structures Segmentation algorithm by deep neural
networks (SCSS-Net) under the contract No. 4000143601/24/NL/MH/mp, supported by the European Space Agency (ESA) within the 1st Requesting Party Activities (RPA) call for Slovakia.
      </p>

      <p style={styles.text}>
        The application serves as a demonstrator of application of developed deep-learning models for segmentation of solar active regions and coronal holes.
        Active regions are areas with intense magnetic fields, often emerging from sunspots on the Sun's surface. Coronal holes are areas of open magnetic field in the corona that appear dark in EUV images.
      </p>

      <h2 style={styles.subtitle}>Authors</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          Dep. of Space Physics, Institute of Experimental Physics, Slovak Academy of Sciences (S. Mackovjak, A. Majirský)
        </li>
        <li style={styles.listItem}>
          Dep. of Cybernetics and Artificial Intelligence, Faculty of Electrical engineering and Informatics, Technical University of Košice (P. Butka, V. Krešňáková, M. Sarnovský)
        </li>
        <li style={styles.listItem}>
          Royal Observatory of Belgium (V. Delouille, J. de Patoul, B. Mampaey)
        </li>
      </ul>

      <h2 style={styles.subtitle}>Contact</h2>
      <p style={styles.text}>
        <a href="mailto:martin.sarnovsky@tuke.sk" style={styles.link}>martin.sarnovsky@tuke.sk</a>
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
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '15px',
    lineHeight: '1.6',
    fontSize: '16px',
  },
  link: {
    color: '#1B3A6F',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
};

export default About;