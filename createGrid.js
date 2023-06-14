/*****
 * SCRIPT:      createGrid.js
 * AUTHOR:      Trenton Weir
 * CRATEDATE:   6.14.23
 * PURPOSE:     To make it easy to create grids fast without much effort. 
 * UPDATES: 
 * DATE     INITIALS        DESCRIPTION
 * 6.14     TJW             Initial Create
 */






//Used for debugging you can ignore these. 
var increment = 0;
var l = str => str == null ? console.log(`Test Spot ${increment++}`) : console.log(str);


//Class for createing the grid
class Gridify{
    constructor(obj){
        this.Data = obj.data ?? null;
        this.DataKeys = [];
        this.Header = obj.header ?? null;
        this.TableParentObject = obj.tableParentObject;
        this.Table;

        //***For future use if we want to add class functionality to it. 
        // this.TableClasses = obj.tableClassNames ?? null;
        // this.HeaderClasses = obj.headerClasses ?? null;
        // this.BodyClasses = obj.bodyClasses ?? null;
        // this.RowClasses = obj.rowClasses ?? null;
    }
    getHeader(){
        //Creates the header data from the keys in the objects. 
        //create empty array
        let header = [];
        //checks if data is not null and then assigns the keys to this.DataKeys
        if(this.Data != null){
            const firstObj = this.Data[0];
            this.DataKeys = Object.keys(firstObj);
        }
        //Makes sure the keys are not empty and then 
        // gets the header from the keys and makes the data all upercase. 
        if(this.DataKeys.length > 0){
            this.DataKeys.forEach(key => {
                header.push(key.toUpperCase());
            });
        }
        //Returs header
        return header;
    }
    createTable(){
        //Construct the table and calls the fill functions;
        const table = document.createElement('table');
        const thead = table.createTHead();
        const tbody = table.createTBody();
        const tfooter = table.createTFoot();
        this.fillTableHeader(thead);
        this.fillTableBody(tbody);
        return table;
    }
    fillTableHeader(thead){
        //Fills the Header with this.Header data
        const tr = document.createElement('tr');
        thead.appendChild(tr);
        this.Header.forEach(col => {
            const th = document.createElement('th');
            th.innerHTML = col;
            tr.appendChild(th);
        });
    }
    fillTableBody(tbody){
        //Gets each object from the data provided and populates the 
        //table based on the keys. 
        this.Data.forEach(d => {
            const row = document.createElement('tr');
            this.DataKeys.forEach(key => {
                const td = document.createElement('td');
                td.innerHTML = d[key];
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
    }
    init(){
        //This must be called after defining the class. 

        //Checks to see if a header was provided and if 
        //not it sorts the objects keys and makes them the header. 
        if(this.Header == null || this.Header.length < 1){
            this.Header = this.getHeader();
        }
        //Creates and assigns the table to this.Table for future use. 
        //This also calls the other methods for filling and assigning the
        //Table data. 
        this.Table = this.createTable();
        //assigns the table to the parrent if it was given. 
        if(this.TableParentObject != null){
            this.TableParentObject.append(this.Table);
        }
        return this.Table;
    }
    addData(dataObj){
        //Used to update the table data. 
        this.Data.push(dataObj);
        this.Table.remove();
        this.init();
    }
    //dataObj is the object/row you want removed. 
    //key is the parameter to use to remove, such as Name, UserName, ...ect
    //Alternatively you may enter the value and leave the key null and it will
    //remove all objects that contain that value as any parameter. 
    //!!!Be warned the second method could remove more then what you want. 
    removeData(dataObj, key){
        //used to remove from the table
        if(typeof(dataObj) == 'object'){
            this.Data = this.Data.filter(x => x[key] != dataObj[key]);
        }
        else{
            this.Data = this.Data.filter(x => {
                Object.keys(x).forEach(xkey => {
                    if(x[xkey] == dataObj){
                        return false;
                    }
                    return true
                });
            });
        }
        this.Table.remove();
        this.init();
    }
}