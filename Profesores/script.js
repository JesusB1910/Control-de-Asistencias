document.addEventListener('DOMContentLoaded', function() {
    generateQRCode();
    
    document.getElementById('generateBtn').addEventListener('click', generateQRCode);
});

function generateQRCode() {
    const classSelect = document.getElementById('classSelect');
    const classroom = document.getElementById('classroom').value;
    const classTime = document.getElementById('classTime').value;
    
    const selectedClass = classSelect.options[classSelect.selectedIndex].text;
    
    const qrData = JSON.stringify({
        materia: selectedClass,
        aula: classroom,
        hora: classTime,
        profesor: "Dra. García",
        fecha: new Date().toLocaleDateString('es-ES')
    });
    
    document.getElementById('qrCode').innerHTML = '';
    new QRCode(document.getElementById('qrCode'), {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: "#2c3e50",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    const qrInfo = document.querySelector('.qr-info');
    qrInfo.innerHTML = `
        <p><strong>Materia:</strong> ${selectedClass}</p>
        <p><strong>Aula:</strong> ${classroom}</p>
        <p><strong>Hora:</strong> ${classTime}</p>
        <p><strong>Válido hasta:</strong> ${getExpirationTime(classTime)}</p>
    `;
    
    // Mostrar notificación
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

function getExpirationTime(timeRange) {
    const endTime = timeRange.split(' - ')[1];
    const [hours, minutes] = endTime.split(':').map(Number);
    
    let expirationMinutes = minutes + 15;
    let expirationHours = hours;
    
    if (expirationMinutes >= 60) {
        expirationHours += 1;
        expirationMinutes -= 60;
    }
    
    return `${expirationHours}:${expirationMinutes.toString().padStart(2, '0')}`;
}