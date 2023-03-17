import React, { Component} from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { DevicesService } from '../../service/DevicesService';

export default class DataTableDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {
          devices: []
        };
    
        this.devicesService = new DevicesService();
    }
    
    componentDidMount() {
      this.devicesService
          .getDeviceSmall()
          .then((data) => this.setState({ devices: data }));
    }
    
    render() {
        let headerGroup = (
          <ColumnGroup>
            <Row>
              <Column header="Номер аппарата (первые 4 цифры)" field="id" rowSpan={2} sortable filter filterDisplay='row' 
              filterPlaceholder="Search"/>

              <Column header="Статус" rowSpan={2} field="status" filter filterPlaceholder="Search"/>
              <Column header="Адрес" colSpan={2} />
              <Column header="Привязанное меню" field='menu' rowSpan={2} filter filterPlaceholder="Search"/>
              <Column header="Рекламные плейлисты" field='playlist' rowSpan={2} filter filterPlaceholder="Search"/>
              <Column header="Статусы узлов аппарата" rowSpan={2} />
              <Column header="Дата добавления в админку" rowSpan={2} field="dateAdded" sortable/>
              <Column header="Сумма продаж за последний месяц" rowSpan={2} />
              <Column header="Сумма продаж за день" rowSpan={2} />
            </Row>
            <Row>
              <Column header="Коорд" colSpan={1} />
              <Column header="Тип объекта" field="type" colSpan={1} filter filterPlaceholder="Search"/>
            </Row>
          </ColumnGroup>
        );

        const dateAddedBody = (rowData) => {
          return `${formatCurrency(rowData.dateAdded)}`;
        }

        const formatCurrency = (value) => {
          const options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          };
          const arr = value.split('.')
          const date = new Date(`${arr[2]}.${arr[1]}.${arr[0]}`).toLocaleString('default', options)       
          return date   
        }

        return (
          <div>
            
              <DataTable value={this.state.devices} headerColumnGroup={headerGroup} scrollable scrollHeight="100%" 
              sortField="dateAdded" sortOrder={-1}
              >
                <Column field="id" header="Номер аппарата"></Column>
                <Column field="status" header="Статус"></Column>
                <Column field="koord" header="Координаты"></Column>
                <Column field="type" header="Тип объекта"></Column>
                <Column field="menu" header="Привязанное меню"></Column>
                <Column field="playlist" header="Рекламные плейлисты"></Column>
                <Column field="statusApp" header="Статусы узлов аппарата"></Column>
                <Column field="dateAdded" header="Дата добавления в админку" body={dateAddedBody}></Column>
                <Column field="summMo" header="Сумма продаж за последний месяц"></Column>
                <Column field="summDay" header="Сумма продаж за день"></Column>
                
              </DataTable>
          </div>
        );
    }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<DataTableDevices/>, rootElement);