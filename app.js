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

    files.forEach(datei => {
      const fullPath = path.join(zielOrdner, datei);
      const stats = fs.statSync(fullPath);

      const currentDate = new Date();
      const fileDate = new Date(stats.mtime);

      // Überprüfen, ob das Element eine Textdatei mit der Endung ".sf_export_finished" und der dazugehörige Ordner ist
      if (
        stats.isDirectory() &&
        /^[0-9]+$/g.test(datei) &&
        fs.existsSync(path.join(zielOrdner, `${datei}.sf_export_finished.txt`))
      ) {
        const timeDifference = currentDate.getTime() - fileDate.getTime();
        const oneDayInMillis =   1 * 60 * 60 * 1000; //30 Tage in Millisekunden

        if (timeDifference > oneDayInMillis) {
          console.log(`Lösche Ordner (älter als 1 Tag): ${datei}`);
          deleteRecursive(fullPath);
          console.log(`Ordner gelöscht.`);
        }
      } else if (
        stats.isFile() &&
        /^[0-9]+\.sf_export_finished\.txt$/g.test(datei)
      ) {
        const timeDifference = currentDate.getTime() - fileDate.getTime();
        const oneDayInMillis =   1 * 60 * 60 * 1000; // 30 Tage in Millisekunden

        if (timeDifference > oneDayInMillis) {
          console.log(`Lösche Datei (älter als 1 Tag): ${datei}`);
          fs.unlinkSync(fullPath);
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

