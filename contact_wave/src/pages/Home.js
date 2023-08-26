import { useContext, useEffect } from "react";
import React from 'react';
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Home=()=>{
    const navigate=useNavigate();
    const {usar}=useContext(AuthContext)
    useEffect( ()=>{
        !usar && navigate("/login",{replace:true})
        
    },[])

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Vertically center contents
        margin: '2rem auto',
        maxWidth: '80%',
      },
      heading: {
        textAlign: 'center',
        marginBottom: '1rem',
      },
      hr: {
        width: '30%',
        border: '2px solid black',
        margin: '1rem auto',
      },
      imageContainer: {
        textAlign: 'center',
        margin: '2rem auto',
      },
      image: {
        maxWidth: '50%',
        height: 'auto',
      },
      textContainer: {
        flex: '2', // Take up 2/3 of the available space
      },
      description: {
        fontSize: '1rem',
        color: '#006432',
        maxWidth: '80%',
        margin: '0 auto',
        lineHeight: '1.6',
      },
    };

    return (<>
    <div><h1 style={styles.heading}>Welcome {usar ? usar.name : 'Guest'}</h1>
        <hr style={styles.hr} /></div>
    <div style={styles.container}>  
      <div style={styles.imageContainer}>
        <img
          src="/call-back.png"
          alt="React Image"
          style={styles.image}
        />
      </div>
      <div style={styles.textContainer}>
      <strong style={styles.description}>
        ContactWave is a "MERN" stack-based contact management system that allows users to efficiently organize and manage their contacts. With a user-friendly interface and real-time updates, ContactWave offers seamless contact addition, editing, and removal, enhancing productivity and organization for users.
      </strong>
      </div>
      </div>
    </>
  );
    
}
export default Home;



