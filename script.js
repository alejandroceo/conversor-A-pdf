let imagenes = [];

document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    imagenes = []; // Limpiar el array al seleccionar nuevos archivos.
    const files = event.target.files;

    for (const file of files) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagenes.push(e.target.result);
        };

        reader.readAsDataURL(file);
    }
}

function convertirAPDF() {
    if (imagenes.length === 0) {
        console.log('Por favor, selecciona al menos una imagen.');
        return;
    }

    const content = imagenes.map(img => `<img src="${img}" style="max-width: 100%;">`).join('');
    const element = document.createElement('div');
    element.innerHTML = content;

    html2pdf(element, {
        margin: 10,
        filename: 'imagenes_convertidas.pdf',
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
}
