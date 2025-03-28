export function Main(){
    const container = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = 'Sorteo';
    
    container.append(h1);
    var d = 0;
    for(let index = 1; index <11; index++){
        const row = document.createElement('div');
        for(let index = 1; index <11; index++){
            const btn = document.createElement('button');
            btn.style.width = '30px';
            btn.style.height = '30px';
            //btn.style.border = '1px solid red';
            btn.textContent = `${index + d}`;
            //column.style.margin = 'auto';
            btn.style.display = 'flex';
            btn.style.justifyContent = 'center';
            btn.style.alignItems = 'center';
            
            //const btn = document.createElement('button');
            //btn.append(column);
            
            row.append(btn);
            
        }
        const divPago = document.createElement('div');
        divPago.style.border = '1px solid blue';
        divPago.style.width = '500px';
        divPago.style.height = '500px';
        divPago.style.margin = 'auto';
        divPago.id = d;
        //divPago.style.display = 'none';
        
        
        row.style.display = 'flex';
        row.style.justifyContent = 'center';
        
        container.append(row, divPago);
        d = d + 10;
        
    }
    
    return container;
}
