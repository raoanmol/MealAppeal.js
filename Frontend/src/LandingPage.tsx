import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToNextPage = () => {
    navigate("/next");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>MealAppeal.js</h1>
      <button style={styles.button} onClick={navigateToNextPage}>
        Welcome
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center" as "center",
  },
  title: {
    fontSize: "48px",
    margin: "0 auto",
    maxWidth: "90%",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "20px",
  },
};

export default LandingPage;
