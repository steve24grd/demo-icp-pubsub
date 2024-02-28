import { publisher } from '../../declarations/publisher';
import { subscriber } from '../../declarations/subscriber';
import { Principal } from '@dfinity/principal';

window.addEventListener("load", async () => {
  //console.log("finished loading");
  await update_publisher();
  await update_subscriber();
});

document.querySelector("#form-subscribe").addEventListener("submit", async (e) => {
  // override the default form submission behavior
  e.preventDefault();
  // console.log("Submitted");

  const button = e.target.querySelector("#submit-btn-subscribe");
  button.setAttribute("disabled", true);

  const inputPubId = document.getElementById("input-pubid").value;
  const topic = document.getElementById("input-topic").value;
  

  if (inputPubId.length != 0) {
    const principal = Principal.fromText(inputPubId);
    await subscriber.setup_subscribe(principal, topic);
  }
  
  button.removeAttribute("disabled");
  window.location.reload();
} );

document.querySelector("#form-publish").addEventListener("submit", async (e) => {
  // override the default form submission behavior
  e.preventDefault();
  // console.log("Submitted");

  const button = e.target.querySelector("#submit-btn-publish");
  button.setAttribute("disabled", true);

  const inputData = document.getElementById("input-data").value;
  const topic = document.getElementById("input-topic2").value;
  
  try {
    if (inputData.length != 0) {
      let counter = {
        topic: topic,
        value: parseInt(inputData)
      };
      await publisher.publish(counter);
      console.log("Publish successful");
    }
  } catch (error) {
    console.error("Publish failed: ", error);
  }
  
  button.removeAttribute("disabled");

  window.location.reload();
} );

async function update_publisher() {
  const pub_id = await publisher.get_id();
  document.getElementById("pubid").innerText = pub_id; 
}

async function update_subscriber() {
  const data = await subscriber.get_count();
  document.getElementById("data").innerText = data;
}