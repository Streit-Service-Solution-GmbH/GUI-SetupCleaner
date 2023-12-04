// required parameters to use this code
// use 'npm install express bodyParser path fs rimraf' to install all this parameters

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

//This code creates an Express application and sets it to run on port 3030.
const app = express();
const port = 3030;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/deleteFiles', (req, res) => {
  const { filePath } = req.body;

  checkDateiUndOrdner(filePath);

  res.json({ message: `Versuche, Datei zu löschen: ${filePath}` });
});

function deleteRecursive(targetPath) {
  rimraf.sync(targetPath);
}

function checkDateiUndOrdner(zielOrdner) {
  try {
    const files = fs.readdirSync(zielOrdner);

    files.forEach(element => {
      const fullPath = path.join(zielOrdner, element);
      const stats = fs.statSync(fullPath);

      const currentDate = new Date();
      const fileDate = new Date(stats.mtime);

      if (
        stats.isDirectory() &&
        /^[0-9]+$/g.test(element) &&
        fs.existsSync(path.join(zielOrdner, `${element}.sf_export_finished.txt`))
      ) {
        const timeDifference = currentDate.getTime() - fileDate.getTime();
        const oneDayInMillis = 24 * 60 * 60 * 1000; // 30 Tage in Millisekunden

        if (timeDifference > oneDayInMillis) {
          console.log(`Lösche Ordner (älter als 1 Tag): ${element}`);
          deleteRecursive(fullPath);
          console.log(`Ordner gelöscht.`);
        }
      } else if (
        stats.isFile() &&
        /^[0-9]+\.sf_export_finished\.txt$/g.test(element)
      ) {
        const timeDifference = currentDate.getTime() - fileDate.getTime();
        const oneDayInMillis = 24 * 60 * 60 * 1000; // 30 Tage in Millisekunden

        if (timeDifference > oneDayInMillis) {
          console.log(`Lösche Datei (älter als 1 Tag): ${element}`);
          fs.unlinkSync(fullPath);

          // Finde den dazugehörigen Ordner und lösche ihn
          const folderPath = path.join(zielOrdner, element.replace(/\.sf_export_finished\.txt$/, ''));
          console.log(`Lösche zugehörigen Ordner: ${folderPath}`);
          deleteRecursive(folderPath);

          console.log(`Datei und zugehöriger Ordner gelöscht.`);
        }
      }
    });

    console.log('Überprüfung abgeschlossen.');
  } catch (error) {
    const errorMessage = `Fehler beim Überprüfen der Dateien: ${error.message}`;
    console.error(errorMessage);
  }
}

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

