document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('scanBtn').addEventListener('click', simulateScan);
});

function simulateScan() {
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    
    const attendanceStatus = document.querySelector('.attendance-status');
    attendanceStatus.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Registrando asistencia...';
    
    setTimeout(() => {
        notification.classList.remove('show');
        attendanceStatus.innerHTML = '<i class="fas fa-check-circle"></i> Asistencia: 93%';
        
        const firstClass = document.querySelector('.schedule-item');
        firstClass.innerHTML = `
            <div class="class-time">08:00 - 10:00</div>
            <div class="class-info">
                <div class="class-name">Cálculo I <span style="color:#2ecc70;">✓</span></div>
                <div class="class-room">Aula: A-304 | Asistencia: 08:15</div>
            </div>
        `;
        
        // Agregar al historial
        const historySection = document.querySelector('.attendance-history');
        const newItem = document.createElement('div');
        newItem.className = 'attendance-item';
        newItem.innerHTML = `
            <span class="attendance-course">Cálculo I</span>
            <span class="attendance-status" style="color:#2ecc71;">Presente</span>
        `;
        historySection.insertBefore(newItem, historySection.firstChild.nextSibling);
    }, 2000);
}