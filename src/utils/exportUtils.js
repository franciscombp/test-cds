import { CDS_QUESTIONS } from '../data/cdsTest'

export function downloadPDF(childName, score, interpretation, answers) {
  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background: white;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #4f46e5;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            margin: 0;
            color: #4f46e5;
            font-size: 28px;
          }
          .header p {
            margin: 5px 0;
            color: #666;
          }
          .score-box {
            background: #4f46e5;
            color: white;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            font-size: 24px;
            font-weight: bold;
          }
          .interpretation {
            background: #f3f4f6;
            border-left: 4px solid #4f46e5;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .interpretation h3 {
            margin: 0 0 10px 0;
            color: #1f2937;
          }
          .answers-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .answers-table th,
          .answers-table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          .answers-table th {
            background: #f3f4f6;
            font-weight: bold;
          }
          .range-info {
            background: #fffbeb;
            border: 1px solid #fcd34d;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .date {
            color: #999;
            font-size: 12px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Test CDS</h1>
          <p>Escala de Depresión para Niños de M. Lang y M. Tisher</p>
        </div>

        <div class="score-box">
          Nombre: ${childName}
        </div>

        <div class="score-box">
          Puntaje Total: ${score} / 54
        </div>

        <div class="interpretation">
          <h3>${interpretation.category}</h3>
          <p>${interpretation.description}</p>
        </div>

        <div class="range-info">
          <h4 style="margin-top: 0;">Rango de Puntajes:</h4>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li><strong>0-15:</strong> Sin depresión</li>
            <li><strong>16-25:</strong> Depresión leve</li>
            <li><strong>26-40:</strong> Depresión moderada</li>
            <li><strong>41-54:</strong> Depresión severa</li>
          </ul>
        </div>

        <h3 style="margin-top: 30px; margin-bottom: 15px;">Respuestas Detalladas:</h3>
        <table class="answers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Pregunta</th>
              <th>Respuesta</th>
            </tr>
          </thead>
          <tbody>
            ${CDS_QUESTIONS.map(question => `
              <tr>
                <td>${question.id}</td>
                <td>${question.question}</td>
                <td>${['Nunca', 'A veces', 'Frecuentemente', 'Siempre'][answers[question.id]]}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <p>
            <strong>Nota Importante:</strong> Este test es una herramienta de screening.
            Los resultados deben ser interpretados por un profesional de la salud mental especializado.
          </p>
          <p class="date">
            Generado el: ${new Date().toLocaleDateString('es-ES')} ${new Date().toLocaleTimeString('es-ES')}
          </p>
        </div>
      </body>
    </html>
  `;

  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.print();
}

export function downloadCSV(childName, score, interpretation, answers) {
  // Prepare CSV content
  let csvContent = 'data:text/csv;charset=utf-8,';

  // Add header info
  csvContent += `Test CDS - Escala de Depresión para Niños\n`;
  csvContent += `Nombre del niño/a,${childName}\n`;
  csvContent += `Puntaje Total,${score}\n`;
  csvContent += `Categoría,${interpretation.category}\n`;
  csvContent += `\n`;

  // Add question responses
  csvContent += `#,Pregunta,Respuesta\n`;
  CDS_QUESTIONS.forEach(question => {
    const answer = ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'][answers[question.id]];
    const quotedQuestion = `"${question.question.replace(/"/g, '""')}"`;
    csvContent += `${question.id},${quotedQuestion},${answer}\n`;
  });

  csvContent += `\n`;
  csvContent += `Rango de Puntajes,\n`;
  csvContent += `0-15,Sin depresión\n`;
  csvContent += `16-25,Depresión leve\n`;
  csvContent += `26-40,Depresión moderada\n`;
  csvContent += `41-54,Depresión severa\n`;
  csvContent += `\n`;
  csvContent += `Fecha,${new Date().toLocaleDateString('es-ES')}\n`;
  csvContent += `Hora,${new Date().toLocaleTimeString('es-ES')}\n`;

  // Create download link
  const encodedURI = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedURI);
  link.setAttribute('download', `test-cds-${childName.replace(/\s+/g, '-')}-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
