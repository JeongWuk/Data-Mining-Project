const channelBtn = document.querySelector(".channel");

channelBtn.addEventListener("click", async () => {
  channelBtn.disabled = true;
  try {
    const response = await fetch('http://localhost:3000/fetch-channel', {
      method: 'GET',
      headers: {
          'Cache-Control': 'no-cache'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      alert(data?.message);
    } else {
        throw new Error('저장 실패');
    }
  } catch {
    throw new Error('저장 실패');
  } finally {
    channelBtn.disabled = false;
  }
});