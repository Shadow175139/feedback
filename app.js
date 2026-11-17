const STORAGE_KEY = "feedback-hub-responses";
const form = document.querySelector("#feedback-form");
const messageInput = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");
const feedbackList = document.querySelector("#feedback-list");
const clearButton = document.querySelector("#clear-button");
const formMessage = document.querySelector("#form-message");

function getFeedback() {
  try {
    const feedback = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(feedback) ? feedback : [];
  } catch {
    return [];
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

function renderFeedback() {
  const feedback = getFeedback();
  clearButton.hidden = feedback.length === 0;

  if (feedback.length === 0) {
    feedbackList.innerHTML = '<p class="empty-state">No feedback submitted yet.</p>';
    return;
  }

  feedbackList.innerHTML = feedback.map((item) => {
    const stars = "★".repeat(item.rating) + "☆".repeat(5 - item.rating);
    return `<article class="feedback-item">
      <h3>${escapeHtml(item.name)}</h3>
      <div class="stars">${stars}</div>
      <p>${escapeHtml(item.message)}</p>
      <time>${new Date(item.createdAt).toLocaleString()}</time>
    </article>`;
  }).join("");
}

messageInput.addEventListener("input", () => {
  characterCount.textContent = `${messageInput.value.length}/500`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const feedback = getFeedback();
  feedback.unshift({
    name: String(data.get("name")).trim(),
    email: String(data.get("email") || "").trim(),
    rating: Number(data.get("rating")),
    message: String(data.get("message")).trim(),
    createdAt: new Date().toISOString()
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
  form.reset();
  characterCount.textContent = "0/500";
  formMessage.textContent = "Feedback submitted.";
  renderFeedback();
});

clearButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  renderFeedback();
});

renderFeedback();
