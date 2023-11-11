import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";

const Sieve = () => {
  const numberContainer = useRef(null);
  const [numberContainerWidth, setNumberContainerWidth] = useState(null);
  useEffect(() => {
    numberContainer.current.children[0].children[0].style.display = "none";
    setNumberContainerWidth(numberContainer?.current.offsetWidth);
    sieve();
  }, [numberContainer, numberContainerWidth]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const sieve = async () => {
    const primes = [];
    const seive = new Array(200);
    seive.fill(true);
    for (let i = 2; i <= 100; i++) {
      if (seive[i]) {
        numberContainer.current.children[i - 1].children[0].style.transition =
          "all 1s ease";
        numberContainer.current.children[
          i - 1
        ].children[0].style.backgroundColor = "green";
        numberContainer.current.children[
          i - 1
        ].children[0].style.transform = `translate3d(${numberContainerWidth}px, 0px, 0px)`;
        numberContainer.current.children[i - 1].children[0].style.color =
          "white";
        primes.push(i);
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        for (let j = i + i; j <= 100; j += i) {
          if (seive[j]) {
            numberContainer.current.children[
              j - 1
            ].children[0].style.transition = "all 1s ease";
            await delay(500);
            numberContainer.current.children[
              j - 1
            ].children[0].style.backgroundColor = `#${randomColor}`;
          }
          numberContainer.current.children[j - 1].children[0].style.color =
            "white";
          seive[j] = false;
        }
      }
    }
  };

  const numberGenerate = () => {
    const children = [];
    for (let i = 1; i <= 100; i++) {
      children.push(
        <Grid id={i} item xs={1}>
          <Item>{i}</Item>
        </Grid>
      );
    }
    return children;
  };

  return (
    <>
      <Box className="container">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>
              <Grid>
                <h2 className="title">Marking Nonprime Numbers</h2>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <h2 className="title">Prime Numbers</h2>
          </Grid>
        </Grid>
        <Grid className="number-container" container spacing={2}>
          <Grid item xs={6}>
            <Box className="nonprime-container">
              <Grid ref={numberContainer} container spacing={2}>
                {numberGenerate()}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Sieve;
