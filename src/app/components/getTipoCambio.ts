export async function getTipoCambio() {
    try {
        const response = await fetch('http://localhost:8080/api/tipoCambio/datoscambio');
        if (!response.ok) {
            throw new Error('Error al obtener datos de tipo de cambio');
        }
        
        const xmlText = await response.text(); // Obtén el texto XML
        console.log('Respuesta XML:', xmlText); // Agrega este log para verificar la respuesta

        // Analiza el XML principal
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        // Extrae el contenido de TipoCambioDiaStringResult
        const tipoCambioResultElement = xmlDoc.getElementsByTagName('TipoCambioDiaStringResult')[0];
        
        if (!tipoCambioResultElement || !tipoCambioResultElement.textContent) {
            throw new Error('No se encontró el resultado del tipo de cambio');
        }

        const innerXml = tipoCambioResultElement.textContent; // Obtiene la cadena XML escapada

        // Desescapar el XML
        const desescapedXml = innerXml
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&'); // Desescapar también &

        // Analiza el XML desescapado
        const innerXmlDoc = parser.parseFromString(desescapedXml, 'text/xml');

        const varDolarElement = innerXmlDoc.getElementsByTagName('VarDolar')[0];

        const fechaElement = varDolarElement ? varDolarElement.getElementsByTagName('fecha')[0] : null;
        const referenciaElement = varDolarElement ? varDolarElement.getElementsByTagName('referencia')[0] : null;

        const fecha = fechaElement ? fechaElement.textContent : '';
        const referencia = referenciaElement ? referenciaElement.textContent : '';

        console.log('Fecha:', fecha); // Agrega este log para verificar la fecha
        console.log('Referencia:', referencia); // Agrega este log para verificar la referencia

        return { fecha, referencia };
    } catch (error) {
        console.error('Error al cargar datos:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
}
