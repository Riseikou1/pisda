
const hello = document.querySelector("#hello");
const ecampus = document.querySelector("#ecampus");
const resource = document.querySelector("#resource");
const resourceSource = document.querySelector("#resource-source");
const sourceDown = document.getElementById("source-down");

hello.addEventListener('click', async function (e) {
  console.log("Hello button clicked!");
  const formData = new FormData();
  formData.append('type', 'hello');

  const response = await fetch(`/resource`, {
      method: "POST",
      body: formData
  });

  const output = await response.json();
  resource.value = JSON.stringify(output, null, 2);
  resourceSource.value = (output.data) ? output.data.source:"";
  console.log(output);
});

ecampus.addEventListener('click', async function (e) {
  console.log("E button clicked!");
  const formData = new FormData();
  formData.append('type', 'ecampus');

  const response = await fetch(`/resource`, {
      method: "POST",
      body: formData
  });

  const output = await response.json();
  resource.value = JSON.stringify(output, null, 2);
  resourceSource.value = (output.data) ? output.data.source:"";
  console.log(output);
});


sourceDown.addEventListener('click', async function (e) {
  console.log("Source Down button clicked!");
  const sourceUrl = document.getElementById("source-url").value.trim();
  if (!sourceUrl) {
    alert("URL을 입력하세요!");
    return;
  }

  const response = await fetch(`/resource`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "sourceUrl", sourceUrl: sourceUrl })
  });

  const output = await response.json();
  resource.value = JSON.stringify(output, null, 2);
  resourceSource.value = (output.data) ? output.data.source : "";
  console.log(output);
});
