# GUI-SetupCleaner


**Skriptbeschreibung**

Bevor Sie loslegen, müssen Sie Visual Studio Code installiert haben und dann den Ordner `GUI-SetupCleaner` mit Visual Studio Code öffnen.

Das vorliegende Skript ist ein Node.js-basierendes Skript, das dazu dient, Dateien und Ordner in einem bestimmten Verzeichnis zu überprüfen und solche zu löschen, die älter als 30 Tage sind. Das Programm wurde entwickelt, um Ordner und Dateien zu bereinigen, die möglicherweise nicht mehr benötigt werden.

**Skriptaufbau**

Das Skript ist in einem Ordner `GUI-SetupCleanerV2` gespeichert. 
In diesem Ordner ist das Hauptskript `app.js` worin der ganze Code steht.
Im Ordner `GUI-SetupCleanerV2` gibt es einmal den Unterordner  `public` in dem das `main` JavaSkript gespeichert ist, sowie die `index.html` die für den Webbrowser die GUI (grafische Benutzeroberfläche) erstellt.


**Verwendung**

1. **Installation von Abhängigkeiten:**

   Bevor Sie das Skript ausführen, stellen Sie sicher, dass Node.js auf Ihrem System installiert ist. Installieren Sie dann die erforderlichen Pakete,
   indem Sie in der Befehlszeile den folgenden Befehl ausführen:

   ```
   npm install node fs path readline express body-parser rimraf 
   ```

3. **Skriptausführung:**

   Starten Sie das Skript, indem Sie in der Befehlszeile den folgenden Befehl im Verzeichnis des Programms ausführen:

   ```
   node app.js
   ```

   Stellen Sie sicher, dass Sie den richtigen Dateinamen des Programms verwenden.

4. **Konfiguration:**

   - Sie können den Zielordner für die Bereinigung im Skript angeben. 
     Der Standardport ist auf `http://localhost:3030` eingestellt, kann aber bei Bedarf geändert werden.
   - Die Zeitgrenze für das Löschen von Dateien und Ordnern ist standardmäßig auf einen Tag (24 Stunden) eingestellt, kann aber in der Funktion `checkDateiUndOrdner` nach Ihren Anforderungen angepasst werden.

**Beachten Sie vor der Verwendung:**

- **Vorsicht bei der Konfiguration:** Ändern Sie die Skriptkonfiguration sorgfältig, insbesondere den Zielordner und die Zeitgrenze für das Löschen. Falsche Konfigurationen können zu unerwarteten Ergebnissen führen.

- **Sicherheitsüberlegungen:** Das Programm hat das Potenzial, Daten dauerhaft zu löschen. Stellen Sie sicher, dass Sie den richtigen Zielordner ausgewählt haben und dass die Zeitgrenze Ihren Anforderungen entspricht.

- **Berechtigungen:** Stellen Sie sicher, dass das Skript die erforderlichen Berechtigungen hat, um Dateien und Ordner im Zielverzeichnis zu lesen und zu löschen.

- **Testmodus:** Vor dem Einsatz im Produktivumfeld empfehlen wir, das Programm im Testmodus auf nicht kritischen Daten zu testen, um sicherzustellen, dass es wie erwartet funktioniert.
