import React, { useState, useEffect,useRef  } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { IngredientService } from '../service/IngredientService';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

export default function IngredientMain() {

    let emptyIngredient = {
        nameCoffie: '',
        coeffCoffie: 0,
        grammCoffie: 0,
        waterCoffie: 0,
        timeCoffie: 0,
        nameSuryp: '',
        coeffSuryp: 0,
        coverSuryp: 0,
        nameIce: '',
        coeffIce: 0,
        coverIce: 0,
        nameCanister: '',
        coeffCanister: 0,
        coverCanister: 0,
        grammCanister: 0
    }

    const typeSelectItems = [{name: 'Основа кофе'},{name: 'Сиропы'},{name: 'Лед'},{name: 'Канистры'}];

    const toast = useRef(null);
    const [ingredients, setIngredients] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState(null);
    const [deleteIngredientsDialog, setDeleteIngredientsDialog] = useState(false);
    const [ingredient] = useState(emptyIngredient);
    const [selectedTypeIngredient, setSelectedTypeIngredient] = useState(null);
    const rowClick = false;

    useEffect(() => {
        IngredientService.getIngridient().then((data) => {
            setIngredients(data); 
            setSelectedTypeIngredient('Основа кофе');
        });
    }, []);

    const leftToolbarTemplate = () => {
        return (
             <div>
                <Button label="New" icon="pi pi-plus" severity="success" className='buttonNew'/>
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedIngredients || !selectedIngredients.length} 
                className='buttonNew'/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Dropdown placeholder="Выберете тип объекта" value={selectedTypeIngredient} options={typeSelectItems} onChange={(e)=> setSelectedTypeIngredient(e.value)} optionLabel="name" editable/>
        );
      }

    const confirmDeleteSelected = () => {
        setDeleteIngredientsDialog(true);
    };

    const hideDeleteIngredientsDialog = () => {
        setDeleteIngredientsDialog(false);
    };

    const deleteSelectedIngredients = () => {
        let _ingredients = ingredients.filter((val) => !selectedIngredients.includes(val));

        setIngredients(_ingredients);
        setDeleteIngredientsDialog(false);
        setSelectedIngredients(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Удаление Ингридиента', life: 3000 });
    };

    const deleteIngredientsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteIngredientsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedIngredients} />
        </React.Fragment>
    );

    let headerGroup = (
        <ColumnGroup>
          <Row>
          <Column selectionMode="multiple" exportable={false} rowSpan={5}/>
            <Column header="Основа кофе" field="nameCoffie" colSpan={5} sortable/>
            <Column header="Сиропы" field="nameSuryp" colSpan={3} sortable/>
            <Column header="Лед" field="nameIce" colSpan={3} sortable/>
            <Column header="Канистры" field="nameCanister" colSpan={4} sortable/>
          </Row>
          <Row>
            <Column field="nameCoffie" header="Название" colSpan={1} sortable/>
            <Column field="coeffCoffie" header="Коэфф" colSpan={1} sortable/>
            <Column field="grammCoffie" header="Кол-во (г)" colSpan={1} sortable/>
            <Column field="waterCoffie" header="Вода замач" colSpan={1} sortable/>
            <Column field="timeCoffie" header="Время замач" colSpan={1} sortable/>
            <Column field="nameSuryp" header="Название (РУ/АНГЛ)" colSpan={1} sortable/>
            <Column field="coeffSuryp" header="Коэфф" colSpan={1} sortable/>
            <Column field="coverSuryp" header="Обложка" colSpan={1} sortable/>
            <Column field="nameIce" header="Название (РУ/АНГЛ)" colSpan={1} sortable/>
            <Column field="coeffIce" header="Коэфф" colSpan={1} sortable/>
            <Column field="coverIce" header="Обложка" colSpan={1} sortable/>
            <Column field="nameCanister" header="Название (РУ/АНГЛ)" colSpan={1} sortable/>
            <Column field="coeffCanister" header="Коэфф" colSpan={1} sortable/>
            <Column field="coverCanister" header="Обложка" colSpan={1} sortable/>
            <Column field="grammCanister" header="Кол-во (г)" colSpan={1} sortable/>
          </Row>
        </ColumnGroup>
      );
  
  return (
    <div>
        <div className="card">
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}/>
            <DataTable value={ingredients} headerColumnGroup={headerGroup} scrollable scrollHeight="100%"
                selectionMode={rowClick ? null : 'checkbox'} selection={selectedIngredients} onSelectionChange={(e) => setSelectedIngredients(e.value)}
            >
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="nameCoffie" header="Название"></Column>
                <Column field="coeffCoffie" header="Коэффициент"></Column>
                <Column field="grammCoffie" header="Количество (г)"></Column>
                <Column field="waterCoffie" header="Вода для замачивания"></Column>
                <Column field="timeCoffie" header="Время замачивания"></Column>
                <Column field="nameSuryp" header="Название (РУ и АНГЛ)"></Column>
                <Column field="coeffSuryp" header="Коэффициент"></Column>
                <Column field="coverSuryp" header="Обложка"></Column>
                <Column field="nameIce" header="Название (РУ и АНГЛ)"></Column>
                <Column field="coeffIce" header="Коэффициен"></Column>
                <Column field="coverIce" header="Обложка"></Column>
                <Column field="nameCanister" header="Название (РУ и АНГЛ)"></Column>
                <Column field="coeffCanister" header="Коэффициент"></Column>
                <Column field="coverCanister" header="Обложка"></Column>
                <Column field="grammCanister" header="Количество (г)"></Column>
            </DataTable>

            <Dialog visible={deleteIngredientsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteIngredientsDialogFooter} onHide={hideDeleteIngredientsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {ingredient && <span>Are you sure you want to delete the selected devices?</span>}
                </div>
            </Dialog>
        </div>

  
    </div>
  )
}
