import React, { useRef } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const greeting = useRef(null);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
  async function fetchGreet() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      console.log(contract);
      try {
        const data = await contract.greet();
        console.log("Data: ", data);
      } catch (error) {
        console.log("Errors: ", error);
      }
    }
  }
  async function setGreet() {
    const greet = greeting.current.value;
    if (!greet) {
      return null;
    }
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greet);
      await transaction.wait();
      fetchGreet();
    }
  }

  return (
    <section style={{ margin: 50 }}>
      <div>
        <input ref={greeting} type="text" />
      </div>
      <br />
      <div>
        <button onClick={() => fetchGreet()}>get greet</button>
        &nbsp;
        <button onClick={setGreet}>set greet</button>
      </div>
    </section>
  );
}

export default App;
