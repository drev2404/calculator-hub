<script>
async function generateRecipe() {
  const ingredients = document.getElementById("ingredients").value;
  const result = document.getElementById("result");

  result.innerText = "Generating recipe...";

  try {
    const res = await fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ingredients })
    });

    const data = await res.json();

    result.innerText =
      data.recipe || data.error || "Something went wrong";

  } catch (err) {
    result.innerText = err.message;
  }
}
</script>
