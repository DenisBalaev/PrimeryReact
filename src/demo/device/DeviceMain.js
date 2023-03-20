import React, { useState, useEffect,useRef  } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { DeviceService } from '../../service/DeviceService';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
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
          playlist: '',
          statusApp: '',
          dateAdded: '',
          summMo: 0,
          summDay:0,
          agentVersion:'',
          androidVersion:'',
          progectVersion:'',
          deviceConfiguration:''
      };

      const toast = useRef(null);
      const [devices, setDevices] = useState(null);
      const [historys, setHistorys] = useState(null);
      
      const [selectedDevices, setSelectedDevices] = useState(null);
      const [device, setDevice] = useState(emptyDevice);
      const [submitted, setSubmitted] = useState(false);
      const [deviceDialog, setDeviceDialog] = useState(false);
      const [deleteDevicesDialog, setDeleteDevicesDialog] = useState(false);
      const rowClick = false;

      const [countSearchRowDataTable, setCountSearch] = useState(0);
      const [countAllRowDataTable, setCountAllRowDataTable] = useState(0);
      const [selectedStatus, setSelectedStatus] = useState(null);
      const [selectedAgentVerion, setSelectedAgentVerion] = useState(null);
      const [selectedAndroidVersion, setSelectedAndroidVersion] = useState(null);
      const [selectedProgectVersion, setSelectedProgectVersion] = useState(null);
      const [selectedType, setSelectedType] = useState(null);
      const [selectedMenu, setSelectedMenu] = useState(null);
      const [selectedPlayList, setSelectedPlayList] = useState(null);
      const [selectedDeviceConfiguration, setSelectedDeviceConfiguration] = useState(null);
      const [selectedStatusApp, setSelectedStatusApp] = useState(null);

      const [valueId, setValueId] = useState('');
      const [valueKoord,setValueKoord] = useState('')
      const [valueDateAdded,setValueDateAdded] = useState(null)
      const [valueSummMo, setValueSummMo] = useState(null);
      const [valueSummDay,setValueSummDay] = useState(null)

      const statusSelectItems = [{name: 'Оффлайн'},{name: 'Онлайн'},{name: 'Недостаток продуктов'},{name: 'Открыта дверца'},{name:'Ошибка на аппарате'}];
      const agentVersionSelectItems = [{name: '1'},{name: '2'},{name: '3'}];
      const androidVersionSelectItems = [{name: '1.0'},{name: '2.0'},{name: '3.0'}];
      const progectVersionSelectItems = [{name: '1.0'},{name: '2.0'},{name: '3.0'}];
      const typeSelectItems = [{name: 'Метро'},{name: 'ТЦ'},{name: 'Улица'},{name: 'Дорога'},{name: 'БЦ'}];
      const menuSelectItems = [{name: 'Меню2'},{name: 'Меню5'},{name: '	4 Меню1'},{name: 'Меню1'},{name: '2 Меню2'},{name:'3 Меню2'}];
      const playListSelectItems = [{name: '1'},{name: '2'},{name: '3'}];
      const deviceConfigurationSelectItems = [{name: '1.0'},{name: '2.0'},{name: '3.0'}];
      const statusAppSelectItems = [{name: 'Ок'},{name: '	Сломан 3уз'},{name: 'Сломан 1уз'},{name:'Сломан 4уз'}];

      useEffect(() => {
        const devieService = DeviceService
        devieService.getDevices().then((data) => {
          setDevices(data); 
          setCountSearch(data.length);
          setCountAllRowDataTable(data.length);
        });

        devieService.getHistory().then((data) => setHistorys(data));
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

      const dateRead = (rowData) => {
        const arr = rowData.date.split('-')   
        return `${arr[2]}.${arr[1]}.${arr[0]}`   
      }

      const leftToolbarTemplate = () => {
        return (
             <div>
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} className='buttonNew'/>
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedDevices || !selectedDevices.length} 
                className='buttonNew'/>
            </div>
        );
      };

      const rightToolbarTemplate = () => {
        return (
        <strong>
          <span className='contener_text_count'> 
            <span className='text_count'>Количество добавленных аппаратов: {countAllRowDataTable} штук</span>
            <span className='text_count'>Количество найденных аппаратов: {countSearchRowDataTable} штук</span>
          </span>
        </strong>
        );
      }

      const openNew = () => {
        setDevice(emptyDevice);
        setSubmitted(false);
        setDeviceDialog(true);
      };

      const hideDialog = () => {
        setSubmitted(false);
        setDeviceDialog(false);
        clearFields();
      };

      const confirmDeleteSelected = () => {
        setDeleteDevicesDialog(true);
      };

      const hideDeleteDevicesDialog = () => {
        setDeleteDevicesDialog(false);
      };

      const deleteSelectedDevices = () => {
        let _devices = devices.filter((val) => !selectedDevices.includes(val));

        setDevices(_devices);
        setDeleteDevicesDialog(false);
        setSelectedDevices(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Удаление девайса', life: 3000 });
      };

      const toastDevice = (value) =>{
        toast.current.show({ severity: 'success', summary: 'Successful', detail: value, life: 2000 });
      }

      const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editDevice(rowData)} />
                <Button icon="pi pi-refresh" rounded outlined onClick={() => toastDevice("Перезагрузка")}/>
                <Button icon="pi pi-power-off" rounded outlined severity="danger" onClick={() => toastDevice("Выключение")}/>
            </React.Fragment>
        );
      };

      const deleteDevicesDialogFooter = (
          <React.Fragment>
              <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDevicesDialog} />
              <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedDevices} />
          </React.Fragment>
      );

      const saveDevice = () => {
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Сохранение изменения значений', life: 2000 });
        setDeviceDialog(false);
      }

      const deviceDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveDevice}/>
        </React.Fragment>
      );

      const editDevice = (device) => {
        setDevice({ ...device });
        setDeviceDialog(true);
        setValueId(device.id);
        setSelectedStatus(device.status);
        setSelectedAgentVerion(device.agentVersion);
        setSelectedAndroidVersion(device.androidVersion);
        setSelectedProgectVersion(device.progectVersion);
        setValueKoord(device.koord);
        setSelectedType(device.type);
        setSelectedMenu(device.menu);
        setSelectedPlayList(device.playlist);
        setSelectedDeviceConfiguration(device.deviceConfiguration);
        setSelectedStatusApp(device.statusApp);
        setValueDateAdded(new Date(device.dateAdded));
        setValueSummDay(device.summDay);
        setValueSummMo(device.summMo);
      };

      const clearFields = () =>{
        setValueId('');
        setSelectedStatus(null);
        setSelectedAgentVerion(null);
        setSelectedAndroidVersion(null);
        setSelectedProgectVersion(null);
        setValueKoord('');
        setSelectedType(null);
        setSelectedMenu(null);
        setSelectedPlayList(null);
        setSelectedDeviceConfiguration(null);
        setSelectedStatusApp(null);
        setValueDateAdded(null);
        setValueSummDay('');
        setValueSummMo('');
      }

      return (
        <div>
          <div className="card">
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}/>
            <DataTable value={devices} 
            selectionMode={rowClick ? null : 'checkbox'} selection={selectedDevices} onSelectionChange={(e) => setSelectedDevices(e.value)}
            headerColumnGroup={headerGroup} scrollable scrollHeight="100%" sortField="dateAdded" sortOrder={-1}
            >
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
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                
            </DataTable>

            <Dialog visible={deviceDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Детали аппарата" modal className="p-fluid" onHide={hideDialog} footer={deviceDialogFooter}>
                
                <div className="field">
                    <label htmlFor="id" className="font-bold"> Номер аппарата (первые 4 цифры в витрине) </label>
                    <InputText id="id" value={valueId}  required autoFocus onChange={(e) => setValueId(e.target.value)}/>
                </div>

                <div className="field">
                    <label htmlFor="status" className="font-bold"> Статус </label>
                    <Dropdown placeholder="Выберете статус" value={selectedStatus} options={statusSelectItems} onChange={(e)=> setSelectedStatus(e.value)} optionLabel="name" editable/>
                </div>

                <div className="field">
                    <label htmlFor="agentVersion" className="font-bold"> Версия агента </label>
                    <Dropdown placeholder="Выберете версию агента" value={selectedAgentVerion} options={agentVersionSelectItems} onChange={(e)=> setSelectedAgentVerion(e.value)} optionLabel="name" editable/>
                </div>

                <div className="field">
                    <label htmlFor="androidVersion" className="font-bold"> Версия андроида </label>
                    <Dropdown placeholder="Выберете версию андроида" value={selectedAndroidVersion} options={androidVersionSelectItems} onChange={(e)=> setSelectedAndroidVersion(e.value)} optionLabel="name" editable/>
                </div>

                <div className="field">
                    <label htmlFor="progectVersion" className="font-bold"> Версия приложения </label>
                    <Dropdown placeholder="Выберете версию приложения" value={selectedProgectVersion} options={progectVersionSelectItems} onChange={(e)=> setSelectedProgectVersion(e.value)} optionLabel="name" editable/>
                </div>

                <div className="field">
                    <label htmlFor="koord" className="font-bold"> Координаты </label>
                    <InputTextarea id="koord" value={valueKoord} required rows={2} cols={20} onChange={(e) => setValueKoord(e.target.value)}/>
                </div>

                <div className="field">
                    <label htmlFor="type" className="font-bold"> Тип объекта </label>
                    <Dropdown placeholder="Выберете тип объекта" value={selectedType} options={typeSelectItems} onChange={(e)=> setSelectedType(e.value)} optionLabel="name" editable/>
                </div>

                <div className="field">
                    <label htmlFor="menu" className="font-bold"> Привязанное меню </label>
                    <Dropdown placeholder="Выберете меню" value={selectedMenu} options={menuSelectItems} onChange={(e)=> setSelectedMenu(e.value)} optionLabel="name" editable/>
                </div>

                <div className="field">
                    <label htmlFor="playlist" className="font-bold"> Рекламные плейлисты </label>
                    <Dropdown value={selectedPlayList} options={playListSelectItems} onChange={(e) => setSelectedPlayList(e.value)} optionLabel="name" placeholder="Выберете плейлисты" maxSelectedLabels={2} editable/>
                </div>

                <div className="field">
                    <label htmlFor="deviceConfiguration" className="font-bold"> Конфигурация аппарата </label>
                    <Dropdown value={selectedDeviceConfiguration} options={deviceConfigurationSelectItems} onChange={(e) => setSelectedDeviceConfiguration(e.value)} optionLabel="name" placeholder="Выберете конфигурацию аппарата" maxSelectedLabels={2} editable/>
                </div>

                <div className="field">
                    <label htmlFor="statusApp" className="font-bold"> Статусы узлов аппарата </label>
                    <Dropdown value={selectedStatusApp} options={statusAppSelectItems} onChange={(e) => setSelectedStatusApp(e.value)} optionLabel="name" placeholder="Выберете конфигурацию аппарата" maxSelectedLabels={2} editable/>
                </div>

                <div className="field">
                  <label htmlFor="deviceConfiguration" className="font-bold"> История действий на аппарате </label>
                  <DataTable value={historys} sortField="date" sortOrder={-1}>
                    <Column field="date" header="Дата" body={dateRead}></Column>
                    <Column field="actionName" header="Название действия"></Column>
                    <Column field="author" header="Кто сделал"></Column>
                  </DataTable>
                </div>

                <div className="field">
                  <label htmlFor="basic">Дата добавления в админку</label>
                  <Calendar id="basic" dateFormat="dd.mm.yy" value={valueDateAdded} onChange={(e) => setValueDateAdded(e.value)} editable/>
                </div>

                <div className="field">
                    <label htmlFor="summMo" className="font-bold"> Сумма продаж за последний месяц </label>
                    <InputText id="summMo" value={valueSummMo}  required onChange={(e) => setValueSummMo(e.target.value)}/>
                </div>

                <div className="field">
                    <label htmlFor="summDay" className="font-bold"> Сумма продаж за день </label>
                    <InputText id="summDay" value={valueSummDay}  required onChange={(e) => setValueSummDay(e.target.value)}/>
                </div>

                <div className="field">
                  <p/>
                  <Button icon="pi pi-refresh" rounded outlined onClick={() => toastDevice("Перезагрузка")}/>
                  <Button icon="pi pi-power-off" rounded outlined severity="danger" onClick={() => toastDevice("Выключение")}/>
                  <Button icon="pi pi-camera" rounded outlined onClick={() => toastDevice("Скриншот")}/>
                  <Button icon="pi pi-bolt" rounded outlined onClick={() => toastDevice("Простые функции")}/>
                  <Button icon="pi pi-upload" rounded outlined onClick={() => toastDevice("Подача материалов")}/>
                </div>

            </Dialog>

            <Dialog visible={deleteDevicesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDevicesDialogFooter} onHide={hideDeleteDevicesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {device && <span>Are you sure you want to delete the selected devices?</span>}
                </div>
            </Dialog>

          </div>
        </div>
      );
}
        