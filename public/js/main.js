async function deleteFiles() {
  const filePath = document.getElementById('filePathInput').value;

  try {
    const response = await fetch('/deleteFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filePath }),
    });

    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error('Fehler beim Löschen der Datei:', error.message);
  }
}