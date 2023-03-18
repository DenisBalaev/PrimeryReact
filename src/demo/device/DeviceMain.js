import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DeviceService } from '../../service/DeviceService';
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './device.css'

export default function DeviceMain() {
  let emptyDevice = {
        id: null,
        status: '',
        koord: '',
        type: '',
        menu: '',
        playlist: 0,
        statusApp: '',
        dateAdded: '',
        summMo: 0,
        summDay:0
    };

    const [devices, setDevices] = useState(null);
    const [selectedDevices, setSelectedDevices] = useState(null);
    const [device, setDevice] = useState(emptyDevice);
    const [submitted, setSubmitted] = useState(false);
    const [deviceDialog, setDeviceDialog] = useState(false);


    useEffect(() => {
      DeviceService.getDevices().then((data) => setDevices(data));
    }, []);

    let headerGroup = (
        <ColumnGroup>
          <Row>
            <Column selectionMode="multiple" exportable={false} rowSpan={2}/>
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
        const arr = rowData.dateAdded.split('-')   
        return `${arr[2]}.${arr[1]}.${arr[0]}`   
      }

      const leftToolbarTemplate = () => {
        return (
             <div>
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} className='buttonNew'/>
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedDevices || !selectedDevices.length} />
            </div>
        );
      };

      const openNew = () => {
        setDevice(emptyDevice);
        setSubmitted(false);
        setDeviceDialog(true);
      };

      const hideDialog = () => {
        setSubmitted(false);
        setDeviceDialog(false);
      };

      const confirmDeleteSelected = () => {

      };
      
      return (
        <div>
          <div className="card">

            <Toolbar className="mb-4" left={leftToolbarTemplate}/>
            <DataTable value={devices} selection={selectedDevices} onSelectionChange={(e) => setSelectedDevices(e.value)} 
            headerColumnGroup={headerGroup} scrollable scrollHeight="100%" sortField="dateAdded" sortOrder={-1}>
              
                <Column selectionMode="multiple" exportable={false}></Column>
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

            <Dialog visible={deviceDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" onHide={hideDialog}>
                {device.id && <img src={`https://primefaces.org/cdn/primereact/images/product/${device.id}`} alt={device.id} className="product-image block m-auto pb-3" />}
                
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="koord" value={device.koord}  required autoFocus  />
                 
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="menu" value={device.menu}  required rows={3} cols={20} />
                </div>

                <div className="field">
                </div>

            </Dialog>

          </div>
        </div>
      );
}
        