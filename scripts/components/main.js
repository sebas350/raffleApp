export function Main(){
    const container = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = 'Sorteo';
    
    container.append(h1);
    var d = 0;
    for(let index = 1; index <11; index++){
        const row = document.createElement('div');
        for(let index = 1; index <11; index++){
            const column = document.createElement('div');
            column.style.width = '30px';
            column.style.height = '30px';
            column.style.border = '2px solid red';
            column.textContent = `${index + d}`;
            row.append(column);
            
        }
        
        row.style.display = 'flex';
        container.append(row);
        d = d + 10;
        
    }

    
    return container;
}
