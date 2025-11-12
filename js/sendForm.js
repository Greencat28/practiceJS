const sendForm = () => {
  const form = document.querySelector(".modal");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const sendObj = new FormData(form);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: sendObj,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        alert("✅ Форма успешно отправлена!");
        form.reset();
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("❌ Ошибка отправки: " + error.message);
      });
  });
};

sendForm();
