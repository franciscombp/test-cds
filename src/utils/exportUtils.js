import { CDS_QUESTIONS, RESPONSE_OPTIONS } from '../data/cdsTest'

const RESPONSE_LABELS = {
  1: 'Muy en desacuerdo',
  2: 'En desacuerdo',
  3: 'No estoy seguro',
  4: 'De acuerdo',
  5: 'Muy de acuerdo'
};

export function downloadPDF(childData, score, interpretation, answers) {
  const responseEntries = CDS_QUESTIONS.map(question => {
    const value = answers[question.id] ?? 0;
    const label = RESPONSE_LABELS[value] || 'Sin respuesta';
    const isReverse = question.reverse ? 'Sí' : 'No';
    const scoreValue = question.reverse ? (6 - value) : value;

    return {
      id: question.id,
      question: question.question,
      value,
      label,
      isReverse,
      scoreValue
    };
  });

  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>Informe CDS - ${childData.name}</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background: white;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #0066cc;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            margin: 0;
            color: #0066cc;
            font-size: 28px;
          }
          .header p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
          }
          .patient-info {
            background: #f0f4f8;
            border-left: 4px solid #0066cc;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .patient-info h3 {
            margin-top: 0;
            color: #0066cc;
          }
          .score-box {
            background: #0066cc;
            color: white;
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            margin: 25px 0;
            font-size: 18px;
          }
          .score-box .big-score {
            font-size: 48px;
            font-weight: bold;
            margin: 10px 0;
          }
          .interpretation {
            background: #f9f3e0;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .interpretation h3 {
            margin: 0 0 10px 0;
            color: #ff6f00;
          }
          .answers-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 12px;
          }
          .answers-table th,
          .answers-table td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
          }
          .answers-table th {
            background: #0066cc;
            color: white;
            font-weight: bold;
          }
          .answers-table tr:nth-child(even) {
            background: #f9f9f9;
          }
          .range-info {
            background: #e8f5e9;
            border: 1px solid #4caf50;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .range-info h4 {
            margin-top: 0;
            color: #2e7d32;
          }
          .analysis-section {
            background: #f5f5f5;
            border-left: 4px solid #2196F3;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .analysis-section h4 {
            margin-top: 0;
            color: #1565c0;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 11px;
            color: #999;
          }
          .warning {
            background: #ffebee;
            border-left: 4px solid #f44336;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #c62828;
          }
          .warning strong {
            color: #b71c1c;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Escala de Depresión para Niños (CDS)</h1>
          <p>M. Lang & M. Tisher</p>
        </div>

        <div class="patient-info">
          <h3>Información del Paciente</h3>
          <p><strong>Nombre:</strong> ${childData.name}</p>
          <p><strong>Edad:</strong> ${childData.age} años</p>
          <p><strong>Sexo:</strong> ${childData.sex === 'M' ? 'Masculino' : 'Femenino'}</p>
          <p><strong>Fecha de Evaluación:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
        </div>

        <div class="score-box">
          <div>Puntaje Total Obtenido</div>
          <div class="big-score">${score}</div>
          <div>de 330 puntos</div>
        </div>

        <div class="interpretation">
          <h3>${interpretation.category}</h3>
          <p>${interpretation.description}</p>
        </div>

        <div class="analysis-section">
          <h4>Análisis del Resultado</h4>
          <p>
            El puntaje de <strong>${score}</strong> puntos indica
            ${score <= 110 ? 'ausencia de síntomas significativos de depresión.' : ''}
            ${score > 110 && score <= 150 ? 'síntomas leves que requieren seguimiento profesional.' : ''}
            ${score > 150 && score <= 200 ? 'síntomas moderados que requieren intervención profesional.' : ''}
            ${score > 200 ? 'síntomas severos que requieren atención profesional inmediata.' : ''}
          </p>
        </div>

        <h3 style="margin-top: 30px; margin-bottom: 15px;">Respuestas Detalladas (66 preguntas):</h3>
        <table class="answers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Pregunta</th>
              <th>Valor</th>
              <th>Respuesta</th>
              <th>Inversa</th>
              <th>Puntuación</th>
            </tr>
          </thead>
          <tbody>
            ${responseEntries.map(entry => `
              <tr>
                <td>${entry.id}</td>
                <td>${entry.question}</td>
                <td style="text-align: center; font-weight: bold;">${entry.value}</td>
                <td>${entry.label}</td>
                <td style="text-align: center;">${entry.isReverse}</td>
                <td style="text-align: center; font-weight: bold;">${entry.scoreValue}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="range-info">
          <h4>Baremos de Interpretación (Lang & Tisher):</h4>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li><strong>66-110:</strong> Sin depresión o depresión muy leve</li>
            <li><strong>111-150:</strong> Depresión leve</li>
            <li><strong>151-200:</strong> Depresión moderada</li>
            <li><strong>201-330:</strong> Depresión severa</li>
          </ul>
        </div>

        <div class="warning">
          <strong>⚠ Recomendación Importante:</strong><br/>
          Este test es una herramienta de screening psicológico. Los resultados deben ser interpretados
          por un profesional de la salud mental especializado. En caso de sospechar depresión o ideación suicida,
          se recomienda derivación inmediata a un psicólogo, psiquiatra o servicio de emergencias psicológicas.
        </div>

        <div class="footer">
          <p>
            Informe generado el ${new Date().toLocaleDateString('es-ES')} a las ${new Date().toLocaleTimeString('es-ES')}<br/>
            Esta evaluación debe ser complementada con una entrevista clínica exhaustiva.
          </p>
        </div>
      </body>
    </html>
  `;

  const printWindow = window.open('', '', 'width=900,height=700');
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.print();
}

export function downloadCSV(childData, score, interpretation, answers) {
  let csvContent = 'data:text/csv;charset=utf-8,';

  // Header
  csvContent += `TEST CDS - ESCALA DE DEPRESIÓN PARA NIÑOS\n`;
  csvContent += `M. Lang & M. Tisher\n\n`;

  // Patient Info
  csvContent += `INFORMACIÓN DEL PACIENTE\n`;
  csvContent += `Nombre,${childData.name}\n`;
  csvContent += `Edad,${childData.age}\n`;
  csvContent += `Sexo,${childData.sex === 'M' ? 'Masculino' : 'Femenino'}\n`;
  csvContent += `Fecha,${new Date().toLocaleDateString('es-ES')}\n\n`;

  // Results
  csvContent += `RESULTADOS\n`;
  csvContent += `Puntaje Total,${score}\n`;
  csvContent += `Puntaje Máximo,330\n`;
  csvContent += `Categoría,${interpretation.category}\n\n`;

  // Detailed Responses
  csvContent += `RESPUESTAS DETALLADAS\n`;
  csvContent += `#,Pregunta,Valor Respuesta,Etiqueta Respuesta,Es Inversa,Puntuación Aplicada\n`;

  CDS_QUESTIONS.forEach(question => {
    const value = answers[question.id] ?? 0;
    const label = RESPONSE_LABELS[value] || 'Sin respuesta';
    const isReverse = question.reverse ? 'Sí' : 'No';
    const scoreValue = question.reverse ? (6 - value) : value;

    const quotedQuestion = `"${question.question.replace(/"/g, '""')}"`;
    csvContent += `${question.id},${quotedQuestion},${value},${label},${isReverse},${scoreValue}\n`;
  });

  csvContent += `\n`;
  csvContent += `BAREMOS DE INTERPRETACIÓN\n`;
  csvContent += `Rango,Categoría\n`;
  csvContent += `66-110,Sin depresión o depresión muy leve\n`;
  csvContent += `111-150,Depresión leve\n`;
  csvContent += `151-200,Depresión moderada\n`;
  csvContent += `201-330,Depresión severa\n`;

  // Create download link
  const encodedURI = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedURI);
  link.setAttribute('download', `test-cds-${childData.name.replace(/\s+/g, '-')}-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
